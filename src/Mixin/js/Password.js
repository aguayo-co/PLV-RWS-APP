export default {
  data () {
    return {
      errorLog: {}
    }
  },
  computed: {
    passwordSuggestions () {
      const suggestions = []
      if (!this.password || this.password.length < 8) suggestions.push('Tu contraseña debe tener al menos 8 caracteres')
      if (!this.password || !/[a-zA-Z]/.test(this.password)) suggestions.push('Tu contraseña debe contener al menos una letra')
      if (!this.password || !/\d+/.test(this.password)) suggestions.push('Tu contraseña debe contener al menos un número')
      return suggestions
    }
  },
  methods: {
    validatePassword () {
      this.$delete(this.errorLog, 'password')

      if (!this.password) {
        this.$set(this.errorLog, 'password', 'Debes ingresar una contraseña')
        return false
      }

      return true
    }
  },
  watch: {
    password () {
      this.$delete(this.errorLog, 'password')
    }
  }
}
