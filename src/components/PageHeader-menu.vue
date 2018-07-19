<template lang="pug">
nav.page-menu
  ul.menu
    li.menu__item(
      v-if="items"
      v-for="item in items")
      a.menu__link(
        v-if="!item.url"
        :class="[{ 'menu__link_active' : active.menu }, {'router-link-active': $route.path.includes('/shop')}]"
        @click="openSubmenu(item)") {{ item.name }}
      //- Nivel 2: submenu con Lista de enlaces, Promo, side de enlaces
      transition(name="slide-fade")
        .menu-level2(
          v-show="active.menu",
          v-if="!item.url")
          .menu-level2__inner
            .submenu-grid
              //- Nivel 2: submenu
              ul.submenu
                //- EVENTO CLICK:
                li.submenu__item(
                  v-for= "children in sortedChildren(item.children)"
                  :class="[{ submenu__item_active:children == selected }]"
                  @click="changeSubmenu(children)")
                  span.submenu__label {{ children.name }}
                  //- Nivel 3: Lista de enlaces
                  ul.submenu__list(v-show= "selected == children")
                    li.submenu__subitem(
                      v-for="(grandChildren, indexG) in children.children.concat().sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })")
                      router-link.subitem__link(
                        @click.stop="toggleNav"
                        :to="{ name: 'productos-filtrado', params: {slug: grandChildren.url.split('/')[3], type: grandChildren.url.split('/')[2]}} ") {{ grandChildren.name }}
              //-:to="grandChildren.url || '#'") {{ grandChildren.url.split('/') }}
              //- Nivel 2: Promo
              .menu-promo(v-if="banner")
                img.menu-promo__img(
                  :src="banner.image",
                  :alt="banner.title + banner.subtitle")
                .menu-promo__lead
                  h4.menu-promo__title.title_line {{ banner.title }}
                  p.menu-promo__txt {{ banner.subtitle }}
                  router-link.menu-promo__foot.btn(
                    :to="banner.url || '#'",
                    :title="'Ir ' + banner.title") {{ banner.button_text }}

            //- Nivel 2: fside de enlaces
            ul.level2__side
              li.btn_close.i-x(
                @click="toggleNav")
                span Cerrar
              //- li.menu-side__footer
              //-   a.link_underline(href='#') Ver todos los productos
      router-link.menu__link(
        v-if="item.url",
        :to="item.url") {{ item.name }}
</template>

<script>
import { mapState } from 'vuex'
import bannersAPI from '@/api/banner'
export default {
  name: 'PageHeaderMenu',
  data () {
    return {
      // show: true,
      selected: null,
      banner: null,
      fixedPosition: {
        position: 'fixed',
        top: 0
      }
    }
  },
  computed: {
    ...mapState('ui', ['menus']),
    active () {
      return this.$store.getters['ui/headerDropdownsVisible']
    },
    items () {
      return this.menus.principal ? this.menus.principal.items : {}
    }
  },
  methods: {
    sortedChildren (children) {
      if (!this.selected) {
        return children
      }
      return [this.selected].concat(children.filter(item => item !== this.selected))
    },
    toggleNav () {
      this.active.menu ? this.$store.dispatch('ui/closeDropdown', { name: 'menu' }) : this.$store.dispatch('ui/closeAllDropdownsBut', { name: 'menu' })
      this.$store.dispatch('ui/switchModal')
    },
    openSubmenu (item) {
      if (!this.selected) {
        this.selected = item.children[0]
      }
      this.toggleNav()
    },
    changeSubmenu (children) {
      if (children.children.length > 0) {
        this.selected = children
      } else {
        this.toggleNav()
        this.$router.push(children.url)
      }
    }
  },
  created () {
    bannersAPI.getBannerBySlug('menu-campaign')
      .then(response => {
        this.banner = response.data
      }).catch(() => {})
  }
}
</script>
