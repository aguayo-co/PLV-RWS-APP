<template lang="pug">
//- HEADER PAGE
.page-header(v-sticky="{ zIndex: 50, stickyTop: 20 }")
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
      router-link.page-brand(
        to='/home',
        title='Ir a la página de inicio')
        PageHeaderBrand
    //- Menu

    nav.page-menu(
      :class="{ 'page-menu_open':menuOpen }")
      transition(name='slide-left')
        PageHeaderMenuMobile(
          v-show='menuOpen',
          @MenuClose='MenuOpen')

</template>

<script>
import PageHeaderBrand from '@/components/PageHeader-brand'
import PageHeaderMenuMobile from '@/components/PageHeader-menuMobile'
import VueSticky from 'vue-sticky'

export default {
  name: 'PageHeaderMobile',
  components: {
    PageHeaderBrand,
    PageHeaderMenuMobile
  },
  directives: {
    'sticky': VueSticky
  },
  data () {
    return {
      menuOpen: false,
      stickyOptions: {
        marginTop: 20,
        forName: 0,
        className: 'stuck'
      }
    }
  },
  methods: {
    MenuOpen: function () {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>
<style>
body {
  font-family: sans-serif;
}

.container {
  height: 2000px;
}

.box {
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #3d3d3d;
  width: 100%;
  text-align: center;
  line-height: 75px;
  font-size: 20px;
  background: #f3f3f3;
  margin-bottom: 10px;
}

.stuck {
  background: blue !important;
}

.stuck-2 {
  background: red !important;
}
</style>
