<template lang="pug">
  FieldsFormProduct(
    create = 'true',
    titleMain = 'Publicar un producto',
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
