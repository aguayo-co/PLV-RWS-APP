<template lang="pug">
//- HEADER PAGE
.page-header(v-if="scroll == 2 || scroll != null",
:class="{'js-header_down' : scroll == 1, 'js-header_up' : scroll == 0, 'openPageHeader' : menuOpen}", ref="header")
  .layout-inner
    header.header__bar
      span.menu-ico(
        @click='MenuOpen()',
        :class="{ 'menu-ico_open':menuOpen }")
        span.menu-ico__line
        span.menu-ico__line
        span.menu-ico__line
      //- brand
      router-link.page-brand(
        :to="{ name: 'home' }",
        title='Ir a la página de inicio')
        PageHeaderBrand
    //- Menu

    nav.page-menu(
      :class="{ 'page-menu_open':menuOpen }")
      transition(name='slide-left')
        PageHeaderMenuMobile(
          v-show='menuOpen',
          @MenuClose='MenuOpen')

  UserMenuMobile(
    v-if="mqMobile && user.id"
  )

</template>

<script>
import PageHeaderBrand from '@/components/PageHeader-brand'
import PageHeaderMenuMobile from '@/components/PageHeader-menuMobile'
import UserMenuMobile from '@/components/UserMenuMobile'

import { mapState } from 'vuex'

export default {
  name: 'PageHeaderMobile',
  components: {
    PageHeaderBrand,
    PageHeaderMenuMobile,
    UserMenuMobile
  },
  data () {
    return {
      menuOpen: false,
      scroll: 2,
      sTop: undefined,
      lastScrollTop: 0
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    MenuOpen: function () {
      this.menuOpen = !this.menuOpen
    },
    handleScroll: function () {
      this.sTop = window.pageYOffset || document.documentElement.scrollTop
      if (window.scrollY <= 0) return (this.scroll = 1)
      if (this.sTop > this.lastScrollTop) {
        this.scroll = 0
      } else {
        this.scroll = 1
      }
      this.lastScrollTop = this.sTop
    }
  },
  computed: {
    ...mapState(['user']),
    section () {
      if (this.$route.matched[0]) {
        return this.$route.matched[0] === 'user'
      }
      return false
    }
  }
}
</script>
