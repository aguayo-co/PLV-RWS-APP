import { mapState } from 'vuex'
import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'
import CompraPagada from '@/components/CompraPagada'
import CompraPagando from '@/components/CompraPagando'

export default {
  name: 'Compra',
  props: ['id'],
  components: {
    CompraEnvioPago,
    CompraDetalle,
    CompraPagada,
    CompraPagando
  },
  computed: {
    ...mapState('cart', [
      'total',
      'status',
      'payment_status'
    ]),
    isShoppingCart () {
      return this.status === 10
    },
    isPayment () {
      return this.status === 20 && this.payment_status !== 1
    },
    isPayed () {
      return this.status === 30 || this.payment_status === 1
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
