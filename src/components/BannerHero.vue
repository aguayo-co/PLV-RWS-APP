<template lang="pug">
.banner-hero
  .banner-hero__slot
    .banner-hero__head
      h3.banner-hero__title(v-if="banner.title") {{ banner.title }}
      h4.banner-hero__subtitle(v-if="banner.subtitle") {{ banner.subtitle }}
    .banner-hero__main
      a.banner-hero__btn.btn(v-if="banner.url" :href="banner.url") {{ banner.button_text }}
  //- .user-cover-edit
  .banner-hero__illustration
    //- .cover
    .banner-hero__inner
      //- .cover__banner
      .banner-hero__picture
        //- .cover__picture
        img.banner-hero__img(:src='banner.image')
  //- picture.banner-hero__crop
  //-   source.banner-hero__img(media='(max-width: 640px)', :srcset='banner.image')
  //-   img.banner-slider__img(:src='banner.image')
</template>

<script>

export default {
  name: 'BannerHero',
  props: ['banner']
}
</script>
