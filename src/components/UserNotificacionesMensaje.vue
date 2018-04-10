<template lang="pug">
.single__inner
  a.btn-back.i-back(href="#") Volver
  header.single__header
    h1.single__title Daniela Damasco
  .chat
    .chat__message_inner
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
  name: 'UserNotificacionesMensaje'
}
</script>
