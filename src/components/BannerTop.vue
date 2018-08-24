<template lang="pug">
.layout-inner
  //- banner promociones
  //- TO-DO: consumir servicios
  .banner-top
    .banner-top__item(
      v-for='banner in banners')
      a.banner-top__lead(
        :href='banner.url',
        :title='banner.title')
        p.banner-top__title {{ banner.title }}
        p.banner-top__subtitle
          |{{ banner.subtitle }} <span class="link_underline" v-if="banner.button_text">{{ banner.button_text }}</span>
</template>

<script>
import bannersAPI from '@/api/banner'
export default {
  name: 'BannerTop',
  data () {
    return {
      banners: []
    }
  },
  created () {
    const filters = {
      'filter[slug]': 'top-%'
    }
    bannersAPI.get(filters)
      .then(response => {
        if (response.data.data.length <= 3) {
          this.banners = response.data.data
          return
        }
        this.banners = response.data.data.sort(() => 0.5 - Math.random()).slice(0, 3)
      })
  }
}
</script>
