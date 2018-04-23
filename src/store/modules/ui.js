// UI store will be used to handle data regarding general elements of UI.
// initial state
const state = {
  // Modal property is used to define if the application is showing a modal
  modal: false,
  modalWindow: {
    enabled: false,
    name: null,
    parameters: {}
  },
  loginAttempts: 0,
  headerDropdownsVisible: {
    user: false,
    cart: false,
    menu: false
  }
}

// getters
const getters = {
  modal: state => state.modal,
  modalWindow: state => state.modalWindow,
  loginAttempts: state => state.loginAttempts,
  headerDropdownsVisible: state => state.headerDropdownsVisible
}

// actions
const actions = {
  clearBody (context) {
    context.commit('noModal')
  },
  switchModal (context) {
    context.commit('switchModal')
  },
  showModal (context, { name, parameters }) {
    context.commit('modalWindow', { name, parameters })
  },
  closeModal (context) {
    context.commit('closeModal')
  },
  loginAttempt (context) {
    context.commit('loginAttempt')
  },
  closeDropdown (context, { name }) {
    context.commit('closeDropdown', { name })
  },
  openDropdown (context, { name }) {
    context.commit('openDropdown', { name })
  },
  closeAllDropdowns (context) {
    context.commit('closeAllDropdowns')
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
  modalWindow (state, { name, parameters }) {
    state.modalWindow.enabled = true
    state.modalWindow.name = name
    state.modalWindow.parameters = parameters
    state.modal = true
  },
  closeModal (state) {
    state.modalWindow.enabled = false
    state.modalWindow.name = null
    state.modal = false
  },
  loginAttempt (state) {
    state.loginAttempts += 1
  },
  closeDropdown (state, { name }) {
    state.headerDropdownsVisible[name] = false
  },
  openDropdown (state, { name }) {
    state.headerDropdownsVisible[name] = true
  },
  closeAllDropdowns (state) {
    state.headerDropdownsVisible = {
      user: false,
      cart: false,
      menu: false
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
