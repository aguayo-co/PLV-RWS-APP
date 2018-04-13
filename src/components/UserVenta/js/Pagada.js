import Base from './Base'
import saleAPI from '@/api/sale'

export default Base.merge({
  name: 'Pagada',
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
  computed: {
    chileExpress () {
      return this.sale.shipping_method.slug.includes('chile') && this.sale.shipping_method.slug.includes('express')
    }
  },
  methods: {
    saleDelivered () {
      saleAPI.delivered(this.sale.id, '').then(response => {
        this.$emit('refresh-sale', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    },
    saleShipped () {
      this.errorLog.shipping_company = null
      this.errorLog.tracking_code = null
      if (this.shipping_company && this.tracking_code) {
        saleAPI.shipped(this.sale.id, this.shipping_company, this.tracking_code).then(response => {
          this.$emit('refresh-sale', response.data)
        }).catch((e) => {
          this.$handleApiErrors(e)
        })
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
})
