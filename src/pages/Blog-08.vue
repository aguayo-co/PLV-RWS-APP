<template lang="pug">
.layout-page
  BannerTop
  section.blog
    .blog__inner
      header.blog__header
        h1.blog__title ¡Tailandia aun no termina! Viajamos por Bangkok y el norte …
        p.blog__kicker Prilov por el mundo
        p.bolg__data <time datetime="2018-10-14">Dom 14 Oct 2018 </time> por <a class="link_underline" href="closet/3" title="Autor Andrea Tapia">Andrea Tapia</a>
      article.blog__body
        .blog__spread
          .blog__copy
            p Nos quedó pendiente una parte de Tailandia muy distinta a lo que vimos en el post anterior. La capital  y el norte, que para muchos viajeros, es aun más alucinante que las playas paradisiacas del sur. Acá veremos templos budistas, monjes, elefantes, mercados y más.
            figure.blog__picture.blog__picture_spaced
              img.blog__image(
                src="static/img/blog-08-001.jpg"
                alt="Bangkok")
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
          h2.blog__headline Bangkok
          p Es la capital de Tailandia, típica ciudad asiática. Muchísima gente, calor, olores y humedad extrema. Nosotros nos quedamos en Rambuttri, al lado del carrete de Khaosan Rd. En general hay un turismo bien exagerado. Mucho tour chino que invade los templos.
          blockquote.blog__pullquote(
              cite='https://www.prilov.com')
              p.blog__quote Recomendación: ir a la hora de almuerzo porque no hay tanta gente.
          p Siempre llevar pantalones y polera con hombros tapados, sino, te van a calzar comprando algún bombacho de elefante.
          h3 ¿Qué hacer?
          ul
            li <strong>Chatuchak Market:</strong> Es uno de los mercados más grandes del mundo y ojo, solo abre los DOMINGOS. Está ordenado por sectores y tiene de todo (compramos varias pilchas usadas). De mis panoramas favoritos.
            li <strong>Floating Market:</strong> Hay varios mercados flotantes y todos quedan alejados de la ciudad. Nos dijeron que los mejores, abrían sólo los fines de semana. Como nosotros no alcanzábamos, fuimos a Damnoen Saduak. La verdad, teníamos más expectativas, pero igual como panorama, es algo distinto.
            li <strong>Khaosan Road:</strong> Es la calle del carrete. Mucho puesto de comida, bares, música, gente bailando en las calles. En el día, hay varias tiendas.
            li <strong>Chinatown:</strong> Muy recomendable. Tipo 5-6pm, los letreros chinos se iluminan y la calle se ve hermosa.
            li <strong>Shopping en SIAM center:</strong> El día que nos tocó lluvia torrencial, fuimos de shopping a este complejo enorme de malls. Son varios. Hay de todo, tiendas de lujo, las marcas típicas, tecnología, comida.
          h3 Templos
          ul
            li <strong>Grand Palace:</strong> El templo más turístico de Bangkok. Fuimos caminando desde Rambuttri. Cuesta 500 baht la entrada y a nosotros nos tocó lleno de gente. Es realmente lindo.
            li <strong>Wat Pho Temple (Reclining Buddha):</strong> También puedes ir caminando. Cuesta 100 baht, te regalan una botella de agua y es más agradable de recorrer.
            li <strong>Wat Arun:</strong> Es mi favorito. Queda al otro lado del río. Hay que ir al muelle y cruzar en bote que es baratísimo. Es maravilloso y el nivel de detalle es impresionante. Hay mucha menos gente y la entrada cuesta 50 baht.
          figure.blog__picture.blog__picture_spaced
            img.blog__image(
              src="static/img/blog-08-002.jpg"
              alt="Bangkok")
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline Chiang Mai
          p Es una ciudad bacan, tiene harta onda y la parte antigua, está rodeada por un canal en forma cuadrada. Hay más de 300 templos, imposible ir a todos, pero se pueden seleccionar los más lindos. Arrendamos moto para recorrer.
          h3 ¿Qué hacer?
          ul
            li <strong>Fuerte o muralla:</strong> Caminar por ahí y perderse por las callecitas.
            li <strong>Wat Doi Suthep:</strong> Es el templo que queda en el cerro. Nosotros fuimos en moto. Lo mejor es la escalera para llegar. El templo y las vistas son lindas.
            li <strong>Wat Phra Singh:</strong> Es uno de los templos más conocidos, dorado, muy lindo. Lo más bacan es que está al lado de un colegio donde hay muchos monjes niños y puedes conversar con ellos. La entrada cuesta 20 baht.
            li <strong>Silver Temple:</strong> Es un templo plateado, bien lindo. No es muy grande y las mujeres NO podemos entrar.
            li <strong>Elephant Sanctuary:</strong> Fuimos medios reacios por lo de santuario, pero finalmente fuimos. Compartimos con ellos, les dimos comida, nos bañamos en el barro, y al final nos quedamos con lo que pudimos aprender, compartir y conocer a los elefantes.
            li <strong>Night market:</strong> Hay millones de mercados. De comida, imitaciones, suveniers, etc. Hay uno que se pone solo los domingos y es enorme.
            li <strong>Doi Inthanon:</strong> Es un Parque Nacional. Nosotros no fuimos, pero nos quedamos con las ganas.
          figure.blog__picture.blog__picture_spaced
            img.blog__image(
              src="static/img/blog-08-003.jpg"
              alt="Chiang Mai")
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline Pai
          p Es como cajón del Maipo en Chile. Un pueblito chico, medio hippie y con varias atracciones naturales (no pagamos por ninguna a la que fuimos). Arrendamos moto para recorrerlo. Es muy tranqui, aprovechamos de descansar. Hay mucha palta y eso nos hizo muy felices ;)
          h3 ¿Qué hacer?
          ul
            li <strong>Bamboo Bridge:</strong> Es un puente de bamboo hermoso sobre campos de arroz.
            li <strong>Waterfalls:</strong> Paseo a las cascadas, te puedes bañar, el agua es helada pero muy rica para el calor que hacer.
            li <strong>Pai Canyon:</strong> Fuimos a ver el sunset. Tiene unas vistas cuaticas. Recomiendo ir con zapatillas para poder subir.
            li <strong>Night Market:</strong> En una de las calles principales, todos los días a las 5pm, se pone el mercado con puestas de comida exquisitas.
      article.blog__body.blog__body_slot
        .blog__copy
          h2.blog__headline Chiang Rai
          p Solo fuimos por el famoso templo blanco, no hay mucho más que hacer. Arrendamos moto.
          h3 ¿Qué hacer?
          ul
            li <strong>White temple:</strong> Es realmente lindo por fuera, parece un castillo de algodón. Pero por dentro es raro. Mejor cuando vayan me cuentan que piensan. Ir a la hora de almuerzo o en la tarde porque se llena. La entrada cuesta 50 baht.
            li <strong>Sow de Lady Boys:</strong> Está cerca de la estación de buses, hay una feria junto a un mercado y entre medio de algunos puestos, hay un escenarios donde hay un show de Lady Boys tipo 19pm.
          figure.blog__picture.blog__picture_spaced
            img.blog__image(
              src="static/img/blog-08-004.jpg"
              alt="Chiang Rai")
      article.blog__body.blog__body_slot
        .blog__copy
          p Podría seguir escribiendo y escribiendo, pero creo que dejé un buen resumen. El resto, ojalá puedan viajar y verlo ustedes mismas.
          p Próximo domingo, nuevo destino <3
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
