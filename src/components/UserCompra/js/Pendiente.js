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
    isTransfer () {
      return this.$getNestedObject(this.sale.order, ['payments', 0, 'gateway']) === 'Transfer'
    },
    hasReceipt () {
      return this.$getNestedObject(this.sale.order, ['payments', 0, 'transfer_receipt']) !== null
    },
    canUploadReceipt () {
      return this.isTransfer && (!this.hasReceipt || this.changeReceipt)
    },
    fileName () {
      return this.transfer_receipt ? this.transfer_receipt.name : 'No hay archivos seleccionados'
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
        this.$emit('refresh-order', response.data)
      }).catch(e => {
        this.loading.upload = false
        this.$handleApiErrors(e, ['transfer_receipt'], this.errorLog)
      })
    }
  }
}
