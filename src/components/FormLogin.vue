<template lang="pug">
transition(name='modal-fade')
  section.modal.modal_scroll.modal_login
    .modal__slot.content-slot
      .content-slot__inner
        header.modal__header
          h2.title Inicio de Sesión
          .btn_close.modal__btn_close.i-x(
            @click='close')
            span Cerrar
        form.form(@submit.prevent='login')
          .form__row(
            v-bind:class='{ "is-danger": errorLog.email }')
            label.form__label(
              for='email') Correo
            span.help(
              v-if="errorLog.email") {{ errorLog.email }}
            input.form__control(
              v-model='email',
              id='email',
              type='email')
          .form__row(
            v-bind:class='{ "is-danger": errorLog.password }')
            label.form__label(
              for='password') Contraseña
            span.help(
              v-if="errorLog.password") {{ errorLog.password }}
            input.form__control(
              v-model='password',
              id='password',
              type='password')
            p.form__note.form__note_right
              |¿Olvidaste tu contraseña?
              | <router-link class='link_underline' @click='close' :to="{ name: 'password' }" title='Ir a recuperar contraseña'>Recuperar contraseña.</router-link>
          .form__row.form__row_away
            button.btn.btn_solid.btn_block Iniciar sesión
        .break
          span.break__txt O
        router-link.btn.btn_block(
          :to="{ name: 'signup' }",
          title='Ir al formulario de Registro') Regístrate
</template>

<script>
import { mapState } from 'vuex'
import LoginMixin from '@/Mixin/js/Login'

export default {
  name: 'FormLogin',
  mixins: [LoginMixin],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['guestCart'])
  },
  methods: {
    loggedIn (response) {
      this.close()
    },
    close: function () {
      this.$store.dispatch('ui/closeModal')
    }
  }
}
</script>
