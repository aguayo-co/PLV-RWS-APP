<template lang="pug">
section.single
  .single__inner(v-if="thread")
    router-link.btn-back.i-back(:to="{ name: 'user-notificaciones' }") Volver
    header.single__header
      h1.single__title {{ thread.participants[1].user.first_name }} {{ thread.participants[1].user.last_name }}
    .chat.chat__grid
      .chat__slot(v-if="product.id")
        article.slot.slot_grid
          router-link.slot__product(:to="{ name: 'product', params: { slug: product.title + '__' + product.id }}", title="Ver este producto")
            img.slot__img(:src="product.images[0]",
              :alt="product.title")
            .slot__lead
              .slot__title {{ product.title }}
              .slot__size
                .slot__size-txt {{ product.size.name }}
            .slot__info
              .slot__brand {{ product.brand.name }}
              .slot__price ${{ product.price | currency }}

      .chat__message
        .chat__message_inner
          .chat__message-flex
            .chat-line(v-for="message in thread.messages")
              .chat__bubble-main(:class="{ 'own' : message.user_id === user.id }")
                .chat-bubble__avatar(v-if="message.user_id === user.id")
                  img.chat-bubble__img(:src="thread.participants[0].user.picture", alt="Avatar")
                .chat-bubble__avatar(v-else)
                  img.chat-bubble__img(:src="thread.participants[1].user.picture", alt="Avatar")
                p.chat-bubble__txt {{ message.body }}
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
  .single__inner(v-else)
    router-link.btn-back.i-back(:to="{ name: 'user-notificaciones' }") Volver
    .alert-msg.i-alert-circle
      p Parece que no haces parte de esta conversación.
</template>

<script>
import { mapState } from 'vuex'
import threadsAPI from '@/api/thread'
import productsAPI from '@/api/product'

export default {
  name: 'Conversation',
  data () {
    return {
      id: null,
      thread: null,
      product: {},
      errorLog: {},
      newMessage: null,
      disabledMessage: false
    }
  },
  computed: {
    ...mapState(['user'])

  },
  watch: {
    thread: function () {
      if (this.thread.product_id) {
        productsAPI.getProductById(this.thread.product_id)
          .then(response => {
            this.product = response.data.data[0]
          })
      }
    }
  },
  methods: {
    isUnread: function (messageId) {
      let result = this.unread.data.filter(x => x.id === messageId)[0]
      if (result) {
        return true
      }
      return false
    },
    send: function () {
      this.errorLog = {}
      if (!this.newMessage) {
        this.errorLog.newMessage = '¡Ups! No podemos enviar tu mensaje si no lo escribes primero.'
      } else {
        this.disabledMessage = true
        const data = {
          thread_id: this.thread.id,
          user_id: this.user.id,
          recipients: [this.thread.participants[0].user_id],
          body: this.newMessage
        }
        threadsAPI.createMessage(data)
          .then(response => {
            console.log(response)
            if (response.data.id) {
              this.disabledMessage = false
              this.newMessage = ''
              this.thread.messages.push(response.data.messages[response.data.messages.length - 1])
            }
          })
      }
    }
  },
  mounted: function () {
    this.id = this.$route.params.threadId
    threadsAPI.getThreadById(this.id)
      .then(response => {
        console.log(response)
        let isParticipant = response.data.participants.filter(x => x.user_id === this.user.id)[0]
        if (isParticipant) {
          this.thread = response.data
        }
      })
  }
}
</script>
