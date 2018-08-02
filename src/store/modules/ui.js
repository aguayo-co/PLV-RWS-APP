// UI store will be used to handle data regarding general elements of UI.
import productsAPI from '@/api/product'
import categoriesAPI from '@/api/category'
import campaignsAPI from '@/api/campaigns'
import userAddressesAPI from '@/api/userAddresses'
import menusAPI from '@/api/menu'
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
  },
  menus: {},
  conditions: [],
  colors: [],
  brands: [],
  campaigns: [],
  sizes: [],
  categories: [],
  regions: []

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
  loadProperties ({ commit }) {
    productsAPI.getAllConditions()
      .then(response => {
        const property = {
          name: 'conditions',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
    productsAPI.getAllColors()
      .then(response => {
        let colors = response.data.data.sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        const property = {
          name: 'colors',
          data: colors
        }
        commit('setProperty', { property })
      })
    productsAPI.getAllBrands()
      .then(response => {
        let brands = response.data.data.sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        const property = {
          name: 'brands',
          data: brands
        }
        commit('setProperty', { property })
      })
    campaignsAPI.getAll()
      .then(response => {
        let campaigns = response.data.data.sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        const property = {
          name: 'campaigns',
          data: campaigns
        }
        commit('setProperty', { property })
      })
    productsAPI.getAllSizes()
      .then(response => {
        const property = {
          name: 'sizes',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
    categoriesAPI.getAll()
      .then(response => {
        response.data.data.forEach((category) => {
          category.children.sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          })
        })
        const property = {
          name: 'categories',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
    userAddressesAPI.getRegions()
      .then(response => {
        let regions = Object.values(response.data).sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        const property = {
          name: 'regions',
          data: regions
        }
        commit('setProperty', { property })
      })
    menusAPI.getMenuByName()
      .then(response => {
        let menus = {}
        response.data.data.forEach((menu) => {
          menus[menu.slug] = menu
        })
        const property = {
          name: 'menus',
          data: menus
        }
        commit('setProperty', { property })
      })
  },
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
  clearLoginAttempt (context) {
    context.commit('clearLoginAttempt')
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
  },
  closeAllDropdownsBut (context, { name }) {
    context.commit('closeAllDropdownsBut', { name })
  }
}

// mutations
const mutations = {
  setProperty (state, { property }) {
    state[property.name] = property.data
  },
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
  clearLoginAttempt (state) {
    state.loginAttempts = 0
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
  },
  closeAllDropdownsBut (state, { name }) {
    state.headerDropdownsVisible = {
      user: false,
      cart: false,
      menu: false
    }
    state.headerDropdownsVisible[name] = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
