import Vue, { onMounted, reactive, ref } from 'vue'
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
    const { emit } = ctx
    const formData = reactive({
      price: '',
      category: '',
      date_add: '',
    })
    const listFields = ref([
      stringField({
        label: 'Сумма',
        name: 'price',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 3,
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
          sm: 3,
        },
        bootstrapClass: [''],
      }),
      dateField({
        label: 'Дата',
        name: 'date_active_s',
        subtype: 'range',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        bootstrapClass: [''],
        alias: 'p.date_add',
      }),
      dateField({
        label: 'Дата',
        name: 'date_active_po',
        subtype: 'range',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        bootstrapClass: [''],
        alias: 'p.date_add',
      }),
    ])
    const showField = (type, field) => {
      return type === field.type
    }
    const openMenu = (field) => {
      field.menu = true
    }
    const openDialog = () => {
      emit('openDialog')
    }
    onMounted(() => {
      for (let key in formData) {
        formData[key] = props.info[key]
      }
    })
    return {
      listFields,
      openMenu,
      showField,
      formData,
      openDialog,
    }
  },
}
