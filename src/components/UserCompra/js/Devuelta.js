import Base from './Base'
import saleReturnAPI from '@/api/saleReturn'
import Calificar from '../Calificar'

export default Base.merge({
  name: 'Devuelta',
  components: {
    Calificar
  },
  data () {
    return {
      sale_return: null,
      return_method: null,
      shipping_company: null,
      tracking_code: null,
      errorLog: {
        return_method: null,
        shipping_company: null,
        tracking_code: null
      }
    }
  },
  created () {
    this.loadSaleReturn()
  },
  methods: {
    loadSaleReturn () {
      saleReturnAPI.load(this.sale.returns[0].id).then(response => {
        this.sale_return = response.data
      })
    },
    saleReturnDelivered () {
      saleReturnAPI.delivered(this.sale_return.id, 'Entrega coordinada por compradora.').then(response => {
        this.sale_return = response.data
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    },
    saleReturnShipped () {
      this.errorLog.shipping_company = null
      this.errorLog.tracking_code = null

      if (this.shipping_company && this.tracking_code) {
        saleReturnAPI.shipped(this.sale_return.id, this.shipping_company, this.tracking_code).then(response => {
          this.sale_return = response.data
        }).catch((e) => {
          this.$handleApiErrors(e)
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
    askForShippingDetails () {
      this.sale_return.status = 0
    }
  }
})
