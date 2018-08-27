import Base from './Base'
import orderAPI from '@/api/order'

export default {
  name: 'Pendiente',
  mixins: [Base],
  data () {
    return {
      transfer_receipt: null,
      changeReceipt: false,
      errorLog: {
        transfer_receipt: null
      },
      loading: {
        upload: false
      }
    }
  },
  computed: {
    activePayment () {
      return this.$getNestedObject(this.sale, ['order', 'active_payment'])
    },
    paymentStatus () {
      return this.$getNestedObject(this.activePayment, ['status'])
    },
    isTransfer () {
      return this.$getNestedObject(this.activePayment, ['gateway']) === 'Transfer'
    },
    hasReceipt () {
      return this.$getNestedObject(this.activePayment, ['transfer_receipt']) !== null
    },
    canUploadReceipt () {
      return this.isTransfer && (!this.hasReceipt || this.changeReceipt || this.paymentStatus === 98)
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
      this.loading.upload = true
      orderAPI.uploadTransferReceipt(this.sale.order_id, this.transfer_receipt).then(response => {
        this.loading.upload = false
        this.changeReceipt = false
        this.transfer_receipt = null
        this.$emit('refresh-order', response.data)
      }).catch(e => {
        this.loading.upload = false
        this.$handleApiErrors(e, ['transfer_receipt'], this.errorLog)
      })
    }
  }
}
