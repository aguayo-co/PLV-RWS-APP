<template lang="pug">
section.single
  .single__inner(v-if="thread")
    router-link.btn-back.i-back(
      :to="{ name: 'user-notificaciones' }") Volver
    header.single__header
      h1.single__title {{ messenger | full_name }}
    .chat.chat__grid
      .chat__slot(v-if="product.id")
        article.slot.slot_grid
          router-link.slot__product(
            :to="{ name: 'product', params: { slug: product.slug + '__' + product.id }}",
            title="Ver este producto")
            img.slot__img(
              :src="product.images[0]",
              :alt="'Foto de ' + product.title")
            .slot__lead
              .slot__title {{ product.title }}
              .slot__size
                .slot__size-txt {{ product.size.name }}
            .slot__info
              .slot__brand {{ product.brand.name }}
              .slot__price ${{ product.sale_price | currency }}

      .chat__message
        .chat__message_inner(ref="chatBox")
          .chat__message-flex
            .chat__line(v-for="message in thread.messages")
              .chat__order(
                :class="{ 'chat__order_own' : message.user_id === user.id }")
                span.chat__inner
                  .chat__bubble-main
                    .chat-bubble__avatar(v-if="message.user_id === user.id")
                      router-link(
                        :to="{ name: 'closet', params: { userId: user.id }}",
                        :title="'Ir al Closet de ' + user.first_name")
                        img.chat-bubble__img(:src="user.picture", :alt="user.first_name")
                    .chat-bubble__avatar(v-else)
                      router-link(
                        :to="{ name: 'closet', params: { userId: message.user_id }}",
                        :title="'Ir al Closet de ' + messenger.first_name")
                        img.chat-bubble__img(:src="messenger.picture", :alt="messenger.first_name")
                    p.chat-bubble__txt {{ message.body }}
                  .chat__footer.chat__footer_main
                    time.chat__date {{ message.created_at | moment("from") }}
        .chat-inner
          form.chat__form
            label.chat__label Escribe tu mensaje aquí
            span.help(v-if="errorLog.body") {{ errorLog.body }}
            .chat__form-group
              textarea-autosize.form__textarea.chat__textarea(
                v-model="body",
                :disabled="disabledMessage",
                :class=" { 'disabled' : disabledMessage }")
              .chat__btn-group
                button.chat__btn-solid.i-shipping(@click.prevent="send") Enviar
  .single__inner(v-else)
    router-link.btn-back.i-back(:to="{ name: 'user-notificaciones' }") Volver
    Loader(v-if="loading")
    .alert-msg.i-alert-circle(v-else)
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
      body: null,
      disabledMessage: false,
      loading: true
    }
  },
  computed: {
    ...mapState(['user']),
    messenger () {
      if (this.thread.participants.length === 1) {
        return this.thread.participants[0].user
      }
      return this.thread.participants.filter(x => x.user_id !== this.user.id)[0].user
    }
  },
  watch: {
    thread: function () {
      if (this.thread.product_id && !this.product.id) {
        productsAPI.getProductById(this.thread.product_id)
          .then(response => {
            this.product = response.data
          })
      }
    }
  },
  methods: {
    send: function () {
      this.errorLog = {}
      if (!this.body) {
        this.$set(this.errorLog, 'body', '¡Ups! No podemos enviar tu mensaje si no lo escribes primero.')
        return
      }
      this.disabledMessage = true
      const data = {
        thread_id: this.thread.id,
        user_id: this.user.id,
        recipients: this.thread.participants.filter(x => x.user_id !== this.user.id).map(x => x.id),
        body: this.body
      }
      threadsAPI.createMessage(data)
        .then(response => {
          this.body = null
          this.thread.messages.push(response.data)
          window.setTimeout(() => { this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight }, 500)
        }).catch((e) => {
          // Si hay errores, mostrarlos.
          this.$handleApiErrors(e, ['body'], this.errorLog)
        }).finally(() => {
          this.disabledMessage = false
        })
    }
  },
  created: function () {
    this.id = this.$route.params.threadId
    threadsAPI.getThreadById(this.id)
      .then(response => {
        let currentParticipant = response.data.participants.filter(x => x.user_id === this.user.id)[0]
        if (currentParticipant) {
          this.thread = response.data
          this.$store.commit('user/setUnreadCount', currentParticipant.user.unread_count)
        }
        this.loading = false
      })
  }
}
</script>
