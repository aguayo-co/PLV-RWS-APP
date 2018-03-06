<template lang="pug">
//- TO DO VUE: Webservices menu - list VUE
nav.page-menu
  ul.menu
    li.menu__item
      //- TO DO VUE: dinamizar esta funcionalidad
      a.menu__link(
        href='#',
        @click='handler()',
        :class="{ 'menu__link_active':active }") Shop
      //- Nivel 2: submenu con Lista de enlaces, Promo, side de enlaces
      transition(name='slide-fade')
        .menu-level2(v-show='active')
          .menu-level2__inner
            .submenu-grid
              //- Nivel 2: submenu
              ul.submenu
                //- EVENTO CLICK:
                    Agregar clase dinámicamente
                    .submenu__item_active,
                    cambiar orden de index a 0
                    cambiar .submenu__list show a true
                li.submenu__item.submenu__item_active
                  span.submenu__label Moda Femenina
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

                li.submenu__item
                  span.submenu__label Complementos
                  //- Nivel 3: Lista de enlaces
                  ul.submenu__list(v-show="show")
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

                li.submenu__item
                  span.submenu__label Marcas
                  //- Nivel 3: Lista de enlaces
                  ul.submenu__list(v-show="show")
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

                li.submenu__item
                  span.submenu__label Top Picks

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

      //- $End Nivel 2 Shop

    li.menu__item
      a.menu__link(href='#') Instashop
    li.menu__item
      a.menu__link(href='#') Closet Room
    li.menu__item
      a.menu__link(href='#') Prilovers
    li.menu__item
      a.menu__link(href='#') Blog
</template>

<script>
export default {
  name: 'PageHeaderMenu',
  data () {
    return {
      active: false,
      show: false,
      fixedPosition: {
        position: 'fixed',
        top: 0
      }
    }
  },
  methods: {
    fixPosition: function () {
      this.$emit('fixedPosition')
    },
    toggleNav: function () {
      this.active = !this.active
    },
    handler: function () {
      this.fixPosition()
      this.toggleNav()
    }
  }
}
</script>
