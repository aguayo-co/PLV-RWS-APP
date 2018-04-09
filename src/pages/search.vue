<template lang="pug">
.layout-page
  section.section_product
    .alert
      p.alert__txt.i-sad Lo sentimos, pero no tenemos Resultados para 'wajfnwefawefqw'
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
