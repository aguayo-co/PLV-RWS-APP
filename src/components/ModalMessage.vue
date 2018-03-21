<template lang="pug">
  transition(name='modal-fade')
    section.modal.modal_scroll
      .modal__slot.content-slot
        .content-slot__inner
          .notify
            header.modal__header
              //-v-if preload
              //- .notify__ico
              //-   .prilov-preload
              //v-if OK
              //- .notify__ico.i-ok
              //-   h2.title.notify__title ¡Listo! pronto tu producto aparecerá en Prilov
              //-   h2.title.notify__title Lo sentimos pero algo ha salido mal
              //v-if error
              .notify__ico.i-alert-tri
                h2.title.notify__title Lo sentimos pero algo ha salido mal
              .btn_close.modal__btn_close.i-x(
                @click='close')
                span Cerrar
            .notify__body.notify__body_center
              p Por favor intenta el registro nuevamente.
            .notify__footer
              .notify__row
                router-link.btn.btn_solid.btn_block.i-reload(
                  to='SignUp') Intentar nuevamente
              .notify__row
                router-link.btn.btn_block(
                  to='/user/data') Ver mi Perfil
  </template>

<script>
export default {
  name: 'ModalMessage',
  methods: {
    close: function () {
      this.$store.dispatch('ui/closeModal')
    }
  }
}
</script>
