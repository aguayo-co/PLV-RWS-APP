<template lang="pug">
  main.content-slot
    .content-slot__inner
      h1.title Registro
      form.form.form_big(
        v-on:submit='',
        action='#',
        submit.prevent='validateBeforeSubmit',
        method='post'
      )
        .form__row
          label.form__label(
            for='nombre') Nombre
          input.form__control(
            v-model='nombre',
            id='username',
            type='text',
            v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('nombre')}"
            data-vv-name='nombre'
          )
          span.help.is-danger(
            v-show="errors.has('nombre')"
          ) {{ errors.first('nombre') }}
        .form__row
          label.form__label(
            for='apellidos') Apellidos
          input.form__control(
            v-model='apellidos',
            id='userLast',
            type='text',
            v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('apellidos')}"
            data-vv-name='apellidos'
          )
          span.help.is-danger(
            v-show="errors.has('apellidos')"
          ) {{ errors.first('apellidos') }}
        .form__row
          label.form__label(
            for='email') Correo
          input.form__control(
            v-model='email',
            id='userEmail',
            type='email',
            v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email')}"
            data-vv-name='email'
          )
          span.help.is-danger(
            v-show="errors.has('email')"
          ) {{ errors.first('email') }}
        .form__row
          label.form__label(
            for='emailConfirm') Confirma tu correo
          input.form__control(
            v-model='emailConfirm',
            id='emailConfirm',
            type='email',
            v-validate="{required: true,is: email}" :class="{'input': true, 'is-danger': errors.has('emailConfirm')}"
            data-vv-name='emailConfirm'
          )
          span.help.is-danger(
            v-show="errors.has('emailConfirm')"
          ) {{ errors.first('emailConfirm') }}
        .form__row
          label.form__label(
            for='password') Contraseña
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
            @click.prevent='validateBeforeSubmit()') Registrarse
      .break
        span.break__txt O
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
  name: 'FormSingUp',
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
          this.$store.dispatch('actionSetToken', response.data.api_token)
          this.$store.dispatch('signUp/actionSetName', response.data.first_name)
          localStorage.setItem('token', JSON.stringify(this.$store.getters.getToken))
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
      console.log(this.$store.getters['signUp/getName'])
      this.$store.dispatch('signUp/actionSetName', this.nombre)
    }
  }
}
</script>
