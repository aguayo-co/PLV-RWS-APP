<template lang="pug">
nav.tool-user
  ul.tool-user__grid
    li.tool-user__item.i-bag
      //-vue variable productos en el carrito
      small.badge 1
    //- Is authenticated
    li.tool-user__item.tool-user__item_auth(
      v-if='isAuth')
      figure.tool-user__grid(
        @click='toggleBox()')
        small.badge.badge_user 2
        span.tool-user__avatar
          //-vue variable Notificaciones usuario
          img.tool-user__photo(
            src='/static/img/demo/user-avatar.jpg',
            alt='')
        //-vue variable user name
        figcaption.tool-user__name Name User
      transition(name='toggle-scale')
        .user-auth__menu.toggle-box(
            v-show='active')
          ul.user-auth__list.toggle-box__list
            li.user-auth__item
              a.user-auth__link(
                href="",
                title="Ir a tu cuenta") Tu cuenta
            li.user-auth__item
              a.user-auth__link(
                href="",
                title="Ir a tus compras") Tus compras
            li.user-auth__item
              a.user-auth__link(
                href="",
                title="Ir a tus Ventas") Tus Ventas
            li.user-auth__item
              a.user-auth__link(
                href="",
                title="Ir a Centro de mensajes") Centro de mensajes
            li.user-auth__item
              a.user-auth__link(
                href="",
                title="Cerrar sesión de usuario") Cerrar sesión
    //- Is NOT authenticated
    li.tool-user__item.i-user(
      v-else='',
      @click='open') Ingresar
</template>

<script>

export default {
  name: 'PageHeaderUser',
  data () {
    return {
      active: false
    }
  },
  methods: {
    toggleBox: function () {
      this.active = !this.active
    }
  }
}
</script>
