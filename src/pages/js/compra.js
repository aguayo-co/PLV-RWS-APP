import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'

export default {
  name: 'Compra',
  props: ['id'],
  components: {
    CompraEnvioPago,
    CompraDetalle
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
