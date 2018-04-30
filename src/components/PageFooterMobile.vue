<template lang="pug">
//- Footer PAGE FOOTER MOBILE
footer.page-foot(:class="{openSearchMb : active || activeCart}")
  nav.foot-nav_mb
    ul.foot-nav__list
      li.foot-nav__item
        a.foot-nav__link(@click='animSearch')
          span.foot-nav__name.i-search Buscar
        transition(name='slide-right')
          //- Sugerencias de búsqueda a nivel de:
              marcas, categorías, nombres de Prilovers.
          .foot-nav__fixed(v-show='active')
            a.foot-nav__close.i-x(href="#", @click='animSearch')
            h4.foot-nav__title Buscar
            form.foot-nav__search(action='', method='GET')
              .foot-nav__search-row.i-search
                input.foot-nav__search-input.form__control#searchMain(type='text', name='search')
                button.btn.btn_solid.foot-nav__search-btn Buscar
            ul.foot-nav__sublist
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Vestidos
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Verano forever
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") ZARA
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Ofertas
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Joyitas premium
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Vestidos
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Verano forever
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") ZARA
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Ofertas
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Joyitas premium
      li.foot-nav__item
        a.foot-nav__link(
          @click='animCart')
          span.foot-nav__name.i-bag Carrito
          small.badge.badge_user(v-if="totalProducts.length > 0") {{ totalProducts.length }}
          //-Carrito de compras
        transition(name='slide-right')
          .foot-nav__fixed(v-show='activeCart')
            a.foot-nav__close.i-x(href="#", @click='animCart')
            h4.foot-nav__title Carrito
            .box-cards
              .box-cards__head
                p.box-cards__title(v-if="totalProducts.length > 1") {{ totalProducts.length }} productos en tu carrito
                p.box-cards__title(v-else) {{ totalProducts.length }} producto en tu carrito
              .box-cards__subhead
                .box-cards__value
                  p.box-cards__title Total
                  span.box-cards__number ${{ cart.total | currency }}
                router-link.btn.btn_solid.btn_small(:to="'/compra/'") Ir a Pagar
              .box-cards__item(v-for="product in totalProducts")
                article.list__card
                  a.card__product
                    //-img producto
                    .card__figure
                      img.card__img(
                        :src="product.images[0]",
                        :alt="product.title")
                    //-info producto
                    .card__info
                      .card__header
                        h3.card__title {{ product.title }}
                        p.card__size Talla: {{ product.size }}
                      p.card__price ${{ product.price | currency }}
                button.box-cards__btn.i-x(@click="removeFromCart(product.id)") Eliminar
      li.foot-nav__item.foot-nav__item_brand
        router-link.foot-nav__link(:to="'/'")
          span.foot-nav__name.i-brand Ir al home
      li.foot-nav__item
        router-link.foot-nav__link(:to="'/publicar-venta/'")
          span.foot-nav__name.i-tag Vender
      //- li.foot-nav-mb__item(v-for='list in footer')
      //-   a.foot-nav-mb__link(
      //-     @click.prevent='itemActive(list)'
      //-     :class='{active: isActive == list}',
      //-     :href='list.url',
      //-     :title='list.title')
      //-     span.foot-nav-mb__name(
      //-     :class='list.icon') {{ list.name }}
      //- Is authenticated
      li.foot-nav__item.tool-user__item_auth(
        v-if='user.id')
        router-link.foot-nav__link(:to="'/user/data'")
          figure.tool-user__grid
            small.badge.badge_user 2
            span.tool-user__avatar
              //-vue variable Notificaciones usuario
              img.tool-user__photo(
                src='/static/img/demo/user-avatar.jpg',
                alt='')
            //-vue variable user name
            figcaption.tool-user__name {{ user.first_name }}
      //- Is NOT authenticated
      li.foot-nav-mb__item(
        v-else)
        //- a.foot-nav-mb__link(
        //-   :href='itemAuth.url',
        //-   :title='itemAuth.title')
        //-   span.foot-nav-mb__name(
        //-   :class='itemAuth.icon') {{ itemAuth.name }}
        a.foot-nav__link(@click='logIn')
          span.foot-nav__name.i-user Ingresar

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'PageFooterMobile',
  data () {
    return {
      isActive: undefined,
      active: false,
      ProfActive: false,
      activeCart: false,
      // Data del menú mobile-footer
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
        }
      ],
      // Data del Item Auth menú mobile footer
      itemAuth: [
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
    },
    open: function () {
      this.$emit('open')
    },
    close: function () {
      this.$emit('close')
    },
    animSearch: function () {
      this.active = !this.active
    },
    animCart: function () {
      this.activeCart = !this.activeCart
    },
    logIn: function () {
      const payload = {
        name: 'FormLogin'
      }
      this.$store.dispatch('ui/showModal', payload)
    },
    toggleBox: function () {
      this.activeDropDowns.user ? this.$store.dispatch('ui/closeDropdown', { name: 'user' }) : this.$store.dispatch('ui/closeAllDropdownsBut', { name: 'user' })
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['cart']),
    totalProducts () {
      return this.$store.getters['cart/products']
    },
    activeDropDowns () {
      return this.$store.getters['ui/headerDropdownsVisible']
    },
    getName () {
      return this.$store.getters['UserModule/getUserName']
    },
    getAuth () {
      if (this.$store.getters['UserModule/getAuth'] !== null && this.getName !== '') {
        return true
      } else {
        return false
      }
    }
    // ...mapState(['user'])
  }
}
</script>
