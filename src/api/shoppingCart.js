/**
 * API Calls related to shopping cart
 */
import Vue from 'vue'

export default {
  load: function () {
    return Vue.axiosAuth.get('/api/shopping_cart')
  },
  update: function (data) {
    const payLoad = {}
    const allowedKeys = ['address_id', 'phone']
    allowedKeys.forEach((key) => {
      if (key in data) {
        payLoad[key] = data[key]
      }
    })

    return Vue.axiosAuth.patch('/api/shopping_cart', payLoad)
  }
}
