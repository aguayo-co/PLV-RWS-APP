<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¡Quiero ser una Prilover Star!
        p.blog__kicker Entérate qué es y cómo puedes ser una Prilover Star
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog4-001.jpg", alt="Ser una Prilover Star")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Tus beneficios exclusivos como Prilover Star:
              ol
                li Tu perfil aparecerá en los primeros lugares en la sección <strong>"Prilovers"</strong>.
                li Tu perfil tendrá un sello especial <strong>"Prilover Star"</strong>, al igual que tus productos.
                li Siempre estaremos pendientes de ti y contestaremos tus mensajes en tiempo récord.
                li Tu productos serán promocionados en nuestros newsletters y si cumplen con nuestra línea editorial, también en redes sociales.
            .blog__subarticle
              h2.blog__headline Puedes ser una Prilover Star sólo por $15.000 anuales
              ol
                li Si tienes créditos suficientes, te daremos la opción de canjear 15.000 para convertirte en Prilover Star.<sup>*</sup>
                li Para hacerlo, debes  ir a <strong>"Tu cuenta"</strong> y darle click al botón <strong>"Ser Prilover Star"</strong>.
                li Si no tienes créditos suficientes, escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> con asunto <strong>"Prilover Star"</strong> y te ayudaremos para que hagas el pago y empieces disfrutar de todos los beneficios.<sup>*</sup>
                //  [opción paso 3 sólo si podemos habilitar la funcionalidad]
                    Si no tienes créditos suficientes, te daremos la opción de comprarlos y efectuar el pago directamente en línea a través de mercado pago, pay u o transferencia bancaria. Una vez lo realices podras empezar a disfrutar de todos los beneficios.
              p.blog__note <sup>*</sup>Si tus fotos y productos no cumplen con el requisito mínimo de aprobación (revisar manual de cómo sacar buenas fotos) no podremos permitirte ser una Prilover STAR.
</template>

<script>

export default {
  name: 'AyudaPriloverStar'
}

</script>
