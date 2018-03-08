<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  BannerGrid
  .layout-inner

</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import BannerGrid from '@/components/BannerGrid'

export default {
  name: 'Home',
  components: {
    BannerTop,
    BannerSlider,
    BannerGrid
  }
}
</script>
