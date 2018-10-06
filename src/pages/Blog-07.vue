<template lang="pug">
.layout-page
  BannerTop
  section.blog
    .blog__inner
      header.blog__header
        h1.blog__title Una de nosotras se fue a recorrer el mundo…
        p.blog__kicker Prilov por el mundo
        p.bolg__data <time datetime="2018-10-07">Dom 7 Oct 2018 </time> por <a class="link_underline" href="closet/3" title="Autor Andrea Tapia">Andrea Tapia</a>
      article.blog__body
        .blog__spread
          .blog__copy
            p Andrea, una de nuestras fundadoras, se fue a cumplir el sueño de muchas: viajar 500 días por el mundo. Si, 500 días.
            p Vendí todo, agarré mi mochila de 80 litros (nadie sabe como lo hice con tanta pilcha), a mi pololo y nos fuimos a viajar. Y obvio, quiero compartir con ustedes algunos de mis destinos, contarles parte de mis aventuras y datos viajeros. Todas las semanas será un destino distinto, así que las que están pensando viajar pronto, tomen nota porque seguro les encantará esta info.
            p Empezaremos por un país muy bacan: <strong>TAILANDIA</strong>. Sabemos que a todas nos encantan sus playas paradisiacas, soñamos con los templos budistas hermosos y morimos por saborear esos pad thai y mil comidas exquisitas. Pero partamos con algunos tips.
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
          h2.blog__headline #DATOSVIAJEROS QUE DEBERÍAMOS SABER
          p <strong>Moneda: Baht ($20 Chilenos aprox.) | Idioma: Tailandés | Capital: Bangkok</strong>
          ul
            li No es mito, el sudeste asiático es muy barato y Tailandia no es la excepción. Principalmente la comida y el alojamiento. Comimos pad thai por $600 (chilenos) y dormimos en promedio por 10, 15 lucas la noche los dos.
            li Su religión: la población tailandesa es 90% budista y lo notas desde que pisas el país.
            li La gente es bacan, siempre te vas a sentir seguro.
            li Hay monarquía, ¿sabían? nosotros no teníamos idea.
            li La visa para los chilenos es por 3 meses (es gratis).
            li Uber no. Descárguense ‘Grab’, funciona incluso mejor.
            li Ley: regatear todo, siempre puedes conseguir un mejor precio.
            li Casi en todas partes tienes que sacarte los zapatos para entrar.
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline La ruta
          p Cuando viajas, las opciones ‘lógicas’ de ruta son difíciles de cumplir. Depende mucho del clima, de donde vengas o si tienes pensado juntarte con alguien. No existe la ruta perfecta, pero todas son increíbles. Aun así, recorrimos de sur a norte (cruzamos desde Malasaia) empezando por una de las islas más lindas y menos turística: <strong>Koh Lipe</strong>.
          h3 Koh Lipe
          figure.blog__picture.blog__picture_spaced
            img.blog__image(
              src="static/img/blog-07-001.png"
              alt="Koh Lipe")
          p Si buscas escapar de los turistas, de los precios ‘más altos’, Koh Lipe es la mejor opción. Una isla al sur, con arena blanca y mar turquesa. ¿Qué más se puede pedir?. Tiene 3 playas principales: Sunset, Sunrise y Pataya. La más linda en Sunrise. Acá solo vas a descansar, comer rico y disfrutar la playa. Si te gusta el snorkel, métete al agua con tu mascara.
          h3 Koh Phi Phi
          figure.blog__picture.blog__picture_spaced
            img.blog__image(
              src="static/img/blog-07-002.png"
              alt="Koh Phi Phi")
          p Es la isla típica de las películas. Llegas en ferry y entrar a la isla cuesta obligatoriamente 20 baht. Te los cobran apenas te bajas del ferry. Hay mucho carrete, es una de las islas más turísticas y por lo mismo, más caras de Tailandia. Las playas principales son: Puerto Tonsai Bay,Loh Dalum Bay,Long beach.
          h3 ¿Qué hacer?
          ul
            li Tour por el día playas
            li Subir el viewpoint
            li Ir a Long beach
            li Show de box (un show tradicional de Phi Phi)
            li Carrete en la playa Loh Dalum Bay, es el típico carrete con fuego, luces y clásico de la playa
          p Todas las agencias te venden el mismo tour. Cuesta 450 baht. El tour te lleva a hacer snorkel en Shark point, después a la Bamboo Island (hay que pagar entrada), Monkey Beach, te bajas un rato y ves los monos. Después te llevan a Maya Bay, la típica playa de la película ‘La Playa’. Luego, viene la mejor parada. La Pileh Bay, una laguna enorme de agua verde turquesa entre rocas gigantes. Realmente hermosa.
          h3 Koh Tao
          p Es la isla del buceo. Dicen que es uno de los lugares más baratos del mundo para sacar el curso de buceo. Yo hice el Open Water por 3 días en DPM (De puta madre) y me costó 7.500 baht con 3 noches de alojamiento. 100% recomendable. Ojo con arrendar moto, los caminos no son taaan fáciles.
          h3 ¿Qué hacer?
          ul
            li Recorrer las playas: en general puedes llegar a todas en moto. Las más típicas son: Sairee beach, Freedom beach, Shark bay. Son gratis. En Aow Leuk tienes que pagar 100 baht
            li Ir a Nang yuan island: Hay que pagar bote + entrada a la playa
            li Carrete recomendado en DPM y Pura Vida. Ambas escuelas de buceo y hostales que siempre tienen carrete. Muchos latinos y reggaeton
          h3 Koh Pha-Ngan
          figure.blog__picture.blog__picture_spaced
            img.blog__image(
              src="static/img/blog-07-003.png"
              alt="Koh Pha-Ngan")
          p Es la isla de la famosa Full moon party. Todos coinciden que lo mejor, es el pre latino que se arma en las calles o playa antes de la fiesta. Las fechas de las fiestas (se hace una vez al mes) están en internet. Los precios suben harto en esas fechas. La isla es enorme y tiene muchas playas. Además es una isla full yoga y comida vegana.
          h3 ¿Qué hacer?
          ul
            li Recorrer las playas: Parte norte: Salad Beach y Chalok lam beach. Parte sur: Haad Rin (playa de la Full moon)  y Léela Beach. Hay muchas más, algunas pegadas.
            li Descansar y comer rico
          p Podría escribir infinito de este país, pero para hacerlo más ordenado y menos latero, Bangkok y el norte, van en el próximo post.
          p Ojalá les guste y viajen conmigo en esta aventura <3
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
  name: 'Blog07',
  components: {
    BannerTop
  }
}

</script>
