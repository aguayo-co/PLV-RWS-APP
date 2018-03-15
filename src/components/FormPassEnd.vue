<template lang="pug">
  .form-slot
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
        input.form__control(
          v-model='passwordConfirm',
          id='passwordConfirm',
          type='password',
          v-validate="{required: true,is: password}" :class="{'input': true, 'is-danger': errors.has('passwordConfirm')}"
          data-vv-name='passwordConfirm'
        )
        span.help.is-danger(
          v-show="errors.has('passwordConfirm')"
        ) {{ errors.first('passwordConfirm') }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='validateBeforeSubmit()') Cambiar contraseña
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormPassEnd',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    recover () {
      // console.log(this.$store.get('userAuth'))
      axios.post('https://prilov.aguayo.co/api/users/password/reset/' + this.$store.getters['PasswordModule/getUserEmail'], {
        password: this.password,
        token: this.$route.query.token
      })
        .then(response => {
          console.log('response data api?' + response.data.api_token)
          // this.$store.set('userAuth', {token: response.data.api_token})
          localStorage.removeItem('userEmail')
          this.setRecoverSuccess()
        })
        .catch(e => {
          // console.log(e.response.data.errors.exists[0]) // Aca se obtiene el error del servidor
          // alert(e.response.data.errors.exists[0])
        })
    },
    validateBeforeSubmit () {
    },
    setRecoverSuccess () {
      this.$store.dispatch('PasswordModule/actionSetPassState', 'recoverPassSuccess')
    }
  }
}
</script>
