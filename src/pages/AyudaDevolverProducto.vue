<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo devolver un producto?
        p.blog__kicker Todo lo que debes saber en el caso que recibiste un producto y no estás conforme
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog5-002.jpg", alt="Puedes volver a publicarlo en Prilov")
          .blog__copy
            .blog__subarticle
              h2.blog__headline 1. Puedes volver a publicarlo en Prilov
              p Cuando recibes un producto que no no te quedó como esperabas, la opción que muchas usan y la más sencilla, es volver a publicarlo en Prilov, pero ahora en tu perfil y dejarlo nuevamente a la venta. Puedes ocupar las mismas fotos o sacarle fotos nuevas.
            .blog__subarticle
              h2.blog__headline 2. Solicita la devolución en Prilov y conversa con la vendedora
              p Una vez que decidas devolver un producto, lo primero que tienes que hacer es ingresar a Tus Compras y en la vista de la compra, marcar  <strong>"¿Algo no te gustó de tu producto?"</strong> y luego seguir los pasos que se muestran.
              p Recuerda que desde que recibes el producto, tienes 48 horas para notificar la devolución en Prilov.
              p Si no cambias el estado en 48 horas (tanto para <strong>"Recibido"</strong> o como para <strong>"Devolución"</strong>), el producto se marcará automáticamente como <strong>"Recibido"</strong> y se generarán los créditos a la vendedora.
              p En caso de que envíes el producto a la vendedora a través de una empresa de courier,  tienes 5 días en total, para ingresar los datos del envío (<em>Nombre empresa y número de seguimiento</em>) y que la vendedora reciba el producto.
              p Si en lugar de enviar el producto, te juntaste con la vendedora, también podrás seleccionar esa opción desde la vista de <strong>Tus Compras</strong>. Apenas la vendedora tenga nuevamente el producto en sus manos y lo notifique en Prilov, se generarán tus créditos en tu cuenta en Prilov. Si quieres transferirlos a tu cuenta bancaria, puedes solicitarlo desde la vista de <strong>Tus Créditos</strong>.
              p.blog__note <sup>*</sup>Nota: La compradora debe asumir el costo del envío de la devolución en la mayoría de los casos. Sólo en el caso que los productos vengan defectuosos o la información entregada por la vendedora en la publicación no es la correcta, la vendedora debe asumir ese costo de envío.
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog5-003-m.png')
        img.banner-slider__img(
          src='static/img/blog5-003.png')
        blog5-003-m.png
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog5-001.jpg"
              alt="Ponte en contacto con nosotras")
          .blog__copy
            h2.blog__headline 3. La vendedora no responde o no tiene el producto. Ponte en contacto con nosotras
            p Si la vendedora no tiene el producto que compraste, no te responde o no logras ponerte de acuerdo con ella para la entrega, entonces escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> y resolveremos tu problema.
            blockquote.blog__pullquote(
              cite='http://prilov.html')
              p.blog__quote Ponte en contacto con nosotras y resolveremos tu problema.
</template>

<script>

export default {
  name: 'AyudaDevolverProducto'
}

</script>
