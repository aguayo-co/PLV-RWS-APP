<template lang="pug">
.layout-page
  BannerTop
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title Te contamos los tips de vendedoras top para lograr buenas limpiezas de clóset en Prilov
        p.blog__kicker "Desde que estoy en Prilov, hago limpieza de clóset todas las semanas y siempre encuentro más para vender"
        p.bolg__data <time datetime="2014-10-08">mié 08 oct 2014</time> por <a class="link_underline" href="closet/2" title="Autora Cony Sepúlveda">Cony Sepúlveda</a>
      article.blog__body
        .blog__spread
          .blog__copy
            figure.blog__picture
              img.blog__image(
                src="static/img/blog-tips-001.jpg"
                alt="Vendedoras top cuentan sus experiencias en Prilov")
            br
            p Nuestras vendedoras top nos cuentan sus experiencias en Prilov y cómo esta nueva opción de compartir sus clóset, se ha convertido no solo en un entretenido panorama, sino que también, en una importante fuente de ingresos.
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
                  :to="{ name: 'blog02' }") La gurú del orden
              dd
                router-link.link(
                  :to="{ name: 'blog03' }") Fast Fashion
              dd
                router-link.link(
                  :to="{ name: 'blog01' }") Las cuatro apps más usadas por fashion bloggers para editar sus fotos
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-tips-002.jpg"
              alt="Proceso de selección")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Proceso de selección: ¿Qué se queda, qué se va?
              p Estoy segura que todas tenemos algo en común: ¡AMAMOS la moda! La pregunta es, ¿realmente usamos todo nuestro clóset?
              p Soy una apasionada por la moda y me gusta cambiar de estilo constantemente. Entiendo que de una temporada a otra, mi clóset puede cambiar completamente y eso se refleja en un clóset con mucha ropa que ya no uso y que está disponible para ser vendida o intercambiada de forma regular. Lo realmente difícil es tomar la decisión de desprenderse de esa ropa que alguna vez fue tu favorita. Para hacerlo más fácil, lo mejor es preguntarse... ¿hace cuánto tiempo no lo uso? ¿Dos, tres, cuatro meses? Entonces ya no vale la pena que siga guardado ¿POR QUÉ? Si no la usas hace meses ¿Qué posibilidad hay de que las uses en los próximos meses? (Tomando en cuenta que es ropa de la estación).
              blockquote.blog__pullquote(
                cite='http://prilov.html')
                p.blog__quote ¿realmente usamos todo nuestro clóset?
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-tips-003.jpg"
              alt="PRILOV llega para solucionarnos la vida...")
          .blog__copy
            h2.blog__headline PRILOV llega para solucionarnos la vida...
            p Pero la limpieza de clóset no solo se trata de responder esa pregunta. La más importante es ¿Qué hago ahora con lo que ya no uso?
            p Selecciona adecuadamente tu ropa y súbela a tu perfil en Prilov. Harás muy feliz a más de una prilover y además ganas plata con esa ropa que estaba perdida en el clóset.
            p Debes elegir muy bien tu ropa: Si piensas que esa polera, no se la regalarías a una amiga, entonces Prilov no es su lugar. Por lo menos a mí, me gusta mantener mi perfil con ropa linda. Así sé que mis seguidoras volverán cada cierto tiempo a ver lo nuevo que subí. Por eso prefiero mantener la línea de ropa de calidad y ojalá todas hagamos lo mismo para mantener la página atractiva.
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-tips-004.jpg"
              alt="Me lo compro ahora, lo uso unas cuantas veces y después lo vendo en Prilov")
          .blog__copy
            .blog__subarticle
              p Prilov está provocando en mí un comportamiento muy particular. Ahora voy a comprar y pienso: "me lo compro ahora, lo uso unas cuantas veces y después lo vendo en Prilov".
              p Eso me encanta, porque me da la opción de tener un clóset totalmente cambiante y así las tenidas casi no se repiten. Hago limpiezas todas las semanas y sigo encontrando cosas para vender. Y lo mejor de todo, ¡sin mover un dedo!
              blockquote.blog__pullquote(
                cite='http://prilov.html')
                p.blog__quote me lo compro ahora, lo uso unas cuantas veces y después lo vendo en Prilov.
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Contenido',
  components: {
    BannerTop
  }
}

</script>
