import Base from './Base'
import orderAPI from '@/api/order'

export default Base.merge({
  name: 'Pendiente',
  data () {
    return {
      transfer_receipt: null,
      changeReceipt: false,
      errorLog: {
        transfer_receipt: null
      }
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
    },
    fileName () {
      return this.transfer_receipt ? this.transfer_receipt.name : 'Selecciona archivo'
    }
  },
  methods: {
    newReceipt () {
      this.changeReceipt = true
    },
    setReceipt (event) {
      this.transfer_receipt = event.target.files[0]
    },
    uploadReceipt () {
      orderAPI.uploadTransferReceipt(this.order.id, this.transfer_receipt).then(response => {
        this.changeReceipt = false
        this.$emit('refresh-order', response.data)
      }).catch(e => {
        this.$handleApiErrors(e, ['transfer_receipt'], this.errorLog)
      })
    }
  }
})
