<template lang="pug">
main.content-slot
  .content-slot__inner
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
        .form__notify
        p No hemos encontrado una cuenta asociada al correo: mailnoreconocido@gmail.com
        p ¿Te gustaría crear una cuenta ahora?
        a.btn(href="#") Crear cuenta
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='validateBeforeSubmit()') Enviar Correo
    p.form__info.i-alert-info Recuerda revisar también la carpeta de <strong>correo no deseado.</strong>
</template>

<script>
import es from 'vee-validate/dist/locale/es'
import VeeValidate, {Validator} from 'vee-validate'
import axios from 'axios'
import Vue from 'vue'
Validator.localize('es', es)
Vue.use(VeeValidate)
export default {
  name: 'FormSignUp',
  data () {
    return {
      userEmail: ''
    }
  },
  methods: {
    recoverPass () {
      axios.get('https://prilov.aguayo.co/api/users/password/recovery/' + this.userEmail, {
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log('ERROR : ' + e)
        })
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.recoverPass()
          alert('Exito!')
          return
        }
        alert('Correct them errors!')
      })
    }
  }
}
</script>
