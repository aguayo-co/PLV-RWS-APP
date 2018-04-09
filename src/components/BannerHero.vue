<template lang="pug">
.banner-hero
  .banner-hero__slot
    .banner-hero__head
      h3.banner-hero__title Vestidos
      h4.banner-hero__subtitle Cientos de estilos para ti
    .banner-hero__main
      a.banner-hero__btn.btn 50% en ropa de invierno
      a.banner-hero__btn.btn 20% en tu primera compra
  picture.banner-hero__crop
    source.banner-hero__img(media='(max-width: 640px)', srcset='/static/img/demo/banner-internal-m1.jpg')
    img.banner-slider__img(src='/static/img/demo/banner-internal.jpg')
</template>

<script>

export default {
  name: 'BannerHero'
}
</script>
