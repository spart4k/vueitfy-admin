import Vue, { ref, computed, watch, unref, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import store from '@/store'
import { getList } from '@/api/selects'

/**
 * @param loading {boolean}
 * @param fields {object}
 * @param watcher {function} - Используется для ленивой подгрузки данных из стора. Должно быть реактивным. Например computed
 * @returns {{$v: *, $invalid: *, reset: *, $errors: *, formData: *, getDataForm: *, validate: *, update: *}}
 */
export default function ({
  fields = {},
  watcher,
  context,
  loading,
  changeForm,
  nextForm,
  form,
  makeRequest,
  makeRequestList,
  isEdit,
  prevTab,
}) {
  const $touched = ref(false)
  const $invalid = ref(false)
  const $autoDirty = true
  const { emit } = context.root.ctx
  const formData = reactive(
    Object.keys(fields).reduce((obj, key) => {
      //console.log(obj[key])
      obj[key] = ref(fields[key].default)
      return obj
    }, {})
  )
  const validations = Object.keys(fields).reduce((obj, key) => {
    obj[key] = { ...fields[key].validations, $autoDirty }
    return obj
  }, {})
  const $v = useVuelidate({ ...validations }, formData)

  const $errors = computed(() =>
    Object.keys(formData).reduce((obj, key) => {
      if ($touched.value) {
        obj[key] = $v.value[key].$errors.map(({ $message }) => $message)
      } else {
        obj[key] = []
      }
      return obj
    }, {})
  )

  const validate = () => {
    unref($v).$touch()
    $touched.value = true
    return !unref($v).$invalid
  }

  const getDataForm = () =>
    Object.keys(formData).reduce((obj, key) => {
      obj[key] = unref(formData[key])

      return obj
    }, {})

  const reset = () => {
    Object.keys(formData).forEach((key) => {
      formData[key] = fields[key].default
    })

    $touched.value = false
  }

  const update = (data) => {
    Object.keys(data).forEach((key) => {
      if (formData[key]) {
        formData[key].value = data[key]
      }
    })
  }
  const clickHandler = async (action) => {
    //if (!validate()) return
    if (action.action === 'saveFilter') {
      emit('sendFilter', formData)
    } else if (action.action === 'nextStage') {
      console.log('NEXT FORM')
      console.log(form, formData)
      Vue.set(form, 'formData', formData)
      emit('nextStage', formData)
    } else if (action.action === 'prevStage') {
      console.log(action)
      emit('prevStage')
    } else if (action.action === 'saveForm') {
      loading.value = true
      await changeForm()
      loading.value = false
      const isNextForm = true
      if (isNextForm) {
        nextForm()
      }
    }
  }
  const getDetail = () => form.detail

  const hasSelect = () =>
    form.fields.some((field) => field.type === 'select' && field.isShow)

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

  const changeAutocomplete = async (params) => {
    //const { value, field } = data
    console.log(params)
    if (hasDepenceFieldsApi()) {
      await getDependies(params)
    }
    if (
      params.field.dependence &&
      params.field.dependence.type &&
      params.field.dependence.fillField
    ) {
      console.log(params)
      params.field.dependence.fillField.forEach(
        (el) => (formData[el] = params.item[el])
      )
    }
  }

  const hasDepenceFieldsApi = () =>
    form.fields.some(
      (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
    )

  const getDependies = async (params) => {
    const { value, field } = params
    console.log(value)
    const depField = field.dependence.field
    let url = ''
    if (field.dependence.url) {
      //const splitedUrl = field.dependence.url.split('/')
      field.dependence.url.forEach((el) => {
        console.log(el.source)
        if (el.source === 'props') {
          url = url + '/' + form.formData[el.field]
        } else if (el.source === 'formData') {
          url = url + '/' + formData[el.field]
        }
      })
    }
    console.log(url)
    field.loading = true
    const data = await store.dispatch(field.dependence.module, {
      value,
      field,
      url,
    })

    const targetField = form.fields.find((el) => el.name === depField)
    console.log(targetField)
    targetField.items = targetField.defaultItems
      ? [...targetField.defaultItems, ...data]
      : data
    let card = targetField.items.find((el) => el.id === formData[depField])

    //if (data.length === 1) formData[depField] = card.id
    console.log(formData[depField])
    console.log(targetField)
    console.log(card)
    if (card)
      if (field.dependence.fillField) {
        field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
      } else if (data.length === 1) {
        formData[depField] = data[0].id
        card = targetField.items.find((el) => el.id === formData[depField])
        if (field.dependence.fillField) {
          field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
        }
      } else if (data.length === 0) {
        formData[depField] = 11
        if (field.dependence.fillField) {
          field.dependence.fillField.forEach((el) => (formData[el] = ''))
        }
      } else {
        if (field.dependence.fillField) {
          field.dependence.fillField.forEach((el) => (formData[el] = ''))
        }
      }
    field.loading = false
    //formData[field.dependence.field] = data
  }

  const changeSelect = ({ value, field }) => {
    if (field.dependence) {
      const data = field.items.find((el) => el.id === value)
      field.dependence.fields.forEach((el) => (formData[el] = data[el]))
    }
  }

  const stringIsArray = (str) => {
    try {
      return new Function(`return Array.isArray(${str})`)()
    } catch {
      return false
    }
  }

  const loadAutocompletes = async () => {
    const fields = form.fields
      .filter((el) => el.type === 'autocomplete' && el.isShow)
      .map((el) => el)
    const queryFields = fields.map(async (el) => {
      const filters = []
      const { url } = el
      console.log(el)
      console.log(formData)
      if (el.filters && el.filters.length) {
        el.filters.forEach((filter) => {
          let value
          if (filter.type === 'fromPrev') {
            value = form.formData[filter.field]
          } else {
            value = formData[filter.field]
          }
          filters.push({
            field: filter.field,
            value,
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

  const getData = async () => {
    const [syncForm, lists] = await Promise.all(initPreRequest())
    console.log(syncForm)
    if (syncForm) {
      for (let formKey in syncForm.data) {
        const field = form.fields.find((fieldEl) => fieldEl.name === formKey)
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
        const field = form.fields.find((el) =>
          el.alias ? el.alias === keyList : el.name === keyList
        )
        if (field) field.items = lists.data[keyList]
      }
    }
    await loadAutocompletes()
    loading.value = false
  }

  const showField = (type, field) => {
    return (
      type === field.type &&
      !loading.value &&
      field.isShow &&
      (field.mode === 'all' || field.mode === isEdit.value)
    )
  }

  const openMenu = (field) => {
    field.menu = true
  }

  watch(
    () => watcher,
    (wtch) => {
      if (!wtch) {
        return
      }

      const values = wtch.value || wtch

      if (!values) {
        return
      }

      Object.keys(formData).forEach((key) => {
        if (values[key] !== undefined) {
          formData[key] = values[key]
        }
      })
    },
    { immediate: true, deep: true }
  )

  return {
    vForm: $v,
    formErrors: $errors,
    invalidForm: $invalid,
    touchedForm: $touched,
    validate,
    formData,
    getDataForm,
    reset,
    update,
    clickHandler,
    getDependies,
    changeSelect,
    changeAutocomplete,
    getData,
    showField,
    openMenu,
  }
}
