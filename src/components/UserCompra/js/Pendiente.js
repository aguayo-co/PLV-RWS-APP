import Base from './Base'

export default Base.merge({
  name: 'Pendiente',
  data () {
    return {
      changeReceipt: false
    }
  },
  computed: {
    isTransfer () {
      return this.order.payments[0].gateway === 'Transfer'
    },
    hasReceipt () {
      return this.order.payments[0].transfer_receipt !== null
    },
    canUploadReceipt () {
      return this.isTransfer && (!this.hasReceipt || this.changeReceipt)
    }
  },
  methods: {
    newReceipt () {
      this.changeReceipt = true
    }
  }
})
