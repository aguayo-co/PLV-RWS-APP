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

const getters = {
  full_name: state => state.first_name + ' ' + state.last_name,
  roles: state => state.roles,
  token: () => { return window.localStorage.getItem('token') },
  userId: () => { return window.localStorage.getItem('userId') }
}

const actions = {
  loadUser ({commit, getters}) {
    return userAPI.load(getters['userId'])
      .then(response => {
        commit('set', response.data)
      })
      .catch(e => {
        console.log('No autenticado')
      })
  },
  loadAddresses ({commit, getters}) {
    return userAddressesAPI.load(getters['userId']).then(response => {
      commit('setAddresses', response.data.data)
    })
  },
  update ({commit, getters}, data) {
    data.id = getters['userId']
    return userAPI.update(data).then(response => {
      commit('set', response.data)
    })
  },
  updateWithFile ({commit, getters}, data) {
    data.id = getters['userId']
    return userAPI.updateWithFile(data).then(response => {
      commit('set', response.data)
    })
  },
  createAddress ({commit, getters}, data) {
    data.user_id = getters['userId']
    return userAddressesAPI.create(data).then(response => {
      commit('setAddress', response.data)
    })
  },
  updateAddress ({commit, getters}, data) {
    data.user_id = getters['userId']
    return userAddressesAPI.update(data).then(response => {
      commit('setAddress', response.data)
    })
  },
  deleteAddress ({commit, getters}, data) {
    data.user_id = getters['userId']
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
    Object.keys(baseUser).forEach((key) => {
      state[key] = user[key]
    })
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
  clear (state, user) {
    Object.keys(baseUser).forEach((key) => {
      state[key] = baseUser[key]
    })
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  }
}

export default {
  namespaced: true,
  state: {
    addresses: {},
    ...baseUser
  },
  getters,
  actions,
  mutations
}
