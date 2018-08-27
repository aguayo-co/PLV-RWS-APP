<script>
/**
 * To use this component keep in mind the following attributes:
 *   attributes: {
 *     type: preload | positive | alert // Type of Modal to show
 *     title: string
 *     body: string
 *     primaryButtonTitle: string
 *     primaryButtonURL: string
 *     primaryButtonClass: string
 *     secondaryButtonTitle: string
 *     secondaryButtonURL: string
 *     secondaryButtonClass: string
 *   }
 */
</script>
<template lang="pug">
  transition(name='modal-fade')
    section.modal.modal_scroll
      .modal__slot.content-slot
        .content-slot__inner
          .notify
            header.modal__header
              .prilov-preload(
                v-if='attributes.type === "preload"')
                h2.title.notify__title {{ attributes.title }}
                .preload
                  span.preload__spin.preload__spin_1
                  span.preload__spin.preload__spin_2
                  span.preload__spin.preload__spin_3
                  span.preload__spin.preload__spin_4

              .notify__ico.i-ok(
                v-if='attributes.type === "positive"')
                h2.title.notify__title {{ attributes.title }}

              .notify__ico.i-alert(
                v-if='attributes.type === "alert"')
                h2.title.notify__title {{ attributes.title }}

              .btn_close.modal__btn_close.i-x(
                v-if='attributes.type !== "preload"'
                @click='close')
                span Cerrar

            .notify__body.notify__body_center(v-if="attributes.body")
              p {{ attributes.body }}
            .notify__body.notify__body_center(v-if="attributes.component")
              component(:is="attributes.component")
            .notify__footer(v-if="hasFooter")
              .notify__row
                router-link.btn.btn_solid.btn_block(
                  :class='attributes.primaryButtonClass'
                  v-if='attributes.primaryButtonTitle'
                  :to='attributes.primaryButtonURL') {{ attributes.primaryButtonTitle }}
              .notify__row
                router-link.btn.btn_block(
                  :class='attributes.secondaryButtonClass'
                  v-if='attributes.secondaryButtonTitle'
                  :to='attributes.secondaryButtonURL') {{ attributes.secondaryButtonTitle }}
  </template>

<script>
export default {
  name: 'ModalMessage',
  props: ['attributes'],
  computed: {
    hasFooter () {
      return this.attributes.primaryButtonTitle || this.attributes.secondaryButtonTitle
    }
  },
  methods: {
    close () {
      this.$store.dispatch('ui/closeModal')
    }
  }
}
</script>
