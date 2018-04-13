import Base from './Base'
import orderAPI from '@/api/order'

export default Base.merge({
  name: 'Enviada',
  methods: {
    saleReceived () {
      orderAPI.salesReceived(this.saleReceived.order_id, [this.saleReceived.id]).then(response => {
        response.data.status = 49
        this.$emit('order', response.data)
      })
    }
  }
})
