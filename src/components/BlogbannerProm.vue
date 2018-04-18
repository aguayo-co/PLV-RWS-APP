<template lang="pug">
figure.blog-bannerprom.banner-hero
  .banner-hero__slot
    .banner-hero__head
      figcaption.banner-hero__title Belleza Interior
      span.banner-hero__subtitle Cientos de estilos para tí
    .banner-hero__main
      a.banner-hero__btn.btn(href='#') 50% en vestidos cortos
  picture.banner-hero__crop
    source.banner-hero__img(
      media='(max-width: 640px)', srcset='static/img/demo/banner-internal-m1.jpg')
    img.banner-slider__img(
      src='static/img/demo/banner-internal.jpg')
</template>

<script>

export default {
  name: 'BlogbannerProm'
}
</script>
