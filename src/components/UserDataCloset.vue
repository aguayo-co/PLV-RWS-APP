<template lang="pug">
section.profile
  .cover
    .cover__banner(v-if="user.cover")
      img.cover__picture(:src='user.cover')
    .cover__banner(v-else)
      //-1800 * 720 - 5:2 -
      img.cover__picture(src='/static/img/user-cover.jpg')
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
              li.user-data__value.i-like 20
              li.user-data__value.i-like.i_flip 0
              li.user-data__value.i-less-circle 0
            ul.user-data__list
              li.user-data__track {{ user.followers_count }} Seguidores
              li.user-data__track {{ user.following_count }} Siguiendo
          //-Enlaces
          ul.user-data__nav
            li.user-data__tag
              a.btn-tag.btn-tag_solid(@click="follow") Seguir
            li.user-data__tag
              router-link.btn-tag(:to="{ name: 'home'}") Enviar Mensaje
    //- About perfil
    .profile__about
      .profile__box-txt.user-data__box-txt
        p.user-data__txt {{ user.about }}
      .user-data__rating
        .chat__line
          span.chat__inner
            .chat__bubble-main
              figure.chat-bubble__avatar.avatar_60
                img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
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
    }
  },
  methods: {
    follow: function () {
      console.log(this.user.id)
      console.log(this.userId)
      console.log(this.$route.params.userId)
      const data = {
        following_add: [this.$route.params.userId]
      }
      usersAPI.updateFollowing(this.userId, data)
        .then(response => {
          console.log('ok')
        })
    }
  }
}
</script>
