<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  .layout-inner
    form.nav-search(action='', method='GET')
      .nav-search__row.i-search
        input.nav-search__input#searchMain(type='text', name='search')
</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BannerSlider
  }
}
</script>
