import Base from './Base'
import saleReturnAPI from '@/api/saleReturn'
import orderAPI from '@/api/order'

const reasons = [
  'El producto era diferente a la descripción o las fotos.',
  'No me siento a gusto con la talla o el color.',
  'Las condiciones del producto no son las que esperaba.',
  'Otro motivo.'
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
        saleReturnAPI.return(this.sale.id, this.to_return_ids, reason).then(response => {
          return orderAPI.load(this.sale.order_id)
        }).then(response => {
          this.$emit('refresh-order', response.data)
        }).catch((e) => {
          this.$handleApiErrors(e)
        })
        return
      }

      this.errorLog.return_reason = 'Tienes que seleccionar un motivo.'
    },
    completeSale () {
      orderAPI.salesCompleted(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
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
