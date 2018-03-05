<template lang="pug">
//- TO DO VUE: Webservices menu - list VUE
nav.page-menu
  ul.menu
    li.menu__item(
      :class="{ menu__item_current :level1 == 1 }")
      //- TO DO VUE: dinamizar esta funcionalidad
      a.menu__link.i-shop(
        href='#',
        @click='level1 = 1') Shop
      //-iconos menu activo
      span.submenu__back.i-back
      span.submenu__close.i-close(
        href='#',
        @click='level1 = undefined')

      //- Nivel 2: submenu
      transition(name='slide-left')
        ul.submenu(
            v-show='level1 == 1'
            :class="{ submenu_open :level2 != undefined }"
          )
          li.submenu__item(
            :class="{ submenu__item_current :level2 == 2 }"
          )
            span.submenu__label(
              @click='level2 = 2'
            ) Moda Femenina
            span.submenu__back.i-back
            span.submenu__close.i-close(
              href='#',
              @click='level2 = undefined')
            //- Nivel 3: Lista de enlaces
            ul.submenu__list
              li.submenu__subitem
                a.subitem__link(href="#") Tops
              li.submenu__subitem
                a.subitem__link(href='#') Poleras
              li.submenu__subitem
                a.subitem__link(href='#') Blusas y camisas
              li.submenu__subitem
                a.subitem__link(href='#') Monos
              li.submenu__subitem
                a.subitem__link(href='#') Chalecos
              li.submenu__subitem
                a.subitem__link(href='#') Abrigos
              li.submenu__subitem
                a.subitem__link(href='#') Parkas
              li.submenu__subitem
                a.subitem__link(href='#') Chaquetas
              li.submenu__subitem
                a.subitem__link(href='#') Polerones
              li.submenu__subitem
                a.subitem__link(href='#') Vestidos
              li.submenu__subitem
                a.subitem__link(href='#') Kimonos
              li.submenu__subitem
                a.subitem__link(href='#') Pantalones
              li.submenu__subitem
                a.subitem__link(href='#') Capris
              li.submenu__subitem
                a.subitem__link(href='#') Leggings
              li.submenu__subitem
                a.subitem__link(href='#') Jardineras
              li.submenu__subitem
                a.subitem__link(href='#') Faldas
              li.submenu__subitem
                a.subitem__link(href='#') Ropa Interior
              li.submenu__subitem
                a.subitem__link(href='#') Pantalones cortos
              li.submenu__subitem
                a.subitem__link(href='#') Pijamas

          li.submenu__item(
            :class="{ submenu__item_current :level2 == 3 }"
          )
            span.submenu__label(
              @click='level2 = 3'
            ) Complementos
            //- Nivel 3: Lista de enlaces
            ul.submenu__list
              li.submenu__subitem
                a.subitem__link(href='#') Accesorios
              li.submenu__subitem
                a.subitem__link(href='#') Zapatos
              li.submenu__subitem
                a.subitem__link(href='#') Cinturones
              li.submenu__subitem
                a.subitem__link(href='#') Anteojos
              li.submenu__subitem
                a.subitem__link(href='#') Bisutería
              li.submenu__subitem
                a.subitem__link(href='#') Sombreros y Gorros

          li.submenu__item(
            :class="{ submenu__item_current :level2 == 4 }"
          )
            span.submenu__label(
              @click='level2 = 4'
            ) Marcas
            //- Nivel 3: Lista de enlaces
            ul.submenu__list
              li.submenu__subitem
                a.subitem__link(href='#') Adidas
              li.submenu__subitem
                a.subitem__link(href='#') Americanino
              li.submenu__subitem
                a.subitem__link(href='#') Asos
              li.submenu__subitem
                a.subitem__link(href='#') Converse
              li.submenu__subitem
                a.subitem__link(href='#') Forever 21
              li.submenu__subitem
                a.subitem__link(href='#') Foster
              li.submenu__subitem
                a.subitem__link(href='#') H&M
              li.submenu__subitem
                a.subitem__link(href='#') Maaji
              li.submenu__subitem
                a.subitem__link(href='#') Mango
              li.submenu__subitem
                a.subitem__link(href='#') Nike
              li.submenu__subitem
                a.subitem__link(href='#') Rapsodia
              li.submenu__subitem
                a.subitem__link(href='#') Opposite
              li.submenu__subitem
                a.subitem__link(href='#') TopShop
              li.submenu__subitem
                a.subitem__link(href='#') Zara

          li.submenu__item(
            :class="{ submenu__item_current :level2 == 5 }"
          )
            span.submenu__label(
              @click='level2 = 5'
            ) Top Picks
          li.menu-side__footer
            a.link_underline(href='#') Ver todas las Prendas

      //- $End Nivel 2 Shop

    li.menu__item
      a.menu__link.i-bag(href='#') Instashop
    li.menu__item
      a.menu__link.i-closet(href='#') Closet Room
    li.menu__item
      a.menu__link.i-favorite(href='#') Prilovers
    li.menu__item
      a.menu__link.i-blog(href='#') Blog
</template>

<script>
export default {
  name: 'PageHeaderMenuMobile',
  data () {
    return {
      active: false,
      show: false,
      level1: undefined,
      level2: undefined
    }
  },
  methods: {

    toggleNav: function () {
      this.active = !this.active
    }

  }
}
</script>
