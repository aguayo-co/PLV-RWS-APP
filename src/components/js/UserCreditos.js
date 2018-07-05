import { mapState } from 'vuex'
import transactionAPI from '@/api/creditsTransaction'
import Pager from '@/components/Pager'

export default {
  name: 'UserCreditos',
  components: {
    Pager
  },
  computed: {
    ...mapState(['user']),
    pendingTransferTotal () {
      let total = 0
      this.transactionsPendingTransfer.forEach((transaction) => {
        total += transaction.amount
      })
      return -total
    }
  },
  data () {
    return {
      pagination: null,
      transactionsPendingTransfer: [],
      transactions: [],
      alertConvert: false,
      alertInfo: false
    }
  },
  created: function () {
    this.loadTransactions()
    this.loadPendingTransfer()
  },
  methods: {
    getTitle (transaction) {
      if (transaction.order_id) {
        const orderUrl = this.$router.resolve({name: 'compra', params: { path: transaction.order_id }}).href
        return 'Usado en orden <a href="' + orderUrl + '">' + transaction.order_id + '</a>'
      }

      if (transaction.sale_id) {
        const tusVentasUrl = this.$router.resolve({name: 'user-tus-ventas'}).href
        return 'Recibido por venta <a href="' + tusVentasUrl + '">' + transaction.sale_id + '</a>'
      }

      const reason = this.$getNestedObject(transaction, ['extra', 'reason'])
      if (!reason) {
        return 'Movimiento de créditos'
      }

      return reason
    },
    getLabel (transaction) {
      if (transaction.transfer_status === 1) {
        return 'Transferencia completada'
      }

      if (transaction.transfer_status === 0) {
        return 'Transferencia pendiente'
      }

      return null
    },
    loadTransactions () {
      transactionAPI.all().then((response) => {
        this.pagination = response.data
      })
    },
    loadPendingTransfer () {
      transactionAPI.pending().then((response) => {
        console.log(response)
        this.transactionsPendingTransfer = response.data.data
      })
    },
    toggleConvertMoney () {
      this.alertConvert = !this.alertConvert
    },
    confirmConvertMoney () {
      const payload = {
        user_id: this.user.id,
        amount: -this.user.credits,
        transfer_status: 0,
        extra: {
          'reason': 'Solicitud de transferencia de créditos a tu cuenta bancaria'
        }
      }
      transactionAPI.transferRequest(payload)
        .then(response => {
          this.$store.dispatch('user/loadUser', response.data)
          this.alertConvert = !this.alertConvert
          this.alertInfo = !this.alertInfo
        })
    }
  },
  watch: {
    pagination (pagination) {
      this.transactions = pagination.data
    }
  }
}
