<template lang="pug">
  .form-slot
    h1.title Recuperar Contraseña
    p Ingresa tu correo y te enviaremos un enlace para recuperar tu contraseña.
    form.form.form_big(
      v-on:submit='',
      action='#',
      method='post')
      .form__row
        label.form__label(
          for='userEmail') Correo
        input.form__control(
          v-model='userEmail',
          id='userEmail',
          type='email',
          v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('correo')}",
          data-vv-name='userEmail'
        )
        span.help.is-danger(
          v-show="errors.has('userEmail')"
        ) {{ errors.first('userEmail') }}
        .form__notify(v-if='emailFound == false')
          p No hemos encontrado una cuenta asociada al correo: {{userEmail}}
          p ¿Te gustaría crear una cuenta ahora?
          router-link.btn(:to="{ name: 'signup'}") Crear cuenta
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='validateBeforeSubmit()') Enviar Correo
    p.form__info.i-alert-info Recuerda revisar tu carpeta de <strong>correo no deseado.</strong>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FormPass',
  data () {
    return {
      userEmail: '',
      emailFound: true
    }
  },
  methods: {
    recoverPass () {
      axios.get('https://prilov.aguayo.co/api/users/password/recovery/' + this.userEmail, {
      })
        .then(response => {
          localStorage.setItem('userEmail', this.userEmail)
          this.$store.dispatch('PasswordModule/actionSetUserEmail', this.userEmail)
          this.setRecoverSuccess()
          console.log(response)
        })
        .catch(e => {
          console.log('ERROR : ' + e)
          this.emailFound = false
        })
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.recoverPass()
          return
        }
        alert('Correct them errors!')
      })
    },
    setRecoverSuccess () {
      this.$store.dispatch('PasswordModule/actionSetPassState', 'requestSended')
    }
  }
}
</script>
