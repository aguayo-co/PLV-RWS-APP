// Our shopping cart!
import Vue from 'vue'
import router from '@/router'
import shoppingCartAPI from '@/api/shoppingCart'

// Propiedades que son hijos directos de la orden.
const baseCart = {
  id: null,
  total: null,
  due: null,
  status: null,
  used_credits: null,
  shipping_information: null,
  shipping_cost: null,
  coupon_discount: null
}

// Propiedades que son hijos directos de cada venta.
const baseSale = {
  id: null,
  shipping_method_id: null,
  shipping_method: null,
  shipping_cost: null,
  allow_chilexpress: null,
  is_chilexpress: null
}

// Propiedades que son hijos directos de cada producto.
const baseProduct = {
  id: null,
  price: null,
  sale_price: null,
  title: null,
  images: null
}

// Propiedades que son hijos directos de cada usuario.
// Cómo una de las propiedades es un objeto, es importante
// usar una función generadora para poder sobre escribirlo
// cuando tenga que reiniciarse la el state.
const baseSellerGenerator = () => {
  return {
    id: null,
    first_name: null,
    last_name: null,
    full_name: null,
    picture: null,
    phone: null,
    shipping_methods: {}
  }
}

// El estado mínimo inicial de el state.
// Cómo una de las propiedades es un objeto, es importante
// usar una función generadora para poder sobre escribirlo
// cuando tenga que reiniciarse la el state.
const baseStateGenerator = () => {
  return {
    ...baseCart,

    // Propiedades calculadas con información del back.
    address: null,
    phone: null,
    coupon_code: null,
    sales: {},

    // Información compartida en componentes sobre estado actual del carro.
    gateway: null
  }
}

const getters = {
  products: state => {
    let productList = []
    if (Object.keys(state.sales).length > 0) {
      Object.keys(state.sales).forEach((key) => {
        Object.keys(state.sales[key].products).forEach((subkey) => {
          productList.push(state.sales[key].products[subkey])
        })
      })
    }
    return productList
  }
}

const actions = {
  load ({commit}) {
    const cartId = router.currentRoute.query.cartId
    return shoppingCartAPI.load(cartId).then(response => {
      commit('set', response.data)
      return response
    })
  },
  update ({commit}, data) {
    return shoppingCartAPI.update(data).then(response => {
      commit('set', response.data)
      return response
    })
  },
  addProduct ({commit}, product) {
    return shoppingCartAPI.addProducts([product.id]).then(response => {
      commit('set', response.data)
      return response
    })
  },
  removeProduct ({commit}, product) {
    return shoppingCartAPI.removeProducts([product.id]).then(response => {
      commit('set', response.data)
      return response
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
    state['address'] = Vue.getNestedObject(cart.shipping_information, ['address'])
    state['phone'] = Vue.getNestedObject(cart.shipping_information, ['phone'])

    const activeSales = []

    // Agrega o sobre-escribe los Sale.
    Object.keys(cart.sales).forEach((key) => {
      store.commit('cart/setSale', cart.sales[key])
      const saleID = cart.sales[key].id
      activeSales[saleID] = saleID
    })

    // Elimina los Sale que ya no existan.
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

    store.commit('cart/setSaleSeller', {sale: state.sales[newSale.id], user: sale.user})
    Object.keys(sale.products).forEach(function (key) {
      store.commit('cart/setSaleProduct', {sale: state.sales[newSale.id], product: sale.products[key]})
    })
  },
  /**
   * Almacena datos de cada vendedor en la venta en el state.
   *
   * @param {*} state
   * @param {*} data
   */
  setSaleSeller (state, {sale, user}) {
    const baseSeller = baseSellerGenerator()
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
  clear (state) {
    const baseState = baseStateGenerator()
    Object.keys(baseState).forEach((key) => {
      state[key] = baseState[key]
    })
  },
  /**
   * Cambia el valor de used_credits y due en state.
   *
   * @param {*} state
   * @param {*} user
   */
  setUsedCredits (state, value) {
    let due = parseInt(state.due) || 0
    due += parseInt(state.used_credits) || 0
    due -= parseInt(value) || 0
    state.due = due
    state.used_credits = parseInt(value) || 0
  }
}

export default {
  namespaced: true,
  state: {
    ...baseStateGenerator()
  },
  getters,
  actions,
  mutations
}
