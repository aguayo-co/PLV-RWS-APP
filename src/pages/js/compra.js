import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'

export default {
  name: 'Compra',
  components: {
    CompraEnvioPago,
    CompraDetalle
  },
  created: function () {
    this.$store.dispatch('cart/load')
  }
}
