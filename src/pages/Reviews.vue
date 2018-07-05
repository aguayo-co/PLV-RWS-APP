<template lang="pug">
.layout-page
  UserDataCloset(:user="owner" v-on:update:user="owner = $event")
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
              figcaption.valuations__name {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
            p.valuations__bubble
              span(
                :class="{ 'i-like' : rating.buyer_rating === 1, 'i-less-circle' : rating.buyer_rating === 0 , 'i-like i_flip' : rating.buyer_rating === -1 }") {{ rating.buyer_comment }}
          .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="ratings.seller.length <= 0")
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
              figcaption.valuations__name {{ rating.seller.first_name }} {{ rating.seller.last_name }}
            p.valuations__bubble
              span(
                :class="{ 'i-like' : rating.seller_rating === 1, 'i-less-circle' : rating.seller_rating === 0 , 'i-like i_flip' : rating.seller_rating === -1 }") {{ rating.seller_comment }}
          .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="ratings.buyer.length <= 0")
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
        sellerArchives: {},
        buyerNew: {}
      },
      loading: {
        seller: true,
        buyer: true
      },
      page: {
        seller: 1,
        buyer: 1
      },
      loadMore: {
        buyer: true,
        seller: true
      }
    }
  },
  computed: {
    userId () {
      return this.$getNestedObject(this.$store.state, ['user', 'id'])
    },
    ownerId () {
      return this.$route.params.userId
    }
  },
  methods: {
    loadRatings: function () {
      ratingsAPI.getBySeller(this.ownerId)
        .then(response => {
          this.ratings.sellerNew = response.data
          this.consolidateSeller()
        })
      ratingsAPI.getArchiveBySeller(this.ownerId)
        .then(response => {
          this.ratings.sellerArchives = response.data
          this.consolidateSeller()
        })
      ratingsAPI.getByBuyer(this.ownerId)
        .then(response => {
          this.ratings.buyerNew = response.data
          this.ratings.buyer = response.data.data
          this.loading.buyer = false
        })
    },
    consolidateSeller: function () {
      if (this.page.seller <= this.ratings.sellerNew.last_page) {
        this.ratings.seller = this.ratings.sellerNew.data
      } else {
        this.ratings.seller = this.ratings.sellerArchives.data
      }
      this.loading.seller = false
    },
    loadMoreSeller: function () {
      this.loading.seller = true
      if (this.page.seller < this.ratings.sellerNew.last_page) {
        this.page.seller += 1
        ratingsAPI.getBySeller(this.ownerId, this.page.seller)
          .then(response => {
            this.ratings.seller = response.data.data
            this.loading.seller = false
          })
      } else {
        this.page.seller += 1
        ratingsAPI.getArchiveBySeller(this.ownerId, this.page.seller - this.ratings.sellerNew.last_page)
          .then(response => {
            this.ratings.seller = response.data.data
            this.loading.seller = false
          })
      }
    },
    loadMoreBuyer: function () {
      this.loading.buyer = true
      if (this.page.buyer < this.ratings.buyerNew.last_page) {
        this.page.buyer += 1
        ratingsAPI.getByBuyer(this.ownerId, this.page.buyer)
          .then(response => {
            this.ratings.buyerNew = response.data
            this.ratings.buyer = response.data.data
            this.loading.buyer = false
          })
      }
    }
  },
  mounted: function () {
    this.loadRatings()
    usersAPI.getUserById(this.ownerId)
      .then(response => {
        this.owner = response.data
      })
  }
}
</script>
