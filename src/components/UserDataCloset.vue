<template lang="pug">
section.profile
  .cover
    .cover__banner(v-if="user.cover")
      img.cover__picture(:src='user.cover')
    .cover__banner(v-else)
      //-1800 * 560
      img.cover__picture(:src="'/static/img/cover/cover-' + coverId + '.jpg'")
  .profile__user
    .profile__grid
      .profile__avatar.user-item_gutter
        .user-data__avatar
          img.user-data__img(
            v-if="user.picture"
            :src="user.picture")
          span.profile__letter(v-if="!user.picture && user.first_name") {{ user.first_name.charAt(0) }}
        p.user-data__group.i-star-on Prilover <span class="txt_brand">Star</span>
      .profile__info
        h1.user-data__title {{ user.first_name }} {{ user.last_name }}
        .profile__actions
          //-Notificaciones
          .user-data__notify
            router-link.user-data__reviews(
              :to="'/closet/' + user.id + '/reviews'")
              ul.user-data__list
                li.user-data__value.i-like {{ user.ratings_positive_count }}
                li.user-data__value.i-like.i_flip {{ user.ratings_negative_count }}
                li.user-data__value.i-less-circle {{ user.ratings_neutral_count }}
            ul.user-data__list
              li.user-data__track {{ user.followers_count }} Seguidores
              li.user-data__track {{ user.following_count }} Siguiendo
          //-Enlaces
          ul.user-data__nav(v-if="userId && user.id !== userId")
            li.user-data__tag
              a.btn-tag.btn-tag_solid(
                v-if="loading")
                Dots
              a.btn-tag.btn-tag_solid(
                v-else-if="!followed"
                @click="follow") Seguir
              a.btn-tag.btn-tag_solid(
                v-else
                @click="unfollow") Siguiendo
            li.user-data__tag(v-if="user.id")
              router-link.btn-tag(:to="{ name: 'privateMessage', params: { recipientId: user.id }}") Enviar Mensaje
    //- About perfil
    .profile__about
      .profile__box-txt.user-data__box-txt
        p.user-data__txt {{ user.about }}
      .user-data__rating(v-if="ratings.length >= 1")
        .chat__line
          span.chat__inner
            .chat__bubble-main
              figure.chat-bubble__avatar.avatar_60
                img.chat-bubble__img(
                  :src="rating.buyer.picture",
                  :alt="rating.buyer.first_name")
              //- .chat-bubble__item
              //-   .chat-bubble__title.i-like Camila Cifuentes
              //-   p.chat-bubble__txt Excelente vendedora. Todo rápido y confiable
              .chat-bubble__item
                .chat-bubble__title {{ rating.buyer.first_name }} {{ rating.buyer.last_name }}
                p.chat-bubble__txt
                  span.chat-bubble_ico(
                    :class="{ 'i-like' : rating.buyer_rating === 1, 'i-less-circle' : rating.buyer_rating === 0 , 'i-like i_flip' : rating.buyer_rating === -1 }") {{ rating.buyer_comment }}
</template>

<script>

import ratingsAPI from '@/api/rating'

export default {
  props: ['user'],
  name: 'UserDataCloset',
  computed: {
    followed () {
      return this.following_ids && this.following_ids.indexOf(this.user.id) !== -1
    },
    userId () {
      return this.$getNestedObject(this.$store.state, ['user', 'id'])
    },
    following_ids () {
      return this.$getNestedObject(this.$store.state, ['user', 'following_ids'])
    },
    coverId () {
      if (this.user.first_name) {
        return (this.user.first_name.charCodeAt(0) % 7) + 1
      }
    }
  },
  data () {
    return {
      ratings: [],
      rating: {},
      loading: null
    }
  },
  methods: {
    follow: function () {
      this.loading = true
      const data = {
        following_add: [this.user.id]
      }
      this.$store.dispatch('user/update', data).finally(() => {
        this.loading = false
      })
    },
    unfollow: function () {
      this.loading = true
      const data = {
        following_remove: [this.user.id]
      }
      this.$store.dispatch('user/update', data).finally(() => {
        this.loading = false
      })
    }
  },
  created: function () {
    ratingsAPI.getBySeller(this.$route.params.userId)
      .then(response => {
        this.ratings = response.data.data
        this.rating = this.ratings[this.ratings.length - 1]
      })
  }
}
</script>
