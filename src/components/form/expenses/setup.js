import Vue, { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/Autocomplete'
import FormDefault from '@/components/Form/default/index.vue'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datetimepicker from '@/components/Datetimepicker/index.vue'
import ColorPicker from '@/components/Colorpicker/index.vue'

import _ from 'lodash'

import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  textareaField,
  checkboxField,
  dateField,
  textBlock,
  radioPanel,
} from '@/utils/fields.js'

import { v4 as uuidv4 } from 'uuid'

import store from '@/store'

export default {
  name: 'Form-Default',
  components: {
    Datetimepicker,
    Autocomplete,
    FormDefault,
    DropZone,
    ColorPicker,
  },
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const proxyTab = {}
    const { emit } = ctx
    const route = useRoute()
    const router = useRouter()
    const autocompleteRef = ref(null)

    // console.log('new URL', window.location.href)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const loading = ref(true)
    const zayavkaFirstLoad = ref(true)
    const stage = ref(null)
    const { alias } = props.tab
    const isEdit = computed(() => (route.params.id ? 'edit' : 'add'))
    const fields = () => {
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          Vue.set(fields, el.name, {})
        } else return
        // if (el.name === 'vector') return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const params = props.tab.lists
    const data = params
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${route.params.id}`),
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        console.log(+route.params.id)
        return store.dispatch(params.module, {
          //url: `set/data/${alias}`,
          url: params.url,
          body: { data: { id: +route.params.id, ...formData } },
        })
      },
    })
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) =>
        store.dispatch(params.module, {
          url: params.url,
          body: { data: params.formData ? params.formData : formData },
        }),
    })

    const changeBlockCount = (val) => {
      const btnIndex = props.tab.fields.findIndex(
        (x) => x.id === 'btn-decrease'
      )
      const categoryItems = props.tab.fields.find(
        (x) => x.name === 'rashod_vid'
      ).items
      let itemIndex = +props.tab.fields[btnIndex - 1].name.split('%')[1]
      if (!itemIndex) itemIndex = 0
      if (val) {
        const insertItems = [
          selectField({
            label: 'Наименование',
            name: `rashod_vid%${itemIndex + 1}`,
            placeholder: '',
            prescription: 'items',
            class: [''],
            value: '',
            items: categoryItems,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Кол-во',
            name: `count%${itemIndex + 1}`,
            placeholder: '',
            prescription: 'items',
            class: [''],
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Стоимость',
            name: `price%${itemIndex + 1}`,
            placeholder: '',
            prescription: 'items',
            class: [''],
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'ВДС',
            name: `vds%${itemIndex + 1}`,
            value: false,
            prescription: 'items',
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
            label: 'Точное наименование',
            name: `exact_name%${itemIndex + 1}`,
            placeholder: '',
            prescription: 'items',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
        ]
        props.tab.fields.splice(btnIndex, 0, ...insertItems)
      } else {
        if (itemIndex) {
          props.tab.fields.splice(btnIndex - 5, 5)
          Object.keys(formData).map((x) => {
            if (x.includes(`%${itemIndex}`)) delete formData[x]
          })
        }
      }
      rebuildFormData()
    }

    const compareBlockCount = () => {
      let formCount
      let fieldCount
      formCount = Object.keys(formData).findLast((x) =>
        x.includes('rashod_vid%')
      )
      fieldCount = props.tab.fields.findLast((x) =>
        x.name.includes('rashod_vid%')
      )
      if (formCount) formCount = +formCount.split('%')[1]
      else formCount = 0
      if (fieldCount) fieldCount = +fieldCount.name.split('%')[1]
      else fieldCount = 0
      while (formCount !== fieldCount) {
        if (fieldCount > formCount) {
          changeBlockCount()
          fieldCount -= 1
        } else if (fieldCount < formCount) {
          changeBlockCount(true)
          fieldCount += 1
        }
      }
    }

    watch(
      () => props?.tab?.fields?.find((x) => x?.name === 'rashod_vid')?.items,
      () => {
        const categoryItems = props.tab.fields.find(
          (x) => x.name === 'rashod_vid'
        ).items
        props.tab.fields.map((x) =>
          x?.name?.includes('rashod_vid%') ? (x.items = categoryItems) : x
        )
        if (zayavkaFirstLoad.value) {
          zayavkaFirstLoad.value = false
          compareBlockCount()
        }
      },
      { deep: true }
    )

    onMounted(() => {
      proxyTab.value = _.cloneDeep(props.tab.fields)
    })

    onUnmounted(() => {
      props.tab.fields = _.cloneDeep(proxyTab.value)
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
      openMenu,
      disabledField,
      hideField,
      addFiles,
      changeCheckbox,
      rebuildFormData,
      readonlyField,
      getDependies,
    } = useForm({
      form: props.tab,
      context,
      detail: props.detail,
      loading,
      fields: fields(),
      setFields: fields,
      makeRequest,
      makeRequestList,
      isEdit,
      changeForm,
      mode: isEdit.value,
      createForm,
    })
    onMounted(async () => {
      await getData()
    })
    return {
      //endIntersect,
      formData,
      validate,
      //$errors,
      vForm,
      touchedForm,
      formErrors,
      getData,
      loading,
      showField,
      autocompleteRef,
      changeAutocomplete,
      changeSelect,
      openMenu,
      stage,
      clickHandler,
      isEdit,
      disabledField,
      hideField,
      addFiles,
      changeCheckbox,
      readonlyField,
      changeBlockCount,
      getDependies,
    }
  },
}
