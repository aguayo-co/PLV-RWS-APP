/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

const STATUS_REJECTED = 1
const STATUS_HIDDEN = 2
const STATUS_CHANGED_FOR_APPROVAL = 3

export default {
  create: function (product) {
    var formData = new FormData()
    Object.keys(product).forEach((key) => {
      if (key === 'images' || key === 'color_ids') {
        product[key].forEach((item) => {
          formData.append(key + '[]', item)
        })
      } else {
        formData.append(key, product[key])
      }
    })
    return Vue.axiosAuth.post('/api/products/', formData)
  },

  update: function (product) {
    console.log(product)
    var formData = new FormData()

    if (product.status === STATUS_REJECTED || product.status === STATUS_HIDDEN) {
      product.status = STATUS_CHANGED_FOR_APPROVAL
    } else {
      delete product.status
    }

    // Check if there are images to remove
    if (Object.keys(product).includes('images_remove')) {
      product.images_remove.forEach(name => {
        formData.append('delete_images[]', name)
      })
      delete product.images_remove
    }

    // Checks if product has property new_images
    // Ex: new_images: [ null, Blob(), null, Blob() ]
    if (Object.keys(product).includes('new_images')) {
      product['new_images'].forEach((item, index) => {
        if (item) formData.append('images[' + index + ']', item)
      })
      delete product.new_images
    }

    // Appends the remaining properties
    Object.keys(product).forEach((key) => {
      if (key !== 'color_ids') {
        formData.append(key, product[key])
      } else {
        product.color_ids.forEach(colorId => {
          formData.append('color_ids[]', colorId)
        })
      }
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

  getCategoriesBySlug: function (categorySlug) {
    categorySlug = categorySlug || ''
    return Vue.axios.get('/api/categories/' + categorySlug)
  },
  getCategoriesById: function (categoryId) {
    return Vue.axios.get('/api/categories?filter[id]=' + categoryId)
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
