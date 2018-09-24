import { mapState } from 'vuex'
import lscache from 'lscache'

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
    basePath: null,
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
    ...mapState('ui', [
      'modal'
    ]),
    axios () {
      return this.auth ? this.$axiosAuth : this.$axios
    },
    url () {
      return this.axios.defaults.baseURL + this.basePath
    },
    fullUrl () {
      const searchParams = new URLSearchParams()

      // Usa los valores de la URL como parámetros a nuestra llamada al API.
      const query = this.$route.query
      Object.keys(query).forEach(param => {
        const value = query[param]
        searchParams.set(param, value)
      })

      // Sobre-escribe valores de la URL con parámetros forzados.
      Object.keys(this.forcedParams).forEach(param => {
        const value = this.forcedParams[param]
        searchParams.set(param, value)
      })

      return this.url + '?' + searchParams
    },
    currentPage: {
      get () {
        return this.$isNumeric(this.$route.query.page) ? parseInt(this.$route.query.page) : null
      },
      set (page) {
        const routeParams = {
          params: { ...this.$route.params, keepPosition: this.infinite },
          query: { ...this.$route.query, page }
        }
        if (this.infinite) {
          this.$router.replace(routeParams)
          return
        }
        this.$router.push({
          name: this.$route.name,
          ...routeParams
        })
      }
    },
    perPage: {
      get () {
        const forcedItems = this.$getNestedObject(this.forcedParams, ['items'])
        if (forcedItems) {
          return forcedItems
        }
        return this.$isNumeric(this.$route.query.items) ? parseInt(this.$route.query.items) : null
      },
      set (items) {
        this.$router.push({
          name: this.$route.name,
          params: { ...this.$route.params, keepPosition: this.infinite },
          query: { ...this.$route.query, items, page: 1 }
        })
      }
    },
    historyData: {
      get () {
        let historyData = lscache.get(this.fullUrl)
        if (!historyData) {
          return
        }

        return historyData
      },
      set (data) {
        lscache.set(this.fullUrl, data, 30)
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    mqMobile (mqMobile) {
      if (mqMobile) {
        window.addEventListener('scroll', this.handleScroll)
        return
      }
      window.removeEventListener('scroll', this.handleScroll)
    },
    forcedParams (newParams, oldParams) {
      if (JSON.stringify(newParams) !== JSON.stringify(oldParams)) {
        this.resetContent()
      }
    },
    '$route.path' () {
      this.resetContent()
    },
    '$route.query' (newQuery, oldQuery) {
      // Lista de los parámetros viejos y nuevos.
      // Con Set() aseguramos que sean únicos.
      const allParams = [...new Set([...Object.keys(newQuery), ...Object.keys(oldQuery)])]
      const reset = allParams.some(param => {
        if (param === 'page') {
          // Cuando nos pidan la primera página, siempre reiniciar.
          return newQuery.page === 1
        }
        // Reiniciar cuando cambie algún parámetro.
        return newQuery[param] !== oldQuery[param]
      })
      if (reset) {
        this.resetContent()
        return
      }
      // De lo contrario, cargar y el paginador decide si agregar o reemplazar.
      this.goTo()
    }
  },
  created () {
    this.goTo()
  },
  methods: {
    resetContent () {
      this.$emit('paged', [])
      this.pagination = null
      this.goTo()
    },
    handleScroll () {
      if (this.modal) {
        return
      }
      if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.loading) {
        if (this.currentPage < this.pagination.last_page) this.currentPage++
      }
    },
    validateQuery () {
      const query = this.$route.query

      if (!this.currentPage) {
        this.currentPage = 1
        return false
      }

      if (!this.perPage && !this.infinite) {
        this.perPage = 24
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
      if (this.pagination && this.objects && this.objects.length) {
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
      this.loading = true
      if (!this.validateQuery()) {
        return
      }

      if (!this.validateHistoryData()) {
        return
      }

      this.$emit('paging', true)

      const localRequest = this.loading = this.axios.get(this.fullUrl).then((response) => {
        if (localRequest === this.loading) {
          const objects = response.data.data
          // En paginado infinito, puede que llegue un objeto repetido cuando
          // se agregan objetos nuevos al servidor.
          // Nos aseguramos de no agregar objetos duplicados. Usamos los nuevos.
          if (this.infinite && this.objects && this.currentPage !== 1) {
            const freshObjectsIds = objects.map(object => object[this.idKey])
            const keptObjects = this.objects.filter(object => freshObjectsIds.indexOf(object[this.idKey]) === -1)
            objects.unshift(...keptObjects)
          }

          // Guardamos historial para mantener navegación.
          if (this.infinite) {
            this.historyData = { objects, pagination: response.data }
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
