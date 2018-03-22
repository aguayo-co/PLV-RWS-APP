/**
 * API Calls related to products and their properties
 */
import axios from 'axios'
const apiURL = 'https://prilov.aguayo.co/api/'

export default {
  create: function (product, imageBlobs, userId, userToken) {
    var data = new FormData()
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    }

    data.append('title', product.title)
    data.append('description', product.description)
    data.append('dimensions', product.dimensions)
    data.append('original_price', product.originalPrice)
    data.append('price', product.price)
    data.append('commission', product.commission)
    data.append('user_id', userId)
    data.append('brand_id', product.brand_id)
    data.append('category_id', product.category_id)
    data.append('size_id', 2)
    data.append('color_ids', product.color_ids)
    data.append('condition_id', product.condition_id)

    product.color_ids.forEach(function (id, index) {
      data.append('color_ids[]', id)
    })

    imageBlobs.forEach(function (image, index) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(image.split(',')[1])

      // separate out the mime component
      var mimeString = image.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      // write the ArrayBuffer to a blob, and you're done
      var bb = new Blob([ab], {type: mimeString})
      var file = new File([bb], 'image' + index + '.png')
      console.log(file)
      data.append('images[]', file)
    })

    return axios.post(apiURL + 'products', data, headers)
  },

  getAllProducts: function () {

  },

  getProductById: function (productId) {

  },

  getProductBySlug: function (productSlug) {

  },

  getShopCategories: function () {
    return axios.get(apiURL + 'categories/shop')
  },

  getAllConditions: function () {
    return axios.get(apiURL + 'conditions')
  },

  getAllColors: function () {
    return axios.get(apiURL + 'colors')
  },

  getAllBrands: function () {
    return axios.get(apiURL + 'brands')
  },

  dataURItoBlob: function (dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab], {type: mimeString})
    return bb
  }
}
