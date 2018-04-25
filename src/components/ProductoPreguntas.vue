<template lang="pug">
.layout-band
  .layout-inner
    section.chat-band
      header.chat-band__header
        h2.subhead Preguntas sobre esta prenda
      .chat-band__grid
        .chat
          .chat__group
            .chat-line
              .chat__bubble-main
                img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
                p.chat-bubble__txt Hola, si está aun disponible, ¿Quieres comprarlo?
              .chat__bubble
                img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
                p.chat-bubble__txt Hola, si, me interesa comprar.
              span.editor__btn(
                v-if="editorAnswer == false",
                @click="toggle('editorAnswer')") Responder
            .editor(
              v-if="editorAnswer == true")
              form.editor__form
                .chat__form-group
                  textarea.form__textarea.editor__textarea(
                    rows="1"
                  )
                  .chat__btn-group
                    button.chat__btn-solid.i-shipping(
                      type="submit",
                      @click.prevent="toggle('editorAnswer')")
            span.chat-break
              span.chat-break__bullet
          .chat__group
            .chat-line
              .chat__bubble-main
                img.chat-bubble__img(src="static/img/demo/user-avatar-002.jpg", alt="Avatar")
                p.chat-bubble__txt Disculpa, viajo a Argentina mañana en la tarde, será posible que lo valla yo a buscar directamente, por favor.. es para llevarlo al mencionado país, muchas gracias...
              span.editor__btn(
                v-if="editorAnswer == false",
                @click="toggle('editorAnswer')") Responder
            .editor(
              v-if="editorAnswer == true")
              form.editor__form
                .chat__form-group
                  textarea.form__textarea.editor__textarea(
                    rows="1"
                  )
                  .chat__btn-group
                    button.chat__btn-solid.i-shipping(
                      type="submit",
                      @click.prevent="toggle('editorAnswer')")
            span.chat-break
              span.chat-break__bullet
        .chat-query
          form.chat__form
            label.chat__label ¡Pregúntale a la vendedora!
            textarea.form__textarea.chat__textarea
            button.chat__btn-solid.i-shipping(type="submit")
          p.chat-alert.i-alert-circle Recuerda que al comprar en Prilov disfrutas de garantía de devolución, protección 24/7 ante cualquier problema y nuestra plataforma segura de pagos.
</template>

<script>
export default {
  name: 'ProductoPreguntas',
  data () {
    return {
      editorAnswer: false
    }
  },
  methods: {
    toggle: function (prop) {
      this[prop] = !this[prop]
    }
  }
}
</script>
