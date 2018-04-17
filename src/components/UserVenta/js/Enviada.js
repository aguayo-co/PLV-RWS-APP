import Base from './Base'

export default Base.merge({
  name: 'Enviada',
  computed: {
    chileExpress () {
      return this.sale.shipping_method.slug.includes('chile') && this.sale.shipping_method.slug.includes('express')
    },
    delivered () {
      return this.sale.status === 41
    },
    trackingInfo () {
      return this.$getNestedObject(this.sale, ['shipment_details', 'tracking_codes', 0])
    }
  },
  method: {
    askForShippingDetails () {
      this.sale.status = 30
    }
  }
})
