export default {
  name: 'Pager',
  model: {
    prop: 'objects',
    event: 'paged'
  },
  data () {
    return {
      loading: true,
      pagination: null
    }
  },
  props: {
    forcedParams: {
      type: Object,
      default: () => { return {} }
    },
    baseURL: null,
    objects: null,
    idKey: {
      type: String,
      default: 'id'
    },
    infinite: {
      type: Boolean,
      default: false
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    axios () {
      return this.auth ? this.$axiosAuth : this.$axios
    },
    url () {
      return this.axios.defaults.baseURL + this.baseURL
    },
    currentPage: {
      get () {
        return parseInt(this.$route.query.page)
      },
      set (page) {
        this.$router.replace({
          query: {...this.$route.query, page},
          params: {...this.$route.params, keepPosition: this.infinite}
        })
      }
    },
    perPage: {
      get () {
        return parseInt(this.$route.query.items)
      },
      set (items) {
        this.$router.replace({
          query: {...this.$route.query, items},
          params: {...this.$route.params, keepPosition: this.infinite}
        })
      }
    },
    historyKey: {
      get () {
        return this.$route.query.hk
      },
      set (hk) {
        this.$router.replace({
          query: {...this.$route.query, hk},
          params: {...this.$route.params, keepPosition: this.infinite}
        })
      }
    },
    historyData: {
      get () {
        if (!this.historyKey) {
          return
        }

        let historyData = window.localStorage.getItem('hk' + this.historyKey)
        if (!historyData) {
          return
        }

        historyData = JSON.parse(historyData)
        if (historyData.fullPath !== this.$route.fullPath) {
          window.localStorage.removeItem('hk' + this.historyKey)
          return
        }

        return historyData
      },
      set (data) {
        data.fullPath = this.$route.fullPath
        window.localStorage.setItem('hk' + this.historyKey, JSON.stringify(data))
      }
    }
  },
  watch: {
    mqMobile (mqMobile) {
      if (mqMobile) {
        window.addEventListener('scroll', this.handleScroll)
        return
      }
      window.removeEventListener('scroll', this.handleScroll)
    },
    '$route.query' () {
      this.goTo()
    }
  },
  created () {
    this.goTo()
  },
  methods: {
    handleScroll () {
      if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.loading) {
        if (this.lastPage > this.parameters.page) this.currentPage++
      }
    },
    validateQuery () {
      const query = this.$route.query

      if (query.hk === undefined) {
        this.historyKey = Date.now()
        return false
      }

      if (!this.$isNumeric(query.page)) {
        this.currentPage = 1
        return false
      }

      if (!this.$isNumeric(query.items) && !this.infinite) {
        this.perPage = 12
        return false
      }

      if (query.items !== undefined && this.infinite) {
        this.perPage = undefined
        return false
      }

      return true
    },
    validateHistoryData () {
      // Si ya hay datos, no necesitamos historial.
      if (this.objects && this.objects.length) {
        return true
      }

      // Si hay historial, usarlo.
      if (this.historyData) {
        this.pagination = this.historyData.pagination
        this.$emit('paged', this.historyData.objects)
        return true
      }

      // Si es infinito y nos piden una página que no sea la primera,
      // cargar la primera.
      const query = this.$route.query
      if (this.infinite && query.page > 1) {
        this.currentPage = 1
        return false
      }

      // Todo bien!
      return true
    },
    goTo () {
      if (!this.validateQuery()) {
        return
      }

      if (!this.validateHistoryData()) {
        return
      }

      this.$emit('paging', true)
      const url = new URL(this.url)

      // Usa los valores de la URL como parámetros a nuestra llamada al API.
      const query = this.$route.query
      Object.keys(query).forEach(param => {
        const value = query[param]
        url.searchParams.set(param, value)
      })

      // Sobre-escribe valores de la URL con parámetros forzados.
      Object.keys(this.forcedParams).forEach(param => {
        const value = this.forcedParams[param]
        url.searchParams.set(param, value)
      })

      const localRequest = this.loading = this.axios.get(url).then((response) => {
        if (localRequest === this.loading) {
          const objects = response.data.data
          // En paginado infinito, puede que llegue un objeto repetido cuando
          // se agregan objetos nuevos al servidor.
          // Nos aseguramos de no agregar objetos duplicados. Usamos los nuevos.
          if (this.infinite && this.objects) {
            const freshObjectsIds = objects.map(object => object[this.idKey])
            const keptObjects = this.objects.filter(object => freshObjectsIds.indexOf(object[this.idKey]) === -1)
            objects.unshift(...keptObjects)
          }

          // Guardamos historial para mantener navegación.
          if (this.infinite) {
            this.historyData = {objects, pagination: response.data}
          }

          this.pagination = response.data
          this.$emit('paged', objects)
          this.$emit('paging', null)
          this.loading = null
        }
      })
    }
  }
}
