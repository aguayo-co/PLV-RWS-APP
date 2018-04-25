<template lang="pug">
.layout-inner
  section.chat-slot
    header.single__header
      h2.subhead Preguntas sobre esta prenda
    .chat-slot__block
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
            .editor
              form.editor__form
                .chat__form-group
                  textarea.form__textarea.editor__textarea
                  .chat__btn-group
                    button.chat__btn-solid.i-shipping(
                      type="submit")
      .chat-notify
        form.chat__form
          label.chat__label ¡Pregúntale a la vendedora!
          textarea.form__textarea.chat__textarea
          button.chat__btn-solid.i-shipping(type="submit")
        p.chat-alert.i-alert-circle Recuerda que al comprar en Prilov disfrutas de garantía de devolución, protección 24/7 ante cualquier problema y nuestra plataforma segura de pagos.
</template>

<script>
export default {
  name: 'ProductoNotificaciones'
}
</script>
