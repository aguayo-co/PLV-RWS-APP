<template lang="pug">
  .form-slot(v-if="!success")
    h1.title Crear nueva contraseña
    form.form.form_big(
      @submit.prevent='save',
      action='#')
      .form__row(
        :class='{ "is-danger": errorLog.password }')
        label.form__label(
          for='password') Contraseña
        span.help(v-if="errorLog.password") {{ errorLog.password }}
        .form__password
          input.form__control(
            v-model='password',
            id='password',
            :type="viewPass ? 'text' : 'password'",
            @input='validatePassword'
          )
          span.form__visible.i-view(
            @click='visiblePass')
        span.password-bar(
          v-if="password",
          :class="'level-' + (3 - errorLog.passwordDetail.length)")
        div.helper(v-if='errorLog.passwordDetail.length > 0')
          ul.helper__list
            li(v-for='detail in errorLog.passwordDetail') {{ detail }}
      .form__row(
        :class='{ "is-danger": errorLog.passwordConfirm }')
        label.form__label(
          for='passwordConfirm') Escribe nuevamente tu contraseña
        span.help(v-if="errorLog.passwordConfirm") {{ errorLog.passwordConfirm }}
        .form__password
          input.form__control(
            v-model='passwordConfirm',
            id='passwordConfirm',
            :type="viewPass ? 'text' : 'password'",
          )
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
export default {
  name: 'FormPasswordRecovery',
  data () {
    return {
      password: '',
      passwordConfirm: '',
      viewPass: false,
      errorLog: {
        passwordDetail: []
      },
      success: false
    }
  },
  methods: {
    visiblePass: function () {
      this.viewPass = !this.viewPass
    },
    validatePassword: function (e) {
      this.errorLog = {}
      this.errorLog.passwordDetail = []
      if (!this.password) this.errorLog.password = 'Debes ingresar una contraseña'
      if (this.password.length < 8) this.errorLog.passwordDetail.push('Tu contraseña debe tener al menos 8 caracteres')
      if (!/[a-zA-Z]/.test(this.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos una letra')
      if (!/\d+/.test(this.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos un número')
    },
    validatePasswordConfirm: function () {
      if (this.password !== this.passwordConfirm) this.errorLog.passwordConfirm = 'Las dos contraseñas no coinciden'
    },
    save: function () {
      this.validatePassword()
      this.validatePasswordConfirm()
      if (Object.keys(this.errorLog).length === 1 && this.errorLog.passwordDetail.length === 0) {
        usersAPI.passwordChange(this.$route.params.tokenString, this.$route.params.email, this.password)
          .then(response => {
            this.success = true
          })
      }
    },
    login: function () {
      const payload = {
        name: 'FormLogin'
      }
      this.$store.dispatch('ui/showModal', payload)
    }
  }
}
</script>
