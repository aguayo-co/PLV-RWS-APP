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
            :to="{ name: 'closet', params: { userId: userData.id }}")
          .user-data__avatar.user-data__avatar_small
            img.user-data__img(
              v-if="userData.picture"
              :src="userData.picture",
              :alt="'Perfil' + ' ' + userData.first_name")
            span.profile__letter(v-if="!userData.picture && userData.first_name") {{ userData.first_name.charAt(0) }}
        .user-header__item.user-iten_grow
          h3.user-data__title
            router-link(
              :to="{ name: 'closet', params: { userId: userData.id }}") {{ userData.first_name }} {{ userData.last_name }}
          .user-data__subitem
            //-Notificaciones
            .user-data__block
              router-link.user-data__reviews(
                v-if="user.id",
                :to="'/closet/' + user.id + '/reviews'")
                ul.user-data__list
                  li.user-data__value.i-like {{ userData.ratings_positive_count }}
                  li.user-data__value.i-like.i_flip {{ userData.ratings_negative_count }}
                  li.user-data__value.i-less-circle {{ userData.ratings_neutral_count }}
              ul.user-data__list
                li.user-data__track {{ userData.followers_count }} Seguidores
                li.user-data__track {{ userData.following_count }} Siguiendo
                li.user-data__track(v-if="userData.id")
                  router-link.i-email(
                    :to="{ name: 'privateMessage', params: { recipientId: userData.id }}",
                    title='Enviar mensaje privado') Enviar mensaje privado
            .user-data__rating(v-if="ratings.length > 0")
              .chat__line
                span.chat__inner
                  .chat__bubble-main
                    img.chat-bubble__avatar.avatar_60(
                      :src="rating.buyer.picture",
                      :alt="rating.buyer.first_name")
                    .chat-bubble__item
                      .chat-bubble__title.i-like {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
                      p.chat-bubble__txt Excelente vendedora. Todo rápido y confiable
</template>

<script>

import ratingsAPI from '@/api/rating'

export default {
  name: 'ProductoUser',
  props: ['user'],
  computed: {
    userData () {
      return this.user
    }
  },
  data () {
    return {
      ratings: [],
      rating: {}
    }
  },
  mounted: function () {
    ratingsAPI.getBySeller(this.user.id)
      .then(response => {
        this.ratings = response.data.data
        this.rating = this.ratings[this.ratings.length - 1]
      })
  }
}
</script>
