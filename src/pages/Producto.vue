 <template lang="pug">
.layout-page
  ProductoDetalle(:product='product')
  ProductoUser(:user='user')
  ProductoNotificaciones
  ProductoSlider
</template>

<script>
import ProductoDetalle from '@/components/ProductoDetalle'
import ProductoPack from '@/components/ProductoPack'
import ProductoUser from '@/components/ProductoUser'
import ProductoNotificaciones from '@/components/ProductoNotificaciones'
import ProductoSlider from '@/components/ProductoSlider'
import productsAPI from '@/api/product'

export default {
  name: 'Producto',
  components: {
    ProductoDetalle,
    ProductoPack,
    ProductoUser,
    ProductoNotificaciones,
    ProductoSlider
  },
  data () {
    return {
      product: {},
      user: {}
    }
  },
  created () {
    let id = this.$route.params.slug.split('__')[1]
    productsAPI.getProductById(id)
      .then(response => {
        this.product = response.data.data[0]
        this.user = this.product.user
      })
      .catch(e => {
        console.log('ERROR : ' + e)
      })
  }
}
</script>
