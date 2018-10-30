import Base from './Base'
import orderAPI from '@/api/order'

export default {
  name: 'Enviada',
  mixins: [Base],
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
      this.processing = true
      orderAPI.salesReceived(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      }).finally(() => {
        this.processing = false
      })
    },
    saleCompleted () {
      this.processing = true
      orderAPI.salesCompleted(this.sale.order_id, [this.sale.id]).then(response => {
        this.$emit('refresh-order', response.data)
      }).catch((e) => {
        this.$handleApiErrors(e)
      }).finally(() => {
        this.processing = false
      })
    }
  }
}
