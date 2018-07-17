<script>
// https://github.com/jofftiquez/vue-media-query-mixin
export default {
  name: 'VueMqMixin',
  install (Vue, options) {
    Vue.mixin({
      data: function () {
        return {
          windowWidth: 0,
          windowHeight: 0,
          mqSmallMax: false,
          mqSmall: false,
          mqMobile: false,
          mqTablet: false,
          mqTabletMax: false,
          mqDesk: false,
          mqDeskBig: false
        }
      },
      mounted () {
        this.$nextTick(function () {
          window.addEventListener('resize', this.getWindowWidth)
          window.addEventListener('resize', this.getWindowHeight)
          this.getWindowWidth()
          this.getWindowHeight()
        })
      },
      methods: {
        getWindowWidth (event) {
          let w = document.documentElement.clientWidth
          let mediaQuery = {
            smallMax: {
              max: 559
            },
            small: {
              min: 560
            },
            mobile: {
              max: 1023
            },
            tablet: {
              min: 768
            },
            tabletMax: {
              max: 767
            },
            desk: {
              min: 1024
            },
            deskBig: {
              min: 1280
            }
          }
          this.windowWidth = w
          this.mqSmallMax = w <= mediaQuery.smallMax.max
          this.mqSmall = w >= mediaQuery.small.min
          this.mqMobile = w <= mediaQuery.mobile.max
          this.mqTablet = w >= mediaQuery.tablet.min
          this.mqTabletMax = w <= mediaQuery.tabletMax.max
          this.mqDesk = w >= mediaQuery.desk.min
          this.mqDeskBig = w >= mediaQuery.deskBig.min
        },

        getWindowHeight (event) {
          let h = document.documentElement.clientHeight
          this.windowHeight = h
        }
      },
      beforeDestroy () {
        window.removeEventListener('resize', this.getWindowWidth)
        window.removeEventListener('resize', this.getWindowHeight)
      }
    })
  }
}
</script>
