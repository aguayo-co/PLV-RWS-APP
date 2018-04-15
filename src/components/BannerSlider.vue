<template lang="pug">
.banner-slider
  flickity.banner-slider__container(:options='flickityOptions')
    .banner-slider__cell(v-for='slide in slides')
      .banner-slider__slide
        .banner-slider__slot(:class='slide.orientation')
          .banner-slider__position
            h3(:class='slide.font_color').banner-slider__title {{ slide.main_text }}
            a.banner-slider__btn.btn(:href='slide.url') {{ slide.button_text }}
            span.banner-slider__copy {{ slide.small_text }}
        picture.banner-slider__crop
          source.banner-slider__img(v-if="slide.image_mobile" media='(max-width: 640px)', :srcset='slide.image_mobile')
          img.banner-slider__img(:src='slide.image')
</template>

<script>
import slidersAPI from '@/api/slider'
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
  created: async function() {
    slidersAPI.getAllSlides()
      .then(response => {
        this.slides = response.data.data
      })
  }
}
</script>
