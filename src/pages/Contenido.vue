<template lang="pug">
.layout-page
  .blog
    BannerTop
    Blogbanner
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
