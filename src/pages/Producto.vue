<template lang="pug">
.layout-page
  ProductoDetalle
  ProductUser
  SliderProducto
</template>

<script>

import ProductoDetalle from '@/components/producto-detalle'
import ProductUser from '@/components/ProductUser'
import SliderProducto from '@/components/slider-producto'

export default {
  name: 'Producto',
  components: {
    ProductoDetalle,
    ProductUser,
    SliderProducto
  }
}
</script>
