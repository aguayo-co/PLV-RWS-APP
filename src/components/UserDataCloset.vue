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
        p.user-data__group.i-star-on(v-if='owner.group_ids && owner.group_ids.indexOf($store.getters["ui/priloverStarId"]) > -1') Prilover <span class="txt_brand">Star</span>
        p.user-data__group.i-star-on(v-if='owner.group_ids && owner.group_ids.indexOf($store.getters["ui/itGirlId"]) > -1') It <span class="txt_brand">Girl</span>
      .profile__info
        h1.user-data__title {{ owner.full_name }}
        .profile__actions
          //-Notificaciones
          .user-data__notify
            router-link.user-data__reviews(
              v-if="owner.id",
              :to="{ name: 'reviews', params: { userId: owner.id } }")
              ul.user-data__list
                li.user-data__value.i-like {{ owner.ratings_positive_total_count }}
                li.user-data__value.i-like.i_flip {{ owner.ratings_negative_total_count }}
                li.user-data__value.i-less-circle {{ owner.ratings_neutral_total_count }}
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
      .user-data__rating(v-if="rating")
        .chat__line
          span.chat__inner
            .chat__bubble-main
              figure.chat-bubble__avatar.avatar_60(v-if="rating.rater.picture")
                a(:href="'/closet/' + rating.rater.id")
                  img.chat-bubble__img(
                    :src="rating.rater.picture",
                    :alt="rating.rater.first_name")
              span.chat-bubble__avatar.avatar_60(v-else)
                a(:href="'/closet/' + rating.rater.id") {{ rating.rater.first_name.charAt(0) }}
              //- .chat-bubble__item
              //-   .chat-bubble__title.i-like Camila Cifuentes
              //-   p.chat-bubble__txt Excelente vendedora. Todo rápido y confiable
              .chat-bubble__item
                .chat-bubble__title {{ rating.rater.full_name }}
                p.chat-bubble__txt
                  span.chat-bubble_ico(
                    :class="{ 'i-like' : rating.rating === 1, 'i-less-circle' : rating.rating === 0 , 'i-like i_flip' : rating.rating === -1 }") {{ rating.comment }}
</template>

<script>
import ratingsAPI from '@/api/rating'
import { mapState } from 'vuex'

export default {
  props: ['owner'],
  name: 'UserDataCloset',
  computed: {
    rating () {
      if (!this.ratingAsSeller && !this.ratingAsBuyer) {
        return
      }

      if (!this.ratingAsBuyer || (this.ratingAsSeller && this.ratingAsSeller.updated_at > this.ratingAsBuyer.updated_at)) {
        return {
          rater: this.ratingAsSeller.buyer,
          rating: this.ratingAsSeller.buyer_rating,
          comment: this.ratingAsSeller.buyer_comment
        }
      }

      return {
        rater: this.ratingAsBuyer.seller,
        rating: this.ratingAsBuyer.seller_rating,
        comment: this.ratingAsBuyer.seller_comment
      }
    },
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
      const seemsFollowing = this.owner.followers_ids && this.owner.followers_ids.includes(this.id)
      const followersCount = this.owner.followers_count || 0
      if (this.follows && !seemsFollowing) {
        return followersCount + 1
      }
      if (!this.follows && seemsFollowing) {
        return followersCount - 1
      }
      return followersCount
    }
  },
  data () {
    return {
      ratingAsBuyer: null,
      ratingAsSeller: null,
      exists: 'si',
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
    ratingsAPI.getLatestBySeller(this.$route.params.userId)
      .then(response => {
        if (response.data.data.length) {
          this.ratingAsSeller = response.data.data[0]
        }
      })

    ratingsAPI.getLatestByBuyer(this.$route.params.userId)
      .then(response => {
        if (response.data.data.length) {
          this.ratingAsBuyer = response.data.data[0]
        }
      })
  }
}
</script>
