import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/autocomplete'
import { getList } from '@/api/selects'
import FormDefault from '@/components/form/default/index.vue'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import useActions from '@/compositions/useActions'
import DropZone from '@/components/dropzone/default/index.vue'
import Datetimepicker from '@/components/datetimepicker/index.vue'
import store from '@/store'

export default {
  name: 'Form-Default',
  components: {
    Datetimepicker,
    Autocomplete,
    FormDefault,
    DropZone,
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
  },
  setup(props, ctx) {
    //const syncForm = ref({})
    const { emit } = ctx
    const route = useRoute()
    const router = useRouter()
    const autocompleteRef = ref(null)
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const loading = ref(true)
    const stage = ref(null)
    const { alias } = props.tab
    console.log(route)
    const fields = () => {
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        if (el.isShow) Vue.set(fields, el.name, {})
        else return
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
    const searchFields = computed(() => {
      return props.tab.fields
        .filter((field) => field.search !== undefined)
        .map((field) => {
          return {
            id: formData[field.name],
            search: field.search,
            name: field.name,
          }
        })
    })
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${route.params.id}`),
    })
    const getDetail = () => props.tab.detail
    const hasSelect = () =>
      props.tab.fields.some((field) => field.type === 'select' && field.isShow)
    const initPreRequest = () => {
      let queries = []
      if (hasSelect() && getDetail()) {
        const syncForm = makeRequest()
        const lists = makeRequestList()
        queries = [syncForm, lists]
        return queries
      } else if (getDetail() && !hasSelect()) {
        const syncForm = makeRequest()
        queries = [syncForm, undefined]
        return queries
      } else if (!getDetail() && hasSelect()) {
        const lists = makeRequestList()
        queries = [undefined, lists]
        return queries
      } else return undefined
    }
    const loadAutocompletes = async () => {
      const fields = props.tab.fields
        .filter((el) => el.type === 'autocomplete' && el.isShow)
        .map((el) => el)
      const queryFields = fields.map(async (el) => {
        const filters = []
        const { url } = el
        console.log(el)
        if (el.filters && el.filters.length) {
          el.filters.forEach((filter) => {
            filters.push({
              field: filter.field,
              value: formData[filter.field],
            })
          })
        }
        const data = await getList(url, {
          countRows: 10,
          currentPage: 1,
          searchValue: '',
          id: formData[el.name],
          filters,
        })
        if (data.rows) {
          el.items = [...el.items, ...data.rows]
          el.items = data.rows
        }
        return data
      })
      await Promise.all(queryFields)
    }
    const isEdit = computed(() => (route.params.id ? 'edit' : 'add'))
    const hasDepenceFieldsApi = () =>
      props.tab.fields.some(
        (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
      )
    const stringIsArray = (str) => {
      try {
        return new Function(`return Array.isArray(${str})`)()
      } catch {
        return false
      }
    }
    const getData = async () => {
      const [syncForm, lists] = await Promise.all(initPreRequest())
      console.log(syncForm)
      if (syncForm) {
        for (let formKey in syncForm.data) {
          const field = props.tab.fields.find(
            (fieldEl) => fieldEl.name === formKey
          )
          if (field) {
            if (stringIsArray(syncForm.data[formKey]))
              syncForm.data[formKey] = JSON.parse(syncForm.data[formKey])
            formData[field.name] = syncForm.data[formKey]
            // Подгрузка полей с дополнительными зависимостями ( Например загрузка банк-их карт по id сотрудника)
            if (
              field.hasOwnProperty('dependence') &&
              field.dependence.type === 'api'
            ) {
              await getDependies({ value: formData[field.name], field })
            }
          }
        }
      }
      if (hasSelect()) {
        for (let keyList in lists.data) {
          console.log(keyList)
          const field = props.tab.fields.find((el) =>
            el.alias ? el.alias === keyList : el.name === keyList
          )
          if (field) field.items = lists.data[keyList]
        }
      }
      await loadAutocompletes()
      loading.value = false
    }
    const params = props.tab.lists
    const queryString = '?lists=' + [...params]
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', `get/lists${queryString}`),
    })
    const { clickHandler } = useActions({
      context,
      tab: props.tab,
      loading,
      formData,
      validate,
    })
    const showField = (type, field) => {
      return (
        type === field.type &&
        !loading.value &&
        field.isShow &&
        (field.mode === 'all' || field.mode === isEdit.value)
      )
    }
    //makeRequestList()
    const changeAutocomplete = async (params) => {
      //const { value, field } = data
      console.log(hasDepenceFieldsApi())
      if (hasDepenceFieldsApi()) {
        await getDependies(params)
      }
      if (params.field.dependence && params.field.dependence.type) {
        console.log(params)
        params.field.dependence.fillField.forEach(
          (el) => (formData[el] = params.item[el])
        )
      }
    }
    const getDependies = async (params) => {
      const { value, field } = params
      const depField = field.dependence.field
      field.loading = true
      const data = await store.dispatch(field.dependence.module, {
        value,
        field,
      })

      const targetField = props.tab.fields.find((el) => el.name === depField)
      targetField.items = targetField.defaultItems
        ? [...targetField.defaultItems, ...data]
        : data
      let card = targetField.items.find((el) => el.id === formData[depField])

      //if (data.length === 1) formData[depField] = card.id
      if (card)
        field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
      else if (data.length === 1) {
        formData[depField] = data[0].id
        card = targetField.items.find((el) => el.id === formData[depField])
        field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
      } else if (data.length === 0) {
        formData[depField] = 11
        field.dependence.fillField.forEach((el) => (formData[el] = ''))
      } else {
        field.dependence.fillField.forEach((el) => (formData[el] = ''))
      }
      field.loading = false
      //formData[field.dependence.field] = data
    }
    //const setDepField = () => {

    //}
    const changeSelect = ({ value, field }) => {
      if (field.dependence) {
        const data = field.items.find((el) => el.id === value)
        field.dependence.fields.forEach((el) => (formData[el] = data[el]))
      }
    }
    console.log(props.tab.actions)

    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: () =>
        store.dispatch('form/update', {
          url: `set/data/${alias}`,
          body: { data: { id: +route.params.id, ...formData } },
        }),
    })
    const nextForm = () => {
      console.log()
    }
    const submit = async () => {
      //if (!validate()) return
      loading.value = true
      if (props.tab.isFilter) {
        emit('sendFilter', formData)
      } else if (props.tab.actions[0].nextForm) {
        emit('nextStage')
      } else if (props) {
        await changeForm()
        const isNextForm = true
        if (isNextForm) {
          nextForm()
        }
      }
      loading.value = false
    }
    //const clickHandler = async (action) => {
    //  loading.value = true
    //  if (action.action === 'saveFilter') {
    //    emit('sendFilter', formData)
    //  } else if (action.action === 'nextStage') {
    //    emit('nextStage')
    //  } else if (action.action === 'prevStage') {
    //    emit('prevStage')
    //  } else if (action.action === 'saveForm') {
    //    await changeForm()
    //    const isNextForm = true
    //    if (isNextForm) {
    //      nextForm()
    //    }
    //  }
    //  loading.value = false
    //}
    const cancel = async () => {
      const action = props.tab.actions.find((el) => el.type === 'cancel')
      if (action.prevForm) {
        emit('prevStage')
      }
    }
    const openMenu = (field) => {
      field.menu = true
    }
    onMounted(async () => {
      await getData()
    })
    return {
      searchFields,
      //endIntersect,
      formData,
      validate,
      //$errors,
      vForm,
      touchedForm,
      submit,
      formErrors,
      getData,
      loading,
      showField,
      autocompleteRef,
      changeAutocomplete,
      changeSelect,
      getDetail,
      openMenu,
      stage,
      cancel,
      clickHandler,
      isEdit,
    }
  },
}
