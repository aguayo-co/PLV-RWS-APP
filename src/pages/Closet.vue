<template lang="pug">
.layout-page
  BannerAvatar
  section.section_product
    p.txt-block Co-Founder at Prilov.com. Llegué a Santiago luego de vivir en Londres por algunos años y volví llena de ropa que no cabe en mi clóset. Acá encuentran todo lo que ya no uso. Entrego en metro Escuela Militar y Los Dominicos. Envíos son por pagar por Correos.
    GridProducto(
      :infinite='true')
</template>

<script>
import BannerAvatar from '@/components/BannerAvatar'
import GridProducto from '@/components/GridProducto'

export default {
  name: 'Closet',
  components: {
    BannerAvatar,
    GridProducto
  }
}
</script>
