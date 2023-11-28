import Vue, { ref } from 'vue'
import row from '../row/index.vue'
import { useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'

import store from '@/store'
import { stringField, dateField } from '@/utils/fields'

export default {
  name: 'Row',
  components: {
    row,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const listFields = ref([
      stringField({
        label: 'Сумма',
        name: 'price',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 4,
        },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Категория',
        name: 'category',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 4,
        },
        bootstrapClass: [''],
      }),
      dateField({
        label: 'Дата',
        name: 'date_add',
        subtype: 'range',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 4,
        },
        bootstrapClass: [''],
        alias: 'p.date_add',
      }),
    ])
    const loading = ref(false)
    const fields = () => {
      // console.log('rebuild fields')
      const fields = {}
      listFields.value.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          // console.log('CONDITION TRUE', el.name)
          Vue.set(fields, el.name, {})
        } else return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', props.info[el.name])
      })
      // console.log(fields)
      return fields
    }
    const {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      clickHandler,
      showField,
      disabledField,
      hideField,
      openMenu,
    } = useForm({
      context,
      fields: fields(),
      setFields: fields,
      loading,
    })
    return {
      formData,
      listFields,
      showField,
      disabledField,
      loading,
      formErrors,
      openMenu,
    }
  },
}
