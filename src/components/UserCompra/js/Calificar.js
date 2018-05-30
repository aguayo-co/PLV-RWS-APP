import Base from './Base'
import ratingAPI from '@/api/rating'

export default Base.merge({
  name: 'Calificar',
  data: () => {
    return {
      rating: {},
      new_buyer_rating: null,
      new_buyer_comment: null,
      errorLog: {
        buyer_rating: null,
        buyer_comment: null
      }
    }
  },
  computed: {
    can_rate () {
      if (this.rating.status) {
        return false
      }
      return !this.rating.created_at || !this.buyer_comment
    },
    buyer_comment: {
      get () {
        return this.new_buyer_comment !== null ? this.new_buyer_comment : this.$getNestedObject(this.rating, ['buyer_comment'])
      },
      set (newComment) {
        this.new_buyer_comment = newComment
      }
    },
    buyer_rating: {
      get () {
        return this.new_buyer_rating !== null ? this.new_buyer_rating : this.$getNestedObject(this.rating, ['buyer_rating'])
      },
      set (newRating) {
        this.new_buyer_rating = newRating
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

      if (!this.buyer_comment) {
        this.errorLog.buyer_comment = 'Debes ingresar un comentario.'
        valid = false
      }

      if (!this.buyer_rating) {
        this.errorLog.buyer_rating = 'Debes seleccionar una calificación.'
        valid = false
      }

      return valid
    },
    setBuyerRating () {
      if (!this.validateRating) {
        return
      }

      this.errorLog.buyer_comment = null
      this.errorLog.buyer_rating = null
      ratingAPI.setBuyerRating(this.rating.sale_id, this.buyer_comment, this.buyer_rating).then(result => {
        this.rating = result.data
        this.new_buyer_rating = null
        this.new_buyer_comment = null
      }).catch(e => {
        this.$handleApiErrors(e, ['buyer_comment', 'buyer_rating'], this.errorLog)
      })
    }
  },
  created () {
    this.loadRating()
  }
})
