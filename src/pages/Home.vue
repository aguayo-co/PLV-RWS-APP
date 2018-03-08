<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  .layout-inner

</template>

<script>
import BannerSlider from '@/components/BannerSlider'
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Home',
  components: {
    BannerTop,
    BannerSlider
  }
}
</script>
