<template lang="pug">
  .upfile__item-wrap
    .upfile__item
      a.upfile__delete.i-x(
        v-show='toggleImage',
        @click='removeImage')
        span.hide Eliminar
      .upfile__label
        .upfile__text.i-upload(
          v-if="mqTablet") Arrastra una foto o
        button.upfile__btn(ref="image") Sube una imagen
      span.help(
        v-if="errorLog && !image.hasImage()"
      ) {{ errorLog }}
      croppa(
        crossOrigin='anonymous',
        v-model='image',
        :width="300",
        :height="450",
        :quality="2",
        placeholder="",
        :prevent-white-space="true",
        @new-image-drawn='addImage',
        :zoom-speed="10",
        :disable-scroll-to-zoom="true",
        :disable-drag-to-move="!mqDesk")
        img(slot="initial", crossOrigin="anonymous", :src="initialImage", v-show="initialImage")
    .upfile__controls(v-show='toggleImage')
      button.upfile__zoom-out.i-search-less.btn-tag(
        @click.prevent="zoom('out')") Alejar
      button.upfile__zoom-in.i-search-plus.btn-tag(
        @click.prevent="zoom('in')") Acercar
</template>

<script>
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'UploadPhoto',
  data () {
    return {
      image: null,
      imageURL: null,
      toggleImage: false
    }
  },
  props: ['initialImage', 'errorLog'],
  methods: {
    updateImg () {
      this.$emit('input', this.image.imageSet ? this.image : undefined)
    },
    zoom: function (direction) {
      let image = this.image
      direction === 'in' ? image.zoomIn() : image.zoomOut()
    },
    handleZoom: function (action, image, direction) {
      if (action === 'set') {
        window.zoomEvent = window.setTimeout(this.zoom(image, direction), 200)
      } else {
        window.clearTimeout(window.zoomEvent)
      }
    },
    handleMainImage: function () {
      if (this.image.hasImage()) {
        this.toggleImage = true
        this.imageURL = this.image.generateDataUrl()
      }
    },
    addImage: function () {
      if (this.image.hasImage()) {
        this.handleMainImage()
      }
      this.toggleImage = true
      this.updateImg()
    },
    removeImage: function () {
      this.toggleImage = false
      this.image.remove()
      this.toggleImage = false
      this.updateImg()
    }
  }
}
</script>
