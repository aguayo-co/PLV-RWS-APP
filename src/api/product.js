/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  create: function (product) {
    console.log(product)
    product.category_id = product.subcategory_id
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
    return Vue.axiosAuth.post('/api/products', formData)
  },

  getProducts: function (page, items, filter, order, search) {
    let querySearch = ''
    let queryFilter = ''
    let queryOrder = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key]) queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    if (order) queryOrder = '&orderby=' + order
    if (search) querySearch = '&q=' + search
    console.log('/api/products?items=' + items + '&page=' + page + queryFilter + queryOrder + querySearch)
    return Vue.axios.get('/api/products?items=' + items + '&page=' + page + queryFilter + queryOrder + querySearch)
  },

  getProductById: function (productId) {
    return Vue.axios.get('/api/products/' + productId)
  },

  getProductBySlug: function (productSlug) {

  },

  getCategoriesBySlug: function (categorySlug) {
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
    return Vue.axios.get('/api/brands')
  },

  getAllSizes: function () {
    return Vue.axios.get('/api/sizes')
  }
}
