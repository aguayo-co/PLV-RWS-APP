<template lang="pug">
section.single
  .single__inner()
    a.btn-back.i-back(href="#") Volver
    Loader(v-if="loading")
    template(v-else)
      header.single__header
        h1.single__title Privado con {{ recipient.full_name }}
      .chat.chat__grid
        .chat__message
          .chat__message_inner
            .chat__message-flex(v-if="messages.length > 0")
              .chat-line(v-for="message in messages")
                .chat__order(
                  :class="{ 'chat__order_own' : message.user_id === user.id }")
                  span.chat__inner
                    .chat__bubble-main
                      .chat-bubble__avatar
                        img.chat-bubble__img(:src="messenger(message).picture", :alt="messenger(message).first_name")
                      p.chat-bubble__txt {{ message.body }}
                    .chat__footer.chat__footer_main
                        time.chat__date {{ message.created_at | moment("from") }}
            .alert-msg.alert-msg_center.i-smile(v-else)
              p Escribe tu primer mensaje para iniciar la conversación.
          .chat-inner
            form.chat__form(@submit.prevent="send")
              label.chat__label Escribe tu mensaje aquí
              span.help(v-if="errorLog.body") {{ errorLog.body }}
              .chat__form-group
                textarea-autosize.form__textarea.chat__textarea(
                  v-model="body",
                  :disabled="sending",
                  :class=" { 'disabled' : sending }")
                .chat__btn-group
                  button.chat__btn-solid(disabled v-if="sending")
                    Dots
                  button.chat__btn-solid.i-shipping(v-else) Enviar
</template>

<script>
import { mapState } from 'vuex'
import threadsAPI from '@/api/thread'
import usersAPI from '@/api/user'

export default {
  name: 'NewPrivateMessage',
  data () {
    return {
      loading: true,
      sending: false,
      recipientId: null,
      recipient: {},
      thread: null,
      product: {},
      errorLog: {},
      body: null
    }
  },
  computed: {
    ...mapState(['user']),
    messages () {
      return this.$getNestedObject(this.thread, ['messages']) || []
    }
  },
  methods: {
    messenger (message) {
      if (this.user.id === message.user_id) {
        return this.user
      }
      return this.recipient
    },
    loadThread () {
      return threadsAPI.getPrivateWith(this.recipientId)
        .then(response => {
          if (response.data.data.length > 0) {
            this.thread = response.data.data[0]
          }
        })
    },
    recipientFromThread () {
      this.thread.participants.forEach(participant => {
        if (participant.user_id === this.recipientId) {
          this.recipient = participant.user
        }
      })
    },
    loadRecipient () {
      return usersAPI.getUserById(this.recipientId)
        .then(response => {
          this.recipient = response.data
        })
    },
    send () {
      this.thread ? this.sendMessage() : this.createThread()
    },
    sendMessage () {
      this.$delete(this.errorLog, 'body')
      if (!this.body) {
        this.$set(this.errorLog, 'body', '¡Ups! No podemos enviar tu mensaje si no lo escribes primero.')
        return
      }

      this.sending = true
      const data = {
        thread_id: this.thread.id,
        user_id: this.user.id,
        recipients: [this.recipient.id],
        body: this.body
      }
      threadsAPI.createMessage(data)
        .then(response => {
          this.body = ''
          this.thread.messages.push(response.data)
        }).catch((e) => {
          this.$handleApiErrors(e, ['body'], this.errorLog)
        }).finally(() => {
          this.sending = false
        })
    },
    createThread () {
      this.$delete(this.errorLog, 'body')
      if (!this.body) {
        this.$set(this.errorLog, 'body', '¡Ups! No podemos enviar tu mensaje si no lo escribes primero.')
        return
      }

      this.sending = true
      const data = {
        subject: 'Privado entre ' + this.user.id + ' y ' + this.recipient.id,
        private: true,
        recipients: [this.recipient.id],
        body: this.body
      }
      threadsAPI.create(data)
        .then(response => {
          this.body = ''
          this.thread = response.data
        }).catch((e) => {
          this.$handleApiErrors(e, ['body'], this.errorLog)
        }).finally(() => {
          this.sending = false
        })
    }
  },
  created () {
    this.recipientId = parseInt(this.$route.params.recipientId)
    this.loadThread().then(() => {
      if (this.thread) {
        this.recipientFromThread()
        return
      }
      return this.loadRecipient()
    }).then(() => {
      this.loading = false
    })
  }
}
</script>
