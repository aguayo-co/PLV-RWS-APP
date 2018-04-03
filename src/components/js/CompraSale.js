import { mapGetters } from 'vuex'

export default {
  name: 'CompraSale',
  props: ['sale'],
  computed: {
    ...mapGetters('cart', [
      'user_full_name'
    ])
  }
}
