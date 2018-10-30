import Base from './Base'
import saleAPI from '@/api/sale'

export default {
  name: 'Pagada',
  mixins: [Base],
  data () {
    return {
      step: null,
      shipping_company: null,
      tracking_code: null,
      errorLog: {
        shipping_company: null,
        tracking_code: null
      }
    }
  },
  methods: {
    saleDelivered () {
      this.processing = true
      saleAPI.delivered(this.sale.id, 'Entrega coordinada por vendedora.').then(response => {
        this.$emit('refresh-sale', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      }).finally(() => {
        this.processing = false
      })
    },
    saleShippedChilexpress () {
      this.processing = true
      saleAPI.shipped(this.sale.id).then(response => {
        this.$emit('refresh-sale', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      }).finally(() => {
        this.processing = false
      })
    },
    saleShippedAgreed () {
      this.errorLog.shipping_company = null
      this.errorLog.tracking_code = null

      if (this.shipping_company && this.tracking_code) {
        this.processing = true
        saleAPI.setShippingInformation(this.sale.id, this.shipping_company, this.tracking_code).then(response => {
          this.$emit('refresh-sale', response.data)
        }).catch((e) => {
          this.$handleApiErrors(e)
        }).finally(() => {
          this.processing = false
        })
        return
      }

      if (!this.shipping_company) {
        this.errorLog.shipping_company = 'Tienes que ingresar una compañía.'
      }
      if (!this.tracking_code) {
        this.errorLog.tracking_code = 'Tienes que ingresar un número de guía.'
      }
    },
    goToStep (step) {
      this.step = step
    }
  }
}
