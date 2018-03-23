import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'UserData',
  data () {
    return {
      isActive: '',
      selectAddress: '',
      newAddress: false,
      editName: false,
      editAbout: false,
      editEmail: false,
      editTel: false
    }
  },
  computed: {
    ...mapFields([
      'user.id',
      'user.first_name',
      'user.last_name',
      'user.email',
      'user.about',
      'user.phone',
      'user.picture',
      'user.cover',
      'user.followers_count',
      'user.following_count',
      'user.addresses'
    ]),
    ...mapGetters('user', [
      'full_name'
    ])
  },
  methods: {
    IsActive: function (e) {
      this.isActive = e
    },
    NotActive: function (e) {
      this.isActive = ''
    },
    toggle: function (prop) {
      this[prop] = !this[prop]
    }
  }
}
