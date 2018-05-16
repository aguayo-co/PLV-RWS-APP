/**
 * API Calls related to ratings
 */
import Vue from 'vue'

export default {
  getBySeller (sellerId) {
    return Vue.axios.get('/api/rating_archives?seller_id=' + sellerId)
  },
  getPositiveByUser (userId) {
    const params = {
      status: '1',
      seller_id: userId,
      buyer_rating: '0,1'
    }
    return Vue.axiosAuth.get('/api/ratings/', { params })
  },
  getNegativeByUser (userId) {
    const params = {
      status: '1',
      seller_id: userId,
      buyer_rating: '-1,0'
    }
    return Vue.axiosAuth.get('/api/ratings/', { params })
  },
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
