/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

const STATUS_REJECTED = 1
const STATUS_HIDDEN = 2
const STATUS_CHANGED_FOR_APPROVAL = 3
const STATUS_APPROVED = 10
const STATUS_AVAILABLE = 19

export default {
  create: function (product) {
    var formData = new FormData()

    // Checks if there are new images.
    if (Object.keys(product).includes('images')) {
      Object.keys(product.images).forEach((key) => {
        formData.append('images[' + key + ']', product.images[key])
      })
      delete product.images
    }

    // Checks if there are colors.
    if (Object.keys(product).includes('color_ids')) {
      product.color_ids.forEach(colorId => {
        formData.append('color_ids[]', colorId)
      })
      delete product.color_ids
    }

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key])
    })

    return Vue.axiosAuth.post('/api/products/', formData)
  },
  delete: function (product) {
    return Vue.axiosAuth.delete('/api/products/' + product.id)
  },
  update: function (product) {
    var formData = new FormData()

    if (product.status === STATUS_REJECTED || product.status === STATUS_HIDDEN) {
      product.status = STATUS_CHANGED_FOR_APPROVAL
    }

    if (product.status === STATUS_APPROVED) {
      product.status = STATUS_AVAILABLE
    }

    // Check if there are images to remove.
    if (Object.keys(product).includes('images_remove')) {
      product.images_remove.forEach((name) => {
        formData.append('images_remove[]', name)
      })
      delete product.images_remove
    }

    // Checks if there are new images.
    if (Object.keys(product).includes('images')) {
      Object.keys(product.images).forEach((key) => {
        formData.append('images[' + key + ']', product.images[key])
      })
      delete product.images
    }

    // Checks if there are colors.
    if (Object.keys(product).includes('color_ids')) {
      product.color_ids.forEach(colorId => {
        formData.append('color_ids[]', colorId)
      })
      delete product.color_ids
    }

    // Appends the remaining properties
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key])
    })

    return Vue.axiosAuth.patch('/api/products/' + product.id, formData)
  },

  get: function (params) {
    return Vue.axios.get('/api/products', { params })
  },

  getProducts: function (page, items, filter, order, search, auth = false) {
    const params = {}
    Object.keys(filter).forEach((key) => {
      params['filter[' + key + ']'] = filter[key]
    })
    if (items) params['items'] = items
    if (page) params['page'] = page
    if (order) params['orderby'] = order
    if (search) params['q'] = search
    const axios = auth ? Vue.axiosAuth : Vue.axios
    return axios.get('/api/products', {params})
  },

  getAuth: function (page, items, filter, order, search) {
    return this.getProducts(page, items, filter, order, search, true)
  },

  getProductById: function (productId) {
    return Vue.axios.get('/api/products/' + productId)
  },

  getProductAuthById: function (productId) {
    return Vue.axiosAuth.get('/api/products/' + productId)
  },

  getProductBySlug: function (productSlug) {

  },

  getAllConditions: function () {
    return Vue.axios.get('/api/conditions')
  },

  getAllColors: function () {
    return Vue.axios.get('/api/colors')
  },

  getAllBrands: function () {
    return Vue.axios.get('/api/brands?items=500')
  },

  getAllSizes: function () {
    return Vue.axios.get('/api/sizes')
  }
}
