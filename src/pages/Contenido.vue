<template lang="pug">
.layout-page
  BannerTop
  .banner-hero
    .banner-hero__slot.banner-hero__slot_short
      .banner-hero__head.left
        h3.banner-hero__caption Te regalamos en tu primera compra
    picture.banner-hero__crop
      source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/demo/banner-blog-m.jpg')
      img.banner-slider__img(src='static/img/demo/banner-blog.jpg')

</template>

<script>
import slidersAPI from '@/api/slider'
import Flickity from 'vue-flickity'
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import Filtrate from '@/components/Filtrate'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BannerSlider,
    Filtrate,
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
          texto_principal: ' ',
          texto_pequeño: ' ',
          button_text: ' ',
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
          texto_principal: ' ',
          texto_pequeño: ' ',
          button_text: ' ',
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
  },
  created: async function () {
    slidersAPI.getAllSlides()
      .then(response => {
        this.slides = response.data.data
      })
  }
}

</script>
