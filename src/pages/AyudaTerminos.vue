<template lang="pug">
.layout-page
  BannerTop
  section.blog-summary
    figure.blog-banner.banner-hero
      .banner-hero__slot
        .banner-hero__head.left
          figcaption.banner-hero__caption Descubre productos que te encantan y cómpralos casi regalados
      picture.banner-hero__crop
        source.banner-hero__img(media='(max-width: 640px)', srcset='static/img/demo/banner-005-m.jpg')
        img.banner-slider__img(src='static/img/demo/banner-005.jpg')

    .blog__inner
      header.blog__header
        h1.blog__title Condiciones de Uso
        p.blog__kicker El uso de esta página está sujeto a las condiciones y términos que se detallan en adelante
      article.blog__body.blog__body_slot
        h2.blog__headline Ámbito de Aplicación
        .blog__copy
          p El uso de esta página está sujeto a las condiciones y términos que se detallan (en adelante las “Condiciones de Uso”), por lo tanto, el usuario se compromete a aceptarlas y velar por su cumplimiento. Así mismo, el usuario se compromete a aceptar que las Condiciones de Uso podrán ser modificadas o adaptadas a cambios tanto legislativos, prácticas generales de la industria, así como a políticas de la empresa. Se entenderá que las modificaciones producirán efectos desde que estén publicadas en el Sitio Web. Si usted visita esta página o es usuario, se entiende que adquiere conocimiento de las Condiciones de Uso, aceptándolas. Si no está de acuerdo con estas Condiciones de Uso, no utilice esta página.
      article.blog__body.blog__body_slot
        h2.blog__headline Política de Privacidad
        .blog__copy
          p La empresa respeta el deber de proteger los datos de carácter privado y personales de los usuarios, no dando acceso a ellos al público a menos que el propio usuario los de a conocer, por medio de la página Web bajo su consentimiento, no pudiendo hacer responsable a la empresa por la información que el mismo entregue. La empresa se compromete a cuidar la seguridad de los datos personales tomando todas las medidas necesarias para esto, a fin de evitar la pérdida, mal uso o cualquier apropiación indebida de estos mismos. Sin embargo, el usuario deberá velar también por su seguridad y no entregar datos que considere privados o información de carácter personal que no desea revelar. La responsabilidad en el uso de esta página por parte de menores de edad, recaerá única y exclusivamente en los padres o representantes legales de los mismos. El único motivo que hará revelar la información de los datos personales del usuario será una orden judicial, a fin de defender los intereses de la empresa, usuarios y terceros. La empresa no será responsable de aquellos Datos Personales que un usuario entregue a sitios web que no son de propiedad de la empresa. Tampoco lo será respecto de la información que voluntariamente facilite el usuario al comunicarse con otras empresas o personas dentro de la página Web y menos fuera de ésta.
          p A medida que utilices el sitio, cookies serán generadas en tu computador para que podamos entender y conocer tus intereses. Nuestros partners en publicidad utilizarán esa información para presentarte avisos según tus intereses y la interacción que hayas tenido con el sitio Web.
          p Si te registras en nuestro sitio te enviaremos correos informativos con novedades y promociones para ti, en el caso de no querer seguir recibiéndolas al final del correo aparecerá un link para que puedas salir de la lista.
      article.blog__body.blog__body_slot
        h2.blog__headline Obligaciones del Usuario
        .blog__copy
          ul.panel__list
            li No utilizar esta página web con fines delictivos, como perpetrar amenazas electrónicas, ocasionar fraudes de diverso orden, producir o almacenar pornografía infantil, realizar suplantación de identidad, utilizar esta página para injuriar o calumniar, entre otros.
            li Usar de forma diligente el Nombre de Usuario y las contraseñas, información que tiene el carácter de confidencial y personal. El usuario se hará responsable de todos los daños y perjuicios, ocasionados por la mala o negligente utilización de su Nombre de Usuario o contraseña, ya sea por el mismo o por parte de un tercero. Ante la usurpación de Nombre de Usuario y/o clave, es deber del usuario dar inmediato aviso a la empresa.
            li Hacer uso del sitio Web en conformidad a la ley, a las Condiciones de Uso y respetando la moral, las buenas costumbres y el orden público.
      article.blog__body.blog__body_slot
        h2.blog__headline Reglas de Publicación
        .blog__copy
          p Queremos asegurarnos que Prilov.com sea siempre un lugar seguro para toda la comunidad de usuarios que utiliza nuestra plataforma. Por lo anterior es importante que sigas las reglas al publicar ítems para la venta.
          p Prilov no permite:
          ul.panel__list
            li Productos publicados como “Réplicas de X” o “AAA réplicas”, imitaciones, etc. Todos ellos están prohibidos en nuestra plataforma. Usar un nombre de una marca para promocionar un producto que no es realmente de esa marca, viola directamente los derechos de esa marca ante la ley.
            li Ropa interior usada. Ropa interior nueva o nueva con etiqueta, está permitida.
            li Productos de belleza usados que han tenido directo contacto con la piel, como por ejemplo: rímel, delineador, blush, etc. El resto de productos de maquillaje que no han tenido contacto con la piel, pero han sido abiertos, son permitidos, siempre y cuando se deje claro en la descripción.
            li Artículos tecnológicos como teléfonos, cargadores, tablets, cámaras, TV, etc.
            li Piercings usados
            li Lentes de contacto
            li Medicinas
            li Artículos de casa
            li Tickets a eventos
            li Otros
          p Nos reservamos el derecho de bloquear y eliminar permanentemente tanto el producto publicado como el usuario que publique cualquiera de estos productos.
      article.blog__body.blog__body_slot
        h2.blog__headline Terminación
        .blog__copy
          p Nos reservamos el derecho a denegar, suspender o cancelar el servicio de usuarios que contravengan los Términos y Condiciones, sin previo aviso.
      article.blog__body.blog__body_slot
        h2.blog__headline Fallas en el sistema
        .blog__copy
          p La empresa no se hará responsable por daños, perjuicios o pérdidas de un usuario, causados por fallas en el sistema, en el servidor o en Internet. Tampoco se hará responsable por virus que contaminen los equipos de los usuarios como consecuencia del acceso, uso de la página Web o debido a cualquier transferencia de datos, archivos, imágenes, textos, audios u otros. No se le podrá imputar responsabilidad a la empresa debido a fallas técnicas que no sean de su responsabilidad y que como consecuencia no permitan prestar con la continuidad en el servicio.
      article.blog__body.blog__body_slot
        h2.blog__headline Ausencia de derechos del Usuario
        .blog__copy
          p Ser usuario de la página web, jamás implicará ser titular de derechos de la empresa; no se entenderán concedidas licencias, autorizaciones ni cesión de derechos a los usuarios.

</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'AyudaTerminos',
  components: {
    BannerTop
  }
}

</script>
