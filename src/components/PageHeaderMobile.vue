<template lang="pug">
//- HEADER PAGE
.page-header
  .layout-inner
    header.header__bar
      span.menu-ico(
        @click='MenuOpen()',
        :class="{ 'menu-ico_open':menuOpen }"
      )
        span.menu-ico__line
        span.menu-ico__line
        span.menu-ico__line
      //- brand
      h1.page-brand(
        v-if='page')
        PageHeaderBrand
      a.page-brand(
        v-else='',
        href='/',
        title='Ir a la página de inicio')
        PageHeaderBrand
    //- Menu
    transition(name='slide-left')
      PageHeaderMenuMobile(v-show='menuOpen')
</template>

<script>
import PageHeaderBrand from '@/components/PageHeader-brand'
import PageHeaderMenuMobile from '@/components/PageHeader-menuMobile'

export default {
  name: 'PageHeaderMobile',
  components: {
    PageHeaderBrand,
    PageHeaderMenuMobile
  },
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    MenuOpen: function () {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>
