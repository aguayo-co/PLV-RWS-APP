<template lang="pug">
  FieldsFormProduct(
    create,
    titleMain = 'Publicar una venta',
    titleSubhead = '¿No lo usas?, ¡Véndelo!')
</template>

<script>
import FieldsFormProduct from '../components/FieldsFormProduct'

export default {
  name: 'FormPublicarVenta',
  components: {
    FieldsFormProduct
  }
}
</script>
