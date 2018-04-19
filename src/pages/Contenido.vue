<template lang="pug">
.layout-page
  section.blog
    BannerTop
    Blogbanner
    header.blog__header
      h1.blog__title Ernesto cervantes es el modelo de calvin klein representando la herencia latina
      p.blog__kicker El modelo de padres mexicanos es parte vital de la nueva generación de Calvin Klein
    article.blog__body
      h2.headline El modelo de padres mexicanos es parte vital de la nueva generación de Calvin Klein salida de la mente de Raf Simons.
      .blog__spread
        .blog__copy
          p Ernesto Cervantes tuvo una oportunidad como nadie más en la industria: abrió el primer desfile de Raf Simons en Calvin Klein, formando parte de la nueva generación de la marca estadounidense bajo el mando del genio belga. De padres mexicanos, Ernesto nació en Orange County, pero creció en Perris, California, tiempo en el cual aprendió las virtudes de salirse de la cotidianidad y el confort que su entorno le ofrecía. Desde su lanzamiento como modelo exclusivo de Calvin Klein, también fue uno de los protagonistas en el video de The xx I Dare You, i-D platicó con él desde California para saber qué pensaba sobre representar su herencia mexicana en la nueva era de una marca conocida como uno de los pilares de la moda estadounidense.
          a.link_underline(
            href='#') ¿Te gustaría comprar en Prilov?
        aside.blog-side
          dl
            dt ¿Cómo vender en prilov?
            dd Convierte tu clóset en tu propia tienda
            dt ¿Cómo Comprar en Prilov?
            dd La ropa que te gusta, es tuya
          dl
            dt Marcas
            dd
              a.link_underline(
                href='#') Adidas
            dd
              a.link_underline(
                href='#') Asos
            dd
              a.link_underline(
                href='#') Converse
            dd
              a.link_underline(
                href='#') Forever 21
            dd
              a.link_underline(
                href='#') Foster
    BlogbannerProm
    h4.blog__subhead Marcas disponibles en Prilov
    ul
      li Adidas
      li Asos
        ul
          li 020
          li Vestidos
            ul
              li Vestidos cortos
      li Converse
      li Forever 21
      li Foster
    h4.blog__subhead Las prendas más vendidas en Prilov
    ol
      li Chaquetas
      li Vestidos
      li Vestidos cortos
      li Pantalones
      li Zapatos
      li Chaquetas
      li Vestidos
      li Vestidos cortos
      li Pantalones
      li Zapatos

</template>

<script>
import BannerTop from '@/components/BannerTop'
import Blogbanner from '@/components/Blogbanner'
import BlogbannerProm from '@/components/BlogbannerProm'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BlogbannerProm,
    Blogbanner
  }
}

</script>
