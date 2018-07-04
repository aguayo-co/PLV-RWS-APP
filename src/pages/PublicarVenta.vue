<template lang="pug">
.layout-page
  //- If user is logged in and has role of seller, show default form
  FormPublicarVenta(v-if='seller && authenticated')
  //- If user is logged in but not seller, show data completion form
  FormCompleteSeller(v-if='authenticated && !seller')
  //- If user is not authenticated
  .layout-inner(v-if='!authenticated && !signup')
    form.form(
      @submit.prevent='')
      fieldset.form-section
        legend.title ¡Estás a un paso de publicar tu producto!
          p.form-section__subtitle Para publicar tu venta, ingresa tu correo
        .form-section__inner
          .form__row(
            v-bind:class='{ "is-danger": errorLog.email }')
            label.form__label(
              for='email') Correo
            span.help(
              v-if='errorLog.email') {{ errorLog.email }}
            input.form__control(
              @change="userFound = false",
              v-model='newUser.email',
              id='email',
              type='email')
          .form__row.form__row_away.form__btn(
            v-if='!signup && !userFound')
            button.btn.btn_solid(
              :disabled="loading"
              :class="{ 'btn_disabled' : loading }"
              @click.prevent='firstStep') Continuar
        .form-section__inner(v-if='userFound')
          p.form__info.i-smile Vemos que ya tienes una cuenta, por favor ingresa tu contraseña
          .form__row(
            v-bind:class='{ "is-danger": errorLog.password }')
            label.form__label(
              for='password') Contraseña
            span.help(
              v-if="errorLog.password") {{ errorLog.password }}
            input.form__control(
              v-model='newUser.password',
              id='password',
              type='password')
          .form__row.form__row_away.form__btn
            button.btn.btn_solid(
              @click.prevent='login') Ingresar
  //- If user email not found (new user)
  FormSignUpVendedora(
    v-if='!authenticated && signup'
    :email='newUser.email')

</template>

<script>
import { mapState } from 'vuex'
import userAPI from '@/api/user'
import LoginMixin from '@/Mixin/js/Login'
import FormPublicarVenta from '@/components/FormPublicarVenta'
import FormCompleteSeller from '@/components/FormCompleteSeller'
import FormSignUpVendedora from '@/components/FormSignUpVendedora'

export default {
  name: 'PublicarVenta',
  mixins: [LoginMixin],
  components: {
    FormPublicarVenta,
    FormCompleteSeller,
    FormSignUpVendedora
  },
  data () {
    return {
      newUser: {},
      showForm: false,
      userFound: false,
      signup: false,
      viewPass: false
    }
  },
  computed: {
    ...mapState(['guestCart']),
    ...mapState(['user']),
    seller () {
      if (this.$store.state['user'].roles) {
        return this.$store.state['user'].roles.filter(x => x.name === 'seller')[0]
      }
      return false
    },
    authenticated () {
      return Boolean(this.$store.state['user'].id)
    },
    email () {
      return this.newUser.email
    },
    password () {
      return this.newUser.password
    }
  },
  methods: {
    firstStep: function () {
      if (this.validateEmail()) {
        this.loading = true
        userAPI.checkEmail(this.newUser.email)
          .then(response => {
            this.userFound = true
            this.showForm = true
          })
          .catch(response => {
            this.userFound = false
            this.showForm = true
            this.signup = true
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>
