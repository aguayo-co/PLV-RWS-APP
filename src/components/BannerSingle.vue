<template lang="pug">
.single__banner
  .single__banner__slot.right
    h3.single__banner__title.bg_white Puedes ser una PRILOVER STAR sólo por $15.000 anuales
  picture.single__banner__crop
    source.single__banner__img(media='(max-width: 640px)', srcset='/static/img/demo/banner-internal_closet-m1.jpg')
    img.single__banner__img(src='/static/img/demo/banner-internal_closet.jpg')
</template>

<script>

export default {
  name: 'BannerSingle'
}
</script>
