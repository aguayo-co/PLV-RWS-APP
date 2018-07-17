<template lang="pug">
.layout-page
  BannerTop
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title La gurú del orden
        p.blog__kicker Marie Kondo es la creadora de un método que ha llevado el orden a otro nivel. Aquí les contamos en qué consiste y cómo hacerlo.
        p.bolg__data <time datetime="2017-10-15">dom 15 oct 2017</time> por <a class="link_underline" href="closet/2" title="Autor The Prilov Team">The Prilov Team</a>
      article.blog__body
        .blog__spread
          .blog__copy
            figure.blog__picture
              img.blog__image(
                src="static/img/blog-guru-001.jpg"
                alt="Marie Kondo")
            br
            p Marie Kondo es el nombre de la mujer japonesa detrás de lo que podríamos llamar “la ciencia del orden”. Desde pequeña su obsesión ha sido el orden y se la pasaba leyendo revistas y libros de decoración. A los 19 decidió fundar su propia consultora para la organización del hogar y desde entonces se ha dedicado a perfeccionar su método, el cual llama KonMari. Hace unos años lanzó el libro “La magia del orden” donde describe todos los aspectos del proceso de organizar. Su alcance ha sido tal que fue nombrada como una de las “100 personas más influyentes de 2015” por la revista Times y la gente está empezando a hablar de “kondear” en lugar de ordenar.
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
                  :to="{ name: 'blog01' }") Las cuatro apps más usadas por fashion bloggers para editar sus fotos.
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
            img.blog__image(src="static/img/blog-guru-002.jpg", alt="Tener armonía en tu entorno te permite proyectarte con mayor claridad")
          .blog__copy
            .blog__subarticle
              h2.blog__headline ¿Por qué aplicarlo?
              p Hacerlo nos ayuda a ser consciente de nuestro estilo de vida, y el modo en que organizas las cosas será una respuesta a tus valores y cómo quieres vivir. A medida que aplicas el método vas a llegar a un punto en que alcanzarás la cantidad de objetos que es óptima para tí. Notarás un cambio en muchos aspectos de tu vida, ya que tener armonía en tu entorno te permite proyectarte con mayor claridad.
              p Demás está decir que es una buena oportunidad para vender tus pilchas en Prilov y renovar tu closet.
    .blog__inner
      article.blog__body
        h2.blog__headline ¿Qué se queda y qué se va?
        .blog__spread
          .blog__copy
            p Para decidir con qué nos quedamos debemos preguntarnos ¿Trae esto felicidad a mi vida? Al comienzo puede ser difícil, por eso recomienda hacerlo por categorías, partiendo por lo más fácil, la ropa, luego papeles y libros, otros objetos, y por últimos aquellos con un valor sentimental, como las fotos. Es necesario ordenarlo todo de una vez. Por eso si tienes tu ropa en closets distintos, o en cajas, debes asegurarte de juntar todo en un lugar antes de empezar.
            p Recuerda, la clave está en quedarse solo aquello que te hace feliz, y no decidir en base a su funcionalidad, sino de aseguro terminará en un montón al fondo de tu closet ¿Guardar ropa vieja y fea para estar en la casa? olvídalo! no porque estés en tu casa debes vestir ropa que no te gusta. Y lo que es más difícil aún (y lo digo por experiencia), no te quedes con las cosas que te da pena botar y que ya cumplieron su ciclo en tu closet. Te aseguro que en Prilov hay una nueva dueña esperando para sacarles el jugo.
          blockquote.blog__pullquote(
            cite='https://www.prilov.com')
            p.blog__quote ¿Guardar ropa vieja y fea para estar en la casa? ¡olvídalo!
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-guru-003.png"
              alt="¡Cajas, amadas cajas! Marie Kondo propone utilizar cajas para TODO")
          .blog__copy
            h2.blog__headline ¡Cajas, amadas cajas!
            p Una vez que seleccionamos lo que se queda viene otro gran desafío: ordenarlo.
            p Marie Kondo propone utilizar cajas para TODO. Desde organizar la ropa interior dentro de los cajones, el shampoo en la ducha, hasta separar los utensilios en la cocina. No es necesario que compres todos los organizadores que se te crucen en el camino, basta con usar cajas de zapatos! Cumplen perfectamente la función y <strong>te ahorras $$$</strong>.
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline El orden vertical
        .blog__copy
          p Para qué vamos a andar con cosas, los tips que les hemos dado hasta ahora son útiles, pero nada nuevo. Tranquilas, ya viene el mejor descubrimiento: el orden vertical. Es una manera de ordenar la ropa en tu closet que te permite aprovechar mejor el espacio y tener todo a la vista, así no tienes que revolver todo hasta encontrar lo que buscas. La clave está en doblar del modo tradicional y luego un par de veces más hasta que la ropa pueda sostenerse sola.
          blockquote.blog__pullquote(
            cite='https://www.prilov.com')
            p.blog__quote Las animamos a que se hagan un tiempito y lo prueben! Nosotras lo hicimos y la diferencia se nota!
    .blog__inner
      .blog__copy
        p Les dejamos un vídeo de cómo hacerlo.
      .video-box
        iframe(
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Lpc5_1896ro?rel=0"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen)
</div>
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Blog02',
  components: {
    BannerTop
  }
}

</script>
