import Vue, { onMounted, ref, watch, toRef, computed, inject } from 'vue'
import useForm from '@/compositions/useForm.js'

import Autocomplete from '@/components/Autocomplete/default'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import _, { clone } from 'lodash'

import { required } from '@/utils/validation.js'
import {
  selectField,
  autocompleteField,
  //datetimeField,
  textBlock,
} from '@/utils/fields.js'
import { account } from '@/pages'

export default {
  name: 'Form-Rows-Row-Personal',
  props: {
    //field: {
    //  type: Object,
    //  default: () => {},
    //},
    lastFormData: {
      type: Object,
      default: () => {},
    },
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
    account: {
      type: Object,
      default: () => {},
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
    formatedRow: {
      type: String,
    },
  },
  components: {
    Autocomplete,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
      },
    }
    const loading = ref(true)
    const targets = inject('targets')
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
        //isShow: false,
      }),
      textBlock({
        label: 'Создал',
        name: 'object_id',
        placeholder: '',
        readonly: true,
        class: [''],
        value: props.lastFormData.object_id,
        position: {
          cols: 12,
          sm: 4,
        },
        bootstrapClass: [''],
        validations: { required },
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
        value: props.account.id,
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
        value:
          props.account.with_everyday &&
          props.lastFormData.vid_vedomost_id_logistic === 1
            ? 1
            : 8,
        validations: { required },
        bootstrapClass: [''],
        // Прятать option от условия, target - цель условия, value - значение, value - значения которые нужно прятать
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
              source: 'formData',
              value: '',
              field: 'object_id',
              type: 'array',
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
    const persId = toRef(props.account, 'id')
    const thisTarget = computed(() => {
      return targets.find(
        (el) => el.formatedDate === props.formatedRow + '_' + persId.value
      )
    })
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
      // // console.log(JSON.stringify(object.type_pay))
      // return object
      // return fieldsConfig.value
    })
    const keyCondition = [
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
    ]
    const showKey = computed(() => {
      return keyCondition.every((el) => {
        return el.value.includes(props.lastFormData[el.field])
      })
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
              field: 'avatar_with_user_key_id',
              alias: 'personal_id',
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

    const fields = () => {
      const fields = {}
      fieldsConfig.value.forEach((el) => {
        const { validations } = el
        if (!el.isShow) return
        const fieldName = el.name
        Vue.set(fields, fieldName, {})
        Vue.set(fields[fieldName], 'validations', validations)
        Vue.set(fields[fieldName], 'default', el.value)
      })
      console.log(fields)
      return fields
    }
    const personalsTarget = ref([])
    const propsActiveTab = toRef(props, 'activeTab')
    const prevTab = ref({})
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (listdata) => store.dispatch('list/get', listdata),
    })
    const cloneForm = ref(_.cloneDeep(props.tab))
    const vidVedField = computed(() => {
      const newItems =
        fieldsTemplate.value.vid_vedomost_id_logistic.items.filter((el) => {
          if (props.account.with_everyday) {
            return el.id === 1 || el.id === 8
          } else {
            return el.id === 8
          }
        })
      return {
        ...fieldsTemplate.value.vid_vedomost_id_logistic,
        items: newItems,
      }
    })
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
      form,
      fields: fieldsConfig.value,
      isEdit: {
        value: true,
      },
      setFields: fields,
      context,
      loading,
      prevTab,
      makeRequestList,
    })
    onMounted(async () => {
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
      fields: fields(),
      prevTab,
      cloneForm,
      propsActiveTab,
      loading,
      error: props.error,
      personalsTarget,
      vidVedField,
      fieldsTemplate,
      form,
      showKey,
      persId,
      targets,
      thisTarget,
    }
  },
}
