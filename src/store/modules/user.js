// User store will be used to handle public data regarding users.
import Vue from 'vue'
import userAPI from '@/api/user'
import userAddressesAPI from '@/api/userAddresses'

const baseUserGenerator = () => {
  return {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    about: null,
    cover: null,
    credits: null,
    picture: null,
    phone: null,
    favorite_address_id: null,
    purchased_products_count: null,
    published_products_count: null,
    sold_products_count: null,
    followers_count: null,
    followers_ids: null,
    following_count: null,
    following_ids: null,
    roles: [],
    groups: [],
    shipping_method_ids: [],
    bank_account: {},
    vacation_mode: null,
    ratings_negative_count: null,
    ratings_neutral_count: null,
    ratings_positive_count: null,
    favorites_ids: [],
    unread_count: null
  }
}

const baseStateGenerator = () => {
  return {
    ...baseUserGenerator(),
    addresses: {}
  }
}

const getters = {
  full_name: state => Vue.options.filters.full_name(state),
  roles: state => state.roles
}

const actions = {
  async loadUser ({dispatch}) {
    const userId = window.localStorage.getItem('userId')
    if (!userId) {
      throw Error('No hay usuario a cargar.')
    }
    return userAPI.load(userId)
      .then(response => {
        // Devolvemos promesa que devuelve usuario.
        return dispatch('setUser', response.data)
      })
      .catch(e => {
        const code = Vue.getNestedObject(e, ['response', 'status'])
        // Not all errors should log the user out.
        // Some errors are handled by our axios instance axios.
        // Others, deal here if necessary.
        switch (code) {
          case 404:
            dispatch('logOut')
        }
      })
  },
  loadAddresses ({commit, state}) {
    return userAddressesAPI.load(state.id).then(response => {
      commit('setAddresses', response.data.data)
      return response
    })
  },
  update ({commit, state}, data) {
    data.id = state.id
    return userAPI.update(data).then(response => {
      commit('set', response.data)
      return response
    })
  },
  updateWithFile ({commit, state}, data) {
    data.id = state.id
    return userAPI.updateWithFile(data).then(response => {
      commit('set', response.data)
      return response
    })
  },
  createAddress ({dispatch, commit, state}, data) {
    data.user_id = state.id
    return userAddressesAPI.create(data)
      .then(async (response) => {
        await dispatch('loadUser')
        return response
      })
  },
  updateAddress ({commit, state}, data) {
    data.user_id = state.id
    return userAddressesAPI.update(data).then(response => {
      commit('setAddress', response.data)
      return response
    })
  },
  deleteAddress ({commit, state}, data) {
    data.user_id = state.id
    return userAddressesAPI.delete(data).then(response => {
      commit('removeAddress', data)
      return response
    })
  },
  logOut ({commit}) {
    commit('clear')
    commit('cart/clear', null, { root: true })
  },
  setUser ({dispatch, commit}, user) {
    // Reinicia conteo de login,
    // carga direcciones y unifica carros.
    // Si todo es correcto, pasa usuario en promesa.
    return dispatch('ui/clearLoginAttempt', null, { root: true })
      .then(async () => {
        if (user.api_token) {
          window.localStorage.setItem('token', user.api_token)
        }
        window.localStorage.setItem('userId', user.id)
        commit('set', user)
        await dispatch('loadAddresses')
        return user
      })
  }
}

const mutations = {
  set (state, user) {
    const baseUser = baseUserGenerator()
    Object.keys(baseUser).forEach((key) => {
      state[key] = user[key]
    })
  },
  setUnreadCount (state, unreadCount) {
    state.unread_count = unreadCount
  },
  setAddresses (state, addresses) {
    Object.keys(addresses).forEach(function (key) {
      const address = addresses[key]
      Vue.set(state.addresses, address.id, address)
    })
  },
  setAddress (state, address) {
    Vue.set(state.addresses, address.id, address)
  },
  removeAddress (state, address) {
    Vue.delete(state.addresses, address.id)
  },
  clear (state) {
    const baseState = baseStateGenerator()
    Object.keys(baseState).forEach((key) => {
      state[key] = baseState[key]
    })
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
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
