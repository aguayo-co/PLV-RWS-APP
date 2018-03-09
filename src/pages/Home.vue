<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  BannerGrid
  ProductGrid

</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import BannerGrid from '@/components/BannerGrid'
import ProductGrid from '@/components/ProductGrid'

export default {
  name: 'Home',
  components: {
    BannerTop,
    BannerSlider,
    BannerGrid,
    ProductGrid
  }
}
</script>
