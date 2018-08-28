<template lang="pug">
section.profile
  .cover
    .cover__banner
      img.cover__picture(v-if="owner.cover" :src='owner.cover')
      //-1800 * 560
      img.cover__picture(v-else :src="'/static/img/cover/cover-' + coverId + '.jpg'")
  .profile__user
    .profile__grid
      .profile__avatar.user-item_gutter
        .user-data__avatar
          img.user-data__img(
            v-if="owner.picture"
            :src="owner.picture")
          span.profile__letter(v-if="!owner.picture && owner.first_name") {{ owner.first_name.charAt(0) }}
        p.user-data__group.i-star-on(v-if='owner.group_ids && owner.group_ids.indexOf(1) > -1') Prilover <span class="txt_brand">Star</span>
        p.user-data__group.i-star-on(v-if='owner.group_ids && owner.group_ids.indexOf(3) > -1') It <span class="txt_brand">Girl</span>
      .profile__info
        h1.user-data__title {{ owner.full_name }}
        .profile__actions
          //-Notificaciones
          .user-data__notify
            router-link.user-data__reviews(
              v-if="owner.id",
              :to="{ name: 'reviews', params: { userId: owner.id } }")
              ul.user-data__list
                li.user-data__value.i-like {{ owner.ratings_positive_count }}
                li.user-data__value.i-like.i_flip {{ owner.ratings_negative_count }}
                li.user-data__value.i-less-circle {{ owner.ratings_neutral_count }}
            ul.user-data__list
              li.user-data__track {{ followers_count }} Seguidores
              li.user-data__track {{ owner.following_count }} Siguiendo
          //-Enlaces
          ul.user-data__nav(v-if="id && owner.id !== id")
            li.user-data__tag
              a.btn-tag.btn-tag_solid(
                v-if="loading")
                Dots
              a.btn-tag.btn-tag_solid(
                v-else-if="!follows"
                @click="follow") Seguir
              a.btn-tag.btn-tag_solid(
                v-else
                @click="unfollow") Siguiendo
            li.user-data__tag(v-if="owner.id")
              router-link.btn-tag(:to="{ name: 'privateMessage', params: { recipientId: owner.id }}") Enviar Mensaje
        .profile__actions(v-if="owner.location") {{ owner.location.region }}, {{ owner.location.province }}

    //- About perfil
    .profile__about
      .profile__box-txt.user-data__box-txt
        p.user-data__txt {{ owner.about }}
      .user-data__rating(v-if="ratings.length >= 1")
        .chat__line
          span.chat__inner
            .chat__bubble-main
              figure.chat-bubble__avatar.avatar_60(v-if="rating.buyer.picture")
                a(:href="'/closet/' + rating.buyer.id")
                  img.chat-bubble__img(
                    :src="rating.buyer.picture",
                    :alt="rating.buyer.first_name")
              span.chat-bubble__avatar.avatar_60(v-else)
                a(:href="'/closet/' + rating.buyer.id") {{ user.first_name.charAt(0) }}
              //- .chat-bubble__item
              //-   .chat-bubble__title.i-like Camila Cifuentes
              //-   p.chat-bubble__txt Excelente vendedora. Todo rápido y confiable
              .chat-bubble__item
                .chat-bubble__title {{ rating.buyer.full_name }}
                p.chat-bubble__txt
                  span.chat-bubble_ico(
                    :class="{ 'i-like' : rating.buyer_rating === 1, 'i-less-circle' : rating.buyer_rating === 0 , 'i-like i_flip' : rating.buyer_rating === -1 }") {{ rating.buyer_comment }}
</template>

<script>
import ratingsAPI from '@/api/rating'
import { mapState } from 'vuex'

export default {
  props: ['owner'],
  name: 'UserDataCloset',
  computed: {
    ...mapState('user', [
      'id',
      'following_ids'
    ]),
    follows () {
      return this.following_ids && this.following_ids.includes(this.owner.id)
    },
    coverId () {
      if (this.owner.first_name) {
        return (this.owner.first_name.charCodeAt(0) % 7) + 1
      }
    },
    followers_count () {
      const seemsFollowing = this.owner.followers_ids.includes(this.id) ? 1 : 0
      if (this.follows && !seemsFollowing) {
        return this.owner.followers_count + 1
      }
      if (!this.follows && seemsFollowing) {
        return this.owner.followers_count - 1
      }
      return this.owner.followers_count
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
    follow () {
      this.loading = true
      const data = {
        following_add: [this.owner.id]
      }
      this.$store.dispatch('user/update', data).finally(() => {
        this.loading = false
      })
    },
    unfollow () {
      this.loading = true
      const data = {
        following_remove: [this.owner.id]
      }
      this.$store.dispatch('user/update', data).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    ratingsAPI.getBySeller(this.$route.params.userId)
      .then(response => {
        this.ratings = response.data.data
        this.rating = this.ratings[this.ratings.length - 1]
      })
  }
}
</script>
