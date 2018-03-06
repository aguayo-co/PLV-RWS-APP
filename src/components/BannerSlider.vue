<template lang="pug">
  .banner-slider
    div(v-swiper:myswiper='swiperOption')
      .swiper-wrapper
        .swiper-slide(v-for='banner in banners')
          img(:src='banner')
      .swiper-pagination.swiper-pagination-bullets
</template>

<script>
export default {
  name: 'BannerSlider'
}
</script>
