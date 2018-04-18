<template lang="pug">
.blog-banner.banner-hero
  .banner-hero__slot.banner-hero__slot_short
    .banner-hero__head.left
      h3.banner-hero__caption Te regalamos en tu primera compra
  picture.banner-hero__crop
    source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/demo/banner-blog-m.jpg')
    img.banner-slider__img(src='static/img/demo/banner-blog.jpg')
</template>

<script>

export default {
  name: 'Blogbanner'
}
</script>
