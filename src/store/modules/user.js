// User store will be used to handle public data regarding users.
import axios from 'axios'

const state = {
  id: null,
  first_name: null,
  last_name: null,
  picture: null,
  token: null,
  auth: false
}

const getters = {
  id: state => state.id,
  first_name: state => state.first_name,
  last_name: state => state.last_name,
  picture: state => state.picture,
  token: state => state.token,
  auth: state => state.auth,
  full_name: state => state.first_name + ' ' + state.last_name
}

const actions = {
  loadUser ({commit, state}) {
    const userId = localStorage.getItem('userId')
    axios.get('https://prilov.aguayo.co/api/users/' + userId)
      .then(response => {
        commit('auth', response.data)
      })
      .catch(e => {
        commit('clear')
      })
  },
  logOut ({commit, state}) {
    commit('clear')
  },
  setUser ({commit, state}, user) {
    commit('auth', user)
  }
}

const mutations = {
  auth (state, user) {
    state.id = user.id
    state.first_name = user.first_name
    state.last_name = user.last_name
    state.picture = user.picture
    state.token = localStorage.getItem('token')
    state.auth = true
  },
  clear (state, user) {
    state.id = null
    state.first_name = null
    state.last_name = null
    state.picture = null
    state.token = null
    state.auth = false
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
