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
            ul.user-data__list
              li.user-data__value.i-like {{ user.ratings_positive_count }}
              li.user-data__value.i-like.i_flip {{ user.ratings_negative_count }}
              li.user-data__value.i-less-circle {{ user.ratings_neutral_count }}
            ul.user-data__list
              li.user-data__track {{ user.followers_count }} Seguidores
              li.user-data__track {{ user.following_count }} Siguiendo
          //-Enlaces
          ul.user-data__nav(v-if="userId")
            li.user-data__tag
              a.btn-tag.btn-tag_solid(@click="follow") Seguir
            li.user-data__tag
              router-link.btn-tag(:to="{ name: 'privateMessage', params: { recipientId: user.id }}") Enviar Mensaje
    //- About perfil
    .profile__about
      .profile__box-txt.user-data__box-txt
        p.user-data__txt {{ user.about }}
      .user-data__rating
        .chat__line
          span.chat__inner
            .chat__bubble-main
              figure.chat-bubble__avatar.avatar_60
                img.chat-bubble__img(
                  src="static/img/demo/user-avatar.jpg",
                  alt="Avatar")
              .chat-bubble__item
                .chat-bubble__title.i-like Camila Cifuentes
                p.chat-bubble__txt Excelente vendedora. Todo rápido y confiable
</template>

<script>

// import { mapGetters, mapState } from 'vuex'
import usersAPI from '@/api/user'

export default {
  props: ['user'],
  name: 'UserDataCloset',
  computed: {
    userId () {
      return this.$store.getters['user/id']
    },
    coverId () {
      if (this.user.first_name) {
        return (this.user.first_name.charCodeAt(0) % 7) + 1
      }
    }
  },
  methods: {
    follow: function () {
      const data = {
        id: this.userId,
        following_add: [this.$route.params.userId]
      }
      usersAPI.update(data)
        .then(response => {
        })
    }
  }
}
</script>
