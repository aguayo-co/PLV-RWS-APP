<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Reviews
    Loader(v-if="!ratings.length && loading")
    .valuations(v-else)
      ul.user-data__list.user-data__list_center
        li.user-data__value.i-like {{ user.ratings_positive_count }}
        li.user-data__value.i-like.i_flip {{ user.ratings_negative_count }}
        li.user-data__value.i-less-circle {{ user.ratings_neutral_count }}
      .valuations__item(
        v-for="rating in ratings")
        p.valuations__date
          time.valuations__date-txt {{ rating.created_at | date }}
        figure.valuations__avatar
          img.valuations__img(
            :src="rating.buyer.picture",
            :alt="rating.buyer.first_name")
          figcaption.valuations__name {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
        p.valuations__bubble
          span.chat-bubble_ico(
            :class="{ 'i-like' : rating.buyer_rating === 1, 'i-less-circle' : rating.buyer_rating === 0 , 'i-like i_flip' : rating.buyer_rating === -1 }") {{ rating.buyer_comment }}
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="ratings.length <= 0")
        p Aún no tienes reviews.

  template(v-if="ratings.length")
    Loader(v-if="loading")
    .btn__wrapper(v-else-if="loadFrom")
      button.btn(@click="loadRatings") Cargar más reviews
    .btn__wrapper(v-else)
      button.btn(disabled) Estas son todas las reviews
</template>

<script>
import { mapState } from 'vuex'
import ratingsAPI from '@/api/rating'
export default {
  name: 'UserValoraciones',
  data () {
    return {
      ratings: [],
      page: 0,
      loading: true,
      loadFrom: 'new'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleArchiveApiResponse (data) {
      if (!data.data.length) {
        this.loadFrom = null
        return
      }

      this.ratings = this.ratings.concat(data.data)
      if (!data.next_page_url) {
        this.loadFrom = null
      }
    },
    handleApiResponse (data) {
      if (!data.data.length) {
        this.loadFrom = 'archive'
        this.page = 0
        this.loadRatings()
        return
      }
      this.ratings = this.ratings.concat(data.data)
      if (!data.next_page_url) {
        this.loadFrom = 'archive'
        this.page = 0
      }
    },
    loadRatings () {
      if (!this.loadFrom) {
        return
      }
      const api = this.loadFrom === 'new' ? ratingsAPI.getBySeller : ratingsAPI.getArchiveBySeller
      this.loading = true
      api(this.user.id, ++this.page)
        .then(response => {
          this.loading = false
          if (this.loadFrom === 'new') {
            this.handleApiResponse(response.data)
            return
          }
          this.handleArchiveApiResponse(response.data)
        })
    }
  },
  created: function () {
    this.loadRatings()
  }
}
</script>
