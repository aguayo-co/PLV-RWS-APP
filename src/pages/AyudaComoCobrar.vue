<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo cobro lo que gano con mis ventas?
        p.blog__kicker Todo lo que tienes que saber sobre tus ganancias en Prilov.
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog2-001.jpg", alt="Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Créditos Prilov
              p Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov. Puedes usarlos para comprar otros productos o solicitar el pago a tu cuenta bancaria.
              p Cuando la compradora recibe su producto de forma satisfactoria y lo marque como <strong>Recibido</strong>, tus créditos serán generados automáticamente a tu cuenta Prilov. Ese dinero puedes usarlo para seguir comprando lo que quieras en Prilov.
              p Cuando hagas una compra,  el sistema descontará el monto que tienes en créditos al total de la compra que estás realizando.
            .blog__subarticle
              h2.blog__headline Traspasando créditos a tu cuenta bancaria
              p ¡Puedes transferir tus créditos a tu cuenta bancaria en cualquier momento!  Sólo recuerda que <strong>debes tener más de $4.000</strong> para que sean transferidos. Para transferir tus créditos, debes hacer click en "Tu cuenta" e ir a la sección "Créditos". Ahora puedes ver la opción "Convertir en dinero", la seleccionas y el dinero tardará entre 1 a 5 días hábiles en aparecer en la cuenta bancaria que ingresaste en Tu Cuenta Prilov.
              p Asegúrate de ingresar tus datos bancarios antes de solicitar la transferencia de créditos. Para ingresarlos debes ir a Datos Bancarios desde Tu Cuenta.
              p Hay un máximo de créditos que puedes juntar en tu cuenta. <strong>Al superar los $200,000 en créditos</strong>, automáticamente se solicitarán los créditos para ser transferidos a tu cuenta bancaria.
    figure.blog-bannerprom.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(
          media='(max-width: 640px)', srcset='static/img/blog2-002-m.png')
        img.banner-slider__img(
          src='static/img/blog2-002.png')
    .blog__inner
      article.blog__body
        h2.blog__headline Lo que gana Prilov
        .blog__spread
          .blog__copy
            p Prilov cobrará un 20% de comisión del valor de los productos por cada venta; generándose el 80% del valor de los productos en créditos. Por ejemplo, si el precio del producto es $10.000, entonces generaremos créditos por $8.000 y quedando $2,000 como ganancia de Prilov. Transferir los créditos a tu cuenta bancaria no tiene costo.
            p En el caso que hayas elegido una comisión diferente al publicar  tu producto (25% o 30%), se aplica la misma lógica con esa comisión.
          blockquote.blog__pullquote(
            cite='https://www.prilov.com')
            p.blog__quote Transferir los créditos a tu cuenta bancaria no tiene costo.
</template>

<script>

export default {
  name: 'AyudaComoCobrar'
}

</script>
