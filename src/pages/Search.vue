<template lang="pug">
.layout-page
  section.section_product
    .alert
      p.alert__txt.i-sad Lo sentimos, pero no tenemos resultados para 'wajfnwefawefqw'
    .filter-head
      h3.filter-head__title 27 Resultados para Chalecos
    GridProducto(:infinite='true')
</template>

<script>
import GridProducto from '@/components/GridProducto'

export default {
  name: 'search',
  components: {
    GridProducto
  }
}
</script>
