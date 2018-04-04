// User store will be used to handle public data regarding users.
import Vue from 'vue'
import userAPI from '@/api/user'
import userAddressesAPI from '@/api/userAddresses'

const baseUser = {
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
  roles: [],
  groups: []
}

const baseState = {
  ...baseUser,
  addresses: {}
}

const getters = {
  full_name: state => state.first_name + ' ' + state.last_name,
  roles: state => state.roles
}

const actions = {
  loadUser ({commit, dispatch}) {
    const userId = window.localStorage.getItem('userId')
    if (!userId) {
      return
    }
    return userAPI.load(userId)
      .then(response => {
        commit('set', response.data)
        dispatch('loadAddresses')
      })
      .catch(e => {
        console.log('No autenticado')
      })
  },
  loadAddresses ({commit, state}) {
    return userAddressesAPI.load(state.id).then(response => {
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
  setUser ({commit, dispatch}, user) {
    commit('set', user)
    dispatch('loadAddresses')
  }
}

const mutations = {
  set (state, user) {
    Object.keys(baseUser).forEach((key) => {
      state[key] = user[key]
    })
    if (user.api_token) {
      window.localStorage.setItem('token', user.api_token)
      window.localStorage.setItem('userId', user.id)
    }
  },
  setAddresses: function (state, addresses) {
    Object.keys(addresses).forEach(function (key) {
      const address = addresses[key]
      Vue.set(state.addresses, address.id, address)
    })
  },
  setAddress: function (state, address) {
    Vue.set(state.addresses, address.id, address)
  },
  removeAddress: function (state, address) {
    Vue.delete(state.addresses, address.id)
  },
  clear (state) {
    Object.keys(baseState).forEach((key) => {
      state[key] = baseState[key]
    })
    state.addresses = {}
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
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
