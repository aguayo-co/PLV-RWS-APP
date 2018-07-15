<template lang="pug">
  .upfile__item-wrap
    .upfile__item
      a.upfile__delete.i-x(
        v-show='showCroppa && image && image.hasImage()',
        @click='removeImage')
        span.hide Eliminar
      span.help(
        v-if="errorLog"
      ) {{ errorLog }}
      template(v-if="showCroppa")
        .upfile__label
          .upfile__text.i-upload(
            v-if="mqTablet") Arrastra una foto o
          button.upfile__btn(ref="image") Sube una imagen
        croppa(
          crossOrigin='anonymous',
          v-model='image',
          :width="300",
          :height="450",
          :quality="2",
          placeholder="",
          :prevent-white-space="true",
          @draw='updateImage',
          :zoom-speed="10",
          :initial-image="initialImage",
          :disable-scroll-to-zoom="true",
          :disable-drag-to-move="!mqDesk")
      img.upfile__img(
        :src="initialImage"
        v-else-if="initialImage")

    .upfile__controls
      template(v-if='showCroppa')
        button.upfile__zoom-out.i-search-less.btn-tag(
          @click.prevent="zoom('out')") Alejar
        button.btn-tag(
          v-if='initialImage'
          @click.prevent="resetOriginal") Cancelar
        button.upfile__zoom-in.i-search-plus.btn-tag(
          @click.prevent="zoom('in')") Acercar
      template(v-else-if='initialImage')
        button.btn-tag(
          @click.prevent="editImage = true") Cambiar
</template>

<script>
import Croppa from 'vue-croppa'

export default {
  name: 'UploadPhoto',
  components: {croppa: Croppa.component},
  data () {
    return {
      image: null,
      editImage: false,
      timeoutId: null
    }
  },
  props: ['initialImage', 'errorLog'],
  computed: {
    showCroppa () {
      return !this.initialImage || this.editImage
    }
  },
  methods: {
    zoom (direction) {
      let image = this.image
      direction === 'in' ? image.zoomIn() : image.zoomOut()
    },
    handleZoom (action, image, direction) {
      if (action === 'set') {
        window.zoomEvent = window.setTimeout(this.zoom(image, direction), 200)
      } else {
        window.clearTimeout(window.zoomEvent)
      }
    },
    updateImage (event) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.$emit('input', this.image)
      }, 500)
    },
    removeImage () {
      clearTimeout(this.timeoutId)
      this.image.remove()
      this.$emit('input', this.image)
    },
    resetOriginal () {
      clearTimeout(this.timeoutId)
      this.editImage = false
      this.$emit('input', null)
    }
  }
}
</script>
