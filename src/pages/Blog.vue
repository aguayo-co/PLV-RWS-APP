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
              .slot__info.slot__info_top
                h3.slot__brand {{ article.title }}
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
          title: 'Todo lo que tienes que saber del nuevo Prilov',
          url: '/todo-lo-que-tienes-que-saber-del-nuevo-prilov',
          image: '/static/img/blog-thumb-005.jpg'
        },
        {
          title: 'Las cuatro apps más usadas por fashion bloggers para editar sus fotos.',
          url: '/las-cinco-apps-mas-usadas-por-fashion-bloggers-para-editar-sus-fotos',
          image: '/static/img/blog-thumb-001.jpg'
        },
        {
          title: 'Marie Kondo, la gurú del orden.',
          url: '/la-guru-del-orden',
          image: '/static/img/blog-thumb-002.jpg'
        },
        {
          title: 'Fast Fashion. Qué es y qué puedes hacer al respecto.',
          url: '/fast-fashion',
          image: '/static/img/blog-thumb-003.jpg'
        },
        {
          title: 'Tips de vendedoras top para lograr buenas limpiezas de clóset.',
          url: '/te-contamos-los-tips-de-vendedoras-top-para-lograr-buenas-limpiezas-de-closet-en-prilov',
          image: '/static/img/blog-thumb-004.jpg'
        }
      ]
    }
  }
}
</script>
