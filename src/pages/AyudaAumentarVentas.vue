<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo puedo aumentar mis ventas?
        p.blog__kicker Todo lo que tienes que saber para vender mucho y ganar dinero en Prilov.
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog3-001.jpg", alt="Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov")
          .blog__copy
            h2.blog__headline Logra fotos que vendan ¡No necesitas ser fotógrafa profesional!
            ol
              li Usa luz natural: con la luz de día tu ropa se ve más real y clara.
              li Usa un fondo neutro. Busca fondos lisos.
              li Prepara tus productos. Si es necesario, lava, plancha o arregla tu producto antes de la foto.
              li Ideal tres fotos por ítem. De frente, por detrás y detalle.
              li Foto principal, un producto. La primera foto que eliges al momento de subir tus fotos, debe ser del producto único. No collage.
              li No uses flash. Frente al espejo no es buena idea usar flash.
              li Saca fotos verticales, no horizontales.
              li ¡Ponle cariño a tus fotos y tu perfil será mucho más atractivo! No necesitas ser fotógrafa profesional. ¡Sin complicarse! Si sigues estos consejos, seguro logras buenas fotos, incluso con tu celular ;)

    .blog__inner
      article.blog__body
        h2.blog__headline Dejar claro en tu perfil cómo vas a despachar ayudará a cerrar transacciones más rápido
        .blog__spread.blog__spread_upside
          .blog__copy
            p Mientras más detalles entregues de tu producto, más posibilidades tienes de venderlo. Cuéntanos qué tela es, cómo lo combinas mejor, si la talla corresponde a la realidad, el color de la foto muestra cómo es de verdad, para qué lo usaste más. ¡Todas queremos saber más!
          blockquote.blog__pullquote(
            cite='http://prilov.html')
            p.blog__quote Escribe buenas descripciones para cada producto
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog3-002-m.jpg')
        img.banner-slider__img(
          src='static/img/blog3-002.jpg')
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline Responde a tiempo las preguntas de otras prilovers
        .blog__copy
          p Recibirás mensajes de otras prilovers preguntando detalles de productos, dudas sobre el proceso, etc.. y como tú eres una prilover experta, podrás responder a tiempo. Recuerda que luego de que vendas un producto, la compradora podrá evaluar tu servicio y dejar un feedback. Para que te evalúe positivamente, contesta a tiempo sus preguntas.

      article.blog__body.blog__body_slot
        h2.blog__headline Oculta lo que ya no tienes disponible
        .blog__copy
          p ¡Evita que te evalúen negativamente, y nos ayudarás a mantener Prilov con un buen servicio!
          p Preocúpate por mantener tu perfil actualizado y nunca tengas a la venta un producto que no está disponible, ya que puede ser comprado en cualquier momento. Para ocultar un producto, sólo debes hacer clic en la opción <strong>"Ocultar producto"</strong> justo arriba de la imagen. Si tienes problemas ocultando productos, escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> o háblanos por el chat.
</template>

<script>

export default {
  name: 'AyudaAumentarVentas'
}

</script>
