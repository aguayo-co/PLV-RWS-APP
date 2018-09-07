import orderAPI from '@/api/order'

export default {
  name: 'CompraTransferencia',
  model: {
    prop: 'order',
    event: 'update'
  },
  props: ['order'],
  data () {
    return {
      uploading: false,
      errorLog: {
        transfer_receipt: null
      },
      transfer_receipt: null
    }
  },
  computed: {
    activePayment () {
      return this.$getNestedObject(this.order, ['active_payment'])
    }
  },
  methods: {
    setReceipt (event) {
      this.$delete(this.errorLog, 'transfer_receipt')
      this.transfer_receipt = event.target.files[0]
    },
    uploadReceipt () {
      this.$delete(this.errorLog, 'transfer_receipt')
      if (!this.transfer_receipt) {
        this.$set(this.errorLog, 'transfer_receipt', 'Debes adjuntar una imagen.')
        return
      }
      this.uploading = true
      orderAPI.uploadTransferReceipt(this.order.id, this.transfer_receipt).then(response => {
        this.$emit('update', response.data)
      }).catch(e => {
        this.$handleApiErrors(e, ['transfer_receipt'], this.errorLog)
      }).finally(() => {
        this.uploading = false
      })
    }
  }
}
