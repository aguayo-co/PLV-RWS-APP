import { mapState } from 'vuex'
import AddressList from '@/components/AddressList'
import CompraSale from '@/components/CompraSale'

export default {
  name: 'CompraEnvioPago',
  components: {
    'address-list': AddressList,
    'compra-sale': CompraSale
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('cart', [
      'sales'
    ])
  }
}
