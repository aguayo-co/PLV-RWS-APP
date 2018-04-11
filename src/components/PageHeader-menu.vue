<template lang="pug">
//- TO DO VUE: Webservices menu - list VUE
nav.page-menu
  ul.menu
    li.menu__item(
      v-for='item in menu.items'
    )
      a.menu__link(
        v-if='!item.url'
        href='#',
        @click='handler(item)',
        :class="{ 'menu__link_active':active }") {{ item.name }}
      //- Nivel 2: submenu con Lista de enlaces, Promo, side de enlaces
      transition(name='slide-fade')
        .menu-level2(v-show='active' v-if='!item.url')
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
                      a.subitem__link(:href='grandChildren.url') {{grandChildren.name}}
              //- Nivel 2: Promo
              .menu-promo
                img.menu-promo__img(src='/static/img/demo/menu-promo-001.jpg' alt='Producto destacado Denim')
                .menu-promo__lead
                  h4.menu-promo__title.title_line Denim
                  p.menu-promo__txt ¡Siempre tiene ONDA!
                  a.menu-promo__foot.btn(
                    href='#',
                    title='Ir a denim') Ver todos los denim

            //- Nivel 2: fside de enlaces
            ul.level2__side
              li.btn_close.i-x(
                @click='toggleNav')
                span Cerrar
              li.menu-side__footer
                a.link_underline(href='#') Ver todas las Prendas
      router-link.menu__link(
          v-if='item.url'
          v-bind:to='item.url'
      ) {{ item.name }}
</template>

<script>
export default {
  name: 'PageHeaderMenu',
  data () {
    return {
      active: false,
      // show: true,
      selected: undefined,
      menu: {},
      fixedPosition: {
        position: 'fixed',
        top: 0
      }
    }
  },
  methods: {
    toggleNav: function () {
      this.active = !this.active
      this.$store.dispatch('ui/switchModal')
    },
    handler: function (item) {
      this.toggleNav()
      this.selected = item.children[0]
    },
    menuHandler: function (children, index) {
      this.selected = children
      var clicked = this.menu.items[0].children.splice(index, 1)
      this.menu.items[0].children.splice(0, 0, clicked[0])
    }
  },
  created () {
    this.$axios.get('/api/menus/principal').then(response => {
      this.menu = response.data
    })
  }
}
</script>
