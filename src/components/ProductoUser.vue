<template lang="pug">
.layout-inner
  section.product-user
    //- User Profile
    header.single__header
      h2.subhead Sobre la vendedora
    //- data User
    .user-card
      .user-card__header
        .user-header
          .user-header__item
            .user-data__avatar.user-data__avatar_border
              img.user-data__img(
                :src="user.picture",
                :alt="'Perfil' + ' ' + user.full_name")
            p.user-data__group.i-star-on Prilover <span class="txt_brand">Star</span>
          .user-header__item
            h3.user-data__title
              | {{ user.first_name }} {{ user.last_name }}
            .user-data__notify
              ul.user-data__list
                li.user-data__value.i-like 20
                li.user-data__value.i-like.i_flip 0
                li.user-data__value.i-less-circle 0
              ul.user-data__list
                li.user-data__track {{ user.followers_count }} Seguidores
                li.user-data__track {{ user.following_count }} Siguiendo
      .user-card__content
        .user-card__tip
          p.user-card__txt {{ user.about }}
          p.user-card__actions
            span.user-card__link.i-email
              a(href='/' title='Enviar mensaje privado').link_underline Enviar mensaje privado
</template>
<script>

export default {
  name: 'ProductoUser',
  props: ['user']
}
</script>
