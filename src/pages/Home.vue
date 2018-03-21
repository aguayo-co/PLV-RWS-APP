<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  BannerGrid
  .layout-band
    section.layout-inner_out
      header.section__head
        h2.title_head Prilovers <span class="txt_brand">We Love</span>
        h3.title_subhead(
          v-if="mqTablet") Mueve tu closet y forma parte de la comunidad más grande
      PriloversSlider

  section.section_product
    header.section__head.section__head_big
      h2.title_head <span class="txt_brand">Im</span>perdibles
      h3.title_subhead Lo que más nos gusta de Prilov

    ProductoGrid

    p.section_product__footer(
        v-if="mqTablet")
      span.btn__wrapper
        a.btn.i-send(href="") Ver más prendas
</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import BannerGrid from '@/components/BannerGrid'
import PriloversSlider from '@/components/PriloversSlider'
import ProductoGrid from '@/components/ProductoGrid'

export default {
  name: 'Home',
  components: {
    BannerTop,
    BannerSlider,
    BannerGrid,
    PriloversSlider,
    ProductoGrid
  }
}
</script>
