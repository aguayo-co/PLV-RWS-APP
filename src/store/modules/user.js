// User store will be used to handle public data regarding users.
import userAPI from '@/api/user'
import Vue from 'vue'
import userAddressesAPI from '@/api/userAddresses'

const state = {
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
  group_ids: [],
  group: [
    {
      id: 1,
      name: 'Prilover Star'
    }
  ]
}

const getters = {
  full_name: state => state.first_name + ' ' + state.last_name,
  token: () => { return window.localStorage.getItem('token') }
}

const actions = {
  loadUser ({commit}) {
    return userAPI.load().then(response => {
      commit('set', response.data)
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
    state.id = user.id
    state.email = user.email
    state.first_name = user.first_name
    state.last_name = user.last_name
    state.about = user.about
    state.cover = user.cover
    state.picture = user.picture
    state.phone = user.phone
    state.favorite_address_id = user.favorite_address_id
    state.followers_count = user.followers_count
    state.following_count = user.following_count
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
    state.id = null
    state.first_name = null
    state.last_name = null
    state.email = null
    state.about = null
    state.phone = null
    state.picture = null
    state.cover = null
    state.favorite_address_id = null
    state.followers_count = null
    state.following_count = null
    state.addresses = {}

    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
