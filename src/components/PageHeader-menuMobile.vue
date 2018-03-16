<template lang="pug">
//- TO DO VUE: Webservices menu - list VUE
//- TO DO style: ico y animación de flechas
//- TO DO marckup: footer level 1
.page-menu__panel(
  :class="{ 'page-menu_out' :level1 != undefined }")
  //- cerrar menu: X/brand
  .page-menu__top.i-x(
    @click='MenuClose')
    span.brand
      img.brand__logo(
        src='/static/img/brand-prilov.png',
        alt='Prilov Compra. Usa. Vende')
  //- menu level 1
  ul.menu
    //- li.menu__item.i-next(v-for='item in menu.items',
    //-   :class="{ 'menu__item_current' :level1 == 1 }")
    li.menu__item.i-next(v-for='item in menu.items')
      //- TO DO VUE: dinamizar esta funcionalidad
      a.menu__link.i-shop(
        v-if='menu.items',
        href='#',
        @click='handler(item)',
        :class="{ 'menu__item_current':active }") {{ item.name }}
      //-iconos menu activo
      span.submenu__close.i-back(
        href='#',
        @click='active = false')

      //- Nivel 2: submenu
      transition(name='slide-down')
        ul.submenu(
            v-show='active'
            :class="{ 'submenu_open' :level2 != undefined }")
          li.submenu__item.i-next(v-for= "(children, index) in item.children", :class="{ 'submenu__item_current' :level2 == 2 }")
            span.submenu__label(
              @click='level2 = 2') {{children.name}}
            span.submenu__close.i-close(
              href='#',
              @click='level2 = undefined')
            //- Nivel 3: Lista de enlaces
            transition(name='slide-down')
              ul.submenu__list(
                v-show='level2 == 2')
                li.submenu__subitem(v-for="(grandChildren, indexG) in children.children")
                  a.subitem__link(href="#") {{grandChildren.name}}
  //- menu footer
  ul.menu-footer
    li.menu-footer__item
      a.menu-footer__link(href="#") Ayuda
    li.menu-footer__item
      a.menu-footer__link(href="#") Nosotros
    li.menu-footer__item
      a.menu-footer__link(href="#") Contáctanos

  .menu-social.i-heart-on
    p.menu-social__title {{ nameFooter }}
    ul.menu-social__list
      li.menu-social__item(
        v-for='items in footer.children')
        a.foot-nav__link(
          :href='items.url',
          :class='items.icon',
          :target='items.target')
          span {{ items.name }}
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageHeaderMenuMobile',
  data () {
    return {
      active: false,
      show: false,
      selected: undefined,
      // level1: undefined,
      // level2: undefined,
      menu: {},
      footer: {},
      nameFooter: undefined
    }
  },
  methods: {
    MenuClose: function () {
      this.$emit('MenuClose')
    },
    handler: function (item) {
      this.toggleNav()
      this.selected = item.children[0]
    },
    toggleNav: function () {
      this.active = !this.active
    },
  },
  created () {
    axios.get('https://prilov.aguayo.co/api/menus/principal', {
    })
      .then(response => {
        this.menu = response.data
        console.log('items de menu principal')
        console.log(response.data)
      })
      .catch(e => {
        console.log('ERROR : ' + e)
      })
    axios.get('https://prilov.aguayo.co/api/menus/footer', {
    })
      .then(response => {
        this.footer = response.data.items[3]
        this.nameFooter = response.data.items[3].name
        console.log('items de footer item Siguenos')
        console.log(response.data)
      })
      .catch(e => {
        console.log('ERROR : ' + e)
      })
  }

}
</script>
