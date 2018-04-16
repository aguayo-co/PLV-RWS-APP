<template lang="pug">
.banner-hero.banner-hero_user
  picture.banner-hero__crop
    source.banner-hero__img(media='(max-width: 640px)', srcset='/static/img/demo/banner-avatar-m.jpg')
    img.banner-slider__img(src='/static/img/demo/banner-avatar.jpg')
  .user-hero
    .user-hero__item
      .user-hero__head
        .user-data__avatar.user-data__avatar_border
          img.user-data__img(
          src="/static/img/demo/user-avatar-001.jpg")
        span.user-data__group.i-star-on Prilover
          strong.txt_brand Star
    .user-hero__item
      h3.user-data__title Damarys Saldaña
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
  name: 'BannerAvatar'
}
</script>
