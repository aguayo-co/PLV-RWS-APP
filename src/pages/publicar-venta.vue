<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head.steps__header
        h1.title Publicar una venta
        h2.title_subhead ¿No lo usas?, ¡Vendelo!
        ul.steps__list
          li.steps__item.steps__item_current
            span.steps__bullet.i-ok 1
            span.steps__label Producto
          li.steps__item
            span.steps__bullet.i-ok  2
            span.steps__label Descripción
  form.form.form_big(
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    //-Formulario step 1 formlario Foto
    //- :show-remove-button="false"
    .layout-inner
      .upfile
        .upfile__main.i-plus
          h4.upfile__title Foto Principal
          .upfile__item
            .upfile__label
              .upfile__text.i-upload(
                v-if="mqDesk") Arrastra una foto o
              .upfile__btn Sube una imagen
            croppa(
              :width="400",
              :height="600",
              :quality="2",
              placeholder="",
              :prevent-white-space="true")
        .upfile__group
          h4.upfile__title Fotos Secundarias (opcionales)
          .upfile__grid
            .upfile__item
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqDesk") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                :width="400",
                :height="600",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
            .upfile__item
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqTablet") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                :width="400",
                :height="600",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
            .upfile__item(
              v-if="mqDesk")
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqTablet") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                :width="400",
                :height="600",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")

    //-Formulario step Formulario producto
    PublicarVentaStep2

</template>

<script>
import PublicarVentaStep2 from '@/components/PublicarVenta-step2'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'PublicarVenta',
  components: {
    PublicarVentaStep2
  }
  // data () {
  //   return {
  //     uploadMain: {}
  //   }
  // }
}
</script>
