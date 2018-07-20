 <template lang="pug">
.layout-page
  Loader(v-if="loading")
  template(v-else-if="product")
    ProductoDetalle(:product="product")
    ProductoUser(:user="product.user")
    ProductoPreguntas(:product_id="product.id", :owner_id="product.user.id")
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
      loading: null,
      product: null
    }
  },
  methods: {
    loadProduct: function () {
      const localRequest = this.loading = productsAPI.getProductById(this.productId)
        .then(response => {
          if (localRequest === this.loading) {
            this.product = response.data
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.loadProduct()
  }
}
</script>
