// Componente Mixin para manejo de información de estado de compra.

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

export default {
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
      const date = this.$getNestedObject(this.sale, ['status_history', 20, 'date'])
      return date || this.created_at
    }
  },
  methods: {
    statusMessage (statusId) {
      return this.statusMessages[statusId]
    }
  }
}
