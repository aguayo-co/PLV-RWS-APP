<template lang="pug">
nav.page-menu
  ul.menu
    li.menu__item(
      v-for='item in menu.items'
    )
      a.menu__link(
        v-if='!item.url'
        href='#',
        @click='handler(item)',
        :class="{ 'menu__link_active' : active.menu }") {{ item.name }}
      //- Nivel 2: submenu con Lista de enlaces, Promo, side de enlaces
      transition(name='slide-fade')
        .menu-level2(v-show='active.menu' v-if='!item.url')
          .menu-level2__inner
            .submenu-grid
              //- Nivel 2: submenu
              ul.submenu
                //- EVENTO CLICK:
                li.submenu__item(
                  v-for= "(children, index) in item.children"
                  :class="[{ submenu:children != selected }, { submenu__item_active:children == selected }]"
                  @click="menuHandler(children, index)"
                  )
                  span.submenu__label {{children.name}}
                  //- Nivel 3: Lista de enlaces
                  ul.submenu__list(v-show= "selected == children")
                    li.submenu__subitem(
                      v-for="(grandChildren, indexG) in children.children"
                      )
                      router-link.subitem__link(
                        @click.stop="toggleNav"
                        :to='grandChildren.url || "#"') {{grandChildren.name}}
              //- Nivel 2: Promo
              .menu-promo(v-if="banner")
                img.menu-promo__img(
                  :src="banner.image",
                  :alt="banner.title + banner.subtitle")
                .menu-promo__lead
                  h4.menu-promo__title.title_line {{ banner.title }}
                  p.menu-promo__txt {{ banner.subtitle }}
                  router-link.menu-promo__foot.btn(
                    :to='banner.url || "#"',
                    :title="'Ir' + banner.title") {{ banner.button_text }}

            //- Nivel 2: fside de enlaces
            ul.level2__side
              li.btn_close.i-x(
                @click='toggleNav')
                span Cerrar
              li.menu-side__footer
                a.link_underline(href='#') Ver todos los productos
      router-link.menu__link(
          v-if='item.url'
          v-bind:to='item.url'
      ) {{ item.name }}
</template>

<script>
import { mapState } from 'vuex'
import bannersAPI from '@/api/banner'
export default {
  name: 'PageHeaderMenu',
  data () {
    return {
      // show: true,
      selected: undefined,
      banner: {},
      fixedPosition: {
        position: 'fixed',
        top: 0
      }
    }
  },
  computed: {
    ...mapState(['ui']),
    active: function () {
      return this.$store.getters['ui/headerDropdownsVisible']
    },
    menu () {
      return this.ui.menus.principal
    }
  },
  methods: {
    toggleNav: function () {
      this.active.menu ? this.$store.dispatch('ui/closeDropdown', { name: 'menu' }) : this.$store.dispatch('ui/closeAllDropdownsBut', { name: 'menu' })
      this.$store.dispatch('ui/switchModal')
    },
    handler: function (item) {
      this.toggleNav()
      this.selected = item.children[0]
    },
    menuHandler: function (children, index) {
      if (children.children.length > 0) {
        this.selected = children
        var clicked = this.menu.items[0].children.splice(index, 1)
        this.menu.items[0].children.splice(0, 0, clicked[0])
      } else {
        this.$router.push(children.url)
        this.toggleNav()
      }
    }
  },
  created () {
    bannersAPI.getBannerBySlug('menu-campaign')
      .then(response => {
        this.banner = response.data.data[0]
      })
  }
}
</script>
