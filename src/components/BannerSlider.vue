<template lang="pug">
.banner-slider
  swiper.banner-slider__container(:options='swiperOption')
    swiper-slide.banner-slider__slide(v-for='slide in slides')
      .banner-slider__slot
        h2.bg_white.banner-slider__title &nbsp;Te regalamos en tu primera compra&nbsp;
        a.banner-slider__btn.btn Promo Code:
          span.banner-slider__code Primera Compra
        span.banner-slider__copy **Oferta válida hasta el 31 de enero del 2018
      img.banner-slider__img(:src='slide.path')
  .swiper-pagination
</template>

<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

export default {
  name: 'BannerSlider',
  components: {
    VueAwesomeSwiper
  },
  data () {
    return {
      slides: [
        { path: '/static/img/demo/banner-slider1.png' },

        { path: '/static/img/demo/banner-slider2.png' },

        { path: '/static/img/demo/banner-slider3.png' }
      ],
      swiperOption: {

        pagination: {

          el: '.swiper-pagination'

        }
      }
    }
  }
}
</script>
