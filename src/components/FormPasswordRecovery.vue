<template lang="pug">
  .form-slot(v-if="!success")
    h1.title Crear nueva contraseña
    form.form.form_big(
      @submit.prevent='save')
      .form__row(
        :class='{ "is-danger": errorLog.password }')
        label.form__label(
          for='password') Nueva contraseña
          span.help(v-if="errorLog.password") {{ errorLog.password }}
          .form__password
            input.form__control(
              v-model='password',
              id='password',
              :type="viewPass ? 'text' : 'password'",
              @input='validatePassword')
            span.form__visible.i-view(
              @click='visiblePass')
        span.password-bar(
          v-if="password",
          :class="'level-' + (3 - passwordSuggestions.length)")
        div.helper(v-if='passwordSuggestions.length > 0')
          ul.helper__list
            li(v-for='detail in passwordSuggestions') {{ detail }}
      .form__row(
        :class='{ "is-danger": errorLog.passwordConfirm }')
        label.form__label(
          for='passwordConfirm') Repite tu nueva contraseña
          span.help(v-if="errorLog.passwordConfirm") {{ errorLog.passwordConfirm }}
          .form__password
            input.form__control(
              v-model='passwordConfirm',
              id='passwordConfirm',
              :type="viewPass ? 'text' : 'password'")
            span.form__visible.i-view(
              @click='visiblePass')
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='save') Cambiar contraseña
  .notify(v-else)
    .notify__ico.i-ok
      h1.title.notify__title ¡Tu contraseña se ha cambiado exitosamente!
      .notify__body
        p Ahora puedes iniciar sesión con tu nueva contraseña.
      .notify__footer
        .notify__row
          .btn.btn_solid.btn_block(@click="login") Iniciar sesión
</template>

<script>
import usersAPI from '@/api/user'

import Password from '@/Mixin/js/Password'

export default {
  name: 'FormPasswordRecovery',
  mixins: [Password],
  data () {
    return {
      password: '',
      passwordConfirm: '',
      viewPass: false,
      errorLog: {},
      success: false
    }
  },
  methods: {
    visiblePass () {
      this.viewPass = !this.viewPass
    },
    validatePasswordConfirm () {
      if (this.password !== this.passwordConfirm) this.errorLog.passwordConfirm = 'Las dos contraseñas no coinciden'
    },
    save () {
      this.errorLog = {}
      this.validatePassword()
      this.validatePasswordConfirm()
      if (Object.keys(this.errorLog).length === 0) {
        usersAPI.passwordChange(this.$route.params.tokenString, this.$route.params.email, this.password)
          .then(response => {
            this.success = true
          })
      }
    },
    login () {
      const payload = {
        name: 'FormLogin'
      }
      this.$store.dispatch('ui/showModal', payload)
    }
  }
}
</script>
