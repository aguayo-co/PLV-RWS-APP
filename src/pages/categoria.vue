<template lang="pug">
.layout-page
  section.section_product
    // Aquí debe ir el banner de category
    GridProducto(:infinite='true')
</template>

<script>
import GridProducto from '@/components/GridProducto'

export default {
  name: 'Category',
  components: {
    GridProducto
  }
}
</script>
