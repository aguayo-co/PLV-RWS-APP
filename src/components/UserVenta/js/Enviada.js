import Base from './Base'

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
    askForShippingDetails () {
      this.sale.status = 30
    }
  }
}
