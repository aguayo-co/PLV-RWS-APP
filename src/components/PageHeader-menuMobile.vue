<template lang="pug">
.page-menu__panel(
  :class="{ 'page-menu_out' :active != undefined }")
  //- cerrar menu: X/brand
  .page-menu__top.i-x(
    @click="MenuClose")
    span.brand
      img.brand__logo(
        src="/static/img/brand-prilov.svg",
        alt="Prilov Compra. Usa. Vende")
  ul.menu
    li.menu__item(
      v-if="menu.items",
      v-for="(item, index) in menu.items",
      :class="{'menu__item_current' : active == index, 'i-next' : !item.url}")
      a.menu__link(
        v-if="!item.url",
        :class="item.icon",
        href="#",
        @click="itemLevel1(index), active == index") {{ item.name }}
        span.submenu__close.i-back(
          href="#",
          @click.stop="subMenuClose")
      //- Nivel 2: submenu
      transition(name="slide-down")
        ul.submenu(v-if="!item.url",
          v-show="active == index",
          :class="{ 'submenu_open' :selected != undefined }")
          li.submenu__item(
            v-for= "(children, indexChildren) in item.children",
            :class="{ 'submenu__item_current' : selected == indexChildren, 'i-next' : !children.url }")
            a.submenu__label(
              v-if="!children.url",
              @click="itemLevel2(indexChildren)") {{ children.name }}
            span.submenu__close.i-close(
              href="#",
              @click.stop="subMenuClose2")
            //- Nivel 3: Lista de enlaces
            transition(name="slide-down")
              ul.submenu__list(
                v-show="selected == indexChildren")
                li.submenu__subitem(
                  v-for="(grandChildren, indexG) in children.children")
                  a.subitem__link(:href="grandChildren.url") {{ grandChildren.name }}
            router-link.submenu__label(
              v-if="children.url",
              :to="children.url") {{ children.name }}
      router-link.menu__link(
        v-if="item.url",
        :to="item.url",
        @click.native="MenuClose"
        :class="item.icon") {{ item.name }}

  //- menu footer
  ul.menu-footer(v-show="active == undefined")
    li.menu-footer__item(
      v-if="footer.items",
      v-for="(items, indice) in footer.items")
      a.menu-footer__link(v-if="indice != footer.items.length - 1",
      :href="items.url") {{ items.name }}

  .menu-social.i-heart-on(v-show="active == undefined")
    p.menu-social__title {{ footer.name }}
    ul.menu-social__list(v-if="footer.items")
      li.menu-social__item(
        v-if="footer.items && footer.items.length > 0",
        v-for="items in footer.items[3].children")
        a.foot-nav-mb__link(
          :href="items.url",
          :class="items.icon",
          target="_blank")
          span {{ items.name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageHeaderMenuMobile',
  data () {
    return {
      active: undefined,
      selected: undefined
    }
  },
  computed: {
    ...mapState('ui', [
      'menus'
    ]),
    menu () {
      return this.menus.principal || {}
    },
    footer () {
      return this.menus.footer || {}
    }
  },
  methods: {
    MenuClose: function () {
      this.$emit('MenuClose')
    },
    itemLevel1: function (indexItem) {
      this.active = indexItem
    },
    itemLevel2: function (f) {
      this.selected = f
    },
    subMenuClose: function () {
      this.active = undefined
    },
    subMenuClose2: function () {
      this.selected = undefined
    }
  }
}
</script>
