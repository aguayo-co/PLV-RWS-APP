<template lang="pug">
.layout-page
  BannerTop
  section.section_product.prod-gridlight
    header.section__head
      h1.title_head
        span.txt_brand Insta
        | shop
      h2.title_subhead Encuentra TODO lo que publicamos en nuestro Instagram @prilovchile y cómpralo directamente
    .filtrate-box
      .filtrate__row.i-search
        input.filtrate__input#searchMain(
          type='text',
          name='search',
          placeholder="Buscar")
    GridInstashop
</template>

<script>
import BannerTop from '@/components/BannerTop'
import GridInstashop from '@/components/GridInstashop'

export default {
  name: 'Instashop',
  components: {
    BannerTop,
    GridInstashop
  }
}
</script>
