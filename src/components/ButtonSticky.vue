<template lang="pug">
  .btn-sticky(v-if='scroll == 2 || scroll != null',
  :class="{'js-btn_fade' : scroll == 1 }")
    a.btn-sticky__link.i-bag(href='#') Comienza a vender
</template>

<script>
export default {
  name: 'ButtonSticky',
  data () {
    return {
      scroll: 2,
      scrollDetect: undefined,
      lastScrollTop: 50
    }
  },
  created () {
    window.addEventListener('scroll', this.btnFade)
  },
  methods: {
    btnFade: function () {
      this.scrollDetect = window.pageYOffset || document.documentElement.scrollHeight
      if (this.scrollDetect < this.lastScrollTop) {
        this.scroll = 0
        console.log(this.lastScrollTop + 'en cero')
      } else {
        this.scroll = 1
        console.log(this.scrollDetect + 'en 1')
      }
      this.lastScrollTop = this.scrollDetect
    }
  }
}
</script>
