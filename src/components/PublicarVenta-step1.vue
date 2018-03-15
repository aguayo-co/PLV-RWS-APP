<template lang="pug">
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
</template>

<script>
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'PublicarVentaStep2'
  // data () {
  //   return {
  //     uploadMain: {}
  //   }
  // }
}
</script>
