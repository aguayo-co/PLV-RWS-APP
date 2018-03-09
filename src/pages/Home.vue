<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  BannerGrid
  .layout-band
    section.section_slider
      header.section__head
        h2.title_head Prilovers <span class="txt_brand">We Love</span>
        h3.title_subhead Mueve tu closet y forma parte de la comunidad más grande
      SliderPrilovers

  .layout-inner
    section.section_product
      header.section__head.section__head_big
        h2.title_head <span class="txt_brand">Im</span>perdibles
        h3.title_subhead Lo que más nos gusta de Prilov
      ProductGrid

</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import BannerGrid from '@/components/BannerGrid'
import SliderPrilovers from '@/components/SliderPrilovers'
import ProductGrid from '@/components/ProductGrid'

export default {
  name: 'Home',
  components: {
    BannerTop,
    BannerSlider,
    BannerGrid,
    SliderPrilovers,
    ProductGrid
  }
}
</script>
