<template lang="pug">
section.single
  .single__inner()
    a.btn-back.i-back(href="#") Volver
    header.single__header
      h1.single__title Privado con {{ recipient.first_name + " " + recipient.last_name }}
    .chat.chat__grid
      .chat__message
        .chat__message_inner
          .chat__message-flex(v-if="thread.messages.length > 0")
            .chat-line(v-for="message in thread.messages")
              .chat__bubble-main
                .chat-bubble__avatar
                  img.chat-bubble__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
                p.chat-bubble__txt {{ message.body }}
          .alert-msg.alert-msg_center.i-smile(v-else)
            p Escribe tu primer mensaje para iniciar la conversación.
        .chat-inner
          form.chat__form
            label.chat__label Escribe tu mensaje aquí
            span.help(v-if="errorLog.newMessage") {{ errorLog.newMessage }}
            .chat__form-group
              textarea-autosize.form__textarea.chat__textarea(
                v-model="newMessage",
                :disabled="disabledMessage",
                :class=" { 'disabled' : disabledMessage }")
              .chat__btn-group
                button.chat__btn-solid.i-shipping(@click.prevent="send")
</template>

<script>
import { mapState } from 'vuex'
import threadsAPI from '@/api/thread'
import usersAPI from '@/api/user'

export default {
  name: 'NewPrivateMessage',
  data () {
    return {
      recipientId: null,
      recipient: {},
      thread: {
        messages: []
      },
      product: {},
      errorLog: {},
      newMessage: null,
      disabledMessage: false
    }
  },
  computed: {
    ...mapState(['user'])

  },
  methods: {
    send: function () {
      this.thread.id ? this.sendMessage() : this.createThread()
    },
    sendMessage: function () {
      this.errorLog = {}
      if (!this.newMessage) {
        this.errorLog.newMessage = '¡Ups! No podemos enviar tu mensaje si no lo escribes primero.'
      } else {
        this.disabledMessage = true
        const data = {
          thread_id: this.thread.id,
          user_id: this.user.id,
          recipients: [this.recipient.id],
          body: this.newMessage
        }
        threadsAPI.createMessage(data)
          .then(response => {
            this.disabledMessage = false
            this.newMessage = ''
            this.thread.messages.push(response.data)
          })
      }
    },
    createThread: function () {
      this.errorLog = {}
      if (!this.newMessage) {
        this.errorLog.newMessage = '¡Ups! No podemos enviar tu mensaje si no lo escribes primero.'
      } else {
        this.disabledMessage = true
        const data = {
          subject: this.newMessage,
          private: true,
          recipients: [this.recipient.id],
          body: this.newMessage
        }
        threadsAPI.create(data)
          .then(response => {
            this.disabledMessage = false
            this.newMessage = ''
            this.thread = response.data
          })
      }
    }
  },
  mounted: function () {
    this.recipientId = this.$route.params.recipientId
    // pendiente verificar que no exista una conversación privada previa
    // Asumimos que no existe una conversación previa
    usersAPI.getUserById(this.recipientId)
      .then(response => {
        this.recipient = response.data
      })
  }
}
</script>
