// Our shopping cart for guests!
// import shoppingCartAPI from '@/api/shoppingCart'

const state = {
  // Modal property is used to define if the application is showing a modal
  products: [],
  total: 0
}

// getters
const getters = {}

// actions
const actions = {
  load ({ commit }) {
    if (localStorage.getItem('prilovCart')) {
      commit('load')
    }
  },
  addProduct ({ commit }, product) {
    commit('add', product)
  },
  removeProduct ({ commit }, product) {
    commit('remove', product)
  },
  merge ({dispatch, commit}) {
    let alerted = false
    state.products.forEach((product) => {
      dispatch('cart/addProduct', { id: product.id }, { root: true }).catch(e => {
        if (alerted) {
          return
        }

        alerted = true
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'alert',
            title: 'Tuvimos que eliminar algunos productos de tu carrito porque ya no están disponibles.'
          }
        }
        dispatch('ui/showModal', modal, { root: true })
      })
    })
    commit('kill')
  }
}

// mutations
const mutations = {
  load (state) {
    const cart = JSON.parse(localStorage.getItem('prilovCart'))
    state.products = cart.products
    state.total = parseInt(cart.total)
  },
  add (state, product) {
    state.products.push(product)
    state.total += parseInt(product.price)
    localStorage.setItem('prilovCart', JSON.stringify(state))
  },
  remove (state, product) {
    const removedProduct = state.products.filter(x => x.id === product.id)[0]
    state.products = state.products.filter(x => x.id !== product.id)
    state.total -= parseInt(removedProduct.price)
    localStorage.setItem('prilovCart', JSON.stringify(state))
  },
  kill (state) {
    state.products = []
    state.total = 0
    localStorage.removeItem('prilovCart')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
