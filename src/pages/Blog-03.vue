<template lang="pug">
.layout-page
  BannerTop
  section.blog.blog_top
    .blog__inner
      header.blog__header
        h1.blog__title Fast Fashion
        p.blog__kicker Te contamos lo que es y qué puedes hacer al respecto
        p.bolg__data <time datetime="2017-11-27">lun 27 nov 2017</time> por <a class="link_underline" href="closet/2" title="Autor The Prilov Team">The Prilov Team</a>
      article.blog__body
        .blog__spread
          .blog__copy
            figure.blog__picture
              img.blog__image(
                src="static/img/blog-fashion-001.png"
                alt="Fast Fashion")
            p De seguro no es nada nuevo que les digamos que en la industria de la moda las cuatro estaciones del año son cosa del pasado. Hoy en día, se habla de que la moda tiene 52 temporadas, y si no la habían escuchado antes, probablemente se habrán dado cuenta que cada semana que van al mall hay cosas distintas. Este fenómeno es conocido como fast fashion.
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
                  :to="{ name: 'blog02' }") Marie Kondo, la gurú del orden.
              dd
                router-link.link(
                  :to="{ name: 'blog01' }") Las cuatro apps más usadas por fashion bloggers para editar sus fotos.
              dd
                router-link.link(
                  :to="{ name: 'blog04' }") Tips de vendedoras top para lograr buenas limpiezas de clóset.
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-fashion-002.png"
              alt="Rana Plaza en Bangladesh: 1130 trabajadores muertos")
          .blog__copy
            .blog__subarticle
              p La idea de poder tener lo último al instante es demasiado tentadora, pero ¿se han detenido a pensar cómo es posible que si hace una semana vieron una tendencia en las pasarelas de New York, esta ya está disponible a un precio muy accesible en Zara, H&M, Mango, etc? Para poder tener las últimas tendencias, estas tiendas tienen que poder producir rápido y barato, lo cual solo es posible en países tercermundistas con poca regulación. Y aquí es donde surge el gran problema. Esto implica procesos altamente contaminantes y el abuso de la mano de obra en lugares como India, Vietnam o Bangladesh. Un ejemplo de esto, es el derrumbe ocurrido el 2013 en una fábrica llamada Rana Plaza en Bangladesh, donde a pesar de los avisos de los trabajadores sobre las malas condiciones del edificio, los empleadores no hicieron nada al respecto. ¿El resultado? 1130 trabajadores muertos.
    article.blog__body
      .blog__out.blog__out_right
        .blog__spread.blog__spread_upside
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-fashion-003.png"
              alt="La segunda industria más contaminante del mundo")
          .blog__copy
            p Alrededor del mundo se venden más de 80.000 millones de prendas, lo que trae como consecuencia que esta sea la segunda industria más contaminante del mundo, siendo la responsable de 20% de los productos tóxicos que se vierten al agua. En Chile no nos quedamos atrás. Somos el país de Latinoamérica que más consume, con un promedio de 27 prendas al año (el que nos sigue tiene un promedio de solo 18). El impacto ambiental es aún mayor si consideramos cuánto demora la ropa en degradarse, la contaminación generada por el transporte, el uso de químicos en el teñido y, por sobretodo, la cantidad de agua que se utiliza.
    article.blog__body
      .blog__out
        .blog__spread
          figure.blog__picture
            img.blog__image(
              src="static/img/blog-fashion-004.jpg"
              alt="The Buyerarchy of needs")
          .blog__copy
            .blog__subarticle
              p Durante los últimos años han surgido varias organizaciones que luchan contra este fenómeno, buscando reducir el impacto ambiental de la industria, como también lograr que quienes trabajan en esta industria tengan un sueldo y condiciones laborales dignas. Además, cada vez hay más marcas que producen bajo estándares de fair trade, es decir, comercio justo. Algunas, como Reformation o Everlane, tienen cosas preciosas, pero el problema con estas es que no llegan a Chile, y si llegan, sus precios son estratosféricos.
              p Pero, que no cunda el pánico, porque alternativas hay. Existe lo que se como la jerarquía de necesidades al comprar. En la base, proponen usar lo que tienes, porque de seguro hay ropa en tu clóset que hace meses no usas, o probablemente una que otra polera que sigue con etiqueta. Después, está la opción de prestar o intercambiar. Luego, comprar de segunda mano, ya sea en tiendas de ropa usada o a través de plataformas online. Le sigue hacer la ropa y, como última opción, comprarla.
    .blog__inner
      article.blog__body
        .blog__spread
          .blog__copy
            p Si les gustaría informarse más del tema les mega recomendamos ver un documental que se llama “True Cost”. Está en Netflix, y en él se muestra en detalle los efectos (que probablemente son muchos más de los que se imaginan) de cada parte del proceso de producción. También pueden seguir cuentas en instagram como @fash_rev y @ecoage para saber más, y por supuesto a @liviafirth, la máxima representante de la causa.
            p Las dejamos invitadísimas a que ocupen Prilov como una alternativa más amigable con el medio ambiente. Además de comprar de segunda mano, pueden darle a esas pilchas que ya le sacaron el jugo una segunda oportunidad, para que en lugar de terminar acumuladas en basurales, otra Prilover pueda sacarle provecho.
          blockquote.blog__pullquote(
            cite='http://prilov.html')
            p.blog__quote Prilov: una alternativa amigable con el medio ambiente.
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Contenido',
  components: {
    BannerTop
  }
}

</script>
