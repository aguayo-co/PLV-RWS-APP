<template lang="pug">
.layout-page
  .blog
    BannerTop
    Blogbanner
    BlogSide
    BlogbannerProm
    h4.blog__subhead Marcas disponibles en Prilov
    ul
      li Adidas
      li Asos
        ul
          li 020
          li Vestidos
            ul
              li Vestidos cortos
      li Converse
      li Forever 21
      li Foster
    h4.blog__subhead Las prendas más vendidas en Prilov
    ol
      li Chaquetas
      li Vestidos
      li Vestidos cortos
      li Pantalones
      li Zapatos
      li Chaquetas
      li Vestidos
      li Vestidos cortos
      li Pantalones
      li Zapatos

</template>

<script>
import BannerTop from '@/components/BannerTop'
import Blogbanner from '@/components/Blogbanner'
import BlogbannerProm from '@/components/BlogbannerProm'
import BlogSide from '@/components/BlogSide'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BlogbannerProm,
    Blogbanner,
    BlogSide
  }
}

</script>
