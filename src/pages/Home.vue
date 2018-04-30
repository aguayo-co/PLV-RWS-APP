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
          v-if="mqTablet") ¡Únete a la comunidad más cool de clósets!
      PriloversSlider

  section.section_product
    header.section__head.section__head_big
      h2.title_head <span class="txt_brand">Im</span>perdibles
      h3.title_subhead Lo que más nos gusta de Prilov

    GridProducto(
      :infinite='true')
  ButtonSticky
</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'
import BannerGrid from '@/components/BannerGrid'
import PriloversSlider from '@/components/PriloversSlider'
import GridProducto from '@/components/GridProducto'
import ButtonSticky from '@/components/ButtonSticky'

export default {
  name: 'Home',
  components: {
    BannerTop,
    BannerSlider,
    BannerGrid,
    PriloversSlider,
    GridProducto,
    ButtonSticky
  }
}
</script>
