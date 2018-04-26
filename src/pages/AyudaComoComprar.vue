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
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog6-002.png')
        img.banner-slider__img(
          src='static/img/blog6-002.png')
    .blog__inner
      article.blog__body
        h2.blog__headline ¿Cómo finalizo la compra y el pago?
        p Para comprar debes seguir estos pasos:
        ol
          li Agrega el o los productos que quieras a tu carrito apretando el botón <strong>“Comprar”</strong>. Si son de diferentes vendedoras, no hay problema. Puedes pagar todo junto de una vez.
          li Para  finalizar el pago, debes ir al ícono de <strong class="i-bag"> “carrito de compras”</strong> que está en la barra negra superior de la página. Luego aprietas <strong>“Ir a pagar”</strong>.
          li Para cada producto, aparecerán los métodos de envío disponibles según su vendedora. Las opciones de envío que entregan las vendedoras son:
            ol
              li Envío a domicilio a través de Chilexpress: lo paga la compradora al momento de comprar y debe ingresar su dirección.
              li Acuerdo con vendedora: Puede ser juntarse en persona o solicitar envío por pagar a través de una empresa de courier. Esto lo pueden coordinar luego de la compra al recibir el número de teléfono de la vendedora.
            |En el caso de que la vendedora tenga habilitado más de un método de envío, podrás elegir algunos de los dos. Si la vendedora sólo tiene un método de envío habilitado, entonces no te dará opción de elegir.
          li Si tienes algún código de descuento, debes agregarlo antes de pagar en el campo indicado.
          li Luego haces click en <strong>“Continuar”</strong> para ir a pagar.  Elige el método de pago. Si eliges <strong>“Transferencia bancaria”</strong>, aparecerán los datos de la cuenta bancaria de Prilov. Debes hacerla desde la página de tu banco y luego, seleccionas <strong>“Transferencia realizada”</strong>. Tendrás un máximo de 10 minutos para realizar la transferencia desde que haces click en <strong>“Pagar con transferencia”</strong>. (Puedes adjuntar tu comprobante de pago como respaldo). Si eliges pago con tarjeta de crédito o débito, debes seleccionar <strong>“Payu”</strong> o <strong>“Mercado Pago”</strong> y seguir los pasos de pago.
          li Recibirás un mail de confirmación de tu compra con el número de teléfono de la vendedora para coordinar envío o entrega y la vendedora será notificada.

        .blog__spread
          .blog__copy
            p Prilov cobrará un 20% de comisión del valor de los productos por cada venta; generándose el 80% del valor de los productos en créditos. Por ejemplo, si el precio del producto es $10.000, entonces generaremos créditos por $8.000 y quedando $2,000 como ganancia de Prilov. Transferir los créditos a tu cuenta bancaria no tiene costo.
            p En el caso que hayas elegido una comisión diferente al publicar  tu producto (25% o 30%), se aplica la misma lógica con esa comisión.
          blockquote.blog__pullquote(
            cite='http://prilov.html')
            p.blog__quote Transferir los créditos a tu cuenta bancaria no tiene costo.
</template>

<script>

export default {
  name: 'AyudaComoComprar'
}

</script>
