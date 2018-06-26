<template lang="pug">
.layout-band(ref="beggining")
  .layout-inner
    section.chat-band
      header.chat-band__header
        h2.subhead Comentarios de este producto
      .chat-band__grid
        .chat(v-if="threads[0]")
          .chat__group(v-for="(thread, index) in threads")
            .chat__line
              span.chat__inner
                .chat__bubble-main
                  figure.chat-bubble__avatar
                    img.chat-bubble__img(
                      :src="authorMessage(thread.participants, thread.messages[0]).picture",
                      :alt="authorMessage(thread.participants, thread.messages[0]).first_name")
                  p.chat-bubble__txt {{ thread.messages[0].body }}
                .chat__footer.chat__footer_main
                  time.chat__date {{ thread.created_at | moment("from") }}
                  span.editor__btn(@click="showAnswerBox(thread.id)") Responder
            .editor(v-if="activeAnswer.id === thread.id")
              form.editor__form
                span.help(v-if="errorLog.answer") {{ errorLog.answer }}
                .chat__form-group
                  textarea-autosize.form__textarea.editor__textarea(
                    :disabled="disabledAnswer",
                    :class=" { 'disabled' : disabledAnswer }",
                    v-model="activeAnswer.content",
                    rows="1")
                  .chat__btn
                    button.chat__btn-solid.i-shipping(@click.prevent="addAnswer(index)")
            .chat__line(v-for="(message, subindex) in thread.messages")
              .chat__order(
                :class="{ 'chat__order_own' : message.user_id === ownerId }")
                span.chat__inner(v-if="subindex !== 0")
                  .chat__bubble
                    figure.chat-bubble__avatar
                      img.chat-bubble__img(
                        :src="authorMessage(thread.participants, message).picture",
                        :alt="authorMessage(thread.participants, message).first_name")
                    p.chat-bubble__txt {{ message.body }}
                  .chat__footer
                    time.chat__date hace {{ message.created_at | moment("from") }}
            span.chat-break
              span.chat-break__bullet
        .chat(v-else)
          .alert-msg.i-smile.alert-msg_top
            p Aún no hay comentarios de este producto. Se la primera en comentar
        .chat-query
          .chat_sticky
            form.chat__form(
              v-if="this.user.id"
              id='form-thread',
              @submit.prevent='addThread',
              method='post')
              label.chat__subhead ¡Comenta acá!
              span.help(v-if="errorLog.body") {{ errorLog.body }}
              textarea-autosize.form__textarea.chat__textarea(
                v-model="newThread",
                :disabled="disabledThread",
                :class=" { 'disabled' : disabledThread }")
              button.chat__btn-solid.i-shipping
            p(v-else) Para comentar en este producto
              a(
                href=''
                @click.prevent="logIn")  Inicia sesión
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
      threads: [],
      newThread: null,
      disabledThread: false,
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
    productId () {
      this.loadThreads()
    }
  },
  created () {
    this.loadThreads()
  },
  methods: {
    loadThreads () {
      threadsAPI.getByProduct(this.productId)
        .then(response => {
          this.threads = response.data.data
        })
    },
    toggle (prop) {
      this[prop] = !this[prop]
    },
    logIn: function () {
      const payload = {
        name: 'FormLogin'
      }
      this.$store.dispatch('ui/showModal', payload)
    },
    addThread () {
      this.errorLog.body = ''
      if (!this.newThread) {
        this.errorLog.body = '¡Ups! No podemos enviar tu pregunta si no la escribes primero.'
        return
      }

      this.disabledThread = true
      const data = {
        subject: 'Pregunta de ' + this.user.id + ' para productp ' + this.productId,
        private: false,
        product_id: this.productId,
        recipients: [this.ownerId],
        body: this.newThread
      }
      threadsAPI.create(data)
        .then(response => {
          this.newThread = ''
          this.threads.unshift(response.data)
          window.scrollTo(0, this.$refs.beggining.offsetTop - 75)
        }).catch(e => {
          this.$handleApiErrors(e, ['body'], this.errorLog)
        }).finally(() => {
          this.disabledThread = false
        })
    },
    showAnswerBox (threadId) {
      this.activeAnswer.id = threadId
      this.activeAnswer.content = ''
      this.errorLog.answer = ''
    },
    addAnswer (threadIndex) {
      if (this.activeAnswer.content && this.activeAnswer.content !== '') {
        this.errorLog.answer = ''
        this.disabledAnswer = true
        const data = {
          thread_id: this.threads[threadIndex].id,
          user_id: this.user.id,
          recipients: [this.ownerId],
          body: this.activeAnswer.content
        }
        threadsAPI.createMessage(data)
          .then(response => {
            this.activeAnswer.id = null
            this.activeAnswer.content = ''
            this.threads[threadIndex].messages.push(response.data)
          }).catch(e => {
            this.errorLog.answer = this.$getNestedObject(e, ['response', 'data', 'errors', 'body', 0])
          }).finally(() => {
            this.disabledAnswer = false
          })
      }
    },
    authorMessage (participants, message) {
      return participants.find(x => x.user_id === message.user_id).user
    }
  }
}
</script>
