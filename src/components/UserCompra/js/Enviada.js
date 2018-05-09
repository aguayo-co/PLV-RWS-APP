import Base from './Base'
import orderAPI from '@/api/order'

export default Base.merge({
  name: 'Enviada',
  methods: {
    saleReceived () {
      orderAPI.salesReceived(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    }
  }
})
