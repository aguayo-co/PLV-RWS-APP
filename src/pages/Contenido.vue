<template lang="pug">
.layout-page
  BannerTop
  Blogbanner

</template>

<script>
import BannerTop from '@/components/BannerTop'
import Blogbanner from '@/components/Blogbanner'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    Blogbanner
  }
}

</script>
