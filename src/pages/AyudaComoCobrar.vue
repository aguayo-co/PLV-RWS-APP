<template lang="pug">
.layout-page
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo cobro lo que gano con mis ventas?
        p.blog__kicker Todo lo que tienes que saber sobre el dinero que ganas cuando vendes en Prilov.
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog2-001.jpg", alt="Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov")
          .blog__copy
            .blog__subarticle
              h2.blog__headline Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov. Puedes usarlos para comprar otra joyita o solicitar el pago a tu cuenta bancaria.
              p Cuando la compradora recibe su producto de forma satisfactoria y lo marque como <strong>"Recibido"</strong>, tus créditos serán generados automáticamente a tu cuenta Prilov. Ese dinero puedes usarlo para seguir comprando lo que quieras en Prilov. Cuando hagas una compra,  el sistema descontará el monto que tienes en créditos al total de la compra que estás realizando.
            .blog__subarticle
              h2.blog__headline Traspasando créditos a cuenta bancaria
              p ¡Puedes transferir tus créditos a tu cuenta bancaria en cualquier momento!  Sólo recuerda que debes tener más de $4.000 para que sean transferidos.
              p Para transferir tus créditos, debes hacer clic en <strong>"Tu cuenta"</strong> e ir a la sección <strong>"Créditos"</strong>. Ahora puedes ver la opción <strong>"Convertir en dinero"</strong>, la seleccionas y el dinero tardará entre 1 a 4 días hábiles en aparecer en la cuenta bancaria que ingresaste en tu cuenta Prilov.
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
            p Prilov cobrará un 20% de comisión del valor de los productos por cada venta que se genere; generándose el 80% del valor de los productos en créditos, más el costo de despacho pagado por la compradora.
            p Por ejemplo, si el precio del producto es $10.000 y el costo de despacho es $1.000, entonces generaremos créditos por $8.000 + $1.000 = $9.000.
          blockquote.blog__pullquote(
            cite='http://prilov.html')
            p.blog__quote Transferir los créditos a tu cuenta bancaria no tiene costo.
        //- .blog__spread.blog__spread_upside
        //-   .blog__copy
        //-     p Ernesto Cervantes tuvo una oportunidad como nadie más en la industria: abrió el primer desfile de Raf Simons en Calvin Klein, formando parte de la nueva generación de la marca estadounidense bajo el mando del genio belga. De padres mexicanos, Ernesto nació en Orange County, pero creció en Perris, California, tiempo en el cual aprendió las virtudes de salirse de la cotidianidad y el confort que su entorno le ofrecía. Desde su lanzamiento como modelo exclusivo de Calvin Klein, también fue uno de los protagonistas en el video de The xx I Dare You, i-D platicó con él desde California para saber qué pensaba sobre representar su herencia mexicana en la nueva era de una marca conocida como uno de los pilares de la moda estadounidense.
        //-   blockquote.blog__pullquote(
        //-     cite='http://prilov.html')
        //-     p.blog__quote El modelo de padres mexicanos es parte vital de la nueva generación de Calvin Klein salida de la mente de Raf Simons.
</template>

<script>

export default {
  name: 'AyudaComoCobrar'
}

</script>
