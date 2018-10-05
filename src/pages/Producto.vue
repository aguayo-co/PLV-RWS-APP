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
  .layout-inner(v-else)
    .alert-msg.alert-msg_center
      p ¡Ups! Este producto ya no se encuentra disponible en Prilov.
    .alert-msg_spacing
      router-link.btn.btn_solid(
        :to="{ name: 'productos' }",
        title="Ir a Vitinear") Volver al Shop
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
  props: ['slug'],
  components: {
    ProductoDetalle,
    ProductoPack,
    ProductoUser,
    ProductoPreguntas,
    ProductoSlider
  },
  watch: {
    '$route.params' () {
      this.loadProduct()
    }
  },
  computed: {
    productId () {
      const parts = this.slug.split('__')
      return parts[parts.length - 1]
    }
  },
  data () {
    return {
      loading: null,
      product: null
    }
  },
  methods: {
    validateUrl () {
      if (this.slug !== this.product.slug + '__' + this.product.id) {
        this.$router.push({
          params: {
            slug: this.product.slug + '__' + this.product.id
          }
        })
      }
    },
    loadProduct () {
      const localRequest = this.loading = productsAPI.getProductById(this.productId)
        .then(response => {
          if (localRequest === this.loading) {
            this.product = response.data
            this.validateUrl()
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
