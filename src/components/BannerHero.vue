<template lang="pug">
.banner-hero
  .banner-hero__slot
    .banner-hero__head
      h3.banner-hero__title {{ banner.title }}
      h4.banner-hero__subtitle {{ banner.subtitle }}
    .banner-hero__main
      a.banner-hero__btn.btn(:href="banner.url") {{ banner.button_text }}
  picture.banner-hero__crop
    source.banner-hero__img(media='(max-width: 640px)', :srcset='banner.image')
    img.banner-slider__img(:src='banner.image')
</template>

<script>

export default {
  name: 'BannerHero',
  props: ['banner']
}
</script>
