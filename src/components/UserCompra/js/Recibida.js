import Base from './Base'
import saleReturnAPI from '@/api/saleReturn'
import orderAPI from '@/api/order'

const reasons = [
  'No se ve como en las fotos o la descripción',
  'No me siento a gusto con la talla o el color',
  'Las condiciones del producto no son las que esperaba',
  'Otro motivo'
]

export default {
  name: 'Recibida',
  mixins: [Base],
  data () {
    return {
      step: null,
      to_return_ids: [],
      return_reason: null,
      reasons,
      errorLog: {
        to_return_ids: null,
        return_reason: null
      }
    }
  },
  methods: {
    returnSale () {
      this.errorLog.return_reason = null
      const reason = reasons[this.return_reason]

      if (reason) {
        this.processing = true
        saleReturnAPI.return(this.sale.id, this.to_return_ids, reason).then(response => {
          return orderAPI.load(this.sale.order_id)
        }).then(response => {
          this.$emit('refresh-order', response.data)
        }).catch((e) => {
          this.$handleApiErrors(e)
        }).finally(() => {
          this.processing = false
        })
        return
      }

      this.errorLog.return_reason = 'Tienes que seleccionar un motivo.'
    },
    completeSale () {
      this.processing = true
      orderAPI.salesCompleted(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      }).finally(() => {
        this.processing = false
      })
    },
    goToStep (step) {
      this.errorLog.to_return_ids = null
      if (step === 'reason' && !this.to_return_ids.length) {
        this.errorLog.to_return_ids = 'Debes seleccionar al menos un producto.'
        return
      }
      this.step = step
    }
  }
}
