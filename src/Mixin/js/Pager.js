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
        this.$emit('paged', response.data)
        window.scrollTo(0, 0)
        this.$emit('paging', false)
      })
    }
  }
}
