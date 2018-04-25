import orderAPI from '@/api/order'

export default {
  name: 'CompraPagando',
  model: {
    prop: 'order',
    event: 'refresh'
  },
  props: ['order'],
  data () {
    return {
      errorLog: {
        transfer_receipt: null
      },
      transfer_receipt: null
    }
  },
  computed: {
    gateway () {
      return this.$getNestedObject(this.order, ['payments', 0, 'gateway'])
    },
    isTransfer () {
      return this.gateway === 'Transfer'
    },
    fileName () {
      return this.transfer_receipt ? this.transfer_receipt.name : 'no se eligió archivo'
    }
  },
  methods: {
    setReceipt (event) {
      this.transfer_receipt = event.target.files[0]
    },
    uploadReceipt () {
      orderAPI.uploadTransferReceipt(this.order.id, this.transfer_receipt).then(response => {
        this.$emit('refresh', response.data)
      }).catch(e => {
        this.$handleApiErrors(e, ['transfer_receipt'], this.errorLog)
      })
    }
  }
}
