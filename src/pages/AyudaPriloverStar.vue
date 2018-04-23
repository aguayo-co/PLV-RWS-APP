<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¡Quiero ser una Prilover Star!
        p.blog__kicker Entérate cómo puedes ser una Prilover Star.
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline Puedes ser una Prilover Star sólo por $15.000 anuales
        .blog__copy
          ol
            li Debes ir a <strong>"Tu cuenta"</strong> y darle click al botón <strong>"Ser Prilover Star"</strong>
            li Si tienes créditos suficientes, te daremos la opción de canjear 15.000 para convertirte en Prilover Star con un click más.<sup>*</sup>
            li Si no tienes créditos suficientes, escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> con asunto "Prilover Star" y nos pondremos de acuerdo para que empieces a disfrutar de todos los beneficios.<sup>*</sup>
            //  [opción paso 3 sólo si podemos habilitar la funcionalidad]
                Si no tienes créditos suficientes, te daremos la opción de comprarlos y efectuar el pago directamente en línea a través de mercado pago, pay u o transferencia bancaria. Una vez lo realices podras empezar a disfrutar de todos los beneficios.
          p.blog__note <sup>*</sup>Si tus fotos y productos no cumplen con el requisito mínimo de aprobación (revisar manual de cómo sacar buenas fotos) no podremos permitirte ser una Prilover STAR.
      article.blog__body.blog__body_slot
        h2.blog__headline Tus beneficios exclusivos como Prilover Star:
        .blog__copy
          ol
            li Tu perfil aparecerá en los primeros lugares en la sección "Prilovers".
            li Tu perfil tendrá un sello especial "Prilover Star", al igual que tus productos.
            li Siempre estaremos pendientes de ti y contestaremos tus mensajes en tiempo record.
            li Tu productos serán promocionados en nuestros newsletters y si cumplen con nuestra línea editorial, también en redes sociales.
</template>

<script>

export default {
  name: 'AyudaPriloverStar'
}

</script>
