<template lang="pug">
.layout-band
  .layout-inner
    section.chat-band
      header.chat-band__header
        h2.subhead Comentarios de este producto
      .chat-band__grid
        .chat
          .chat__group(v-for="(question, index) in questions")
            .chat__line
              span.chat__inner
                .chat__bubble-main
                  figure.chat-bubble__avatar
                    img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
                  p.chat-bubble__txt {{ question.subject }}
                .chat__footer.chat__footer_main
                  time.chat__date hace {{ question.created_at | moment("subtract", "5 hours") | moment("from", true) }}
                  span.editor__btn(@click="showAnswerBox(question.id)") Responder
            .editor(v-if="activeAnswer.id === question.id")
              form.editor__form
                .chat__form-group
                  textarea-autosize.form__textarea.editor__textarea(
                    :disabled="disabledAnswer",
                    :class=" { 'disabled' : disabledAnswer }",
                    v-model="activeAnswer.content",
                    rows="1")
                  .chat__btn
                    button.chat__btn-solid.i-shipping(@click.prevent="addAnswer(index)")
            .chat__line(v-for="(message, subindex) in question.messages")
              span.chat__inner(v-if="subindex !== 0")
                .chat__bubble
                  figure.chat-bubble__avatar
                    img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
                  p.chat-bubble__txt {{ message.body }}
                .chat__footer
                  time.chat__date hace {{ message.created_at | moment("subtract", "5 hours") | moment("from", true) }}

            span.chat-break
              span.chat-break__bullet
          // .chat__group
            .chat-line
              .chat__bubble-main
                .chat-bubble__avatar
                  img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
                p.chat-bubble__txt Hola, si está aun disponible, ¿Quieres comprarlo?
              .chat__bubble
                .chat-bubble__avatar
                  img.chat-bubble__img(src="static/img/demo/user-avatar-001.jpg", alt="Avatar")
                p.chat-bubble__txt Hola, si, me interesa comprar.
              span.editor__btn(
                @click="toggle('editorAnswer')") Responder
            .editor(
              v-if="editorAnswer == true")
              form.editor__form
                .chat__form-group
                  textarea.form__textarea.editor__textarea(
                    rows="1"
                  )
                    button.chat__btn-solid.i-shipping(
                      type="submit",
                      @click.prevent="toggle('editorAnswer')")
            span.chat-break
              span.chat-break__bullet
          //.chat__group
            .chat-line
              .chat__bubble-main
                .chat-bubble__avatar
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
                    rows="1")
                    button.chat__btn-solid.i-shipping(
                      type="submit",
                      @click.prevent="toggle('editorAnswer')")
            span.chat-break
              span.chat-break__bullet
        .chat-query
          .chat_sticky
            form.chat__form(
              id='form-question',
              action='#',
              submit.prevent='',
              method='post')
              label.chat__subhead ¡Comenta acá!
              span.help(v-if="errorLog.question") {{ errorLog.question }}
              textarea-autosize.form__textarea.chat__textarea(
                v-model="newQuestion",
                :disabled="disabledQuestion",
                :class=" { 'disabled' : disabledQuestion }")
              button.chat__btn-solid.i-shipping(@click.prevent="addQuestion")
            p.chat-alert.i-alert-circle Recuerda que al comprar en Prilov disfrutas de garantía de devolución, protección 24/7 ante cualquier problema y nuestra plataforma segura de pagos.
</template>

<script>
import { mapState } from 'vuex'
import threadsAPI from '@/api/thread'
export default {
  name: 'ProductoPreguntas',
  props: ['product_id', 'owner_id'],
  data () {
    return {
      questions: [],
      newQuestion: null,
      disabledQuestion: false,
      disabledAnswer: false,
      activeAnswer: {
        id: null,
        content: null
      },
      errorLog: {}
    }
  },
  computed: {
    ...mapState(['user']),
    productId () {
      return this.product_id
    },
    ownerId () {
      return this.owner_id
    }
  },
  watch: {
    productId: function () {
      threadsAPI.getByProduct(this.productId)
        .then(response => {
          this.questions = response.data.data
        })
    }
  },
  methods: {
    toggle: function (prop) {
      this[prop] = !this[prop]
    },
    addQuestion: function () {
      this.errorLog = {}
      if (!this.newQuestion) {
        this.errorLog.question = '¡Ups! No podemos enviar tu pregunta si no la escribes primero.'
      } else {
        this.disabledQuestion = true
        const data = {
          subject: this.newQuestion,
          private: false,
          product_id: this.productId,
          recipients: [this.ownerId],
          body: this.newQuestion
        }
        threadsAPI.create(data)
          .then(response => {
            if (response.data.id) {
              this.disabledQuestion = false
              this.newQuestion = ''
              this.questions.unshift(response.data)
            }
          })
      }
    },
    showAnswerBox: function (questionId) {
      this.activeAnswer.id = questionId
      this.activeAnswer.content = ''
    },
    addAnswer: function (questionIndex) {
      if (this.activeAnswer.content && this.activeAnswer.content !== '') {
        this.disabledAnswer = true
        const data = {
          thread_id: this.questions[questionIndex].id,
          user_id: this.user.id,
          recipients: [this.ownerId],
          body: this.activeAnswer.content
        }
        threadsAPI.createMessage(data)
          .then(response => {
            console.log(response)
            if (response.data.id) {
              this.disabledAnswer = false
              this.activeAnswer.id = null
              this.activeAnswer.content = ''
              this.questions[questionIndex].messages.push(response.data.messages[response.data.messages.length - 1])
            }
          })
      }
    }
  }
}
</script>
