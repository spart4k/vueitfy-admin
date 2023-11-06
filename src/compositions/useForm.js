import Vue, { ref, computed, watch, unref, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import store from '@/store'
import { getList } from '@/api/selects'
import { required } from '@/utils/validation.js'
import { data } from 'jquery'
import { filter, result } from 'lodash'

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
  setFields,
  mode,
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
  const validations = () => {
    const formFields = {}
    form.fields.forEach((el) => {
      formFields[el.name] = el
    })
    return Object.keys(formData).reduce((obj, key) => {
      if (
        (typeof formFields[key].isShow === 'boolean' &&
          !formFields[key].isShow) ||
        (typeof formFields[key].isShow === 'object' &&
          !formFields[key].isShow.value)
      ) {
        return obj
      }
      obj[key] = { ...fields[key].validations, $autoDirty }
      return obj
    }, {})
    //console.log({
    //  fields: {
    //    $each: valFields,
    //  },
    //})
    //return {
    //  required,
    //  fields: {
    //    $each: valFields,
    //  },
    //}
  }

  let $v = null
  const computedFormData = computed(() => formData)
  $v = useVuelidate(validations(), computedFormData.value)

  const rebuildFormData = () => {
    Object.assign(
      formData,
      reactive(
        Object.keys(setFields()).reduce((obj, key) => {
          //console.log(obj[key])
          obj[key] = ref(formData[key])
          return obj
        }, {})
      )
    )
  }
  //setTimeout(() => {
  //  rebuildFormData()
  //  console.log('rebuild')
  //}, 10000)
  const $errors = computed(() => {
    return Object.keys(formData).reduce((obj, key) => {
      if ($touched.value && $v.value[key]) {
        obj[key] = $v.value[key].$errors.map(({ $message }) => $message)
      } else {
        obj[key] = []
      }
      return obj
    }, {})
  })

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
    //$v.value.$touch()
    if (!validate()) return
    if (action.action === 'saveFilter') {
      emit('sendFilter', formData)
    } else if (action.action === 'nextStage') {
      Vue.set(form, 'formData', formData)
      emit('nextStage', { formData, action })
    } else if (action.action === 'prevStage') {
      emit('prevStage')
    } else if (action.action === 'saveForm') {
      loading.value = true
      await changeForm({ url: action.url, module: action.module })
      loading.value = false
      const isNextForm = true
      if (isNextForm) {
        nextForm()
      }
    }
  }
  const getDetail = () => form.detail

  const hasSelect = () =>
    form.fields.some(
      (field) => field.type === 'select' && field.isShow && !field.withoutList
    )

  const initPreRequest = () => {
    console.log('init pre request')
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
    console.log('test')
    if (params.field.dependence && params.field.dependence.type === 'api') {
      await getDependies(params)
    }
    if (
      params.field.dependence &&
      params.field.dependence.type &&
      params.field.dependence.fillField
    ) {
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
    console.log(field, 'DEPENDIES')
    let fieldValue
    if (field.dependence.type !== 'api') return
    const depField = field.dependence.field
    let url = ''
    if (field.dependence.url) {
      //const splitedUrl = field.dependence.url.split('/')
      field.dependence.url.forEach((el) => {
        if (el.field === 'this' && el.source === 'formData') {
          fieldValue = value
        } else if (el.source === 'formData') {
          fieldValue = formData[el.field]
        } else if (el.source === 'props') {
          fieldValue = form.formData[fieldValue]
        }
        console.log(fieldValue)
        url = url + '/' + fieldValue
        //if (el.source === 'props') {
        //  url = url + '/' + form.formData[fieldValue]
        //} else if (el.source === 'formData') {
        //  console.log(JSON.stringify(formData))
        //  url = url + '/' + formData[fieldValue]
        //}
      })
    }
    field.loading = true
    console.log(field.dependence.module)
    const data = await store.dispatch(field.dependence.module, {
      value,
      field,
      url,
    })

    let targetField, card
    if (targetField) {
      targetField = form.fields.find((el) => el.name === depField)
      targetField.items = targetField.defaultItems
        ? [...targetField.defaultItems, ...data]
        : data
      targetField.hideItems = targetField.defaultItems
        ? [...targetField.defaultItems, ...data]
        : data
      card = targetField.items.find((el) => el.id === formData[depField])
    }

    //if (data.length === 1) formData[depField] = card.id
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
    if (field.dependence.action) {
      if (field.dependence.action.type === 'hideOptions') {
        if (data.result) {
          console.log(data.result)
        }
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
        id: formData[el.name ? el.name : el.alias],
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
      console.log(lists)
      for (let keyList in lists.data) {
        const field = form.fields.find((el) =>
          el.alias ? el.alias === keyList : el.name === keyList
        )
        if (field) {
          if (field.hiding) {
            if (field.hiding.conditions) {
              const condition = field.hiding.conditions.find(
                (el) => mode === el.value
              )
              console.log(condition)
              lists.data[keyList] = lists.data[keyList].filter((el) => {
                return !condition.values.includes(el.id)
              })
            }
          }
          field.items = lists.data[keyList]
        }
      }
    }
    await loadAutocompletes()
    loading.value = false
  }

  const showField = (type, field) => {
    const condition = () =>
      (typeof field.isShow === 'boolean' && field.isShow) ||
      field.isShow.conditions?.every((el) =>
        el.value.includes(formData[el.field])
      )
    if (field.isShow.conditions) {
      field.isShow.value = condition()
      //$v = useVuelidate(validations.value, formData)
      rebuildFormData()
    }
    return (
      type === field.type &&
      !loading.value &&
      (field.mode === 'all' || field.mode === isEdit.value) &&
      condition()
    )
  }

  const openMenu = (field) => {
    field.menu = true
  }

  const disabledField = (field) => {
    return field.requiredFields
      ? field.requiredFields.some((el) => !formData[el])
      : false
  }

  const hideField = (field) => {
    return field.isShow
      ? field.isShow.every((el) => formData[el.field] === el.value)
      : true
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
    disabledField,
    hideField,
  }
}
