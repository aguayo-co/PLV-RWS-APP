import { mapState } from 'vuex'

export default {
  name: 'CompraPagando',
  data () {
    return {
      errorLog: {
        transfer_receipt: null
      },
      transfer_receipt: null
    }
  },
  computed: {
    ...mapState('cart', [
      'gateway'
    ]),
    transfer () {
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
      this.$store.dispatch('cart/uploadReceipt', this.transfer_receipt).catch(e => {
        this.$handleApiErrors(e, ['transfer_receipt'], this.errorLog)
      })
    }
  }
}
