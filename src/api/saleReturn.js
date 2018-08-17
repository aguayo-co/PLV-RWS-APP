/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  load (saleReturnsId) {
    return Vue.axiosAuth.get('/api/sale_returns/' + saleReturnsId)
  },
  return (salesId, productsIds, reason) {
    const data = {
      sale_id: salesId,
      products_ids: productsIds,
      reason
    }
    return Vue.axiosAuth.post('/api/sale_returns/', data)
  },
  shipped (saleReturnId, company, code) {
    const data = {
      status: 40,
      shipment_details: {
        tracking_codes: [{
          company,
          code
        }]
      }
    }
    return Vue.axiosAuth.patch('/api/sale_returns/' + saleReturnId, data)
  },
  delivered (saleReturnId, note) {
    const data = {
      status: 41,
      shipment_details: {
        note
      }
    }
    return Vue.axiosAuth.patch('/api/sale_returns/' + saleReturnId, data)
  },
  completed (saleReturnId) {
    const data = {
      status: 90
    }
    return Vue.axiosAuth.patch('/api/sale_returns/' + saleReturnId, data)
  }
}
