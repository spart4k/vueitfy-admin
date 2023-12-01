import Vue, { onMounted, reactive, ref } from 'vue'
import row from '../row/index.vue'
import { useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'

import store from '@/store'
import { stringField, dateField, selectField } from '@/utils/fields'

export default {
  name: 'Row',
  components: {
    row,
  },
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const formData = reactive({
      price: '',
      category: '',
      date_active_s: '',
      date_active_po: '',
    })
    const listFields = ref([
      selectField({
        label: 'E',
        name: 'status_id',
        subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
        ],
        position: {
          cols: 12,
          sm: 2,
        },
        bootstrapClass: [''],
        alias: 'p.status_id',
      }),
      stringField({
        label: 'Сумма',
        name: 'price',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 2,
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
          sm: 2,
        },
        bootstrapClass: [''],
      }),
      dateField({
        label: 'Дата ',
        name: 'date_active_s',
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
      emit('openDialog', props.row.name)
    }
    onMounted(() => {
      for (let key in formData) {
        formData[key] = props.row[key]
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
