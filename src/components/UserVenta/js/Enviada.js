import Base from './Base'

export default Base.merge({
  name: 'Enviada',
  computed: {
    chileExpress () {
      return this.sale.shipping_method.slug.includes('chile') && this.sale.shipping_method.slug.includes('express')
    }
  }
})
