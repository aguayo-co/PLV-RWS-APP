 <template lang="pug">
.layout-page
  ProductoDetalle(:product="product")
  ProductoUser(:user="user")
  ProductoPreguntas(:product_id="product.id", :owner_id="user.id")
  ProductoSlider
</template>

<script>
import ProductoDetalle from '@/components/ProductoDetalle'
import ProductoPack from '@/components/ProductoPack'
import ProductoUser from '@/components/ProductoUser'
import ProductoPreguntas from '@/components/ProductoPreguntas'
import ProductoSlider from '@/components/ProductoSlider'
import productsAPI from '@/api/product'

export default {
  name: 'Producto',
  components: {
    ProductoDetalle,
    ProductoPack,
    ProductoUser,
    ProductoPreguntas,
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
