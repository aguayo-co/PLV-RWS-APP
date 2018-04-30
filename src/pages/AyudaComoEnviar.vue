<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo enviar lo que vendo?
        p.blog__kicker Todo lo que debes saber para enviar tus ventas a tu compradora.
    .blog__inner
      article.blog__body.blog__body_slot
        h2.blog__headline Métodos de envíos
        .blog__copy
          p Como vendedora, hay dos métodos de envíos que puedes habilitar desde <strong>Tu Cuenta</strong>, y luego haciendo click en  <strong>Métodos de Envío</strong>.
          p Estas opciones son: envíos prepagados por compradora a través de Chilexpress o bien, acuerdo con compradora.
          p Si habilitas una de las opciones, entonces al momento de que la compradora agregue uno de tus productos a su carro de compras, le aparecerá sólo ese método de envío en la vista de su carro de compras. Si habilitas ambas opciones, entonces ella podrá elegir y a ti te llegará el detalle de su elección en el mail de confirmación de venta.
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog1-001.jpg", alt="Paso a Paso: Todo lo que tienes que saber para comprar en Prilov")
          .blog__copy
            .blog__subarticle
              h2.blog__headline 1. Despachando por Chilexpress
              p En este caso, <strong>la compradora habrá pagado el envío asignado por Chilexpress</strong> según la dirección que ella ingresó. Recibirás un mail con la etiqueta de Chilexpress y deberás seguir estos pasos:
              ol
                li Imprimir la etiqueta de Chilexpress.
                li Envolver el o los productos que vendiste.
                li Debes llevar el paquete junto con la etiqueta que imprimiste a la sucursal de Chilexpress más cercana.
                li No deberás pagar nada al momento de enviar (la compradora ya pagó por el envío).
                li El código de seguimiento le llegará automáticamente a tu compradora y tu producto quedará como estado <strong>“Enviado”</strong> automáticamente en <strong>Tu Cuenta</strong> de Prilov.
            .blog__subarticle
              h2.blog__headline 2. Acuerdo de envío con compradora
              p Al seleccionar esta opción, podrán ponerse de acuerdo entre vendedora y compradora luego de la confirmación de la venta. Ambas recibirán un correo con el contacto de la contraparte.
              p Las opciones de entrega pueden ser dos:
              ol
                li Juntarse en persona.
                li Envío por pagar a cualquier sucursal que a la compradora le acomode.
              p <strong>Si se juntan en persona</strong> y ya entregaste el producto, debes ir a <strong>Tu Cuenta</strong>, luego a <strong>Tus Ventas</strong> y sobre el producto marcar <strong>"Sí, ya lo entregué"</strong> y luego indicar <strong>"Nos juntamos"</strong>. De esta forma, la compradora podrá marcar como <strong>"Recibido"</strong> y los créditos correspondientes a esa venta, serán abonados en Tu Cuenta de Prilov.
              p <strong>Si envías por pagar a través de una empresa de courier</strong>, luego de enviar, debes ir a <strong>Tu Cuenta</strong>, luego a <strong>Tus Ventas</strong> y sobre el producto marcar <strong>"Usé una empresa de courier"</strong>, y luego completar la información requerida (<em>Nombre empresa y número de seguimiento</em>). De esta forma, la compradora podrá marcar como <strong>"Recibido"</strong> y los créditos correspondientes a esa venta, serán abonados en Tu Cuenta de Prilov.
</template>

<script>

export default {
  name: 'AyudaComoComprar'
}

</script>
