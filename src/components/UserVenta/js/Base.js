// Componente base para manejo de información de estado de compra.
// Se extiende llamando el método `.merge(objeto)`, donde objeto contiene
// propiedades nuevas a agregar a este.
//
// Ejemplo:
// export default Base.merge({
//   name: 'Pendiente'
// })

const baseStatusMessages = {
  10: 'Carro de compras',
  20: 'En pago',
  30: 'Pagada',
  40: 'Enviada',
  41: 'Entregada',
  49: 'Recibida',
  90: 'Completada',
  91: 'Completada con devolución',
  92: 'Completada con devolución parcial',
  99: 'Cancelada'
}

const base = {
  props: ['sale'],
  data: () => {
    return {
      statusMessages: {...baseStatusMessages}
    }
  },
  components: {
  },
  computed: {
    paymentDate () {
      const date = this.$getNestedObject(this.sale, ['status_history', 20, 'date', 'date'])
      return date || this.created_at
    }
  },
  methods: {
    statusMessage (statusId) {
      return this.statusMessages[statusId]
    }
  }
}

export default {
  /**
   * Extiende un objeto con las propiedades base de `base`.
   *
   * @param {*} toMerge
   * @return {*} El objeto extendido.
   */
  merge (toMerge) {
    toMerge.props = toMerge.props ? toMerge.props.concat(base.props) : base.props
    toMerge.components = toMerge.components ? {...toMerge.components, ...base.components} : {...base.components}
    toMerge.computed = toMerge.computed ? {...toMerge.computed, ...base.computed} : {...base.computed}
    toMerge.methods = toMerge.methods ? {...toMerge.methods, ...base.methods} : {...base.methods}
    toMerge._data = toMerge.data ? toMerge.data : () => { return {} }
    toMerge.data = () => {
      return {
        ...toMerge._data(),
        ...base.data()
      }
    }
    return toMerge
  }
}
