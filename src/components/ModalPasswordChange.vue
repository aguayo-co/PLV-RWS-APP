<template lang="pug">
transition(name='modal-fade')
  section.modal.modal_scroll
    .modal__slot.content-slot
      .content-slot__inner
        header.modal__header
          h2.title Cambiar contraseña
          .btn_close.modal__btn_close.i-x(
            @click='close')
            span Cerrar

        form.form(
          v-on:submit='',
          action='#',
          submit.prevent='validateBeforeSubmit',
          method='post'
        )
          .form__row
            //- (v-bind:class='{ "is-danger": errorTexts.email }')
            label.form__label(
              for='passwordCurrent') Contraseña Actual
            //- span.help(
            //-   v-if="errorTexts.email"
            //- ) {{ errorTexts.email }}
            input.form__control(
              id='passwordCurrent',
              type='password')
          .form__row
            //- (v-bind:class='{ "is-danger": errorTexts.password }')
            label.form__label(
              for='passwordNew'
            ) Nueva Contraseña
            //- span.help(
            //-   v-if="errorTexts.password"
            //- ) {{ errorTexts.password }}
            input.form__control(
              id='passwordNew',
              type='password')
            
          .form__row.form__row_away
            button.btn.btn_solid.btn_block(
              @click.prevent='validateBeforeSubmit') Cambiar Contraseña
          .form__row
            p.form__note.form__note_center
              a.link_underline No quiero cambiar mi contraseña
              a.link_underline Regresar
</template>

<script>
import userAPI from '@/api/user'
export default {
  name: 'ModalPasswordChange',
  data () {
    return {
      email: '',
      password: '',
      errorTexts: {}
    }
  },
  methods: {
    validateBeforeSubmit: function () {
      this.errorTexts = {}

      if (!this.email) {
        this.errorTexts.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.errorTexts.email = 'El email que ingresaste no parece válido.'
        }
      }

      if (!this.password) this.errorTexts.password = 'Debes ingresar una contraseña'

      if (Object.keys(this.errorTexts).length === 0) {
        this.login()
      }
    },
    login: function () {
      const payload = {
        email: this.email,
        password: this.password
      }
      userAPI.login(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
          this.close()
        })
        .catch(e => {
          var modal

          if (this.$store.getters['ui/loginAttempts'] < 3) {
            modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Parece que ocurrió un error',
                body: Object.values(e.response.data.errors)[0]
              }
            }
          } else {
            modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Ya has intentado autenticarte varias veces',
                primaryButtonTitle: '¿Olvidaste tu contraseña?',
                primaryButtonURL: 'password'
              }
            }
          }
          this.$store.dispatch('ui/showModal', modal)
          this.$store.dispatch('ui/loginAttempt')
        })
    },
    close: function () {
      this.$store.dispatch('ui/closeModal')
    }
  }
}
</script>
