<template lang="pug">
//- TO DO VUE: Webservices menu - list VUE
//- TO DO style: ico y animación de flechas
//- TO DO marckup: footer level 1
.page-menu__panel(
  :class="{ 'page-menu_out' :isActive1 != undefined }")
  //- cerrar menu: X/brand
  .page-menu__top.i-x(
    @click='MenuClose')
    span.brand
      img.brand__logo(
        src='/static/img/brand-prilov.png',
        alt='Prilov Compra. Usa. Vende')
  ul.menu
    li.menu__item(
      v-for="(item, index) in menu.items",
      :class="{'menu__item_current' : isActive1 == index, 'i-next' : !item.url}")
      a.menu__link(
        v-if='!item.url',
        :class="item.icon",
        href='#',
        @click="itemLevel1(index), isActive1 == index") {{ item.name }}
        span.submenu__close.i-back(
          href='#',
          @click.stop='subMenuClose')
      //- Nivel 2: submenu
      transition(name='slide-down')
        ul.submenu(v-if='!item.url',
          v-show='isActive1 == index'
          :class="{ 'submenu_open' :isActive2 != undefined }")
          li.submenu__item.i-next(
            v-for= "(children, indexChildren) in item.children",
            :class="{ 'submenu__item_current' : isActive2 == indexChildren }")
            span.submenu__label(
              @click="itemLevel2(indexChildren)") {{ children.name }}
            span.submenu__close.i-close(
              href='#',
              @click.stop='subMenuClose2')
            //- Nivel 3: Lista de enlaces
            transition(name='slide-down')
              ul.submenu__list(
                v-show='isActive2 == indexChildren')
                li.submenu__subitem(
                  v-for="(grandChildren, indexG) in children.children")
                  a.subitem__link(:href='grandChildren.url') {{ grandChildren.name }}
      router-link.menu__link(
        v-if='item.url'
        v-bind:to='item.url'
        :class="item.icon"
      ) {{ item.name }}

  //- menu footer
  ul.menu-footer(v-show='isActive1 == undefined')
    li.menu-footer__item
      a.menu-footer__link(href="#") Ayuda
    li.menu-footer__item
      a.menu-footer__link(href="#") Nosotros
    li.menu-footer__item
      a.menu-footer__link(href="#") Contáctanos

  .menu-social.i-heart-on(v-show='isActive1 == undefined')
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
      isActive1: undefined,
      isActive2: undefined,
      active: false,
      selected: undefined,
      level1: undefined,
      level2: undefined,
      menu: {},
      footer: {},
      nameFooter: undefined,
      showDetails: false,
      activeItem: undefined,
      activeLiIndex: null
    }
  },
  methods: {
    MenuClose: function () {
      this.$emit('MenuClose')
    },
    itemLevel1: function (indexItem) {
      this.isActive1 = indexItem
      console.log('submenu1')
      console.log(this.isActive1)
    },
    itemLevel2: function (f) {
      this.isActive2 = f
      console.log('submenu2')
      console.log(this.isActive2)
    },
    subMenuClose: function () {
      console.log('click boton cerrar')
      this.isActive1 = undefined
      console.log('__')
    },
    subMenuClose2: function () {
      console.log('click boton cerrar')
      this.isActive2 = undefined
      console.log('__')
    }
  },
  created () {
    axios.get('https://prilov.aguayo.co/api/menus/principal', {
    })
      .then(response => {
        this.menu = response.data
        console.log('items de menu principal')
        console.log(response.data)
        // console.log(response.data.items[0].children[0].name)
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
