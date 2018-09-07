<template lang="pug">
.banner-slider(
  v-if="slides && slides.length")
  flickity.banner-slider__container(
    ref="flickity",
    :options='flickityOptions')
    //- .banner-slider__cell(v-for='slide in slides')
    .banner-slider__item(
      v-for='slide in slides')
      a.banner-slider__link(:href='slide.url')
        .banner-slider__slide
          .banner-slider__slot(:class='slide.orientation')
            .banner-slider__position
              h3(v-if="slide.main_text", :class='slide.font_color').banner-slider__title {{ slide.main_text }}
              span.banner-slider__btn.btn(v-if="slide.button_text") {{ slide.button_text }}
              span.banner-slider__copy(v-if="slide.small_text") {{ slide.small_text }}
          //- picture.banner-slider__crop
          picture.banner-slider__picture
            img.banner-slider__img(:data-flickity-lazyload-src='mqMobile && slide.image_mobile ? slide.image_mobile : slide.image')
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
      slides: [],
      flickityOptions: {
        contain: true,
        autoPlay: true,
        cellAlign: 'left',
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        cellSelector: '.banner-slider__item',
        imagesLoaded: true,
        lazyLoad: 1
        // any options from Flickity can be used
      }
    }
  },
  created: function () {
    slidersAPI.getActiveSlides()
      .then(response => {
        this.slides = response.data.data
      })
  }
}
</script>
