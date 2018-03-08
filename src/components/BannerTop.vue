<template lang="pug">
.layout-inner
  //- banner promociones
  //- TO-DO: consumir servicios
  .banner-top
    .banner-top__item(
      v-for='banner in bannerTop')
      a.banner-top__lead(
        :href='banner.url',
        :title='banner.title')
        p.banner-top__title {{ banner.title }}
        p.banner-top__subtitle
          |{{ banner.subtitle }} <span class="link_underline" v-if="banner.button_text">{{ banner.button_text }}</span>
</template>

<script>
export default {
  name: 'BannerTop',
  data () {
    return {
      bannerTop: [
        {
          id: '',
          name: '',
          title: 'Vestidos a Mitad de precio',
          subtitle: 'Oferta por tiempo limitado.',
          button_text: '',
          image: '',
          url: '#'
        },
        {
          id: '',
          name: '',
          title: 'Inscríbete en el Newsletter por 25% OFF',
          subtitle: 'Recibe promociones',
          button_text: 'Inscribirse',
          image: '',
          url: '#'
        },
        {
          id: '',
          name: '',
          title: 'Cómo Funciona Prilov',
          subtitle: '',
          button_text: 'Guía de la Prilover',
          image: '',
          url: '#'
        }
      ]
    }
  }
}
</script>
