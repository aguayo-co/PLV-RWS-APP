<template lang="pug">
  //- banner promociones grid
  //- TO-DO: consumir servicios
  .banner-grid
    article.banner(
      v-for='banner in banners')
      a.banner__item(
        :href='banner.url',
        :title='banner.button_text')
        .banner__content(
          v-if="mqSmallMax")
          .banner__lead
            h3.banner__title.title_line {{ banner.title }}
            p.banner__txt {{ banner.subtitle }}
        .banner__figure
          img.banner__img(
            :src='banner.image',
            :alt='banner.title')
        .banner__content
          .banner__lead(
            v-if="mqSmall")
            h3.banner__title.title_line {{ banner.title }}
            p.banner__txt {{ banner.subtitle }}
          .banner__foot(
            v-if="banner.button_text")
            span.btn {{ banner.button_text }}

</template>

<script>
import bannersAPI from '@/api/banner'
export default {
  name: 'BannerGrid',
  data () {
    return {
      banners: []
    }
  },
  created () {
    const filters = {
      'filter[slug]': 'home-%',
      'items': '3'
    }
    bannersAPI.get(filters)
      .then(response => {
        this.banners = response.data.data
      })
  }
}
</script>
