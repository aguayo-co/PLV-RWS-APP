<template lang="pug">
.layout-inner
  .grid-detail
    .grid-detail__gallery
      .grid-detail__wrapper
        //slider
        // swiper1
        swiper.gallery-main(:options='swiperOptionTop', ref='swiperTop')
          swiper-slide.slide-1.gallery__img
            img(src="/static/img/demo/producto/mochila-dorada.jpg", alt="")
          swiper-slide.slide-2.gallery__img
            img(src="/static/img/demo/producto/mochila-dorada-002.jpg", alt="")
          swiper-slide.slide-3.gallery__img
            img(src="/static/img/demo/producto/mochila-dorada-003.jpg", alt="")
          swiper-slide.slide-4.gallery__img
            img(src="/static/img/demo/producto/mochila-dorada-004.jpg", alt="")
          .swiper-pagination(slot='pagination')
        // swiper2 Thumbs
        swiper.gallery-thumb(:options='swiperOptionThumbs', ref='swiperThumbs')
          swiper-slide.slide-1
            img(src="/static/img/demo/producto/mochila-dorada.jpg", alt="")
          swiper-slide.slide-2
            img(src="/static/img/demo/producto/mochila-dorada-002.jpg", alt="")
          swiper-slide.slide-3
            img(src="/static/img/demo/producto/mochila-dorada-003.jpg", alt="")
          swiper-slide.slide-4
            img(src="/static/img/demo/producto/mochila-dorada-004.jpg", alt="")
    .detail-content
      p.detail-content__title Sandalias de Cuero y Tachas Saville Row
      span.detail-content__label Prenda usada
      h3.detail-content__brand Straadivaruois & Zara Home Juntos
      p.detail-content__size Talla: S | Color: Blanco
      p.detail-content__price_old $70.000
      p.detail-content__price $40.000
      a.btn.btn_solid Comprar
      a.btn.i-heart Agregar a Favoritos
      p.detail-content__subtitle Descripción
      p.detail-content__txt Sweater peludo manga larga talla S. Es COOOOMODISIMO, el típico que usas para TODO. Calientito. Color crudo. Lo compre por ASOS.
      p.detail-content__subtitle Despacho
      p.detail-content__txt.i-ok Envíos a todo Chile
        span.detail-content__txt.detail-content__txt_small Mediante Chile-express o Correos de Chile
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
  data () {
    return {
      // swiperOptionTop: {
      //   spaceBetween: 0,
      //   loop: true,
      //   loopedSlides: 4,
      //   pagination: {
      //     el: '.swiper-pagination',
      //     dynamicBullets: true
      //   }
      // },
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        direction: 'vertical',
        autoHeight: true,
        touchRatio: 1,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
      }
    }
  },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
}
</script>
<style scoped>
  .swiper-container {
    padding-top: 50px;
  }
  .gallery-main {
    width: 100%;
  }
  .gallery-thumb {
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumb .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumb .swiper-slide-active {
    opacity: 1;
  }

  .gallery-thumb .swiper-slide img {
    width: 100%;
    max-width: 85px;
  }
</style>
