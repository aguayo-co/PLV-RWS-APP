<template lang="pug">
.layout-page
  BannerTop
  section.blog-summary
    Blogbanner
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
