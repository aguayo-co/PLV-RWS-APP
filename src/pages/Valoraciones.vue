<template lang="pug">
.layout-page
  UserDataCloset(:user="owner" v-on:update:user="owner = $event")
  .profile__user
    .column
      .column__item
        .headline Valoraciones como compradora
        .valuations
          .valuations__item(
            v-for="rating in ratings.asBuyer")
            p.valuations__date
              time.valuations__date-txt {{ rating.created_at | date }}
            figure.valuations__avatar
              img.valuations__img(
                :src="rating.seller.picture",
                :alt="rating.seller.first_name")
              figcaption.valuations__name {{ rating.seller.first_name }} {{ rating.seller.last_name }}
            p.valuations__bubble {{ rating.seller_comment }}
          .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="ratings.asBuyer.length <= 0")
            p Esta prilover aún no tiene valoraciones como compradora.
        template(v-if="ratings.asBuyer.length")
          Loader(v-if="loading.asBuyer")
          .btn__wrapper(v-else-if="loadFrom")
            button.btn(@click="loadRatingsAsBuyer") Cargar más valoraciones
          .btn__wrapper(v-else)
            button.btn(disabled) Estas son todas las valoraciones
      .column__item
        .headline Valoraciones como Vendedora
        .valuations
          .valuations__item(
            v-for="rating in ratings.asSeller")
            p.valuations__date
              time.valuations__date-txt {{ rating.created_at | date }}
            figure.valuations__avatar
              img.valuations__img(
                :src="rating.buyer.picture",
                :alt="rating.buyer.first_name")
              figcaption.valuations__name {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
            p.valuations__bubble {{ rating.buyer_comment }}
          .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="ratings.asSeller.length <= 0")
            p Esta prilover aún no tiene valoraciones como vendedora.
        template(v-if="ratings.asSeller.length")
          Loader(v-if="loading.asSeller")
          .btn__wrapper(v-else-if="loadFrom")
            button.btn(@click="loadRatingsAsSeller") Cargar más valoraciones
          .btn__wrapper(v-else)
            button.btn(disabled) Estas son todas las valoraciones

</template>

<script>
import UserDataCloset from '@/components/UserDataCloset'
import usersAPI from '@/api/user'
import ratingsAPI from '@/api/rating'

export default {
  name: 'Valoraciones',
  components: {
    UserDataCloset
  },
  data () {
    return {
      owner: {},
      ratings: {
        asSeller: [],
        asBuyer: []
      },
      page: 0,
      loading: {
        asSeller: true,
        asBuyer: true
      },
      loadFrom: 'new'
    }
  },
  computed: {
    userId () {
      return this.$getNestedObject(this.$store.state, ['user', 'id'])
    }
  },
  methods: {
    handleArchiveApiResponseAsSeller (data) {
      if (!data.data.length) {
        this.loadFrom = null
        return
      }

      this.ratings.asSeller = this.ratings.asSeller.concat(data.data)
      if (!data.next_page_url) {
        this.loadFrom = null
      }
    },
    handleApiResponseAsSeller (data) {
      if (!data.data.length) {
        this.loadFrom = 'archive'
        this.page = 0
        this.loadRatingsAsSeller()
        return
      }
      this.ratings.asSeller = this.ratings.concat(data.data)
      if (!data.next_page_url) {
        this.loadFrom = 'archive'
        this.page = 0
      }
    },
    handleArchiveApiResponseAsBuyer (data) {
      if (!data.data.length) {
        this.loadFrom = null
        return
      }

      this.ratings.asBuyer = this.ratings.asBuyer.concat(data.data)
      if (!data.next_page_url) {
        this.loadFrom = null
      }
    },
    handleApiResponseAsBuyer (data) {
      if (!data.data.length) {
        this.loadFrom = 'archive'
        this.page = 0
        this.loadRatingsAsBuyer()
        return
      }
      this.ratings.asBuyer = this.ratings.concat(data.data)
      if (!data.next_page_url) {
        this.loadFrom = 'archive'
        this.page = 0
      }
    },
    loadRatingsAsSeller () {
      if (!this.loadFrom) {
        return
      }
      const api = this.loadFrom === 'new' ? ratingsAPI.getBySeller : ratingsAPI.getArchiveBySeller
      this.loading.asSeller = true
      api(this.owner.id, ++this.page)
        .then(response => {
          this.loading.asSeller = false
          if (this.loadFrom === 'new') {
            this.handleApiResponseAsSeller(response.data)
            return
          }
          this.handleArchiveApiResponseAsSeller(response.data)
        })
    },
    loadRatingsAsBuyer () {
      if (!this.loadFrom) {
        return
      }
      const api = this.loadFrom === 'new' ? ratingsAPI.getByBuyer : ratingsAPI.getArchiveByBuyer
      this.loading.asBuyer = true
      api(this.owner.id, ++this.page)
        .then(response => {
          this.loading.asBuyer = false
          if (this.loadFrom === 'new') {
            this.handleApiResponseAsBuyer(response.data)
            return
          }
          this.handleArchiveApiResponseAsBuyer(response.data)
        })
    }
  },
  created: function () {
    this.loadRatingsAsSeller()
    this.loadRatingsAsBuyer()
    usersAPI.getUserById(this.$route.params.userId)
      .then(response => {
        this.owner = response.data
      })
  }
}
</script>
