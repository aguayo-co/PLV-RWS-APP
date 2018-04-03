// Our shopping cart!
import Vue from 'vue'
import shoppingCartAPI from '@/api/shoppingCart'

// Propiedades que son hijos directos de la orden.
const baseCart = {
  id: null,
  total: null,
  due: null,
  coupon_discount: null
}

// Propiedades que son hijos directos de cada venta.
const baseSale = {
  id: null,
  total: null,
  due: null,
  coupon_discount: null
}

// Propiedades que son hijos directos de cada producto.
const baseProduct = {
  id: null,
  price: null,
  title: null,
  pictures: null
}

// EL estado mínimo inicial de el state.
const baseState = {
  ...baseCart,
  coupon_code: null,
  sales: {}
}

const getters = {}

const actions = {
  load ({commit}) {
    return shoppingCartAPI.load()
      .then(response => {
        commit('set', response.data)
      })
  }
}

const mutations = {
  /**
   * Almacena el carro de compras en el state.
   * Pasa cada venta a otro commit.
   *
   * @param {*} state
   * @param {*} cart
   */
  set (state, cart) {
    const store = this
    Object.keys(baseCart).forEach((key) => {
      state[key] = cart[key]
    })
    state['coupon_code'] = Vue.getNestedObject(cart, ['coupon', 'coupon_code'])

    Object.keys(cart.sales).forEach(function (key) {
      store.commit('cart/setSale', cart.sales[key])
    })
  },
  /**
   * Almacena una venta en el state.
   * Pasa cada producto a otro commit.
   *
   * @param {*} state
   * @param {*} sale
   */
  setSale (state, sale) {
    const store = this
    const newSale = {
      products: {}
    }
    Object.keys(baseSale).forEach((key) => {
      newSale[key] = sale[key]
    })
    Vue.set(state.sales, newSale.id, newSale)

    Object.keys(sale.products).forEach(function (key) {
      store.commit('cart/setProduct', {sale: state.sales[newSale.id], product: sale.products[key]})
    })
  },
  /**
   * Almacena cada producto en el state.
   *
   * @param {*} state
   * @param {sale, product} param1
   */
  setProduct (state, {sale, product}) {
    const newProduct = {
      size: Vue.getNestedObject(product, ['size', 'name']),
      brand: Vue.getNestedObject(product, ['brand', 'name'])
    }
    Object.keys(baseProduct).forEach((key) => {
      newProduct[key] = product[key]
    })
    Vue.set(state.sales[sale.id].products, newProduct.id, newProduct)
  },
  removeSale: function (state, sale) {
    Vue.delete(state.sales, sale.id)
  },
  clear (state, user) {
    Object.keys(baseState).forEach((key) => {
      state[key] = baseState[key]
    })
  }
}

export default {
  namespaced: true,
  state: {
    ...baseState
  },
  getters,
  actions,
  mutations
}
