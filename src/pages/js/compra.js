import { mapState } from 'vuex'
import CompraCarro from '@/components/CompraCarro'
import CompraEnvioPago from '@/components/CompraEnvioPago'

export default {
  name: 'Compra',
  components: {
    CompraCarro,
    CompraEnvioPago
  },
  created: function () {
    this.$store.dispatch('cart/load')
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('cart', [
      'id',
      'due',
      'total',
      'coupon_discount',
      'coupon_code'
    ])
  }
}