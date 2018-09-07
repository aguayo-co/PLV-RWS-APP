<template lang="pug">
.layout-inner
  section.product-user
    //- User Profile
    header.single__header
      h2.subhead Sobre la vendedora
    //- data User
    .user-data
      .user-header
        router-link.user-header__item.user-item_gutter(
            :to="{ name: 'closet', params: { userId: user.id }}")
          .user-data__avatar.user-data__avatar_small
            img.user-data__img(
              v-if="user.picture"
              :src="user.picture",
              :alt="'Perfil' + ' ' + user.first_name")
            span.profile__letter(v-if="!user.picture && user.first_name") {{ user.first_name.charAt(0) }}
        .user-header__item.user-iten_grow
          h3.user-data__title
            router-link(
              :to="{ name: 'closet', params: { userId: user.id }}") {{ user.full_name }}
          .user-data__subitem
            //-Notificaciones
            .user-data__block
              router-link.user-data__reviews(
                v-if="user.id",
                :to="{ name: 'reviews', params: { userId: user.id } }")
                ul.user-data__list
                  li.user-data__value.i-like {{ user.ratings_positive_total_count }}
                  li.user-data__value.i-like.i_flip {{ user.ratings_negative_total_count }}
                  li.user-data__value.i-less-circle {{ user.ratings_neutral_total_count }}
              ul.user-data__list
                li.user-data__track {{ user.followers_count }} Seguidores
                li.user-data__track {{ user.following_count }} Siguiendo
                li.user-data__track(v-if="loggedUser.id && loggedUser.id !== user.id")
                  router-link.i-email(
                    :to="{ name: 'privateMessage', params: { recipientId: user.id }}",
                    title='Enviar mensaje privado') Enviar mensaje privado
            .user-data__rating(v-if="ratings.length > 0")
              .chat__line
                span.chat__inner
                  .chat__bubble-main
                    img.chat-bubble__avatar.avatar_60(
                      :src="rating.buyer.picture",
                      :alt="rating.buyer.first_name")
                    .chat-bubble__item
                      .chat-bubble__title {{ rating.buyer.full_name }}
                      p.chat-bubble__txt
                        span(
                          :class="{ 'i-like' : rating.buyer_rating === 1, 'i-less-circle' : rating.buyer_rating === 0 , 'i-like i_flip' : rating.buyer_rating === -1 }") {{ rating.buyer_comment }}

</template>

<script>

import ratingsAPI from '@/api/rating'
import { mapState } from 'vuex'

export default {
  name: 'ProductoUser',
  props: ['user'],
  computed: {
    ...mapState({'loggedUser': 'user'})
  },
  data () {
    return {
      ratings: [],
      rating: {}
    }
  },
  created: function () {
    ratingsAPI.getBySeller(this.user.id)
      .then(response => {
        this.ratings = response.data.data
        this.rating = this.ratings[this.ratings.length - 1]
      })
  }
}
</script>
