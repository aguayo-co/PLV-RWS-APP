<template lang="pug">
.layout-page
  ProductoDetalle
  SliderProducto
</template>

<script>

import ProductoDetalle from '@/components/producto-detalle'
import SliderProducto from '@/components/slider-producto'

export default {
  name: 'Producto',
  components: {
    ProductoDetalle,
    SliderProducto
  }
}
</script>
