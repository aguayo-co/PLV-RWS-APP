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
          mqDesk: false,
          mqDeskBig: false
          // wSM: false,
          // wMD: false,
          // wLG: false,
          // wXL: false
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
            smallmax: {
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
            desk: {
              min: 1024
            },
            deskBig: {
              min: 1280
            }
            // sm: {
            //   min: 560,
            //   max: 1023
            // },
            // md: {
            //   min: 1024,
            //   max: 1439
            // },
            // lg: {
            //   min: 1440,
            //   max: 1919
            // },
            // xl: {
            //   min: 1920
            // }
          }
          this.windowWidth = w
          this.mqSmallMax = w <= mediaQuery.smallmax.max
          this.mqSmall = w >= mediaQuery.small.min
          this.mqMobile = w <= mediaQuery.mobile.max
          this.mqTablet = w >= mediaQuery.tablet.min
          this.mqDesk = w >= mediaQuery.desk.min
          this.mqDeskBig = w >= mediaQuery.deskBig.min
          // this.wSM = w >= mediaQuery.sm.min && w <= mediaQuery.sm.max
          // this.wMD = w >= mediaQuery.md.min && w <= mediaQuery.md.max
          // this.wLG = w >= mediaQuery.lg.min && w <= mediaQuery.lg.max
          // this.wXL = w >= mediaQuery.xl.min
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
