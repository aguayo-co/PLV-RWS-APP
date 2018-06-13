/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  load (orderId) {
    return Vue.axiosAuth.get('/api/orders/' + orderId)
  },
  salesReceived (orderId, salesIds) {
    const data = {
      sales: {}
    }
    salesIds.forEach(saleId => {
      data.sales[saleId] = {status: 49}
    })
    return Vue.axiosAuth.patch('/api/orders/' + orderId, data)
  },
  salesCompleted (orderId, salesIds) {
    const data = {
      sales: {}
    }
    salesIds.forEach(saleId => {
      data.sales[saleId] = {status: 90}
    })
    return Vue.axiosAuth.patch('/api/orders/' + orderId, data)
  },
  uploadTransferReceipt (orderId, file) {
    var data = new window.FormData()
    data.append('transfer_receipt', file)
    return Vue.axiosAuth.patch('/api/orders/' + orderId, data)
  },
  payUCallback (data) {
    return Vue.axios.post('/callback/gateway/pay-u/', data)
  }
}
