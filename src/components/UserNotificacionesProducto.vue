<template lang="pug">
.single__inner
  a.btn-back.i-back(href="#") Volver
  header.single__header
    h1.single__title Daniela Damasco
  .chat.chat__grid
    .chat__slot
      article.slot.slot_grid
        a.slot__product(href='#', title='Producto')
          img.slot__img(src="static/img/demo/product-008.jpg",
            alt="Producto")

          //-title/dimensions
          .slot__lead
            .slot__title CHAQUETA DENIM LEVIS
            .slot__size 
              .slot__size-txt XS
              //- .slot__size-txt {{ product.size.name }}

          //- brand/price
          .slot__info
            .slot__brand Zara
            .slot__price $20.000

    .chat__message
      .chat__message_inner
        .chat__message-flex
          .chat-line
            .chat__bubble-main
              img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si está aun disponible, ¿Quieres comprarlo?
            .chat__bubble
              img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si, me interesa comprar.
              span.chat-bubble__noti.i-check
          .chat-line
            .chat__bubble-main
              img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si está aun disponible, ¿Quieres comprarlo?
            .chat__bubble
              img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si, me interesa comprar.
              span.chat-bubble__noti.i-check
          .chat-line
            .chat__bubble-main
              img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si está aun disponible, ¿Quieres comprarlo?
            .chat__bubble
              img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si, me interesa comprar.
              span.chat-bubble__noti.i-check
          .chat-line
            .chat__bubble-main
              img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si está aun disponible, ¿Quieres comprarlo?
            .chat__bubble
              img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
              p.chat-bubble__txt Hola, si, me interesa comprar.
              span.chat-bubble__noti.i-check
          .chat-line
            .chat__bubble-main
              img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
              p.chat-bubble__txt Listo, ¿tienes alguna duda sobre el zapato?
            .chat__bubble
              img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
              p.chat-bubble__txt Si, me interesa saber cuánto tiempo  tiene de uso.
              span.chat-bubble__noti.i-check
      .chat-inner
        form.chat__form
          label.chat__label Escribe un mensaje aquí
          .chat__form-group
            textarea.form__textarea.chat__textarea
            .chat__btn-group
              button.chat__btn-solid.i-shipping(type="submit")
              //- .chat__btn-file
              //-   input#chatFile.chat__btn-flat(type='file')
              //-   label(for="chatFile").i-blog.chat__label-flat.chat__btn
              //- a.i-smile.chat__btn(href="#")

</template>

<script>
export default {
  name: 'UserNotificacionesProducto'
}
</script>
