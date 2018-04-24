<template lang="pug">
.banner-slider
  flickity.banner-slider__container(v-if="slides[0]",
    :options='flickityOptions')
    .banner-slider__cell(v-for='slide in slides')
      .banner-slider__slide
        .banner-slider__slot(:class='slide.orientation')
          .banner-slider__position
            h3(v-if="slide.main_text", :class='slide.font_color').banner-slider__title {{ slide.main_text }}
            a.banner-slider__btn.btn(v-if="slide.button_text", :href='slide.url') {{ slide.button_text }}
            span.banner-slider__copy(v-if="slide.small_text") {{ slide.small_text }}
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
      slides: [],
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
        console.log(this.slides)
      })
  }
}
</script>
