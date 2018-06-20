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

        template(v-if="changed")
          p Has cambiado exitosamente tu contraseña
          .form__row.form__row_away
            button.btn.btn_solid.btn_block(@click="close") Cerrar
        form.form(
          v-else
          @submit.prevent='submit')
          .form__row
            label.form__label(
              for='passwordNew'
            ) Nueva Contraseña
            span.help(
              v-if="errorTexts.password"
            ) {{ errorTexts.password }}
            input.form__control(
              v-model="password"
              id='passwordNew'
              type='password')

          .form__row.form__row_away
            button.btn.btn_solid.btn_block Cambiar Contraseña
          .form__row
            p.form__note.form__note_center
              a.link_underline(@click="close") No quiero cambiar mi contraseña
</template>

<script>
import userAPI from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'ModalPasswordChange',
  data () {
    return {
      changed: null,
      password: null,
      errorTexts: {}
    }
  },
  computed: {
    ...mapState('user', ['id'])
  },
  methods: {
    submit: function () {
      this.errorTexts = {}

      if (!this.password) {
        this.errorTexts.password = 'Debes ingresar una contraseña'
        return
      }

      const payload = {
        id: this.id,
        password: this.password
      }

      userAPI.update(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
          this.changed = true
        })
    },
    close: function () {
      this.$store.dispatch('ui/closeModal')
    }
  }
}
</script>
