// Our shopping cart!
import Vue from 'vue'
import shoppingCartAPI from '@/api/shoppingCart'

// Propiedades que son hijos directos de la orden.
const baseCart = {
  id: null,
  total: null,
  due: null,
  used_credits: null,
  shipping_information: null,
  coupon_discount: null
}

// Propiedades que son hijos directos de cada venta.
const baseSale = {
  id: null,
  shipping_method_id: null,
  total: null
}

// Propiedades que son hijos directos de cada producto.
const baseProduct = {
  id: null,
  price: null,
  title: null,
  images: null
}

// Propiedades que son hijos directos de cada usuario.
const baseSeller = {
  id: null,
  first_name: null,
  last_name: null,
  picture: null,
  shipping_methods: {}
}

// EL estado mínimo inicial de el state.
const baseState = {
  ...baseCart,
  coupon_code: null,
  sales: {}
}

const getters = {
  user_full_name: state => saleId => state.sales[saleId].user_first_name + ' ' + state.sales[saleId].user_last_name,
  /**
   * Obtiene el teléfono a usar en la orden.
   * Si no hay uno especificado, se usa el global del usuario.
   *
   * @param {*} state
   * @param {*} getters
   * @param {*} rootState
   */
  phone (state, getters, rootState) {
    const phoneOrder = Vue.getNestedObject(state.shipping_information, ['phone'])
    return phoneOrder || rootState.user.phone
  },
  /**
   * Obtiene la dirección a usar en la orden.
   * Si no hay una especificado, se usa la favorita del usuario.
   *
   * @param {*} state
   * @param {*} getters
   * @param {*} rootState
   */
  address (state, getters, rootState) {
    const addressOrder = Vue.getNestedObject(state.shipping_information, ['address'])
    if (addressOrder) {
      return addressOrder
    }

    const favoriteAddressId = rootState.user.favorite_address_id
    const favoriteAddress = rootState.user.addresses[favoriteAddressId]
    if (favoriteAddress) {
      return favoriteAddress
    }

    const firstAddressId = Object.keys(rootState.user.addresses)[0]
    const firstAddress = rootState.user.addresses[firstAddressId]
    if (firstAddress) {
      return firstAddress
    }

    return null
  }
}

const actions = {
  load ({commit}) {
    return shoppingCartAPI.load().then(response => {
      commit('set', response.data)
    })
  },
  update ({commit}, data) {
    return shoppingCartAPI.update(data).then(response => {
      commit('set', response.data)
    })
  },
  addProduct ({commit}, product) {
    return shoppingCartAPI.addProducts([product.id]).then(response => {
      commit('set', response.data)
    })
  },
  removeProduct ({commit}, product) {
    return shoppingCartAPI.removeProducts([product.id]).then(response => {
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
    state['coupon_code'] = Vue.getNestedObject(cart, ['coupon', 'code'])

    const activeSales = []
    Object.keys(cart.sales).forEach((key) => {
      store.commit('cart/setSale', cart.sales[key])
      const saleID = cart.sales[key].id
      activeSales[saleID] = saleID
    })

    Object.keys(state.sales).forEach((key) => {
      if (!(key in activeSales)) {
        store.commit('cart/removeSale', state.sales[key])
      }
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

    store.commit('cart/setSaleSeller', {sale: state.sales[newSale.id], user: Vue.getNestedObject(sale.products, [0, 'user'])})
    Object.keys(sale.products).forEach(function (key) {
      store.commit('cart/setSaleProduct', {sale: state.sales[newSale.id], product: sale.products[key]})
    })
  },
  /**
   * Almacena cada sale en el state.
   *
   * @param {*} state
   * @param {*} data
   */
  setSaleSeller (state, {sale, user}) {
    Object.keys(baseSeller).forEach((key) => {
      Vue.set(state.sales[sale.id], 'user_' + key, user[key])
    })
  },
  /**
   * Almacena cada producto en el state.
   *
   * @param {*} state
   * @param {*} data
   */
  setSaleProduct (state, {sale, product}) {
    const newProduct = {
      size: Vue.getNestedObject(product, ['size', 'name']),
      brand: Vue.getNestedObject(product, ['brand', 'name']),
      condition: Vue.getNestedObject(product, ['condition', 'name'])
    }
    Object.keys(baseProduct).forEach((key) => {
      newProduct[key] = product[key]
    })
    Vue.set(state.sales[sale.id].products, newProduct.id, newProduct)
  },
  /**
   * Quita una venta del state.
   *
   * @param {*} state
   * @param {*} sale
   */
  removeSale (state, sale) {
    Vue.delete(state.sales, sale.id)
  },
  /**
   * Devuelve el state a su estado inicial.
   *
   * @param {*} state
   * @param {*} user
   */
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
