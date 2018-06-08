<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Valoraciones
    .valuations
      ul.user-data__list.user-data__list_center
        li.user-data__value.i-like {{ user.ratings_positive_count }}
        li.user-data__value.i-like.i_flip {{ user.ratings_negative_count }}
        li.user-data__value.i-less-circle {{ user.ratings_neutral_count }}
      .valuations__item(
        v-for="rating in ratings")
        p.valuations__date
          time.valuations__date-txt {{ rating.created_at }}
        figure.valuations__avatar
          img.valuations__img(
            :src="rating.buyer.picture",
            :alt="rating.buyer.first_name")
          figcaption.valuations__name {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
        p.valuations__bubble {{ rating.buyer_comment }}
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="ratings.length <= 0")
        p Aún no hay productos en tu closet <router-link class="link_underline" :to="{ name: 'publicar-venta' }">Publica tu primer producto</router-link>

  div.btn_block(v-if="loading")
    p.preload.preload__spin(@click="loadRatings")
  div.btn__wrapper(v-else)
    button.btn(@click="loadRatings") Cargar más valoraciones
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
      if (!data.data) {
        this.loadFrom = null
        return
      }

      this.ratings = this.ratings.concat(data.data)
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
