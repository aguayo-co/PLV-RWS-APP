// UI store will be used to handle data regarding general elements of UI.
// initial state
const state = {
  // Modal property is used to define if the application is showing a modal
  modal: false,
  modalWindow: {
    enabled: false,
    name: null
  }
}

// getters
const getters = {
  modal: state => state.modal,
  modalWindow: state => state.modalWindow
}

// actions
const actions = {
  clearBody (context) {
    context.commit('noModal')
  },
  switchModal (context) {
    context.commit('switchModal')
  },
  showModal (context, componentName) {
    context.commit('modalWindow', componentName)
  },
  closeModal (context) {
    context.commit('closeModal')
  }
}

// mutations
const mutations = {
  switchModal (state) {
    state.modal = !state.modal
  },
  noModal (state) {
    state.modal = false
  },
  modalWindow (state, componentName) {
    state.modalWindow.enabled = true
    state.modalWindow.name = componentName
    state.modal = true
  },
  closeModal (state) {
    state.modalWindow.enabled = false
    state.modalWindow.name = null
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
