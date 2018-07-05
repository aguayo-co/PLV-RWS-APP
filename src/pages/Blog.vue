<template lang="pug">
.layout-page
  BannerTop
  section.section_product.prod-gridlight
    header.section__head
      h1.title_head
        span.txt_brand Prilov &nbsp;
        | Blog
      h2.title_subhead Tendencias, entrevistas, consejos, recomendados.
    .gridlight
      .section_product__scroll
        .product-grid
          //- For each producto
          article.slot.slot_grid(v-for="article in articles")
            .slot__product-inner
              router-link.slot__product(
                :to="article.url",
                :title="article.title")
                img.slot__img(
                  :src="article.image",
                  :alt="article.title")
              .slot__lead
                .slot__title {{ article.title }}
  ButtonSticky
</template>

<script>
import BannerTop from '@/components/BannerTop'
import ButtonSticky from '@/components/ButtonSticky'

export default {
  name: 'Instashop',
  components: {
    BannerTop,
    ButtonSticky
  },
  data () {
    return {
      articles: [
        {
          title: 'Las cuatro apps más usadas por fashion bloggers para editar sus fotos.',
          url: '#',
          image: ''
        },
        {
          title: 'Marie Kondo, la gurú del orden.',
          url: '#',
          image: ''
        },
        {
          title: 'Fast Fashion. Qué es y qué puedes hacer al respecto.',
          url: '#',
          image: ''
        },
        {
          title: 'Tips de vendedoras top para lograr buenas limpiezas de clóset.',
          url: '#',
          image: ''
        }
      ]
    }
  }
}
</script>
