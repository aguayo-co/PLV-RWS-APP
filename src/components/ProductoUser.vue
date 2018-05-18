<template lang="pug">
.layout-inner
  section.product-user
    //- User Profile
    header.single__header
      h2.subhead Sobre la vendedora
    //- data User
    .user-data
      .user-header
        .user-header__item.user-item_gutter
          .user-data__avatar.user-data__avatar_small
            img.user-data__img(
              v-if="userData.picture"
              :src="userData.picture",
              :alt="'Perfil' + ' ' + userData.first_name")
            span.profile__letter(v-if="!userData.picture && userData.first_name") {{ userData.first_name.charAt(0) }}
        .user-header__item.user-iten_grow
          h3.user-data__title {{ userData.first_name }} {{ userData.last_name }}
          .user-data__subitem
            //-Notificaciones
            .user-data__block
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
export default {
  name: 'ProductoUser',
  props: ['user'],
  computed: {
    userData () {
      return this.user
    }
  }
}
</script>
