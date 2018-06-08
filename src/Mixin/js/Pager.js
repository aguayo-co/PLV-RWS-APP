export default {
  name: 'Pager',
  model: {
    prop: 'pagination',
    event: 'paged'
  },
  props: {
    pagination: null,
    auth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    perPage: {
      get () {
        return this.pagination.per_page
      },
      set (perPage) {
        this.goTo(this.pagination.first_page_url + '&items=' + perPage)
      }
    }
  },
  methods: {
    goTo (url) {
      this.$emit('paging', true)
      const axios = this.auth ? this.$axiosAuth : this.$axios
      axios.get(url).then((response) => {
        // Scroll to the top of the parent element.
        const bodyRect = document.body.getBoundingClientRect()
        const elemRect = this.$parent.$el.getBoundingClientRect()
        const offset = elemRect.top - bodyRect.top
        window.scrollTo(0, offset)

        this.$emit('paged', response.data)
        this.$emit('paging', false)
      })
    }
  }
}
