<template lang="pug">
.layout-page
  BannerTop
  Blogbanner
  BlogbannerProm

</template>

<script>
import BannerTop from '@/components/BannerTop'
import Blogbanner from '@/components/Blogbanner'
import BlogbannerProm from '@/components/BlogbannerProm'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BlogbannerProm,
    Blogbanner
  }
}

</script>
