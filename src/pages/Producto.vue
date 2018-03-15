<template lang="pug">
.layout-page
  ProductoDetalle(:product='product')
  ProductUser(:user='user')
  SliderProducto
</template>

<script>
import axios from 'axios'
import ProductoDetalle from '@/components/producto-detalle'
import ProductUser from '@/components/ProductUser'
import SliderProducto from '@/components/slider-producto'

export default {
  name: 'Producto',
  components: {
    ProductoDetalle,
    ProductUser,
    SliderProducto
  },
  data () {
    return {
      product: {},
      user: {}
    }
  },
  created () {
    axios.get('https://prilov.aguayo.co/api/products?filter[slug]=' + this.$route.params.slug, {
    })
      .then(response => {
        this.product = response.data.data[0]
        axios.get('https://prilov.aguayo.co/api/users/' + this.product.user_id, {
        })
          .then(response => {
            this.user = response.data
          })
          .catch(e => {
            console.log('ERROR : ' + e)
          })
      })
      .catch(e => {
        console.log('ERROR : ' + e)
      })
  }
}
</script>
