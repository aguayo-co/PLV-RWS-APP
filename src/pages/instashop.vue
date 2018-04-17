<template lang="pug">
.layout-page
  BannerTop
  .section_product
    GridInstashop
</template>

<script>
import BannerTop from '@/components/BannerTop'
import GridInstashop from '@/components/GridInstashop'

export default {
  name: 'instashop',
  components: {
    BannerTop,
    GridInstashop
  }
}
</script>
