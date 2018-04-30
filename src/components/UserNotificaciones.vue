<template lang="pug">
section.single
  .single__inner
    //- form.form_flex
    //-   .form__row
    //-     input.form__control(
    //-       type="search",
    //-       name="search-noti")
    //-   ul.filter__box
    //-     li.filter__box-select
    //-       span.filter__arrow
    //-         .filter__box-label Todas <strong>Nuestros favoritos</strong>
    //-       ul.filter__list
    //-         li.filter__item Lo último
    //-         li.filter__item Menor precio
    //-         li.filter__item Mayor precio
    //-         li.filter__item Destacados
    //-         li.filter__item Nuestros favoritos

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
                span.collection__title {{ message.participants[1].user.first_name }} {{ message.participants[1].user.last_name }}
                span.collection__label {{ message.product_id ? "Te hizo una pregunta en un producto" : "Te escribió un privado" }}
              | {{ message.messages.slice(-1)[0].body }}
      .collections__list(v-else)
        .alert-msg.i-smile
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
                span.collection__title {{ message.participants[1].user.first_name }} {{ message.participants[1].user.last_name }}
                span.collection__label
              | {{ message.messages.slice(-1)[0].body }}
      .collections__list(v-else)
        .alert-msg.i-smile
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
      items: 20
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created: function () {
    let filter = { unread: '1' }
    threadsAPI.get(1, 100, filter)
      .then(response => {
        console.log(response)
        this.unread = response.data
      })
    threadsAPI.get(this.page, this.items)
      .then(response => {
        this.messages = response.data
      })
  },
  methods: {
    isUnread: function (messageId) {
      let result = this.unread.data.filter(x => x.id === messageId)[0]
      if (result) {
        return true
      }
      return false
    }
  }
}
</script>
