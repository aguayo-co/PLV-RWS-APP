<template lang="pug">
.layout-page
  section.section_product
    BannerHero
    GridProducto(:infinite='true')
</template>

<script>
import GridProducto from '@/components/GridProducto'
import BannerHero from '@/components/BannerHero'

export default {
  name: 'Category',
  components: {
    BannerHero,
    GridProducto
  }
}
</script>
