import Base from './Base'

export default Base.merge({
  name: 'Pendiente',
  computed: {
    isTransfer () {
      return this.order.payments[0].gateway === 'Transfer'
    },
    hasReceipt () {
      return this.order.payments[0].payment_receipt !== null
    }
  }
})
