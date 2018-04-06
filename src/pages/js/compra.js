import { mapState } from 'vuex'
import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'

export default {
  name: 'Compra',
  props: ['id'],
  components: {
    CompraEnvioPago,
    CompraDetalle
  },
  computed: {
    ...mapState('cart', [
      'status'
    ]),
    isShoppingCart () {
      return this.status === 10
    },
    isPayment () {
      return this.status === 20
    },
    isPayed () {
      return this.status === 30
    }
  },
  created: function () {
    this.$store.dispatch('cart/load', this.id)
  },
  watch: {
    '$route' (to, from) {
      this.$store.commit('cart/clear')
      this.$store.dispatch('cart/load', to.params.id)
    }
  }
}
