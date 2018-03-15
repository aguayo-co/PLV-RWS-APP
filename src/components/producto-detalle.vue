<template lang="pug">
.layout-inner
  .grid-detail
    .grid-detail__gallery
      .grid-detail__wrapper
        //slider
        // swiper1
        swiper.gallery-main(
          :options='swiperOptionTop',
          ref='swiperTop')
          swiper-slide.slide-1.gallery__img(
            v-for='(image,index) in product.images'
            :key='index')
            img(:src='image', alt='')
          .swiper-pagination(slot='pagination')
        // swiper2 Thumbs
        swiper.gallery-thumb(
          :options='swiperOptionThumbs',
          ref='swiperThumbs')
          swiper-slide.slide-1(
            v-for='(image,index) in product.images'
            :key='index')
            img(:src='image', alt='')
    .detail-content
      header.detail-content__header
        h1.detail-content__title {{ product.title }}
      .detail-content__group
        span.detail-content__label Producto {{ product.condition.name }}
        p.detail-content__brand {{ product.brand.name }}
        p.detail-content__size Talla: {{ product.dimensions }} | Colores: {{ product.colors[0].name }}
        p.detail-content__price_old {{ product.original_price }}
        p.detail-content__price ${{ product.price }}
        .detail-content__actions
          a.btn.btn_solid(
            href="#") Comprar
          a.btn.i-heart(
            href="#") Agregar a Favoritos
      p.detail-content__subtitle Descripción
      p.detail-content__txt {{ product.description }}
      p.detail-content__subtitle Despacho
      p.detail-content__txt.i-ok
        |Envíos a todo Chile <small class="detail-content__txt-small"> Mediante Chile-express o Correos de Chile</small>
      p.detail-content__txt.i-ok Coordinar entrega con vendedora en Viña
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'ProductoDetalle',
  components: {
    swiper,
    swiperSlide
  },
  props: ['product'],
  data () {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 4
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        direction: 'vertical',
        autoHeight: true,
        touchRatio: 1,
        loop: false,
        loopedSlides: 4,
        slideToClickedSlide: true
      }
    }
  },
  mounted () {
    const swiperTop = this.$refs.swiperTop.swiper
    const swiperThumbs = this.$refs.swiperThumbs.swiper
    swiperTop.controller.control = swiperThumbs
    swiperThumbs.controller.control = swiperTop
  }
}
</script>
