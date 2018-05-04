<template lang="pug">
.layout-page
  BannerTop
  section.blog-summary
    figure.blog-banner.banner-hero
      .banner-hero__slot
        .banner-hero__head.left
          figcaption.banner-hero__caption Elige la ropa que no usas y dale una segunda oportunidad
        picture.banner-hero__crop
          source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/demo/banner-004-m.jpg')
          img.banner-slider__img(src='static/img/demo/banner-004.jpg')
    .blog__inner
      header.blog__header
        h1.blog__title.blog_center ¿Cómo funciona Prilov?
      article.blog__article
        .blog_center
          h2.blog__subtitle Vende
          p.blog__kicker.blog__kicker_center Convierte tu clóset en tu propia tienda
        ol.blog-card
          li.blog-card__item.i-camera
            h3.blog-card__title Sube tus productos
            p.blog-card__txt Crea tu perfil, sube fotos de tu ropa y describe tu producto. Tu primera publicación debe aprobarse por nuestro Team antes de publicarse.
          li.blog-card__item.i-talk
            h3.blog-card__title Conversa
            p.blog-card__txt Contesta a los mensajes y comentarios de las otras Prilovers a tiempo para que no pierdas ni una sola venta.
          li.blog-card__item.i-bag
            h3.blog-card__title Cuando vendas
            p.blog-card__txt La compradora pagará a Prilov y nosotros te notificaremos por mail que vendiste un producto.
          li.blog-card__item.i-send
            h3.blog-card__title Envía tus productos
            p.blog-card__txt Cuando envíes tu producto o te juntes con la compradora para la entrega, debes entrar a Tus Ventas y marcar el producto como “Enviado”.
          li.blog-card__item.i-talk
            h3.blog-card__title Tu compradora recibe
            p.blog-card__txt La compradora marcará "Recibido" el producto y tus créditos serán traspasado a tu cuenta Prilov.
          li.blog-card__item.i-money
            h3.blog-card__title ¡A cobrar!
            p.blog-card__txt Prilov cobra la comisión que elegiste para tu producto. Con los créditos obtenidos, podrás comprar o transferirlos a tu cuenta bancaria.
    BlogbannerProm
    .blog__inner
      article.blog__article
          .blog_center
            h2.blog__subtitle Compra
            p.blog__kicker.blog__kicker_center La ropa que te gusta, es tuya
          ol.blog-card
            li.blog-card__item.i-dress
              h3.blog-card__title ¡Lo quiero!
              p.blog-card__txt Agrega el o los productos que quieres al Carrito de Compras.
            li.blog-card__item.i-send
              h3.blog-card__title Método de envío
              p.blog-card__txt Agrega tu dirección si prefieres envío a tu casa o selecciona la opción de "juntarse con la vendedora”.
            li.blog-card__item.i-money
              h3.blog-card__title Paga tu compra
              p.blog-card__txt Elige tu método de pago. Puedes pagar con tarjetas, transferencia o créditos.
            li.blog-card__item.i-box
              h3.blog-card__title Júntate o espera el envío
              p.blog-card__txt Si escogiste envío, la vendedora enviará tu producto y recibirás una notificación con el número de seguimiento. También podrán juntarse.
            li.blog-card__item.i-heart
              h3.blog-card__title  Lo recibí y lo amo
              p.blog-card__txt Si te gustó, lo marcas como "Recibido" desde Tus Compras y calificas a la vendedora sobre tu experiencia de compra con ella.
            li.blog-card__item.i-return
              h3.blog-card__title.blog-card__sup Lo recibí y no me queda
              p.blog-card__txt Tranquila, puedes devolverlo antes de 48 horas. Recibirás tu dinero de vuelta en créditos y después podrás transferirlos a tu cuenta bancaria o comprar otro producto.

</template>

<script>
import BannerTop from '@/components/BannerTop'
import Blogbanner from '@/components/Blogbanner'
import BlogbannerProm from '@/components/BlogbannerProm'

export default {
  name: 'ComoFuncionaPrilov',
  components: {
    BannerTop,
    BlogbannerProm,
    Blogbanner
  }
}

</script>
