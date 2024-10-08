import Vue, { onMounted, ref, watch, toRef, computed } from 'vue'
import useForm from '@/compositions/useForm.js'

import Autocomplete from '@/components/Autocomplete/form'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import _, { clone } from 'lodash'
import Personal from '../personal/index.vue'
import { required } from '@/utils/validation.js'
import {
  selectField,
  autocompleteField,
  //datetimeField,
  textBlock,
} from '@/utils/fields.js'

export default {
  name: 'Form-Rows-Row',
  props: {
    //field: {
    //  type: Object,
    //  default: () => {},
    //},
    formData: {
      type: Object,
      default: () => {},
    },
    formErrors: {
      type: Object,
      default: () => {},
    },
    tab: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    row: {
      type: [String, Object],
    },
    error: {
      type: String,
      default: '',
    },
    //loading: {
    //  type: Boolean,
    //  default: false,
    //},
    activeTab: {
      type: Number,
      default: null,
    },
    target: {
      type: [String, Object],
    },
  },
  components: {
    Autocomplete,
    Personal,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
      },
    }
    const loading = ref(true)
    const personalRef = ref([])
    const fieldsConfig = ref([
      textBlock({
        label: 'Создал',
        name: 'account_name',
        placeholder: '',
        readonly: true,
        class: [''],
        position: {
          cols: 12,
          sm: 4,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
      }),
      autocompleteField({
        label: 'Учетная запись',
        name: 'avatar_with_user_key_id',
        alias: 'personal_id',
        subtype: 'single',
        placeholder: '',
        class: ['flexFlow'],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        page: 1,
        search: '',
        url: 'get/pagination_list/avatar_with_user_key_id',
        position: {
          cols: 12,
          sm: 4,
        },
        //: true,
        validations: { required },
        bootstrapClass: [''],
        filter: [
          {
            field: 'object_id',
            value: '',
            source: 'fromPrev',
          },
        ],
        updateList: [
          {
            alias: 'print_form_key',
            filter: [
              {
                field: 'object_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'avatar_with_user_key_id',
                alias: 'personal_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
        ],
      }),
      selectField({
        label: 'Вид ведомости',
        name: 'vid_vedomost_id_logistic',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 3,
        },
        validations: { required },
        bootstrapClass: [''],
        // Прятать option от условия, target - цель условия, value - значение, value - значения которые нужно прятать
        hiding: {
          conditions: [
            {
              target: 'mode',
              value: 'add',
              values: [2, 3, 4, 5, 6, 7],
            },
          ],
        },
      }),
      selectField({
        label: 'Ключ',
        name: 'print_form_key',
        //withoutList: true,
        //alias: 'direction_id_logistic',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 4,
        },
        validations: { required },
        bootstrapClass: [''],
        customList: {
          type: 'api',
          module: 'personal/getKeys',
          //url: 'object_id/avatar_with_user_key_id',
          field: 'print_form_key',
          url: [
            {
              source: 'props',
              field: 'object_id',
            },
            {
              source: 'formData',
              field: 'this',
            },
          ],
        },
        isShow: {
          value: false,
          conditions: [
            {
              field: 'type',
              value: [11, 12],
              source: 'form.formData[el.field]',
            },
            {
              field: 'direction_id',
              value: [1],
              source: 'form.formData[el.field]',
            },
            {
              field: 'doljnost_id',
              value: [5, 7, 8, 23, 33],
              source: 'form.formData[el.field]',
            },
          ],
        },
      }),
    ])
    const fieldsTemplate = computed(() => {
      return fieldsConfig.value.reduce((acc, el) => {
        acc[el.name] = el
        // Vue.set(acc, [el.name], el)
        return acc
      }, {})
      // const object = {}
      // fieldsConfig.value.forEach((el, index) => {
      //   object[el.name] = el
      //   object[el.name].items = el.items
      // })
      // return object
      // // return fieldsConfig.value
    })
    const form = {
      id: 1,
      name: 'Основные',
      //detail: true,
      lists: [
        {
          alias: 'print_form_key',
          filter: [
            {
              field: 'object_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'personal_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
        { alias: 'vid_vedomost_id_logistic', filter: [] },
      ],
      fields: fieldsConfig.value,
      formData: {},
    }

    // const fields = () => {
    //   const fields = {}
    //   props.tab.fields.forEach((el) => {
    //     const { validations } = el
    //     if (!el.isShow) return
    //     const fieldName = el.name
    //     Vue.set(fields, fieldName, {})
    //     Vue.set(fields[fieldName], 'validations', validations)
    //     Vue.set(fields[fieldName], 'default', el.value)
    //   })
    //   return fields
    // }
    const personalsTarget = ref([])
    const propsActiveTab = toRef(props, 'activeTab')
    const prevTab = ref({})
    const getDataFromPrevTav = () => {
      prevTab.value = props.tabs[0]
      if (props.tab.fromLastTab) {
        //const field = prevTab.value.find((el) => el.name === )
        const fields = props.tab.fromLastTab.map((el) => {
          const findEl = prevTab.value.fields.find((tabField) => {
            //
            return tabField[el.alias] === el.name
          })
          if (el.type === 'list') {
            if (Array.isArray(props.tab.formData[el.name])) {
              personalsTarget.value = props.tab.formData[el.name].map(
                (mapEl) => {
                  return findEl.items.find((elItem) => elItem.id === mapEl)
                }
              )
              // formData[el.nameInTab] = personalsTarget.value
            } else {
              formData[el.nameInTab] = findEl.items.find(
                (elItem) => elItem.id === props.tab.formData[el.name]
              ).name
            }
          }
        })
      }
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (listdata) => store.dispatch('list/get', listdata),
    })
    const cloneForm = ref(_.cloneDeep(props.tab))
    const formatedRow = computed(() => {
      const splited = props.row.split('-')
      return `${splited[2]}.${splited[1]}.${splited[0]}`
    })
    const vidVedField = (personal) => {
      const newItems = cloneForm.value.fields[2].items.filter((el) => {
        if (personal.with_everyday) {
          return el.id === 1 || el.id === 8
        } else {
          return el.id === 8
        }
      })
      return {
        ...cloneForm.value.fields[2],
        items: newItems,
      }
    }
    const {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      clickHandler,
      getData,
      changeAutocomplete,
      changeSelect,
      showField,
    } = useForm({
      form: cloneForm.value,
      // fields: fields(),
      isEdit: {
        value: true,
      },
      // setFields: fields,
      context,
      loading,
      prevTab,
      makeRequestList,
    })
    onMounted(async () => {
      getDataFromPrevTav()
      loading.value = true
      await getData()
      loading.value = false
    })
    return {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      showField,
      changeAutocomplete,
      clickHandler,
      getData,
      changeSelect,
      // fields: fields(),
      prevTab,
      cloneForm,
      propsActiveTab,
      loading,
      formatedRow,
      error: props.error,
      personalsTarget,
      vidVedField,
      fieldsTemplate,
      form,
      personalRef,
    }
  },
}
