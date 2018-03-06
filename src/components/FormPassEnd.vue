<template lang="pug">
  main.content-slot
    .content-slot__inner
      h1.title Cambiar contraseña
      form.form.form_big(
        v-on:submit='',
        action='#',
        submit.prevent='validateBeforeSubmit',
        method='post'
      )

        .form__row
          label.form__label(
            for='password') Nueva Contraseña
          vue-password(
            v-model='password',
            classes='input'
            :user-inputs="[email]"
            v-validate="'required|min:8|regex:^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'" :class="{'input': true, 'is-danger': errors.has('password')}"
            data-vv-name='password'
          )
          span.help.is-danger(
            v-show="errors.has('password')"
          ) {{ errors.first('password') }}

        .form__row
          label.form__label(
            for='password') Repetir Contraseña
          vue-password(
            v-model='password',
            classes='input'
            :user-inputs="[email]"
            v-validate="'required|min:8|regex:^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'" :class="{'input': true, 'is-danger': errors.has('password')}"
            data-vv-name='password'
          )
          span.help.is-danger(
            v-show="errors.has('password')"
          ) {{ errors.first('password') }}
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(
            @click.prevent='validateBeforeSubmit()') Cambiar contraseña
</template>

<script>
import es from 'vee-validate/dist/locale/es'
import VeeValidate, {Validator} from 'vee-validate'
import axios from 'axios'
import Vue from 'vue'
import VuePassword from 'vue-password'
// import GSignInButton from 'vue-google-signin-button'
Validator.localize('es', es)
// Vue.use(GSignInButton)
Vue.use(VeeValidate)
export default {
  name: 'FormPassEnd',
  locale: 'es',
  data () {
    return {
      email: '',
      nombre: '',
      apellidos: '',
      emailConfirm: '',
      password: '',
      flagSignUp: 'SignUp'
      // googleSignInParams: {
      //   client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
      // }
    }
  },
  components: {
    VuePassword
  },
  methods: {
    signUp () {
      // console.log(this.$store.get('userAuth'))
      axios.post('https://prilov.aguayo.co/api/users', {
        first_name: this.nombre,
        last_name: this.apellidos,
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log('response data api?' + response.data.api_token)
          // this.$store.set('userAuth', {token: response.data.api_token})
          this.setSuccess()
          this.setName(this.nombre)
          this.$store.dispatch('UserModule/actionSetToken', response.data.api_token)
          this.$store.dispatch('UserModule/actionSetName', response.data.first_name)
          localStorage.setItem('token', JSON.stringify(this.$store.getters['UserModule/getToken']))
          localStorage.setItem('userName', JSON.stringify(this.$store.getters['UserModule/getUserName']))
        })
        .catch(e => {
          // console.log(e.response.data.errors.exists[0]) // Aca se obtiene el error del servidor
          // alert(e.response.data.errors.exists[0])
        })
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.signUp()
          return
        }
        alert('Error en los campos del formulario') // Para validar cuando se presiona registrar
      })
    },
    setSuccess () {
      this.flagSignUp = 'Success'
      this.$emit('setSuccess')
    },
    setError () {
      this.flagSignUp = 'Error'
      this.$emit('setError')
    },
    setName (nombre) {
      console.log(this.nombre)
      console.log(this.$store.getters['UserModule/getUserName'])
      this.$store.dispatch('UserModule/actionSetUserName', this.nombre)
    }
  }
}
</script>
