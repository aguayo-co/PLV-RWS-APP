import Base from './Base'
import ratingAPI from '@/api/rating'

export default {
  name: 'Calificar',
  mixins: [Base],
  data: () => {
    return {
      rating: {},
      new_seller_rating: null,
      new_seller_comment: null,
      errorLog: {
        seller_rating: null,
        seller_comment: null
      }
    }
  },
  computed: {
    can_rate () {
      if (this.rating.status) {
        return false
      }
      return !this.rating.created_at || !this.$getNestedObject(this.rating, ['seller_comment'])
    },
    seller_comment: {
      get () {
        return this.new_seller_comment !== null ? this.new_seller_comment : this.$getNestedObject(this.rating, ['seller_comment'])
      },
      set (newComment) {
        this.new_seller_comment = newComment
      }
    },
    seller_rating: {
      get () {
        return this.new_seller_rating !== null ? this.new_seller_rating : this.$getNestedObject(this.rating, ['seller_rating'])
      },
      set (newRating) {
        this.new_seller_rating = newRating
      }
    }
  },
  methods: {
    loadRating () {
      ratingAPI.loadForSale(this.sale.id).then(result => {
        this.rating = result.data
      })
    },
    validateRating () {
      let valid = true

      if (!this.seller_comment) {
        this.errorLog.seller_comment = 'Debes ingresar un comentario.'
        valid = false
      }

      if (!this.seller_rating) {
        this.errorLog.seller_rating = 'Debes seleccionar una calificación.'
        valid = false
      }

      return valid
    },
    setSellerRating () {
      if (!this.validateRating()) {
        return
      }

      this.errorLog.seller_comment = null
      this.errorLog.seller_rating = null
      ratingAPI.setSellerRating(this.rating.sale_id, this.seller_comment, this.seller_rating).then(result => {
        this.rating = result.data
        this.new_seller_rating = null
        this.new_seller_comment = null
      }).catch(e => {
        this.$handleApiErrors(e, ['seller_comment', 'seller_rating'], this.errorLog)
      })
    }
  },
  created () {
    this.loadRating()
  }
}
