<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Valoraciones
    .valuations
      ul.user-data__list
        li.user-data__value.i-like {{ user.ratings_positive_count }}
        li.user-data__value.i-like.i_flip {{ user.ratings_negative_count }}
        li.user-data__value.i-less-circle {{ user.ratings_neutral_count }}
      .valuations__item(v-for="rating in ratings")
        p.valuations__date
          time.valuations__date-txt {{ rating.created_at }}
        // p.valuations__label.i-bag Sweater Blanco Forever 21
        figure.valuations__avatar
          img.valuations__img(:src="rating.buyer.picture", alt="Avatar")
          figcaption.valuations__name {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
        p.valuations__bubble {{ rating.buyer_comment }}

</template>

<script>
import { mapState } from 'vuex'
import ratingsAPI from '@/api/rating'
export default {
  name: 'UserValoraciones',
  data () {
    return {
      ratings: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created: function () {
    ratingsAPI.getBySeller(this.user.id)
      .then(response => {
        this.ratings = response.data.data
      })
  }
}
</script>
