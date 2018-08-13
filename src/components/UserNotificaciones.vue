<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Notificaciones
    .collections
      h2.collections__header Sin leer <small class="badge" v-if="unread.total">{{ unread.total }}</small>
      ul.collections__list(v-if="unread.total > 0")
        li.collections__item(
          :class="[ message.product_id ? 'i-chat' : 'i-email']"
          v-for="message in unread.data")
          router-link(
            v-if="message.id",
            :to="{ name: 'conversation', params: { threadId: message.id }}")
            .collection__lead
              .collection__head
                span.collection__title {{ getMessenger(message).full_name }}
                span.collection__label {{ message.product_id ? "Te hizo una pregunta en un producto" : "Te escribió un privado" }}
              | {{ message.messages.slice(-1)[0].body }}
      .collections__list(v-else)
        Loader(v-if="loading.unread")
        .alert-msg.i-smile(v-else)
          p No tienes mensajes sin leer
      h2.collections__header Otros mensajes
      ul.collections__list.collections__list_off(v-if="messages.total > unread.total ")
        li.collections__item(
          v-if="!isUnread(message.id)"
          :class="[ message.product_id ? 'i-chat' : 'i-email']"
          v-for="message in messages.data")
          router-link(
            v-if="message.id",
            :to="{ name: 'conversation', params: { threadId: message.id }}")
            .collection__lead
              .collection__head
                span.collection__title {{ getMessenger(message).full_name }}
                span.collection__label
              | {{ message.messages.slice(-1)[0].body }}
      .collections__list(v-else)
        Loader(v-if="loading.messages")
        .alert-msg.i-smile(v-else)
          p Actualmente no tienes otros mensajes o todos están sin leer.

</template>

<script>
import threadsAPI from '@/api/thread'
import { mapState } from 'vuex'

export default {
  name: 'UserNotificaciones',
  data () {
    return {
      unread: [],
      messages: [],
      page: 1,
      items: 20,
      loading: {
        unread: true,
        messages: true
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    let filter = { unread: '1' }
    threadsAPI.get(1, 100, filter)
      .then(response => {
        this.unread = response.data
        this.loading.unread = false
      })
    threadsAPI.get(this.page, this.items)
      .then(response => {
        this.messages = response.data
        this.loading.messages = false
      })
  },
  methods: {
    isUnread (messageId) {
      return this.unread.data.some(x => x.id === messageId)
    },
    allParticipants (thread) {
      return thread.trashed_participants.concat(thread.participants)
    },
    getMessenger (thread) {
      return this.allParticipants(thread).find(x => x.user_id !== this.user.id).user
    }
  }
}
</script>
