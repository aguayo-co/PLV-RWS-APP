<template lang="pug">
section.profile
  .cover
    .cover__banner(v-if="user.cover")
      img.cover__picture(:src='user.cover')
    .cover__banner(v-else)
      //-1800 * 720 - 5:2 -
      img.cover__picture(src='/static/img/user-cover.jpg')
  .profile__user
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
            li.user-data__track {{ followers_count }} Seguidores
            li.user-data__track {{ following_count }} Siguiendo
        //-Enlaces
        ul.user-data__nav
          li.user-data__tag
            router-link.btn-tag.btn-tag_solid(:to="{ name: 'home'}") Seguir
          li.user-data__tag
            router-link.btn-tag(:to="{ name: 'home'}") Enviar Mensaje
//-old
//.banner-hero.banner-hero_user
  picture.banner-hero__crop(v-if="user.cover")
    source.banner-hero__img(media='(max-width: 640px)', :srcset='user.cover')
    img.banner-slider__img(:src='user.cover')
  picture.banner-hero__crop(v-else)
      source.banner-hero__img(media='(max-width: 640px)', srcset='/static/img/demo/banner-avatar-m.jpg')
      img.banner-slider__img(src='/static/img/demo/banner-avatar.jpg')
  .user-hero
    .user-hero__item
      .user-hero__head
        .user-data__avatar.user-data__avatar_border
          img.user-data__img(
            v-if="user.picture"
            :src="user.picture")
          span.tool-user__letter(v-if="!user.picture && user.first_name") {{ user.first_name.charAt(0) }}
    .user-hero__item
      h3.user-data__title {{ user.first_name }} {{ user.last_name }}
      .user-hero__notify
        ul.user-data__list
          li.user-data__value.i-like 20
          li.user-data__value.i-like.i_flip 0
          li.user-data__value.i-less-circle 0
        ul.user-data__list
          li.user-data__item
            a.link_underline(href='#') Seguidores
          li.user-data__item
            a.link_underline(href='#') Siguiendo
        ul.user-data__list
          li.user-data__item
            a.btn-tag.btn-tag_solid(href='#') Seguir
          li.user-data__item
            a.btn-tag(href='#') Enviar Mensaje
</template>

<script>

export default {
  props: ['user'],
  name: 'BannerAvatar'
}
</script>
