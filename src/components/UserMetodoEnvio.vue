<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Método de envío
      p.single__subtitle Escoge tus métodos de envío
      p.preload(v-if="loading")
        span.preload__spin.preload__spin_1
        span.preload__spin.preload__spin_2
        span.preload__spin.preload__spin_3
        span.preload__spin.preload__spin_4
      form.form(
        v-else,
        id="form-envios"
        v-on:submit='',
        action='#',
        method='post')
          .box(v-for="method in methods")
            h3.box__title {{ method.name}}
            .box__grid
              .box__lead
                p.box__txt(
                  v-if="!isAllowed(method)")
                  strong Tu dirección ingresada como favorita no permite usar este método de envío ya que estás fuera de cobertura.
                p.box__txt {{ method.description_seller}}
              .box__switch
                .form__switch
                  input.switch__input(
                    :disabled="!isAllowed(method)"
                    v-model="selectedMethods",
                    type="checkbox",
                    :id="'method-' + method.id",
                    :value="method.id")
                  label.switch__label(
                    :for="'method-' + method.id")
                      span.switch__status
          .form__row.form__row_away.form__btn
            button.btn.btn_solid(
              :disabled="processing"
              @click.prevent="saveMethods") Guardar

</template>

<script>
import { mapState } from 'vuex'
import shippingMethodsAPI from '@/api/shippingMethod'
export default {
  name: 'UserMetodoEnvio',
  data () {
    return {
      processing: false,
      methods: {},
      selectedMethods: [],
      loading: true
    }
  },
  computed: {
    ...mapState(['user']),
    initialMethods () {
      let methods = []
      this.$store.state['user'].shipping_method_ids.forEach((methodId) => {
        methods.push(methodId)
      })
      return methods
    }
  },
  watch: {
    initialMethods: function () {
      this.selectedMethods = this.initialMethods
    }
  },
  created: function () {
    shippingMethodsAPI.getAllMethods()
      .then(response => {
        this.methods = response.data.data
        this.loading = false
      })
  },
  mounted: function () {
    this.selectedMethods = this.initialMethods
  },
  methods: {
    isAllowed (method) {
      if (!this.isChilexpress(method) || this.allowChilexpress()) {
        return true
      }
      var index = this.selectedMethods.indexOf(method.id)
      if (index > -1) {
        this.selectedMethods.splice(index, 1)
      }

      return false
    },
    isChilexpress (method) {
      return method.slug.indexOf('chilexpress') >= 0
    },
    allowChilexpress () {
      const favoriteId = this.$getNestedObject(this.user, ['favorite_address_id'])
      if (!favoriteId) {
        return false
      }

      const chilexpressCoverage = this.$getNestedObject(this.user, [
        'addresses',
        favoriteId,
        'chilexpress_geodata',
        'coverage_type'])
      if (!chilexpressCoverage || chilexpressCoverage === 2) {
        return false
      }

      return true
    },
    saveMethods () {
      this.processing = true
      if (this.selectedMethods.length === 0) {
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'alert',
            title: 'Debes tener al menos un método de envío'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
        this.selectedMethods = this.initialMethods
        this.processing = false
        return
      }

      const data = {
        shipping_method_ids: this.selectedMethods
      }
      this.$store.dispatch('user/update', data).then(() => {
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'positive',
            title: 'Has actualizado tus opciones de envío'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
      }).catch((e) => {
        this.$handleApiErrors(e, ['about'], this.errorLog)
      })
      this.processing = false
    }
  }
}
</script>
