import Base from '../UserVenta/js/Base'
import Pendiente from '../UserVenta/Pendiente'
import Pagada from '../UserVenta/Pagada'
import Enviada from '../UserVenta/Enviada'
import Recibida from '../UserVenta/Recibida'
import Completada from '../UserVenta/Completada'
import Devuelta from '../UserVenta/Devuelta'
import Cancelada from '../UserVenta/Cancelada'

export default {
  name: 'UserVenta',
  mixins: [Base],
  components: {
    Pendiente,
    Pagada,
    Enviada,
    Recibida,
    Completada,
    Devuelta,
    Cancelada
  },
  computed: {
    phone () {
      if (this.sale.status < 30 || this.sale.status === 99) {
        return
      }
      return this.$getNestedObject(this.sale.order, ['shipping_information', 'phone'])
    },
    address () {
      if (this.sale.status < 30 || this.sale.status === 99) {
        return
      }
      return this.$getNestedObject(this.sale.order, ['shipping_information', 'address'])
    }
  }
}
