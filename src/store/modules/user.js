// User store will be used to handle public data regarding users.
import userAPI from '@/api/user'

const state = {
  id: null,
  first_name: null,
  last_name: null,
  picture: null,
  email: null,
  about: null,
  phone: null,
  cover: null,
  favorite_address_id: null,
  addresses: [
    {
      id: '2',
      address: 'Alberto Blest Gana 803',
      region: 'Padre Hurtado',
      city: 'Santiago',
      zone: ''
    },
    {
      id: '3',
      address: 'Pasaje la Lenga  1539',
      region: 'Cerro Navia',
      city: 'Santiago',
      zone: ''
    },
    {
      id: '4',
      address: 'Los flamencos 1300',
      region: 'Mapú',
      city: 'Santiago',
      zone: ''
    }
  ],
  group_ids: [1],
  group: [
    {
      id: 1,
      name: 'Prilover Star'
    }
  ],
  followers_count: '349',
  following_count: '4'
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
  update ({commit, state}, data) {
    data.id = state.id
    return userAPI.update(data).then(response => {
      commit('set', response.data)
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
    state.first_name = user.first_name
    state.last_name = user.last_name
    state.email = user.email
    state.about = user.about
    state.phone = user.phone
    state.picture = user.picture
    state.cover = user.cover
    state.followers_count = user.followers_count
    state.following_count = user.following_count
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
    state.followers_count = null
    state.following_count = null
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
