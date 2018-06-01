import Base from '../UserCompra/js/Base'
import Pendiente from '../UserCompra/Pendiente'
import Pagada from '../UserCompra/Pagada'
import Enviada from '../UserCompra/Enviada'
import Recibida from '../UserCompra/Recibida'
import Completada from '../UserCompra/Completada'
import Devuelta from '../UserCompra/Devuelta'
import Cancelada from '../UserCompra/Cancelada'

export default Base.merge({
  name: 'UserCompra',
  components: {
    Pendiente,
    Pagada,
    Enviada,
    Recibida,
    Completada,
    Devuelta,
    Cancelada
  }
})
