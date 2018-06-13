<template lang="pug">
.layout-page
  BannerTop
  section.section_product.prod-gridlight
    header.section__head
      h1.title_head
        span.txt_brand Insta
        | shop
      h2.title_subhead Encuentra TODO lo que publicamos en nuestro Instagram @prilovchile y cómpralo directamente
    GridInstashop(
      :preFilter='filter',
      :infinite='true')
  ButtonSticky
</template>

<script>
import BannerTop from '@/components/BannerTop'
import GridInstashop from '@/components/GridInstashop'
import ButtonSticky from '@/components/ButtonSticky'

export default {
  name: 'Instashop',
  components: {
    BannerTop,
    GridInstashop,
    ButtonSticky
  },
  data () {
    return {
      filter: { 'filter[campaign_ids]': 1 }
    }
  }
}
</script>
