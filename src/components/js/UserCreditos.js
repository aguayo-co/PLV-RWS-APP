import { mapState } from 'vuex'
import userAPI from '@/api/user'
import transactionAPI from '@/api/creditsTransaction'

export default {
  name: 'UserCreditos',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      transactions: [],
      alertConvert: false,
      alertInfo: false
    }
  },
  created: function () {
    this.loadTransactions()
  },
  methods: {
    getTitle (transaction) {
      if (transaction.order_id) {
        const orderUrl = this.$router.resolve({name: 'compra', params: { order_id: transaction.order_id }}).href
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

      switch (reason.toLowerCase()) {
        case 'migration':
          return 'Migración de créditos de Prilov 1.0'

        default:
          return reason
      }
    },
    loadTransactions () {
      transactionAPI.all(this.user.id).then((response) => {
        this.transactions = response.data.data
      })
    },
    convertMoney () {
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
      userAPI.creditsWidthDrawal(payload)
        .then(response => {
          this.$store.dispatch('user/loadUser', response.data)
          this.alertConvert = !this.alertConvert
          this.alertInfo = !this.alertInfo
        })
    }
  }
}
