import Base from './Base'
import orderAPI from '@/api/order'

export default Base.merge({
  name: 'Enviada',
  computed: {
    delivered () {
      return this.sale.status === 41
    },
    trackingInfo () {
      return this.$getNestedObject(this.sale, ['shipment_details', 'tracking_codes', 0])
    },
    numeroOT () {
      return this.$getNestedObject(this.sale, ['shipment_details', 'label_data', 'numeroOT'])
    }
  },
  methods: {
    saleReceived () {
      orderAPI.salesReceived(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    },
    saleCompleted () {
      orderAPI.salesCompleted(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    }
  }
})
