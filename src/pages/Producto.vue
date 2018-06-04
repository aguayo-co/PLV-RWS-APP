 <template lang="pug">
.layout-page
  ProductoDetalle(:product="product")
  ProductoUser(v-if="user.id", :user="user")
  ProductoPreguntas(:product_id="product.id", :owner_id="user.id")
  ProductoSlider(
    v-if="product.category_id && product.id",
    :category_id="product.category_id",
    :product_id="product.id")
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
  watch: {
    '$route.params': function () {
      this.loadProduct()
    }
  },
  computed: {
    productId () {
      return this.$route.params.slug.split('__')[1]
    }
  },
  data () {
    return {
      product: {},
      user: {}
    }
  },
  methods: {
    loadProduct: function () {
      productsAPI.getProductById(this.productId)
        .then(response => {
          this.product = response.data
          this.user = this.product.user
        })
        .catch(e => {
          console.log('ERROR : ' + e)
        })
    }
  },
  created () {
    this.loadProduct()
  }
}
</script>
