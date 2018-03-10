<template lang="pug">
.banner-slider
  flickity.banner-slider__container(:options='flickityOptions')
    .banner-slider__cell(v-for='slide in slides')
      .banner-slider__slide
        .banner-slider__slot(:class='slide.orientation')
          .banner-slider__position
            h3(:class='slide.font_color').banner-slider__title {{ slide.texto_principal }}
            a.banner-slider__btn.btn(:href='slide.url',) Promo Code:
              span.banner-slider__code {{ slide.button_text }}
            span.banner-slider__copy {{ slide.texto_pequeño }}
        picture.banner-slider__crop
          source.banner-slider__img(media='(max-width: 640px)', :srcset='slide.image_mobile')
          img.banner-slider__img(:src='slide.image')
</template>

<script>
import Flickity from 'vue-flickity'

export default {
  name: 'BannerSlider',
  components: {
    Flickity
  },
  data () {
    return {
      slides: [
        {
          title: '',
          priority: 1,
          name: '',
          slug: '',
          image: '/static/img/demo/banner-slider1.jpg',
          image_mobile: '/static/img/demo/banner-slider-m1.jpg',
          url: '#',
          texto_principal: 'Te regalamos en tu primera compra',
          texto_pequeño: '**Oferta válida hasta el 31 de enero de 2018',
          button_text: 'primeracompra',
          orientation: 'left',
          font_color: 'bg_white'
        },
        {
          title: '',
          priority: 2,
          name: '',
          slug: '',
          image: '/static/img/demo/banner-slider2.jpg',
          image_mobile: '/static/img/demo/banner-slider-m2.jpg',
          url: '#',
          texto_principal: 'Te regalamos en tu primera compra',
          texto_pequeño: '**Oferta válida hasta el 16 de marzo de 2018',
          button_text: 'comprasegura',
          orientation: 'right',
          font_color: 'bg_black'
        }
      ],
      flickityOptions: {
        contain: true,
        cellAlign: 'left',
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        cellSelector: '.banner-slider__cell',
        imagesLoaded: true,
        resize: true,
        adaptiveHeight: true
        // any options from Flickity can be used
      }
    }
  }
}
</script>
