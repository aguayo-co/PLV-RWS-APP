<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item.steps__item_current
          span.steps__bullet.i-ok 1
          span.steps__label Carrito
          //-TO DO: Valor compra
          span.steps__value(v-if="guestCart.total") ${{ guestCart.total | currency }}
        li.steps__item
          span.steps__bullet.i-ok  2
          span.steps__label Pago
        li.steps__item
          span.steps__bullet.i-ok  3
          span.steps__label Confirmación

  .layout-inner
    //- List paso 1:compra
    .list
      //-grid
      .list__grid
        //-Tabla Total
        .list__content
          //-Compra: cliente sin autenticar
          section.list_step
            h2.subhead.form-section__title.form-section__title_center ¡Cool! Estás a un paso de terminar tu compra
            .content-slot__inner.form-section__inner
              form.form(
                v-on:submit='',
                action='#',
                @submit.prevent='next',
                method='post')
                .form__row(v-bind:class='{ "is-danger": errorLog.email }')
                  label.form__label(
                    for='email') Por favor ingresa tu email
                  span.help(
                    v-if="errorLog.email"
                  ) {{ errorLog.email }}
                  input.form__control(
                    v-model='newUser.email',
                    id='email',
                    type='email',
                    @change="next")
                  p.form__note Si ya eres Prilover te pediremos una contraseña. Si no tienes cuenta, te creamos una al tiro.
                div(v-if="showForm && userFound")
                  .alert-msg.i-smile
                    p ¡Bienvenida de vuelta! Vemos que ya tienes una cuenta
                  .form__row(v-bind:class='{ "is-danger": errorLog.password }')
                    label.form__label(
                      for='password'
                    ) Ingresa tu contraseña
                    span.help(
                      v-if="errorLog.password"
                    ) {{ errorLog.password }}
                    input.form__control(
                      v-model='newUser.password',
                      id='password',
                      type='password')
                  .form__row
                    button.btn.btn_solid.btn_block(
                      @click.prevent="login") Iniciar sesión
                div(v-if="showForm && !userFound")
                  .alert-msg.i-smile
                    p Vemos que no tienes una cuenta. Tranquila te crearemos una rápidamente para que continues con tu compra.
                  .form__row(:class='{ "is-danger": newErrorLog.emailConfirm }')
                    label.form__label(
                      for='emailConfirm') Confirma tu correo
                    span.help(
                      v-if="newErrorLog.emailConfirm"
                    ) {{ newErrorLog.emailConfirm }}
                    input.form__control(
                      v-model='emailConfirm',
                      id='emailConfirm',
                      type='email')
                  .form__row(:class='{ "is-danger": newErrorLog.first_name }')
                    label.form__label(
                      for='first_name') Nombres
                    span.help(
                      v-if="newErrorLog.first_name"
                    ) {{ newErrorLog.first_name }}
                    input.form__control(
                      v-model='newUser.first_name',
                      id='first_name',
                      type='text')
                  .form__row(:class='{ "is-danger": newErrorLog.last_name }')
                    label.form__label(
                      for='last_name') Apellidos
                    span.help(
                      v-if="newErrorLog.last_name"
                    ) {{ newErrorLog.last_name }}
                    input.form__control(
                      v-model='newUser.last_name',
                      id='last_name',
                      type='text')
                  .form__row(:class='{ "is-danger": newErrorLog.password }')
                    label.form__label(
                      for='password') Contraseña
                    span.help(
                      v-if="newErrorLog.password"
                    ) {{ newErrorLog.password }}
                    .form__password
                      input.form__control(
                        v-model='newUser.password',
                        id='password',
                        :type="viewPass ? 'text' : 'password'",
                        @input='validatePassword')
                      span.form__visible.i-view(
                        @click='visiblePass')
                      span.password-bar(
                        v-if="newUser.password"
                        :class='"level-" + (3 - newErrorLog.passwordDetail.length)')
                      div.helper(v-if='newErrorLog.passwordDetail.length > 0')
                        ul.helper__list
                          li(
                            v-for='detail in newErrorLog.passwordDetail'
                          ) {{ detail }}
                  .form__row.form__row_away
                    button.btn.btn_solid.btn_block(
                      @click.prevent='create') Registrarse
                .form__row
                  button.btn.btn_solid.btn_block(
                    v-if="!showForm"
                    :class="{ 'btn_disabled' : loading }",
                    @click.prevent="next") Continuar
        .list__side
          .list__frame
            h3.title Detalle de tu compra
            .list__data
              .list__data-table
                //- List Detalle de tu compra
                dl.data-table(v-for="product in guestCart.products")
                  dt.data-table__item {{ product.title.split(' ')[0] }}
                  dd.data-table__value ${{ product.price | currency }}
                dl.data-total
                  dt.data-total__label Total de tu orden:
                  dd.data-total__value ${{ guestCart.total | currency }}
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from '@/api/user'
export default {
  name: 'CompraGuest',
  components: {
  },
  data () {
    return {
      errorLog: {},
      newErrorLog: {
        passwordDetail: []
      },
      newUser: {},
      loading: false,
      showForm: false,
      userFound: false,
      forgot: false,
      emailConfirm: null,
      viewPass: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['guestCart'])
  },
  methods: {
    visiblePass: function () {
      this.viewPass = !this.viewPass
    },
    validate: function () {
      this.errorLog = {}
      if (!this.newUser.email) {
        this.errorLog.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.newUser.email)) {
          this.errorLog.email = 'El email que ingresaste no parece válido.'
        }
      }
      if (Object.keys(this.errorLog).length === 0) {
        return true
      }
      return false
    },
    validatePassword: function (e) {
      this.newErrorLog = {}
      this.newErrorLog.passwordDetail = []
      if (!this.newUser.password) {
        this.newErrorLog.password = 'Debes ingresar una contraseña'
      } else {
        if (this.newUser.password.length < 8) this.newErrorLog.passwordDetail.push('Tu contraseña debe tener al menos 8 caracteres')
        if (!/[a-zA-Z]/.test(this.newUser.password)) this.newErrorLog.passwordDetail.push('Tu contraseña debe contener al menos una letra')
        if (!/\d+/.test(this.newUser.password)) this.newErrorLog.passwordDetail.push('Tu contraseña debe contener al menos un número')
      }
    },
    validateNewUser: function () {
      if (!this.newUser.first_name) this.newErrorLog.first_name = 'Debes ingresar tu nombre'
      if (!this.newUser.last_name) this.newErrorLog.last_name = 'Debes ingresar tu nombre'
      if (!this.emailConfirm) {
        this.newErrorLog.emailConfirm = 'Debes confirmar tu correo electrónico'
      } else {
        if (this.newUser.email !== this.emailConfirm) {
          this.newErrorLog.emailConfirm = 'Este email no coincide con el primero que ingresaste'
        }
      }
    },
    next: function () {
      if (this.validate()) {
        this.loading = true
        usersAPI.checkEmail(this.newUser.email)
          .then(response => {
            this.loading = false
            this.userFound = true
            this.showForm = true
          })
          .catch(response => {
            this.loading = false
            this.userFound = false
            this.showForm = true
          })
      }
    },
    login: function () {
      this.errorLog = {}
      if (!this.newUser.password) this.errorLog.password = 'Debes ingresar tu contraseña'

      if (Object.keys(this.errorLog).length === 0) {
        const payload = {
          email: this.newUser.email,
          password: this.newUser.password
        }
        usersAPI.login(payload)
          .then(response => {
            this.$store.dispatch('user/setUser', response.data)
            this.migrateCart()
            this.$router.push({name: 'compra'})
          })
          .catch(e => {
            var modal

            if (this.$store.getters['ui/loginAttempts'] < 3) {
              modal = {
                name: 'ModalMessage',
                parameters: {
                  type: 'alert',
                  title: '¡Ups! Parece que ocurrió un error',
                  body: this.$getNestedObject(e, ['response', 'data', 'errors', 0])
                }
              }
            } else {
              modal = {
                name: 'ModalMessage',
                parameters: {
                  type: 'alert',
                  title: '¡Ups! Ya has intentado autenticarte varias veces',
                  primaryButtonTitle: '¿Olvidaste tu contraseña?',
                  primaryButtonURL: 'password'
                }
              }
            }
            this.$store.dispatch('ui/showModal', modal)
            this.$store.dispatch('ui/loginAttempt')
          })
      }
    },
    create: function () {
      this.validatePassword()
      this.validateNewUser()
      if (Object.keys(this.newErrorLog).length === 1 && this.newErrorLog.passwordDetail.length === 0) {
        this.signUp()
      }
    },
    migrateCart: function () {
      let errors = 0
      const products = this.guestCart.products
      products.forEach((product) => {
        this.$store.dispatch('cart/addProduct', { id: product.id })
          .catch(e => {
            errors += 1
          })
      })
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'alert',
          title: 'Tuvimos que eliminar algunos productos de tu carrito porque ya no están disponibles.'
        }
      }
      if (errors > 0) this.$store.dispatch('ui/showModal', modal)
      this.$store.dispatch('guestCart/kill')
    },
    signUp: function () {
      // console.log(this.$store.get('userAuth'))
      const payload = {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        email: this.newUser.email,
        password: this.newUser.password
      }
      usersAPI.create(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
          this.migrateCart()
          this.$router.push({name: 'compra'})
        })
        .catch(e => {
          const modal = {
            name: 'ModalMessage',
            parameters: {
              type: 'alert',
              title: '¡Ups! Parece que ocurrió un error',
              body: Object.values(e.response.data.errors)[0]
            }
          }
          this.$store.dispatch('ui/showModal', modal)
        })
    }
  }
}
</script>
