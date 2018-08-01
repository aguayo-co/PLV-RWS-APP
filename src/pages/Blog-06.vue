<template lang="pug">
.layout-page
  BannerTop
  section.blog
    figure.blog-banner.banner-hero
      picture.banner-hero__crop
        source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/blog-newsletter-001-m.jpg')
        img.banner-slider__img(src='static/img/blog-newsletter-001.jpg')
    .blog__inner
      header.blog__header
        h1.blog__title Una historia que queremos compartir…
        p.blog__kicker Relanzamiento de Prilov
        p.bolg__data <time datetime="2018-07-16">Vie 20 jul 2018 </time> por <a class="link_underline" href="closet/2" title="Autor The Prilov Team">The Prilov Team</a>
      article.blog__body
        .blog__spread
          .blog__copy
            p Hace poco más de 3 años, <strong>Andrea y Cony</strong>, las fundadoras de Prilov, pusieron sobre una hoja de cuaderno, su sueño; la plataforma de <strong>PRILOV</strong>. Todo comenzó con recursos muy limitados y una plataforma que era prácticamente un test para ver si la idea funcionaba. Hoy con casi <strong>70.000 prilovers inscritas</strong>, podemos decir que funcionó.
            p Sabemos que no todo ha sido color de rosa, y las más pacientes y comprensivas han sido <strong>ustedes</strong>. Hemos escuchado siempre sus opiniones y sobre todo, las ideas que nos comunican de mejoras en la web. Pero, no era tan fácil implementarlas. La tecnología requiere una gran inversión y no podíamos tomar ese riesgo tan temprano.
            p <strong>Hoy sabemos que podemos llegar más lejos</strong>. Ustedes han validado el potencial que Prilov tiene y sabemos que aún queda mucho por crecer.
            p Lo queremos hacer junto a una página que se ajuste a todas sus necesidades, y verdaderamente les haga la vida más fácil.
          aside.blog-side(
            v-if="mqDesk")
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
                  :to="{ name: 'blog05' }") Todo lo que tienes que saber del nuevo Prilov.
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
          h2.blog__headline YA LANZAMOS LA NUEVA...
          p No sólo verán nuevas funcionalidades, si no también una imagen renovada que responde a las prilovers que nos acompañan hoy.
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline Nuevo Logo
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-newsletter-002.png"
              alt="Nuevo Logo Prilov")
          p Porque <strong>ustedes</strong> crearon Prilov, queremos incluirlas en cada paso de nuestro crecimiento y esperamos que sigan confiando en nosotras como lo han hecho hasta ahora.
          blockquote.blog__pullquote(
              cite='https://www.prilov.com')
            p.blog__quote ¡Estamos felices de haberlo logrado juntas!
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline Nuevas funcionalidades
          ul
            li Versión mobile full responsive.
            li Mayor rapidez de la página en general.
            li Menor tiempo para cargar productos.
            li Integración con Chilexpress.
            li Centro de control amigable y fácil de usar.
            li Puedes responder los reviews que te escriban.
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline Algunos cambios en las condiciones de Prilov
          ul
            li <strong>Todas las devoluciones</strong> se realizarán en créditos.
            li <strong>Al solicitar la transferencia de créditos a tu cuenta bancaria, si es por una devolución asociada</strong>, tu pago será prioridad.
            li <strong>Productos se marcarán</strong> automáticamente como recibidos <strong>si cumplidos los plazos no se ha cambiado su estado</strong>.
          p
            strong Kisses!
          p The Prilov Team.
          blockquote.blog__pullquote(
            cite='https://www.prilov.com')
            p.blog__quote ¡Esperamos que les encante el nuevo Prilov!
    aside.blog-side(
      v-if="mqMobile")
      .blog__inner
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
              :to="{ name: 'blog05' }") Todo lo que tienes que saber del nuevo Prilov.
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
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Blog06',
  components: {
    BannerTop
  }
}

</script>
