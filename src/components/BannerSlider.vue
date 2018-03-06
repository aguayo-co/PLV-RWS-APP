<template lang="pug">
  .banner-slider
    swiper(:options='swiperOption')
      swiper-slide Slide 1
      swiper-slide Slide 2
      swiper-slide Slide 3
      swiper-slide Slide 4
      swiper-slide Slide 5
      swiper-slide Slide 6
      swiper-slide Slide 7
      swiper-slide Slide 8
      swiper-slide Slide 9
      swiper-slide Slide 10
      .swiper-pagination(slot='pagination')
</template>

<script>
export default {
  name: 'BannerSlider',
  data () {
    return {
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
