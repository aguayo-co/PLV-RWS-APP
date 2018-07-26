<template lang="pug">
.layout-page
  BannerTop
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title  Una historia que queremos compartir…
        p.bolg__data <time datetime="2014-10-27">Vie 20 jul 2018</time> por <a class="link_underline" href="closet/2" title="Autora Cony Sepúlveda">Cony Sepúlveda</a>
      article.blog__body
        .blog__spread
          .blog__copy
            p Hace un tiempo dejé de usar completamente los filtros de Instagram. Ya era mucha foto pasada a Valencia y a X-PRO. Ahora tengo mis apps favoritas y son las más usadas por fashion bloggers.
            p Hice una búsqueda y me recorrí la App Store entera, Android Marketplace, y las cuentas de las bloggers más famosas . Creo que lo logré, y ahora lo comparto con todas las prilovers.
            figure.blog__picture
              img.blog__image(
                src="static/img/blog-app-001.png"
                alt="Apps más usadas por fashion bloggers")
          aside.blog-side
            dl
              dt
                router-link.link(:to="{ name: 'como-comprar' }") ¿Cómo Comprar en Prilov?
              dd Paso a paso: Todo lo que tienes que saber para comprar en Prilov. <router-link class="link_underline" :to="{ name: 'como-comprar' }">Encuentra lo que quieres.</router-link>
              dt
                router-link.link(:to="{ name: 'como-funciona' }") ¿Cómo funciona Prilov?
              dd Elige la ropa que no usas y dale una segunda oportunidad. <router-link class="link_underline" :to="{ name: 'como-funciona' }">Convierte tu clóset en tu propia tienda</router-link>
            dl
              dt Relacionados
              dd
                router-link.link(
                  :to="{ name: 'blog06' }") Una historia que queremos compartir…
              dd
                router-link.link(
                  :to="{ name: 'blog05' }") Todo lo que tienes que saber del nuevo Prilov.
              dd
                router-link.link(
                  :to="{ name: 'blog02' }") Marie Kondo, la gurú del orden.
              dd
                router-link.link(
                  :to="{ name: 'blog03' }") Fast Fashion. Qué es y qué puedes hacer al respecto.
              dd
                router-link.link(
                  :to="{ name: 'blog04' }") Tips de vendedoras top para lograr buenas limpiezas de clóset.
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(src="static/img/blog-app-002.jpg", alt="App VSCOCAM - iOS y Android")
          .blog__copy
            .blog__subarticle
              h2.blog__headline VSCOCAM - iOS y Android (Gratis)
              p Esta app tiene los filtros más increíbles que se han inventado en la tierra, son sólo 9, pero son los mejores 9. Mucho más precisos y "limpios" que los de instagram, te da esa sensación de haber sacado tus fotos de una escena de película envejecida. También puedes subir tus imágenes en la misma app y seguir a fotógrafos profesionales. La interface no es ultra amigable, pero después de un tiempo de uso, se les hará más fácil.
              p Filtros preferidos: B1, M3 Y T1.
              blockquote.blog__pullquote(
                cite='https://vsco.co/store/app')
                p.blog__quote #WETHECREATORS
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-app-003.png"
              alt="App Snapseed - iOS y Android")
          .blog__copy
            h2.blog__headline Snapseed - iOS y Android (Gratis)
            p Con esta app, olvídate de las fotos sin luz. Si tu foto fue tomada en el lado oscuro, esta app la hará brillar como nunca. Para lograrlo recomiendo la herramienta sombras, brillo y contraste.
            p Y si buscas resaltar cada textura de la foto, seleccionas el filtro "drama" y verás detalles que no habías descubierto antes en tu foto.
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-app-004.png"
              alt="Whitagram - iOS y Android")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Whitagram - iOS y Android (Gratis)
              p Le da a tus fotos ese espacio blanco perfecto para que entren en el cuadrado de instagram sin cortar ninguna parte de la foto. Es como si estuviera perfectamente creada para el #ootd mostrándote de pies a cabeza sin cortar tus bellos zapatos.
              p Yo antes usaba "Instasize", pero me gusta más Whitagram.
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-app-005.jpg"
              alt="App Afterlight - iOS y Android")
          .blog__copy
            h2.blog__headline Afterlight - iOS y Android (USD 0.99)
            p Si tuviera que elegir una sola, sin dudarlo me quedo con esta. Muy parecida a Photoshop, pero mil veces más simple y fácil de usar.
            p Tienes más de 60 filtros, sí más de SESENTA, 15 herramientas distintas para editar las fotos y puedes jugar con la textura de las imágenes.
            p Filtro preferido: comidas-clarify / paisajes-russ / outfit-horine.
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-app-006.jpg"
              alt="Whitagram - iOS y Android")
          .blog__copy
            .blog__subarticle
              p.blog__note BONUS
              h2.blog__headline  SparkMode by Mirrorgram - iOS (Gratis)
              p Seguro que han visto mucho este tipo de foto este último tiempo en las cuentas de instagram de muchas bloggers o referentes de moda. Es la "foto doble" que te crea una gemela con el efecto de espejo.
              p Muy fácil de usar y perfecta si quieren mostrar su outfit frente al espejo.
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Blog01',
  components: {
    BannerTop
  }
}

</script>
