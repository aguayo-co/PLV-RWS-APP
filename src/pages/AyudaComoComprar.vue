<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo comprar en Prilov?
        p.blog__kicker Paso a Paso: Todo lo que tienes que saber para comprar en Prilov
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog6-001.jpg", alt="Paso a Paso: Todo lo que tienes que saber para comprar en Prilov")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Encuentra lo que quieres
              p Si tienes algo en mente, te recomendamos ir al buscador y escribir las palabras de lo que estás buscando. Seguro encontrarás lo que quieres.
              p También puedes filtrar por marca, talla, categoría, precio y región. Si sólo quieres vitrinear, puedes usar nuestra sección <strong>Lo Último</strong> para ver lo recién llegado, o directamente ver el shop.
            .blog__subarticle
              h2.blog__headline Encontré lo que quería, ¿a quién debo pagar?
              p Recuerda que todas las compras se deben hacer online a través de Prilov, pagando directamente a la página y no a las vendedoras de los productos. Ellas recibirán su dinero, una vez que tú hayas confirmado que recibiste el producto y estás conforme. De esta forma, puedes sentirte segura comprando en Prilov, ya que responderemos frente a cualquier inconveniente.
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline ¿Cómo finalizo la compra y el pago?
        .blog__copy
          p Para comprar debes seguir estos pasos:
          ol
            li Agrega el o los productos que quieras a tu carrito apretando el botón <strong>Comprar</strong>. Si son de diferentes vendedoras, no hay problema. Puedes pagar todo junto de una vez.
            li Para  finalizar el pago, debes ir al ícono de <strong class="i-bag">carrito de compras</strong> que está en la barra negra superior de la página. Luego aprietas <strong>Ir a pagar</strong>.
            li Para cada producto, aparecerán los métodos de envío disponibles según su vendedora. Las opciones de envío que entregan las vendedoras son:
              ol
                li <strong>Envío a domicilio a través de Chilexpress</strong>: lo paga la compradora al momento de comprar y debe ingresar su dirección.
                li <strong>Acuerdo con vendedora</strong>: Puede ser juntarse en persona o solicitar envío por pagar a través de una empresa de courier. Esto lo pueden coordinar luego de la compra al recibir el número de teléfono de la vendedora.
              |En el caso de que la vendedora tenga habilitado más de un método de envío, podrás elegir algunos de los dos. Si la vendedora sólo tiene un método de envío habilitado, entonces no te dará opción de elegir.
            li Si tienes algún código de descuento, debes agregarlo antes de pagar en el campo indicado.
            li Luego haces click en <strong>Continuar</strong> para ir a pagar.  Elige el método de pago. Si eliges <strong>Transferencia bancaria</strong>, aparecerán los datos de la cuenta bancaria de Prilov. Debes hacerla desde la página de tu banco y luego, seleccionas <strong>Transferencia realizada</strong>. Tendrás un máximo de 10 minutos para realizar la transferencia desde que haces click en <strong>Pagar con transferencia</strong>. (Puedes adjuntar tu comprobante de pago como respaldo). Si eliges pago con tarjeta de crédito o débito, debes seleccionar <strong>Payu</strong> o <strong>Mercado Pago</strong> y seguir los pasos de pago.
            li Recibirás un mail de confirmación de tu compra con el número de teléfono de la vendedora para coordinar envío o entrega y la vendedora será notificada.
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog6-002.png')
        img.banner-slider__img(
          src='static/img/blog6-002.png')
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(src="static/img/blog6-003.jpg", alt="Encuentra lo que quieres")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Recibí mi producto, LO AMO. ¿Ahora qué tengo que hacer?
              p Ahora debes ingresar a <strong>Tu Cuenta</strong>, luego seleccionas <strong>Mis Compras</strong> y debes marcar el producto como <strong>Recibido</strong>. De esta forma, sabremos que recibiste tu compra, estás feliz con ella y la vendedora podrá recibir sus créditos.
              p Luego de marcar como <strong>Recibido</strong>, debes evaluar tu experiencia con la vendedora, dejando un comentario. Esto es muy importante para que futuras compradoras puedan confiar en las usuarias y sentirse muy seguras en comprar. Para evaluar a la vendedora, pregúntate: ¿Respondió los mensajes a tiempo? ¿Envió el producto dentro del plazo? ¿El producto era tal cual a las fotos?
              //- p ¡Disfruta tu nueva joyita!
              blockquote.blog__pullquote(
                cite='https://www.prilov.com')
                p.blog__quote ¡Disfruta tu nueva joyita!
</template>

<script>

export default {
  name: 'AyudaComoComprar'
}

</script>
