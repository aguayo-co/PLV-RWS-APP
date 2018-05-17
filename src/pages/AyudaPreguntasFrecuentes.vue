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
        h1.blog__title.blog_center Preguntas Frecuentes
      .blog__article
        .blog_center.i-talk.blog_center_ico 
          h2.blog__subtitle Preguntas Generales
          p.blog__kicker.blog__kicker_center Cosas básicas que debes saber para usar Prilov
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo puedo vender mi ropa?
          dd.panel__body
            ul.panel__list
              li Luego de crear Tu Cuenta, haces click en <strong>Publicar un producto</strong> y subes las foto de lo que quieres vender, completando todos los campos requeridos.
              li Una vez que la compradora haya pagado, recibirás un correo de Prilov con la confirmación de la venta y los detalles. También podrás ver la información desde la vista de Tus Ventas.
              li Según los métodos de envío que elegiste, deberás hacer llegar la venta a la compradora. No olvides marcar el producto como <strong>Enviado</strong> desde la vista de Tus Ventas.
              li Cuando la compradora haya recibido el producto y confirme que está todo OK, el dinero se transfiere en forma de créditos a Tu Cuenta Prilov.
            p <sup>*</sup> Puedes usar esos créditos para comprar en Prilov o elegir la opción de transferirlo a tu cuenta bancaria desde la vista de Tus Créditos.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Qué puedo vender en Prilov?
          dd.panel__body
            p Ropa, accesorios y zapatos de mujer. Puedes vender lo que quieras en Prilov dentro de esas categorías, siempre que estén en buen estado. Si alguna vez se te pasó por la cabeza tirarlo a la basura, entonces no es para Prilov. Recuerda no publicar nada que no le regalarías a una amiga ;)

          //-3
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Tiene algún costo para mí, vender en Prilov?
          dd.panel__body
            p Prilov cobrará un 20% de comisión del valor de los productos por cada venta que se genere; abonándote el 80% del valor de los productos en créditos. A menos que hayas elegido una comisión diferente al momento de subir tu producto. Por ejemplo, si el precio del producto es $10.000, entonces generaremos créditos por $8.000.
            p Transferir los créditos a tu cuenta bancaria no tiene costo.

          //-4
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Puedo vender si no tengo cuenta bancaria?
          dd.panel__body
            p Tu perfil de Prilov debería estar asociado a una cuenta bancaria para que podamos entregarte el dinero que te corresponde. Pero si tú no tienes una cuenta a tu nombre, puedes ingresar la de algún familiar o amigo.  En el caso de no tener ninguna de las dos opciones de arriba, entonces tus créditos serán abonados siempre a Tu Cuenta Prilov y podrás usarlos para comprar lo que quieras en Prilov.

          //-5
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo puedo comprar en Prilov?
          dd.panel__body
            ul.panel__list
              li Agrega el o los productos que quieras a tu carrito apretando el botón <strong>Comprar</strong>. Anda al ícono de <strong>Carrito de compras</strong> que está en la barra negra superior de la página y aprietas <strong>Ir a pagar</strong>.
              li Para cada producto, aparecerán los métodos de envío disponibles según su vendedora.
              li En el caso de que la vendedora tenga habilitado más de un método de envío, podrás elegir algunos de los dos. Si la vendedora sólo tiene un método de envío habilitado, entonces no te dará opción de elegir.
              li Luego haces click en <strong>Continuar</strong> para ir a pagar.  Elige el método de pago. Si eliges <strong>Transferencia bancaria</strong>, aparecerán los datos de la cuenta bancaria de Prilov. Debes hacerla desde la página de tu banco y luego, seleccionas <strong>Transferencia realizada</strong> en Prilov. Tendrás un máximo de 10 minutos para realizar la transferencia desde que haces click en <strong>Pagar con transferencia</strong>. <em>(Puedes adjuntar tu comprobante de pago como respaldo)</em>
              li Si eliges pago con tarjeta de crédito o débito, debes seleccionar <strong>Payu</strong> o <strong>Mercado Pago</strong> y seguir los pasos de pago.
              li Recibirás un mail de confirmación de tu compra con el número de teléfono de la vendedora para coordinar envío o entrega y la vendedora será notificada. Ella tiene 5 días hábiles para hacerte llegar el producto a tus manos. Sólo en el caso de que tu estés de acuerdo, ese plazo se puede extender.

          //-6
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Qué hago si quiero devolver un producto?
          dd.panel__body
            p En Prilov aceptamos devoluciones. Para informarte del paso a paso, puedes ir a <router-link to="/devolver-producto" class="link_underline">este link</router-link> donde explicamos todo el detalle de qué hacer en estos casos.

          //-7
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Como elimino mi cuenta en Prilov?
          dd.panel__body
            p Estaremos muy tristes si decides dejarnos. Siempre puedes escribirnos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> y te podemos ayudar con lo que necesites. Si decides eliminar tu cuenta, debes ir a la vista de Tu Cuenta en Prilov y verás un botón que dice <strong>Eliminar cuenta</strong>.

    .blog__inner
      .blog__article
        .blog_center.i-heart.blog_center_ico 
          h2.blog__subtitle Siéntete segura en Prilov
          p.blog__kicker.blog__kicker_center Todo lo que tienes que saber para confiar en nosotros
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo puedo estar segura de mi compra?
          dd.panel__body
            p ¡No te preocupes! Nosotros te ayudamos a que te sientas muy segura durante todo el proceso de compra y siempre tengas garantías en el caso que algún problema ocurra.  Por ejemplo, el dinero de tu compra no será entregado a la vendedora hasta que tú confirmes que la has recibido y estás contenta.
            p Cualquier problema o duda, escríbenos un mail a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> o usa el chat de la página.

    .blog__inner
      .blog__article
        .blog_center.i-bag.blog_center_ico 
          h2.blog__subtitle Comprando
          p.blog__kicker.blog__kicker_center Resuelve tus dudas sobre cómo comprar en Prilov
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo puedo comprar en Prilov?
          dd.panel__body
            ul.panel__list
              li Agrega el o los productos que quieras a tu carrito apretando el botón <strong>Comprar</strong>. Anda al ícono de <strong>Carrito de compras</strong> que está en la barra negra superior de la página y aprietas <strong>Ir a pagar</strong>.
              li Para cada producto, aparecerán los métodos de envío disponibles según su vendedora.
              li En el caso de que la vendedora tenga habilitado más de un método de envío, podrás elegir algunos de los dos. Si la vendedora sólo tiene un método de envío habilitado, entonces no te dará opción de elegir.
              li Luego haces click en <strong>Continuar</strong> para ir a pagar.  Elige el método de pago. Si eliges <strong>Transferencia bancaria</strong>, aparecerán los datos de la cuenta bancaria de Prilov. Debes hacerla desde la página de tu banco y luego, seleccionas <strong>Transferencia realizada</strong> en Prilov. Tendrás un máximo de 10 minutos para realizar la transferencia desde que haces click en <strong>Pagar con transferencia</strong>. <em>(Puedes adjuntar tu comprobante de pago como respaldo)</em>
              li Si eliges pago con tarjeta de crédito o débito, debes seleccionar <strong>Payu</strong> o <strong>Mercado Pago</strong> y seguir los pasos de pago.
              li Recibirás un mail de confirmación de tu compra con el número de teléfono de la vendedora para coordinar envío o entrega y la vendedora será notificada. Ella tiene 5 días hábiles para hacerte llegar el producto a tus manos. Sólo en el caso de que tu estés de acuerdo, ese plazo se puede extender.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") Ya recibí mi compra, ¿qué debo hacer ahora?
          dd.panel__body
            p Si retiraste el producto en una sucursal de Chilexpress, el producto se marcará automáticamente como <strong>Recibido</strong> por sistema y tendrás 2 días para notificar si te lo quedas o quieres devolverlo.
            p Si pasan 2 días y no has cambiado el estado, el producto quedará como <strong>Pagado</strong> a la vendedora y se generarán los créditos en su cuenta de Prilov.
            p Si te juntaste con la vendedora o ella envió por una empresa de courier por pagar, entonces tendrás 5 días desde que ella marcó como <strong>Enviado</strong> para notificar su recepción o solicitar devolución.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Qué hacer cuando quiero devolver un producto?
          dd.panel__body
            p En Prilov aceptamos devoluciones. Para informarte del paso a paso, puedes ir a <router-link to="/devolver-producto" class="link_underline">este link</router-link> donde explicamos todo el detalle de qué hacer en estos casos.

          //-3
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") Pasaron los 5 días desde la compra y no he recibido mi producto. ¿Qué puedo hacer?
          dd.panel__body
            p Si ya han pasado los 5 días hábiles desde la compra de tu producto y aún no lo has recibido, ponte en contacto con Prilov escribiéndonos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a>. Nosotras te ayudaremos.

          //-4
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") Han pasado varios días desde la compra y la vendedora no responde o ya no tiene el producto que compré.
          dd.panel__body
            p Si es que realizaste una compra y la vendedora no ha respondido tus mensajes, ponte en contacto con nosotras para ayudarte escribiendo a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a>.
            p Quédate tranquila, porque si pasan los 5 días hábiles y no has recibido tu producto o respuesta de la vendedora, entonces cancelaremos la compra y te haremos la devolución de tu dinero en créditos. Puedes transferirlos a tu cuenta bancaria desde la vista de Tus Créditos. Si la vendedora ya no tiene disponible un producto que compraste, cancelaremos la compra y te devolveremos el dinero. Todas las devoluciones se hacen en créditos a Tu Cuenta en Prilov. Si quieres transferir a tu cuenta bancaria, debes solicitarlo desde la vista de Tus Créditos.

          //-5
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Como cancelo una compra?
          dd.panel__body
            p Si ya hiciste el pago de un producto y te arrepientes o desistes de la compra antes de recibir el producto, ponte en contacto con nuestro equipo para poder cancelar la transacción y devolverte tus créditos. Escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a>.

    .blog__inner
      .blog__article
        .blog_center.i-money.blog_center_ico 
          h2.blog__subtitle  Vendiendo
          p.blog__kicker.blog__kicker_center Resuelve tus dudas sobre cómo cómo vender en Prilov
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo puedo vender mi ropa?
          dd.panel__body
            ul.panel__list
              li Luego de crear Tu Cuenta, haces click en <strong>Publicar un producto</strong> y subes las foto de lo que quieres vender, completando todos los campos requeridos.
              li Una vez que la compradora haya pagado, recibirás un correo de Prilov con la confirmación de la venta y los detalles. También podrás ver la información desde la vista de Tus Ventas.
              li Según los métodos de envío que elegiste, deberás hacer llegar la venta a la compradora. No olvides marcar el producto como <strong>Enviado</strong> desde la vista de Tus Ventas.
              li Cuando la compradora haya recibido el producto y confirme que está todo OK, el dinero se transfiere en forma de créditos a Tu Cuenta Prilov.
            p <sup>*</sup> Puedes usar esos créditos para comprar en Prilov o elegir la opción de transferirlo a tu cuenta bancaria desde la vista de Tus Créditos.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") No he recibido mis créditos en mi cuenta Prilov, ¿qué puedo hacer?
          dd.panel__body
            p La única razón por la que tus créditos no se ven reflejados en Tu Cuenta de Prilov si ya entregaste el producto, es porque la compradora aún no confirma que recibió su compra.
            p Puedes ponerte en contacto directamente con ella para recordarle o escribirnos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> para que la contactemos.
            p Si han pasado más de 2 días desde que ella recibió, el producto se marcará como <strong>Recibido</strong> y tus créditos quedarán abonados automáticamente.

          //-3
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo determino el precio de un producto?
          dd.panel__body
            p No debes complicarte asignando precios a tus productos. Es más fácil de lo que crees. En primer lugar, te recomendamos tomar en cuenta el tiempo de uso que tiene, el precio original, el valor emocional que le das, y por último, lo que puede ser muy útil es usar como referencia productos similares, o de la misma marca, que ya estén publicados en Prilov y guiarte por ellos.

          //-4
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo es el proceso de pago cuando quiero transferir mis créditos a mi cuenta bancaria?
          dd.panel__body
            p ¡Puedes transferir tus créditos a tu cuenta bancaria en cualquier momento!  Sólo recuerda que <strong>debes tener más de $4.000</strong> para que sean transferidos. Para transferir tus créditos, debes hacer click en Tu Cuenta e ir a la sección <strong>Créditos</strong>. Ahora puedes ver la opción <strong>Convertir en dinero</strong>, la seleccionas y el dinero tardará entre 1 a 4 días hábiles en aparecer en la cuenta bancaria que ingresaste en Tu Cuenta Prilov.
            p Asegúrate de ingresar tus datos bancarios antes de solicitar la transferencia de créditos. Para ingresarlos debes ir a <router-link to="/user/datos-bancarios">Datos Bancarios</router-link> desde Tu Cuenta. Hay un máximo de créditos que puedes juntar en tu cuenta. <strong>Al superar los $200,000 en créditos</strong>, automáticamente se solicitarán los créditos para ser transferidos a tu cuenta bancaria.

          //-5
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Qué pasa si la compradora no confirma que recibió el producto?
          dd.panel__body
            p Si enviaste por Chilexpress con el envío prepagado por la compradora, entonces una vez que ella retire el producto, automáticamente el sistema lo reconocerá y le dará dos días para marcar como <strong>Recibido</strong> o <strong>Solicitar Devolución</strong>. En el caso de que esto no ocurra, se abonarán los créditos automáticamente a tu perfil luego de esos dos días.
            p Si entregaste el producto en persona o enviaste por pagar a través de una empresa de courier, entonces el sistema contará 5 días hábiles desde que marcaste como enviado y en el caso de que la compradora no confirme la recepción, se cargarán los créditos automáticamente en Tu Cuenta, luego de pasado esos 5 días.

          //-6
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Qué hago si la compradora no está satisfecha con el producto que le vendí?
          dd.panel__body
            p Todas las compradoras tienen derecho a devolver un producto. El plazo para notificarlo en la página es de 2 días desde que reciben el producto. Si la compradora devuelve el producto porque simplemente no le quedó bien, entonces ella deberá correr con los costos de envío para la devolución. En el caso de que el producto que le vendiste sea diferente a lo publicado, tenga una falla o  problema, entonces corresponde que tú como vendedora, pague el costo de envío.

          //-7
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Puedo ocultar un producto que ya publiqué?
          dd.panel__body
            p En el caso que quieras ocultar un producto, sólo debes ir a la vista de Tu Clóset y en el producto verás el ícono de <strong class="i-view"> “ojo”</strong>, haces click y quedará oculto para todos. Esto lo podrás hacer sólo en el caso de que el producto no se haya vendido.

          //-8
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Puedo eliminar un producto que ya publiqué?
          dd.panel__body
            p Si quieres eliminar definitivamente un producto, sólo debes ir a la vista de Tu Clóset y en el producto verás el ícono de <strong class="i-trash"> “basurero”</strong>, haces click y quedará eliminado para siempre para. Esto lo podrás hacer sólo en el caso de que el producto no se haya vendido.

    .blog__inner
      .blog__article
        .blog_center.i-send.blog_center_ico 
          h2.blog__subtitle  Enviando
          p.blog__kicker.blog__kicker_center Todo lo que necesitas saber para despachar tus ventas
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Quién paga por el despacho?
          dd.panel__body
            p Las compradoras son las que deben pagar por despacho. Ya sea prepagando el envío al momento de comprar o bien, pagando al momento de retirar el producto. Esto dependerá de la opción que habilites como vendedoras para hacer tus envíos. En el caso de juntarse, no habrá costo asociado por despacho.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Qué opciones tengo para enviar?
          dd.panel__body
            p Como vendedora, hay dos métodos de envíos que puedes habilitar desde Tu Cuenta, y luego haciendo click en Métodos de Envío. Estas opciones son: envíos prepagados por compradora a través de Chilexpress o bien, acuerdo con compradora.
            p Si habilitas una de las opciones, entonces al momento de que la compradora agregue uno de tus productos a su carro de compras, le aparecerá sólo ese método de envío en la vista de su carro de compras. Si habilitas ambas opciones, entonces ella podrá elegir y a ti te llegará el detalle de su elección en el mail de confirmación de venta.
            h4.panel__subtitle 1. Despachando por Chilexpress
            p En este caso, <strong>la compradora habrá pagado el envío asignado por Chilexpress</strong> según la dirección que ella ingresó. Recibirás un mail con la etiqueta de Chilexpress y deberás seguir estos pasos:
            ol.panel__ordenlist
              li Imprimir la etiqueta de Chilexpress.
              li Envolver el o los productos que vendiste.
              li Debes llevar el paquete junto con la etiqueta que imprimiste a la sucursal de Chilexpress más cercana.
              li No deberás pagar nada al momento de enviar (la compradora ya pagó por el envío).
              li El código de seguimiento le llegará automáticamente a tu compradora y tu producto quedará como estado <strong>enviado</strong> automáticamente en Tu Cuenta de Prilov.
            h4.panel__subtitle 2. Acuerdo de envío con compradora
            p Al seleccionar esta opción, podrán ponerse de acuerdo entre vendedora y compradora luego de la confirmación de la venta. Ambas recibirán un correo con el contacto de la contraparte.
            p Las opciones de entrega pueden ser dos: juntarse en persona, o bien, envío por pagar a cualquier sucursal que a la compradora le acomode.
            p Si se juntan en persona y ya entregaste el producto, debes ir a Tu Cuenta, luego a Tus Ventas y sobre el producto marcar <strong>Sí, ya lo entregué</strong> y luego indicar <strong>Nos juntamos</strong>. De esta forma, la compradora podrá marcar como <strong>Recibido</strong> y los créditos correspondientes a esa venta, serán abonados en Tu Cuenta de Prilov.
            p Si envías por pagar a través de una empresa de courier, luego de enviar, debes ir a Tu Cuenta, luego a Tus Ventas y sobre el producto marcar <strong>Usé una empresa de courier</strong>, y luego completar la información requerida.

          //-3
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cuánto plazo tengo para enviar el producto?
          dd.panel__body
            p Desde que la compra se realizó, la compradora deberá recibir la compra dentro de los próximos 5 días hábiles. Por lo que te recomendamos enviarlo dentro de un plazo máximo de 3 días desde la compra.
    .blog__inner
      .blog__article
        .blog_center.i-user.blog_center_ico 
          h2.blog__subtitle Mi cuenta
          p.blog__kicker.blog__kicker_center Resuelve todas tus dudas sobre cómo gestionar tus datos y tu cuenta
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") Olvidé mi contraseña, ¿Qué puedo hacer?
          dd.panel__body
            p Para recuperar tu contraseña de Prilov debes seguir estos pasos:
            ul.panel__list
              li Debes hacer click en <strong>Ingresar</strong>.
              li Escribe tu mail y luego haces click en <strong>Recuperar Contraseña</strong>.
              li Ahora recibirás un correo de Prilov al mail con el que te registraste con los pasos para recuperar la contraseña.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)")  Olvidé el mail con el que me registré en Prilov, ¿Qué puedo hacer?
          dd.panel__body
            p Escríbenos a <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a> y te ayudaremos a recuperarlo.

          //-3
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Por que razón ya no puedo entrar a mi perfil?
          dd.panel__body
            p Si estás segura que estás entrando a Prilov con el nombre de usuario y contraseña correctos y aún así no puedes ingresar a tu perfil, la razón puede ser que tu cuenta fue bloqueada.
            p Las cuentas son bloqueadas por diferentes razones y no necesariamente serás notificada:
            ol.panel__ordenlist
              li Recibimos pruebas de que estás comprando/vendiendo por fuera del sistema. Estas pruebas pueden ser por medio de nuestro propio sistema o bien, enviado por otras usuarias a nuestro correo.
              li Estás utilizando lenguaje no adecuado en comentarios, mensajes o incluso a través de otros medios con usuarias que encontraste en Prilov.
              li Luego de varias advertencias, sigues enviando números de teléfono, correos, o invitando a pagar por fuera.

    .blog__inner
      .blog__article
        .blog_center.i-dress.blog_center_ico 
          h2.blog__subtitle Mis productos
          p.blog__kicker.blog__kicker_center Todo lo que debes saber sobre tus productos publicados en Prilov
        dl.panel
          //-1
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Por qué no veo mis productos publicados en Prilov?
          dd.panel__body
            p Los productos son revisados por nuestro equipo antes de ser publicados. Su revisión puede demorar hasta 48 horas desde que los subiste.
            p Si alguno de tus productos fue rechazado, recibirás un mail notificándose con la razón de esto.
            p Para que esto no te pase, no olvides revisar los <strong>consejos para lograr fotos que vendan</strong> en la sección <strong>Cómo funciona</strong>.

          //-2
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") Se eliminaron todos mis ítems de Prilov ¿Por qué pasó esto?
          dd.panel__body
            p Sí ya no puedes ver ningún ítem en tu perfil, ni tampoco puedes volver a subir productos, la razón es que hemos detectado irregularidades en cómo estás usando Prilov. Tenemos un sistema que detecta palabras que no debieran ser nombradas y que las lleva a saltarse nuestro sistema.
            p Recuerda que si no vendes a través de Prilov y ocupas nuestro sistema para generar transacciones, estás faltando a nuestra confianza y a las condiciones para ser parte de la comunidad, y si lo haces, no podrás volver a publicar tus productos.
            p Queremos prilovers comprometidas con la comunidad de closets.

          //-3
          dt.panel__head.i-plus(
            @click="toggleDropdown($event)") ¿Cómo cambio el precio de un producto?
          dd.panel__body
            p Debes ingresar a la vista de Tu Clóset y sobre el  producto, marcar sobre el ícono de lápiz para editar, luego modificas el precio y guardas la nueva información.

// <a class="link_underline" href="mailto:contacto@prilov.com">contacto@prilov.com</a>
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'AyudaPreguntasFrecuentes',
  components: {
    BannerTop
  },
  methods: {
    toggleDropdown (event) {
      event.currentTarget.classList.toggle('panel_active')
    }
  }
}

</script>
