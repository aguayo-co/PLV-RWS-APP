import Base from '../UserCompra/js/Base'
import Pendiente from '../UserCompra/Pendiente'
import Pagada from '../UserCompra/Pagada'
import Enviada from '../UserCompra/Enviada'
import Entregada from '../UserCompra/Entregada'
import Recibida from '../UserCompra/Recibida'
import Completada from '../UserCompra/Completada'

export default Base.merge({
  name: 'UserCompra',
  components: {
    Pendiente,
    Pagada,
    Enviada,
    Entregada,
    Recibida,
    Completada
  }
})
