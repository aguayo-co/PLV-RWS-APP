<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Método de envío
      p.single__subtitle Escoge un método de envío para Tus Ventas
      form.form(
        id="form-envios"
        v-on:submit='',
        action='#',
        method='post')
          .box(v-for="method in methods")
            h3.box__title {{ method.name}}
            .box__grid
              .box__lead
                p.box__txt {{ method.description_seller}}
              .box__switch
                .form__switch
                  input.switch__input(
                    v-model="selectedMethods",
                    type="checkbox",
                    :id="'method-' + method.id",
                    :value="'method-' + method.id")
                  label.switch__label(
                    :for="'method-' + method.id")
                      span.switch__status
          .form__row.form__row_away.form__btn
            button.btn.btn_solid(@click.prevent="saveMethods") Guardar

</template>

<script>
import { mapState } from 'vuex'
import shippingMethodsAPI from '@/api/shippingMethod'
export default {
  name: 'UserMetodoEnvio',
  data () {
    return {
      methods: {},
      selectedMethods: []
    }
  },
  computed: {
    ...mapState(['user']),
    initialMethods () {
      let methods = []
      Object.keys(this.methods).forEach((key) => {
        if (this.$store.state['user'].shipping_methods.filter(x => x.id === this.methods[key].id)[0]) methods.push('method-' + this.methods[key].id)
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
      })
  },
  methods: {
    saveMethods: function () {
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
      } else {
        let methodIds = []
        this.selectedMethods.forEach(item => {
          methodIds.push(item.split('-')[1])
        })
        const data = {
          shipping_method_ids: methodIds
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
      }
    }
  }
}
</script>
