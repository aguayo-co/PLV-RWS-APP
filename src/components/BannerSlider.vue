<template lang="pug">
.banner-slider(
    v-if="slides[0]")
  flickity.banner-slider__container(
    ref="flickity",
    v-images-loaded="imagesLoaded"
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
            source.banner-slider__img(v-if="slide.image_mobile" media='(max-width: 640px)', :srcset='slide.image_mobile')
            img.banner-slider__img(:src='slide.image')
</template>

<script>
import slidersAPI from '@/api/slider'
import Flickity from 'vue-flickity'
import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'BannerSlider',
  directives: { imagesLoaded },
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
        // cellSelector: '.banner-slider__cell',
        cellSelector: '.banner-slider__item',
        imagesLoaded: true,
        lazyLoad: 1,
        resize: true,
        adaptiveHeight: true
        // any options from Flickity can be used
      }
    }
  },
  methods: {
    imagesLoaded: function (instance) {
      let flickityInstance = this.$refs.flickity
      flickityInstance.reloadCells()
    }
  },
  created: function () {
    slidersAPI.getAllSlides()
      .then(response => {
        this.slides = response.data.data
      })
  }
}
</script>
