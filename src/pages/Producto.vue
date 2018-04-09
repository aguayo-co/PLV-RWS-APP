 <template lang="pug">
.layout-page
  ProductoDetalle(:product='product')
  ProductoPack(:product='product')
  ProductoUser(:user='user')
  ProductoSlider
</template>

<script>
import axios from 'axios'
import ProductoDetalle from '@/components/ProductoDetalle'
import ProductoPack from '@/components/ProductoPack'
import ProductoUser from '@/components/ProductoUser'
import ProductoSlider from '@/components/ProductoSlider'

export default {
  name: 'Producto',
  components: {
    ProductoDetalle,
    ProductoPack,
    ProductoUser,
    ProductoSlider
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
