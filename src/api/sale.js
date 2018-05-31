/**
 * API para Ventas
 */
import Vue from 'vue'

export default {
  load: function (saleId) {
    return Vue.axiosAuth.get('/api/sales/' + saleId)
  },
  setShippingInformation: function (saleId, company, code) {
    const data = {
      status: 40,
      shipment_details: {
        tracking_codes: [{
          company,
          code
        }]
      }
    }
    return Vue.axiosAuth.patch('/api/sales/' + saleId, data)
  },
  shipped: function (saleId) {
    const data = {
      status: 40
    }
    return Vue.axiosAuth.patch('/api/sales/' + saleId, data)
  },
  delivered: function (saleId, note) {
    const data = {
      status: 41,
      shipment_details: {
        note
      }
    }
    return Vue.axiosAuth.patch('/api/sales/' + saleId, data)
  },
  setShippingMethod: function (sale) {
    const data = {
      shipping_method_id: sale.shipping_method_id,
      id: sale.id
    }
    return Vue.axiosAuth.patch('/api/sales/' + sale.id, data)
  }
}
