/**
 * API para Ventas
 */
import Vue from 'vue'

export default {
  load (saleId) {
    return Vue.axiosAuth.get('/api/sales/' + saleId)
  },
  shipped (saleId, company, code) {
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
  delivered (saleId, note) {
    const data = {
      status: 41,
      shipment_details: {
        note
      }
    }
    return Vue.axiosAuth.patch('/api/sales/' + saleId, data)
  }
}
