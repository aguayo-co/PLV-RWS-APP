<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo devolver un producto?
        p.blog__kicker Todo lo que debes saber en el caso que recibiste un producto y no estás conforme
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog5-001.jpg"
              alt="Devolver un producto")
          .blog__copy
            h2.blog__headline 3. La vendedora no responde o no tiene el producto. Ponte en contacto con nosotras
            p Si la vendedora no tiene el producto que compraste, no te responde o no logras ponerte de acuerdo con ella para la entrega, entonces escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> y resolveremos tu problema.

    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline 2. Dejar claro en tu biografía cómo vas a despachar ayudará a cerrar transacciones más rápido
        .blog__copy
          p Te recomendamos escribir en tu biografía del perfil cuáles son tus métodos disponibles para el envío de tus productos. ¡Mientras más claro, mejor!
          p Además, recuerda entrar a tu Método de Envío, desde tu cuenta y elegir cómo quieres despachar. Para ver más información sobre los método de envío, puedes revisar este link.
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog3-002-m.jpg')
        img.banner-slider__img(
          src='static/img/blog3-002.png')
    .blog__inner
      article.blog__body
        h2.blog__headline 3. Escribe buenas descripciones para cada producto
        .blog__spread
          .blog__copy
            p Cuéntanos qué tela es, cómo lo combinas mejor, si la talla corresponde a la realidad, el color de la foto muestra cómo es de verdad, para qué lo usaste. Mientras más detalles entregues de tu producto, más posibilidades tienes de venderlo.  ¡Todas queremos saber más!
          blockquote.blog__pullquote(
            cite='http://prilov.html')
            p.blog__quote Mientras más detalle entregues de tu producto, más posibilidades de venderlo.
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline 4. Responde a tiempo las preguntas de otras prilovers
        .blog__copy
          p Recibirás mensajes de otras prilovers preguntando detalles de productos, dudas sobre el proceso, etc. y como tú eres una prilover experta, podrás responder a tiempo. Recuerda que luego de que vendas un producto, la compradora podrá evaluar tu servicio y dejar un feedback. Para que te evalúe positivamente, contesta a tiempo sus preguntas.
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline 5. Elimina lo que ya no tienes
        .blog__copy
          p ¡Evita que te evalúen negativamente, y nos ayudarás a mantener Prilov con un buen servicio!
          p Preocúpate por mantener tu perfil actualizado y nunca tengas a la venta un producto que no está disponible, ya que puede ser comprado en cualquier momento. Para eliminar un producto, debes ir a la vista de <strong>Tu Clóset</strong> y hacer click en el ícono de basurero justo arriba de la imagen del producto que quieras eliminar.
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog3-003-m.png')
        img.banner-slider__img(
          src='static/img/blog3-003.png')
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline 6. Oculta lo que aún no estás segura de vender
        .blog__copy
          p Si necesitas ocultar temporalmente un producto, puedes usar la opción <strong>Ocultar producto</strong>.
          p Para ocultar un producto, debes ir a la vista de <strong>Tu Clóset</strong> y hacer click en el ícono de ojo, justo arriba de la imagen del producto que quieras ocultar. Siempre podrás ver tus productos ocultos en <strong>Tu Clóset</strong> y volverlos a habilitar para que queden nuevamente disponibles.
          p Si tienes problemas eliminando u ocultando productos, escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> o háblanos por el chat.
</template>

<script>

export default {
  name: 'AyudaAumentarVentas'
}

</script>
