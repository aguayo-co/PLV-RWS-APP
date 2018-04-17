<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  .layout-inner
    form.nav__search(action='', method='GET')
      .nav__search-row.i-search
        input.nav__search-input#searchMain(type='text', name='search')
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
