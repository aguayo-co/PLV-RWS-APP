<template lang="pug">
.layout-page
  Loader(v-if="loading.user")
  .status.status_alert.i-alert-circle(v-else-if="!owner") La cuenta de esta Prilover fue eliminada.
  template(v-else)
    UserDataCloset(:owner="owner", linkTo='closet')
    .profile__user
      .column
        .column__item
          .headline Reviews como Vendedora
          .valuations
            .valuations__item(
              v-for="rating in ratings.seller")
              p.valuations__date
                time.valuations__date-txt {{ rating.created_at | date }}
              figure.valuations__avatar
                img.valuations__img(
                  :src="rating.buyer.picture",
                  :alt="rating.buyer.first_name")
                figcaption.valuations__name {{ rating.buyer.full_name }}
              p.valuations__bubble
                span.chat-bubble_ico(
                  :class="{ 'i-like' : rating.buyer_rating === 1, 'i-less-circle' : rating.buyer_rating === 0 , 'i-like i_flip' : rating.buyer_rating === -1 }") {{ rating.buyer_comment }}
            Loader(v-if="!ratings.seller.length && loading.seller")
            .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-else-if="!ratings.seller.length")
              p Esta prilover aún no tiene reviews como vendedora.
          template(v-if="ratings.seller.length")
            Loader(v-if="loading.seller")
            .btn__wrapper(v-else-if="loadMore.seller")
              button.btn(@click="loadMoreSeller") Cargar más reviews
            .btn__wrapper(v-else)
              button.btn(disabled) Estas son todos los reviews
        .column__item
          .headline Reviews como compradora
          .valuations
            .valuations__item(
              v-for="rating in ratings.buyer")
              p.valuations__date
                time.valuations__date-txt {{ rating.created_at | date }}
              figure.valuations__avatar
                img.valuations__img(
                  :src="rating.seller.picture",
                  :alt="rating.seller.first_name")
                figcaption.valuations__name {{ rating.seller.full_name }}
              p.valuations__bubble
                span.chat-bubble_ico(
                  :class="{ 'i-like' : rating.seller_rating === 1, 'i-less-circle' : rating.seller_rating === 0 , 'i-like i_flip' : rating.seller_rating === -1 }") {{ rating.seller_comment }}
            Loader(v-if="!ratings.buyer.length && loading.buyer")
            .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-else-if="!ratings.buyer.length")
              p Esta prilover aún no tiene reviews como compradora.
          template(v-if="ratings.buyer.length")
            Loader(v-if="loading.buyer")
            .btn__wrapper(v-else-if="loadMore.buyer")
              button.btn(@click="loadMoreBuyer") Cargar más Reviews
            .btn__wrapper(v-else)
              button.btn(disabled) Estas son todos los reviews

</template>

<script>
import UserDataCloset from '@/components/UserDataCloset'
import usersAPI from '@/api/user'
import ratingsAPI from '@/api/rating'

export default {
  name: 'Reviews',
  components: {
    UserDataCloset
  },
  data () {
    return {
      owner: {},
      ratings: {
        seller: [],
        buyer: [],
        sellerNew: {},
        sellerArchive: {},
        buyerNew: {}
      },
      loading: {
        user: true,
        seller: true,
        buyer: true
      }
    }
  },
  computed: {
    loadMore () {
      return {
        buyer: (this.ratings.buyerNew.current_page < this.ratings.buyerNew.last_page),
        seller: (!this.ratings.sellerArchive.current_page || this.ratings.sellerArchive.current_page < this.ratings.sellerArchive.last_page)
      }
    },
    userId () {
      return this.$getNestedObject(this.$store.state, ['user', 'id'])
    },
    ownerId () {
      return this.$route.params.userId
    }
  },
  methods: {
    loadRatings () {
      ratingsAPI.getBySeller(this.ownerId)
        .then(response => {
          this.ratings.sellerNew = response.data
          this.ratings.seller = this.ratings.seller.concat(response.data.data)
        })
        .finally(() => {
          if (this.ratings.sellerNew.total === 0) {
            this.loadMoreSeller()
            return
          }
          this.loading.seller = false
        })
      ratingsAPI.getByBuyer(this.ownerId)
        .then(response => {
          this.ratings.buyerNew = response.data
          this.ratings.buyer = this.ratings.buyer.concat(response.data.data)
        })
        .finally(() => {
          this.loading.buyer = false
        })
    },
    loadMoreSeller () {
      if (this.ratings.sellerNew.current_page < this.ratings.sellerNew.last_page) {
        this.loading.seller = true
        ratingsAPI.getBySeller(this.ownerId, this.ratings.sellerNew.current_page + 1)
          .then(response => {
            this.ratings.sellerNew = response.data
            this.ratings.seller = this.ratings.seller.concat(response.data.data)
          })
          .finally(() => {
            this.loading.seller = false
          })
        return
      }

      const currentPage = this.ratings.sellerArchive.current_page
      if (!currentPage || currentPage < this.ratings.sellerArchive.last_page) {
        this.loading.seller = true
        ratingsAPI.getArchiveBySeller(this.ownerId, currentPage + 1)
          .then(response => {
            this.ratings.sellerArchive = response.data
            this.ratings.seller = this.ratings.seller.concat(response.data.data)
          })
          .finally(() => {
            this.loading.seller = false
          })
      }
    },
    loadMoreBuyer () {
      if (this.ratings.buyerNew.current_page < this.ratings.buyerNew.last_page) {
        this.loading.buyer = true
        ratingsAPI.getByBuyer(this.ownerId, this.ratings.buyerNew.current_page + 1)
          .then(response => {
            this.ratings.buyerNew = response.data
            this.ratings.buyer = this.ratings.buyer.concat(response.data.data)
          })
          .finally(() => {
            this.loading.buyer = false
          })
      }
    }
  },
  created () {
    const localRequest = this.loading.user = usersAPI.getUserById(this.ownerId)
      .then(response => {
        if (localRequest === this.loading.user) {
          this.owner = response.data
          this.loadRatings()
        }
      })
      .catch(e => {
        if (this.$getNestedObject(e, ['response', 'status']) === 404) {
          this.owner = null
        }
      })
      .finally(() => {
        this.loading.user = false
      })
  }
}
</script>
