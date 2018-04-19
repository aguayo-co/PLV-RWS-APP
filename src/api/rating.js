/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  loadForSale (ratingId) {
    return Vue.axiosAuth.get('/api/ratings/' + ratingId)
  },
  setSellerRating (ratingId, rating) {
    const data = {
      seller_rating: rating
    }
    return Vue.axiosAuth.patch('/api/ratings/' + ratingId, data)
  },
  setSellerComment (ratingId, comment, rating) {
    const data = {
      seller_rating: rating,
      seller_comment: comment
    }
    return Vue.axiosAuth.patch('/api/ratings/' + ratingId, data)
  }
}
