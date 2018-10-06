/**
 * API Calls related to shopping cart
 */
import Vue from 'vue'

export default {
  load (orderId) {
    // Si tenemos un ID en la URL, manda info para usar
    // esa orden como la orden en carro de compra.
    if (orderId) {
      return Vue.axiosAuth.patch('/api/shopping_cart', { 'order_id': orderId })
        // Si no se puede convertir (error 422),
        // se pide un carro nuevo.
        .catch((e) => {
          if (Vue.getNestedObject(e, ['response', 'status']) === 422) {
            return Vue.axiosAuth.get('/api/shopping_cart')
          }
        })
    }
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
  getPayment (gateway, data = {}) {
    const params = {
      gateway: gateway,
      ...data
    }
    return Vue.axiosAuth.get('/api/shopping_cart/payment', { params })
  },
  setAddress (addressId) {
    const payload = {
      address_id: addressId
    }
    return Vue.axiosAuth.patch('/api/shopping_cart', payload)
  }
}
