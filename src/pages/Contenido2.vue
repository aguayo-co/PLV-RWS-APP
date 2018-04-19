<template lang="pug">
.layout-page
  section.blog
    Blogbanner
    .blog__inner
      header.blog__header
        h1.blog__title ¿Cómo cobro lo que gano con mis ventas?
        p.blog__kicker Todo lo que tienes que saber sobre el dinero que ganas cuando vendes en Prilov.
    article.blog__body
      .blog__inner
        p.blog__lead Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov. Puedes usarlos para comprar otra joyita o solicitar el pago a tu cuenta bancaria.
        h2.blog__headline Créditos Prilov
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(src="static/img/blog2-001.jpg", alt="Cuando vendas un producto, siempre se generarán créditos en tu cuenta Prilov")
            figcaption.blog__caption
              span Te regalamos en tu primera compra
          .blog__copy
            p Cuando la compradora recibe su producto de forma satisfactoria y lo marque como "Recibido", tus créditos serán generados automáticamente a tu cuenta Prilov. Ese dinero puedes usarlo para seguir comprando lo que quieras en Prilov. Cuando hagas una compra,  el sistema descontará el monto que tienes en créditos al total de la compra que estás realizando. 
    BlogbannerProm
    .blog__inner
      article.blog__body
        h2.blog__headline Traspasando créditos a cuenta bancaria
        .blog__copy
          p ¡Puedes transferir tus créditos a tu cuenta bancaria en cualquier momento!  Sólo recuerda que debes tener más de $4.000 para que sean transferidos. Para transferir tus créditos, debes hacer clic en "Tu cuenta" e ir a la sección "Créditos". Ahora puedes ver la opción "Convertir en dinero", la seleccionas y el dinero tardará entre 1 a 4 días hábiles en aparecer en la cuenta bancaria que ingresaste en tu cuenta Prilov.
    .blog__inner
      article.blog__body
        h2.blog__headline Lo que gana Prilov
        .blog__copy
          p Prilov cobrará un 20% de comisión del valor de los productos por cada venta que se genere; generándose el 80% del valor de los productos en créditos, más el costo de despacho pagado por la compradora. Por ejemplo, si el precio del producto es $10.000 y el costo de despacho es $1.000, entonces generaremos créditos por $8.000 + $1.000 = $9.000. Transferir los créditos a tu cuenta bancaria no tiene costo.
         
</template>

<script>
import Blogbanner from '@/components/Blogbanner'
import BlogbannerProm from '@/components/BlogbannerProm'

export default {
  name: 'Contenido2',
  components: {
    BlogbannerProm,
    Blogbanner
  }
}

</script>
