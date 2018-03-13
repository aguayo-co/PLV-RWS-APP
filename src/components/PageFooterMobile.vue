<template lang="pug">
//- Footer PAGEFOOTER MOBILE
footer.page-foot-mb
  nav.foot-nav-mb
    ul.foot-nav-mb__list
      li.foot-nav-mb__item(v-for='list in footer')
        a.foot-nav-mb__link(
          @click.prevent='itemActive(list)'
          :class='{active: isActive == list}',
          :href='list.url',
          :title='list.title')
          span.foot-nav-mb__name(
          :class='list.icon') {{ list.name }}
      li.foot-nav-mb__item.tool-user__item_auth
        figure.tool-user__grid
          small.badge.badge_user 2
          span.tool-user__avatar
            //-vue variable Notificaciones usuario
            img.tool-user__photo(
              src='/static/img/demo/user-avatar.jpg',
              alt='')
</template>

<script>
export default {
  name: 'PageFooterMobile',
  data () {
    return {
      isActive: undefined,
      footer: [
        {
          url: '/',
          icon: 'i-search',
          title: 'Buscar en el sitio',
          name: 'Buscar'
        },
        {
          url: '/',
          icon: 'i-sale',
          title: 'Ir al carrito de compras',
          name: 'Carrito'
        },
        {
          url: '/',
          icon: 'i-brand',
          title: 'Ir al home',
          name: 'Inicio'
        },
        {
          url: '/',
          icon: 'i-tag',
          title: 'Ir a vender',
          name: 'Vender'
        },
        {
          url: '/',
          icon: 'i-user',
          title: 'Ir a mi perfil',
          name: 'Mi perfil'
        }
      ]
    }
  },
  methods: {
    itemActive: function (e) {
      this.isActive = e
    },
    NotitemActive: function (e) {
      this.isActive = undefined
    }
  }
}
</script>
