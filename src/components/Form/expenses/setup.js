import Vue, { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/Autocomplete/form'
import FormDefault from '@/components/Form/default/index.vue'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datetimepicker from '@/components/Date/Datetimepicker/index.vue'
import ColorPicker from '@/components/Colorpicker/index.vue'
import Datepicker from '@/components/Date/Default/index.vue'

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
  name: 'Form-Expenses',
  components: {
    Datetimepicker,
    Autocomplete,
    FormDefault,
    DropZone,
    ColorPicker,
    Datepicker,
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
    const proxyTab = ref(_.cloneDeep(props.tab))
    const { emit } = ctx
    const route = useRoute()
    const router = useRouter()
    const autocompleteRef = ref(null)

    //
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
    const { alias } = proxyTab.value
    const dropzone = ref()
    const isEdit = computed(() => (route.params.id ? 'edit' : 'add'))
    const fields = () => {
      const fields = {}
      proxyTab.value.fields.forEach((el) => {
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
    const params = proxyTab.value.lists
    const data = params
    const getRequestParam = () => {
      if (props.detail?.requestId) {
        return _.get(route.params, props.detail.requestId)
      } else if (route.params.id) {
        return route.params.id
      }
    }
    const { makeRequest } = useRequest({
      context,
      request: () => {
        return store.dispatch(
          'form/get',
          `get/form/${alias}/${getRequestParam()}`
        )
      },
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        return store.dispatch(params.module, {
          //url: `set/data/${alias}`,
          url: params.url,
          body: { data: { id: +route.params.id, ...formData } },
        })
      },
    })
    const { makeRequest: changeFormId } = useRequest({
      context,
      successMessage: params?.successMessage === false ? false : 'Сохранено',
      request: (params) => {
        let id
        if (proxyTab.value.routeParam) {
          id = route.params[proxyTab.value.routeParam]
        } else {
          id = route.params.id
        }
        return store.dispatch(params.module, {
          url: params.url + '/' + id,
          body: { data: { ...params.formData } },
        })
      },
    })
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: async (params) => {
        const zayavka = await store.dispatch(params.module, {
          url: params.url,
          body: { data: params.formData ? params.formData : formData },
        })
        if (route.meta.mode.length === 2) {
          await store.dispatch('form/bindZayavka', {
            body: { id: +route.params.id, dop: { rashod_id: zayavka.id } },
          })
          emit('refreshData')
        }
        return zayavka
      },
    })

    const changeBlockCount = (val) => {
      const btnIndex = proxyTab.value.fields.findIndex(
        (x) => x.id === 'btn-decrease'
      )
      const categoryItems = proxyTab.value.fields.find(
        (x) => x.name === 'rashod_vid'
      ).items
      let itemIndex = +proxyTab.value.fields[btnIndex - 1].name.split('%')[1]
      if (!itemIndex) itemIndex = 0
      if (val) {
        const insertItems = [
          selectField({
            label: 'Наименование',
            name: `rashod_vid%${itemIndex + 1}`,
            notSend: true,
            placeholder: '',
            prescription: 'items',
            class: [''],
            value: '',
            readonly:
              isEdit.value === 'edit'
                ? {
                    value: false,
                    condition: [
                      {
                        target: 'originalData',
                        field: 'status',
                        value: [1],
                        type: false,
                      },
                    ],
                  }
                : undefined,
            items: categoryItems,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 5,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Кол-во',
            name: `count%${itemIndex + 1}`,
            notSend: true,
            placeholder: '',
            readonly:
              isEdit.value === 'edit'
                ? {
                    value: false,
                    condition: [
                      {
                        target: 'originalData',
                        field: 'status',
                        value: [1],
                        type: false,
                      },
                    ],
                  }
                : undefined,
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
            notSend: true,
            placeholder: '',
            readonly:
              isEdit.value === 'edit'
                ? {
                    value: false,
                    condition: [
                      {
                        target: 'originalData',
                        field: 'status',
                        value: [1],
                        type: false,
                      },
                    ],
                  }
                : undefined,
            prescription: 'items',
            class: [''],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'ВДС',
            name: `vds%${itemIndex + 1}`,
            notSend: true,
            value: false,
            prescription: 'items',
            placeholder: '',
            readonly:
              isEdit.value === 'edit'
                ? {
                    value: false,
                    condition: [
                      {
                        target: 'originalData',
                        field: 'status',
                        value: [1],
                        type: false,
                      },
                    ],
                  }
                : undefined,
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
            notSend: true,
            placeholder: '',
            readonly:
              isEdit.value === 'edit'
                ? {
                    value: false,
                    condition: [
                      {
                        target: 'originalData',
                        field: 'status',
                        value: [1],
                        type: false,
                      },
                    ],
                  }
                : undefined,
            prescription: 'items',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
        ]
        proxyTab.value.fields.splice(btnIndex, 0, ...insertItems)
      } else {
        if (itemIndex) {
          proxyTab.value.fields.splice(btnIndex - 5, 5)
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
      fieldCount = proxyTab.value.fields.findLast((x) =>
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

    const downloadFile = ({ item }) => {
      const link = document.createElement('a')
      link.download = item.name
      link.href = process.env.VUE_APP_STORE + item.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const editFile = ({ index, formItem }) => {
      deleteFile({ index, formItem })
      dropzone.value[0].$children[0].$el.click()
    }

    const deleteFile = ({ index, formItem }) => {
      formItem.splice(index, 1)
    }

    const checkVector = () => {
      const item = Object.keys(formData).find((x) => x === 'type_zayavka')
      if (formData[item] === 4) formData[item] = 1
    }

    const imageFormat = (val) => {
      const allowedFormats = ['jpg', 'png', 'jpeg']
      const splitedName = val.name.split('.')
      const format = splitedName[splitedName.length - 1]
      if (allowedFormats.includes(format)) return true
      return false
    }

    const shareItems = () => {
      const categoryItems = proxyTab.value.fields.find(
        (x) => x.name === 'rashod_vid'
      ).items
      proxyTab.value.fields.map((x) =>
        x?.name?.includes('rashod_vid%') ? (x.items = categoryItems) : x
      )
    }

    watch(
      () => proxyTab.value.fields?.find((x) => x?.name === 'rashod_vid')?.items,
      () => {
        shareItems()
        if (zayavkaFirstLoad.value) {
          zayavkaFirstLoad.value = false
          compareBlockCount()
        }
      },
      { deep: true }
    )

    onMounted(() => {
      shareItems()
      if (proxyTab.value.path === 'add') {
        if (
          store.state.user.permission_id === 16 ||
          store.state.user.permission_id === 19
        ) {
          const item = Object.keys(formData).find((x) => x === 'is_migr')
          formData[item] = true
        }
      }
    })

    onUnmounted(() => {
      // proxyTab.value.fields = _.cloneDeep(proxyTab.value)
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
      isHideBtn,
      getDependies,
    } = useForm({
      form: proxyTab.value,
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
      changeFormId,
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
      downloadFile,
      editFile,
      deleteFile,
      dropzone,
      checkVector,
      imageFormat,
      isHideBtn,
      proxyTab,
    }
  },
}
