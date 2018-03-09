<template lang="pug">
  //- banner promociones grid
  //- TO-DO: consumir servicios
  .banner-grid
    article.banner(
      v-for='banner in bannerGrid')
      a.banner__item(
        :href='banner.url',
        :title='banner.button_text')
        .banner__content(
          v-if="mqSmallMax")
          .banner__lead
            h3.banner__title.title_line {{ banner.title }}
            p.banner__txt {{ banner.subtitle }}
        .banner__figure
          img.banner__img(
            :src='banner.image',
            :alt='banner.title')
        .banner__content
          .banner__lead(
            v-if="mqSmall")
            h3.banner__title.title_line {{ banner.title }}
            p.banner__txt {{ banner.subtitle }}
          .banner__foot(
            v-if="banner.button_text")
            span.btn {{ banner.button_text }}

</template>

<script>

export default {
  name: 'BannerGrid',
  data () {
    return {
      bannerGrid: [
        {
          id: '',
          name: '',
          title: 'Blazers',
          subtitle: '¿Ya tienes el tuyo?',
          button_text: 'Mira los Blazers',
          image: '/static/img/demo/banner-001.jpg',
          url: '#'
        },
        {
          id: '',
          name: '',
          title: 'Maaji',
          subtitle: '¡Nos encantan todos!',
          button_text: 'Ver el catálogo de Maajis',
          image: '/static/img/demo/banner-002.jpg',
          url: '#'
        },
        {
          id: '',
          name: '',
          title: 'Denim',
          subtitle: '¡Siempre tiene ONDA!',
          button_text: 'Ver todos los denim',
          image: '/static/img/demo/banner-003.jpg',
          url: '#'
        }
      ]
    }
  }
}
</script>
