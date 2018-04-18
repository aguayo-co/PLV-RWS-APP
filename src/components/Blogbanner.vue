<template lang="pug">
figure.blog-banner.banner-hero
  .banner-hero__slot
    .banner-hero__head.left
      figcaption.banner-hero__caption Te regalamos en tu primera compra
  picture.banner-hero__crop
    source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/demo/banner-blog-m.jpg')
    img.banner-slider__img(src='static/img/demo/banner-blog.jpg')
</template>

<script>

export default {
  name: 'Blogbanner'
}
</script>
