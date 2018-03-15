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
      p.detail-content__title {{ product.title }}
      span.detail-content__label Prenda usada
      h3.detail-content__brand {{ product.brand.name }}
      p.detail-content__size Talla: {{ product.dimensions }} | Color: {{ product.colors["0"].name }}
      p.detail-content__price_old {{ product.original_price }}
      p.detail-content__price {{ product.price }}
      a.btn.btn_solid Comprar
      a.btn.i-heart Agregar a Favoritos
      p.detail-content__subtitle Descripción
      p.detail-content__txt {{ product.description }}
      p.detail-content__subtitle Despacho
      p.detail-content__txt.i-ok Envíos a todo Chile
        span.detail-content__txt.detail-content__txt_small Mediante Chile-express o Correos de Chile
      p.detail-content__txt.i-ok Coordinar entrega con vendedora en Viña
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
export default {
  name: 'ProductoDetalle',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5,
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
        loopedSlides: 5,
        slideToClickedSlide: true
      },
      product: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  async created () {
    await axios.get('https://prilov.aguayo.co/api/products/3', {
    })
      .then(response => {
        console.log(response)
        this.product = response.data
        // this.nameFooter = response.data.items[3].name
      })
      .catch(e => {
        console.log('ERROR : ' + e)
      })
  }
}
</script>
