<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  .layout-inner
    Filtrate(
      :search="true",
      :order="true")

</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import Filtrate from '@/components/Filtrate'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BannerSlider,
    Filtrate
  }
}
</script>
