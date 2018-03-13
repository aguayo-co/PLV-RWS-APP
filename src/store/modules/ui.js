// UI store will be used to handle data regarding general elements of UI.
// initial state
const state = {
  // Modal property is used to define if the application is showing a modal
  modal: false
}

// getters
const getters = {

}

// actions
const actions = {
  clearBody (context) {
    context.commit('noModal')
  },
  switchModal (context) {
    context.commit('switchModal')
  }
}

// mutations
const mutations = {
  switchModal (modal) {
    state.modal = !state.modal
  },

  noModal (modal) {
    state.modal = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
