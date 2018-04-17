<template lang="pug">
.layout-page
  BannerTop
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
