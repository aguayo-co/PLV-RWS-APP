<template lang="pug">
  .form-slot(v-if="!emailSent")
    h1.title Recuperar Contraseña
    p Ingresa tu correo y te enviaremos un enlace para recuperar tu contraseña.
    form.form.form_big(
      @submit.prevent='validate',
      action='#')
      .form__row(:class='{ "is-danger": errorLog.email }')
        label.form__label(
          for='email') Correo
        span.help(
          v-show='errorLog.email'
        ) {{ errorLog.email }}
        input.form__control(
          v-model='user.email',
          id='email',
          type='text')
        .form__notify(v-if='!emailFound')
          p No hemos encontrado una cuenta asociada al correo: {{ user.email }}
          p ¿Te gustaría crear una cuenta ahora?
          router-link.btn(:to="{ name: 'signup'}") Crear cuenta
      .form__row.form__row_away
        button.btn.btn_solid.btn_block Enviar Correo
    p.form__info.i-alert-info Recuerda revisar tu carpeta de <strong>correo no deseado.</strong>
  .notify(v-else)
    .notify__ico.i-ok
      h1.title.notify__title Ya puedes recuperar tu contraseña
      .notify__body
        p Te hemos enviado un enlace  al email <strong>{{ user.email }} </strong> para que puedas crear una nueva contraseña.
        p.notify__info.i-alert-info Recuerda revisar tu carpeta de <strong>correo no deseado.</strong>
      .notify__footer
        .notify__row
          router-link.btn.btn_solid.btn_block(
            :to="{ name: 'home'}") Volver al inicio
</template>

<script>
import usersAPI from '@/api/user'
export default {
  name: 'FormPass',
  data () {
    return {
      errorLog: {},
      user: {},
      emailFound: true,
      emailSent: false
    }
  },
  methods: {
    validate: function () {
      this.errorLog = {}
      if (!this.user.email) {
        this.errorLog.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.user.email)) {
          this.errorLog.email = 'El email que ingresaste no parece válido.'
        }
      }

      if (Object.keys(this.errorLog).length === 0) {
        this.requestPassword()
      }
    },
    requestPassword: function () {
      usersAPI.passwordRecovery(this.user.email)
        .then(response => {
          this.emailSent = true
        })
        .catch(e => {
          this.emailFound = false
        })
    }
  }
}
</script>
