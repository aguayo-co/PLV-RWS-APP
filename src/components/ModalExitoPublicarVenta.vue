<template lang="pug">
transition(name='modal-fade')
  section.modal.modal_scroll
    .modal__slot.content-slot
      .content-slot__inner
        .notify(
          v-if='attributes.productPending')
          h1.title.notify__title ¡Listo! pronto tu producto aparecerá en Prilov
          .notify__body
            p Ahora debes esperar que tu producto sea aprobado por nuestro equipo. Esto puede tardar hasta 48 horas hábiles. Recibirás un mail notificándote cuando esto ocurra.
          .notify__footer
            .notify__row
              a.btn.btn_solid.btn_block(
              href='#') Agregar más productos
            .notify__row
              a.btn.btn_block(
              href='#') Vitrinear
        .notify(
          v-if='!attributes.productPending')
          h1.title.notify__title ¡Listo! tu producto ha sido publicado
          .notify__body
            p Tu producto ya está publicado. Puedes compartirlo en tus redes para aumentar las posibilidades de venta.
          .notify__footer
            .notify__row
              a.btn.btn_facebook(
              href='#') Comparte tu producto en Facebook
            .notify__row
              a.btn.btn_solid.btn_block(
              :href='"/" + attributes.productURL') Ver tu producto
</template>

<script>
export default {
  name: 'ModalExitoPublicarVenta',
  props: ['attributes'],
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>
