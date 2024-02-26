import Vue, { onMounted, reactive, ref } from 'vue'
import row from './index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'

import store from '@/store'
import { stringField, dateField, selectField } from '@/utils/fields'
import useRequest from '@/compositions/useRequest'

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
    tab: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const confirm = ref(false)
    const price_id = ref(null)
    const route = useRoute()
    const router = useRouter()
    const confirmClick = async (value) => {
      confirm.value = false
      if (value) {
        const result = await remove({
          url: 'delete/service_price',
          id: price_id.value,
        })

        if (result.code === 1) {
          const index = props.row.items.findIndex((el) => el.id === price_id)
          props.row.items.splice(index, 1)
        }
      }
    }
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const formData = reactive({
      price: '',
      category: '',
      date_active_s: '',
      date_active_po: '',
    })
    const listFields = ref([
      // selectField({
      //   label: 'E',
      //   name: 'status_id',
      //   subtype: 'single',
      //   placeholder: '',
      //   class: [''],
      //   selectOption: {
      //     text: 'name',
      //     value: 'id',
      //   },
      //   items: [
      //     {
      //       id: 1,
      //       name: '1',
      //     },
      //     {
      //       id: 2,
      //       name: '2',
      //     },
      //   ],
      //   position: {
      //     cols: 12,
      //     sm: 2,
      //   },
      //   bootstrapClass: [''],
      //   alias: 'p.status_id',
      // }),
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
      selectField({
        label: 'Категория',
        name: 'category',
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
          sm: 3,
        },
        bootstrapClass: [''],
        alias: 'p.status_id',
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
      const { id, name } = props.row
      emit('openDialog', { id, name })
    }
    const removeRow = (id) => {
      confirm.value = true
      price_id.value = id
    }
    const { makeRequest: remove } = useRequest({
      context,
      // successMessage: 'Сохранено',
      request: (params) => {
        //
        const result = store.dispatch('form/del', params)
        return result
      },
    })
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
      removeRow,
      confirm,
      confirmClick,
      price_id,
    }
  },
}
