/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  load (id) {
    return Vue.axiosAuth.get('/api/orders/' + id)
  },
  uploadTransferReceipt (id, file) {
    var data = new window.FormData()
    data.append('transfer_receipt', file)
    return Vue.axiosAuth.patch('/api/orders/' + id, data)
  }
}
