/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  loadForSale (ratingId) {
    return Vue.axiosAuth.get('/api/ratings/' + ratingId)
  },
  setBuyerRating (ratingId, comment, rating) {
    const data = {
      buyer_rating: rating,
      buyer_comment: comment
    }
    return Vue.axiosAuth.patch('/api/ratings/' + ratingId, data)
  },
  setSellerRating (ratingId, comment, rating) {
    const data = {
      seller_rating: rating,
      seller_comment: comment
    }
    return Vue.axiosAuth.patch('/api/ratings/' + ratingId, data)
  }
}
