/**
 * API Calls related to shopping cart
 */
import Vue from 'vue'

export default {
  load () {
    return Vue.axiosAuth.get('/api/shopping_cart')
  },
  addProducts (productsIds) {
    const payLoad = {
      add_product_ids: productsIds
    }
    return Vue.axiosAuth.patch('/api/shopping_cart', payLoad)
  },
  removeProducts (productsIds) {
    const payLoad = {
      remove_product_ids: productsIds
    }
    return Vue.axiosAuth.patch('/api/shopping_cart', payLoad)
  },
  update (data) {
    return Vue.axiosAuth.patch('/api/shopping_cart', data)
  },
  getPayment (paymentMethod, data = {}) {
    const params = {
      gateway: paymentMethod,
      ...data
    }
    return Vue.axiosAuth.get('/api/shopping_cart/payment', {params})
  }
}
