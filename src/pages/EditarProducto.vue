<template lang="pug">
  FieldsFormProduct(
    update
    titleMain= 'Edita la información de tu producto',
    titleSubhead= 'Unas buenas fotos dicen más que mil palabras'
    )
</template>

<script>
import FieldsFormProduct from '../components/FieldsFormProduct'

export default {
  name: 'EditarProducto',
  components: {
    FieldsFormProduct
  }
}
</script>
