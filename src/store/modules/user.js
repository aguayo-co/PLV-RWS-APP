// User store will be used to handle public data regarding users.
import userAPI from '@/api/user'
import Vue from 'vue'
import userAddressesAPI from '@/api/userAddresses'

const baseState = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  about: null,
  cover: null,
  picture: null,
  phone: null,
  favorite_address_id: null,
  followers_count: null,
  following_count: null,
  addresses: {},
  roles: [],
  groups: []
}

const getters = {
  full_name: state => state.first_name + ' ' + state.last_name,
  roles: state => state.roles,
  token: () => { return window.localStorage.getItem('token') }
}

const actions = {
  loadUser ({commit}) {
    return userAPI.load()
      .then(response => {
        commit('set', response.data)
      })
      .catch(e => {
        console.log('No autenticado')
      })
  },
  loadAddresses ({commit}) {
    return userAddressesAPI.load().then(response => {
      commit('setAddresses', response.data.data)
    })
  },
  update ({commit, state}, data) {
    data.id = state.id
    return userAPI.update(data).then(response => {
      commit('set', response.data)
    })
  },
  updateWithFile ({commit, state}, data) {
    data.id = state.id
    return userAPI.updateWithFile(data).then(response => {
      commit('set', response.data)
    })
  },
  createAddress ({commit, state}, data) {
    data.user_id = state.id
    return userAddressesAPI.create(data).then(response => {
      commit('setAddress', response.data)
    })
  },
  updateAddress ({commit, state}, data) {
    data.user_id = state.id
    return userAddressesAPI.update(data).then(response => {
      commit('setAddress', response.data)
    })
  },
  deleteAddress ({commit, state}, data) {
    data.user_id = state.id
    return userAddressesAPI.delete(data).then(response => {
      commit('removeAddress', data)
    })
  },
  logOut ({commit}) {
    commit('clear')
  },
  setUser ({commit}, user) {
    commit('set', user)
  }
}

const mutations = {
  set (state, user) {
    Object.keys(baseState).forEach((key) => {
      state[key] = user[key]
    })
  },
  setAddresses: function (state, addresses) {
    Object.keys(addresses).forEach(function (key) {
      let address = addresses[key]
      Vue.set(state.addresses, address.id, address)
    })
  },
  setAddress: function (state, address) {
    Vue.set(state.addresses, address.id, address)
  },
  removeAddress: function (state, address) {
    Vue.delete(state.addresses, address.id)
  },
  clear (state, user) {
    Object.keys(baseState).forEach((key) => {
      state[key] = baseState[key]
    })
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  }
}

export default {
  namespaced: true,
  state: {...baseState},
  getters,
  actions,
  mutations
}
