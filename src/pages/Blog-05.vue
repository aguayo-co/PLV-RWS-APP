<template lang="pug">
.layout-page
  BannerTop
  section.blog
    figure.blog-banner.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/blog-new-prilov-001-m.jpg')
        img.banner-slider__img(src='static/img/blog-new-prilov-001.jpg')
    .blog__inner
      header.blog__header
        h1.blog__title Todo lo que tienes que saber del nuevo Prilov
        p.blog__kicker Lee atentamente para que estés al tanto de todo
        p.bolg__data <time datetime="2018-07-16">lun 16 jul 2018 </time> por <a class="link_underline" href="closet/2" title="Autor The Prilov Team">The Prilov Team</a>
      article.blog__body
        .blog__spread
          .blog__copy
            h2.blog__headline PRILOVER,
            p Ahora que ya lanzamos el nuevo Prilov, es importante que tengas en cuenta algunos puntos:
            h2.blog__headline PRILOV ANTIGUO y PRILOV NUEVO:
            ul
              li Una vez que la URL prilov.com te lleve al nuevo sitio, deberás ingresar a la URL <a class="link_underline" href="https://old.prilov.com/" title="Antigua plataforma Prilov">old.prilov.com</a> para finalizar transacciones que estaban en proceso (marcar con enviado, recibido, etc).
              li Para ingresar a tu perfil en el Prilov nuevo, deberás usar el <strong>mismo usuario y contraseña</strong> con el que estabas registrada en el Prilov antiguo.
          aside.blog-side
            dl
              dt
                router-link.link(:to="{ name: 'como-comprar' }") ¿Cómo Comprar en Prilov?
              dd Paso a paso: Todo lo que tienes que saber para comprar en Prilov. <router-link class="link_underline" :to="{ name: 'como-comprar' }">Encuentra lo que quieres.</router-link>
              dt
                router-link.link(:to="{ name: 'como-funciona' }") ¿Cómo funciona Prilov?
              dd Elige la ropa que no usas y dale una segunda oportunidad. <router-link class="link_underline" :to="{ name: 'como-funciona' }">Convierte tu clóset en tu propia tienda</router-link>
            dl
              dt Relacionados
              dd
                router-link.link(
                  :to="{ name: 'blog01' }") Las cuatro apps más usadas por fashion bloggers para editar sus fotos.
              dd
                router-link.link(
                  :to="{ name: 'blog02' }") Marie Kondo, la gurú del orden.
              dd
                router-link.link(
                  :to="{ name: 'blog03' }") Fast Fashion. Qué es y qué puedes hacer al respecto.
              dd
                router-link.link(
                  :to="{ name: 'blog04' }") Tips de vendedoras top para lograr buenas limpiezas de clóset.
    .blog__inner
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline EL TRASPASO DE TUS PRODUCTOS:
          ul
            li Si tienes productos publicados en el Prilov antiguo, estos pasarán a estar ocultos y se verán disponibles en el nuevo Prilov.
            li Los productos subidos al Prilov antiguo luego de la migración, quedarán como "ocultos" automáticamente. Por esto, deberás subirlos al Prilov nuevo.
            li La migración sólo considerará productos que hayan sido <strong>subidos hace menos de un año</strong>. Los demás productos no se subirán al nuevo Prilov automáticamente y deberás hacerlo de manera manual.
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline VENTAS Y COMPRAS:
          ul
            li El historial de tus ventas y compras, no se migrará al Prilov nuevo.
            li Si tienes ventas o compras en proceso al momento de la migración, deberán finalizarse en el <a class="link_underline" href="https://old.prilov.com/" title="Antigua plataforma Prilov">Prilov antiguo</a> (marcar como enviada, recepcionada, solicitar devolución).
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline ENVÍOS:
          ul
            li Si eres vendedora y quieres usar Chilexpress prepagado por compradora en tus envíos, entonces debes agregar tu dirección y habilitar la opción Chilexpress desde la sección "Métodos de Envío".
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline CRÉDITOS:
          ul
            li Los créditos que ganes por esas ventas (del Prilov antiguo), serán abonados por nosotros en tu perfil en el Prilov nuevo.
            li Si solicitaste créditos antes de la migración y estos no han sido transferidos a tu cuenta bancaria, no te preocupes que <strong>se pagarán en el plazo estipulado</strong>.
            li <strong>Si tenías créditos disponibles en tu perfil al momento de la migración</strong> pero no solicitados, los verás reflejados en tu perfil del nuevo Prilov.
            li Por lo anterior, si quieres solicitar esos créditos, debes hacerlo desde tu perfil en el Prilov nuevo y no en el Prilov antiguo.
      article.blog__body
        .blog__spread
          .blog__copy
            p El Prilov antiguo estará habilitado hasta el 15 de Agosto del 2018. Este será el plazo máximo para finalizar todas las transacciones que estaban en proceso.
            p Ten en cuenta que estamos en proceso de un gran cambio y puede que no todo funcione a la perfección desde un principio. Por eso necesitamos tu paciencia y sobre todo comprensión en esta etapa.
            p Cualquier cosa que quieras reportar, felices te escuchamos.
            p Si tienes dudas o comentarios, escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> y siempre te ayudaremos.
            p
              strong !Kisses!
            p The Prilov Team.
            blockquote.blog__pullquote(
              cite='https://www.prilov.com')
              p.blog__quote ¡El nuevo Prilov es de ustedes!
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Blog05',
  components: {
    BannerTop
  }
}

</script>
