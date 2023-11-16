import Vue, { ref, computed, watch, unref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import store from '@/store'
import { getList } from '@/api/selects'
// import { required } from '@/utils/validation.js'
// import { data } from 'jquery'
// import { filter } from 'lodash'
import useRequest from '@/compositions/useRequest'

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
  createForm,
  detail,
}) {
  const $touched = ref(false)
  const $invalid = ref(false)
  const $autoDirty = true
  const filesBasket = ref({})
  const { emit } = context.root.ctx

  // const validations = () => {
  //   const formFields = {}
  //   form.fields.forEach((el) => {
  //     formFields[el.name] = el
  //   })
  //   return Object.keys(formData).reduce((obj, key) => {
  //     if (
  //       (typeof formFields[key].isShow === 'boolean' &&
  //         !formFields[key].isShow) ||
  //       (typeof formFields[key].isShow === 'object' &&
  //         !formFields[key].isShow.value)
  //     ) {
  //       return obj
  //     }
  //     obj[key] = { ...formFields[key].validations, $autoDirty }
  //     return obj
  //   }, {})
  // }

  const formData = reactive(
    Object.keys(fields).reduce((obj, key) => {
      //console.log(obj[key])
      obj[key] = ref(fields[key].default)
      return obj
    }, {})
  )

  const computedFormData = computed(() => formData)

  const validations = () => {
    const formFields = {}
    form?.fields?.forEach((el) => {
      formFields[el.name] = el
    })
    if (!fields) return
    return Object.keys(fields).reduce((obj, key) => {
      if (
        (typeof formFields[key]?.isShow === 'boolean' &&
          !formFields[key]?.isShow) ||
        (typeof formFields[key]?.isShow === 'object' &&
          !formFields[key]?.isShow.value)
      ) {
        return obj
      }
      obj[key] = { ...fields[key].validations, $autoDirty }
      return obj
    }, {})
  }

  let $v = useVuelidate(validations(), computedFormData.value)

  const rebuildFormData = () => {
    Object.assign(
      formData,
      reactive(
        Object.keys(setFields()).reduce((obj, key) => {
          obj[key] = ref(formData[key])
          return obj
        }, {})
      )
    )
  }

  const $errors = ref({})
  const errorsCount = () => {
    $errors.value = Object.keys(formData).reduce((obj, key) => {
      if ($touched.value && $v.value[key]) {
        obj[key] = $v.value[key].$errors.map(({ $message }) => $message)
      } else {
        obj[key] = []
      }
      return obj
    }, {})
  }

  const validate = (touch) => {
    if (touch) $v = useVuelidate(validations(), computedFormData.value)
    unref($v).$touch()
    if (touch) {
      $touched.value = true
      errorsCount()
    }
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
    if (!validate(true)) return
    if (action.action === 'saveFilter') {
      emit('sendFilter', formData)
    } else if (action.action === 'nextStage') {
      if (action.url) {
        await stageRequest(action)
      }
      Vue.set(form, 'formData', formData)
      emit('nextStage', { formData, action })
    } else if (action.action === 'prevStage') {
      if (action.url) {
        await stageRequest(action)
      }
      emit('prevStage')
    } else if (action.action === 'saveForm') {
      loading.value = true
      if (action.conditionAction) {
        console.log('action')
        action.conditionAction.forEach((el) => {
          action[el.target] = el.result[formData[el.from]]
        })
        //await createForm({ url: action.url, module: action.module })
        loadStoreFile({ url: action.url, module: action.module })
      } else {
        await changeForm({ url: action.url, module: action.module })
      }
      loading.value = false
      //const isNextForm = true
      //if (isNextForm) {
      //  nextForm()
      //}
    } else if (action.action === 'saveFormStore') {
      loadStoreFile()
    }
  }

  const stageRequest = async (action) => {
    const sortedData = sortData()
    loading.value = true
    const data = await createForm({
      url: action.url,
      module: action.module,
      formData: sortedData,
    })
    const response = action.conditionCode.results.find(
      (x) => x.value === data[action.conditionCode.key]
    )
    tabStorageChange(response, data)
    loading.value = false
  }

  const tabStorageChange = (response, data) => {
    if (response.toStorage) {
      response.toStorage.forEach((item) => {
        detail.stageData[item] = data[item]
      })
    }
    if (response.fromStorage) {
      response.fromStorage.forEach((item) => {
        delete detail.stageData[item]
      })
    }
  }

  const sortData = () => {
    const newForm = {}
    Object.keys(formData).forEach((key) => {
      const item = form.fields.find((x) => x.name === key)
      if (
        (typeof item.isShow === 'boolean' && item.isShow) ||
        (typeof item.isShow === 'object' && item.isShow.value)
      ) {
        newForm[key] = formData[key]
      }
    })
    return newForm
  }
  const addFiles = (files, field) => {
    console.log()
    console.log(field)
    console.log(formData)
    if (field.options.countFiles?.length > 1) {
      // Vue.set(filesBasket.value, field.name, files)
    } else {
      filesBasket.value[field.name] = { name: '', files, field }
      console.log(filesBasket.value)
    }
    // filesBasket.value.push(files)
  }

  const getStoreQueries = async () => {
    return await store.dispatch('storage/loadFile')
  }

  const loadStoreFile = async (queryParams) => {
    console.log('load')
    // const promises = []
    const queries = []
    for (let key in filesBasket.value) {
      console.log(filesBasket.value[key])
      const name =
        eval(filesBasket.value[key].field.options.name).split(' ').join('_') +
        '_' +
        new Date().getTime()
      const ext = filesBasket.value[key].files[0].name.split('.').pop()
      console.log(name, ext)
      //getStoreQueris(filesBasket.value[key]., name)
      console.log(getStoreQueries)
      console.log(store)
      const storeForm = new FormData()
      storeForm.append('name', name + '.' + ext)
      storeForm.append('file', filesBasket.value[key].files[0])
      const params = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      queries.push(
        store.dispatch('file/create', {
          data: storeForm,
          folder: `${filesBasket.value[key].field.options.folder}/${name}.${ext}`,
          params,
        })
      )
      console.log(
        `file/save/${filesBasket.value[key].field.options.folder}/${name}.${ext}`
      )
    }
    const data = await Promise.all(queries)
    if (data.length === 1) {
      let path = ''
      for (let key in filesBasket.value) {
        const name =
          eval(filesBasket.value[key].field.options.name).split(' ').join('_') +
          '_' +
          new Date().getTime()
        const ext = filesBasket.value[key].files[0].name.split('.').pop()
        path =
          'files/' +
          filesBasket.value[key].field.options.folder +
          '/' +
          name +
          '.' +
          ext
        console.log(path)
        formData[filesBasket.value[key].field.name] = path
      }
    }
    const result = await createForm(queryParams)
    //context.root.router.go(-1)
    emit('closePopup')
    console.log(result)
    console.log(data)
    // const
  }
  const getDetail = () => form.detail

  const hasSelect = () => {
    return form.fields.some(
      (field) => field.type === 'select' && field.isShow && !field.withoutList
    )
  }

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
    if (params.field.hasOwnProperty('selectOptionName')) {
      const item = params.field.items.find((el) => el.id === params.value)
      console.log(item)
      params.field.selectOptionName = item[params.field.selectOption.text]
      console.log(params.field.selectOptionName)
    }
  }

  const hasDepenceFieldsApi = () =>
    form.fields.some(
      (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
    )

  const getDependies = async (params) => {
    const { value, field } = params
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
    const data = await store.dispatch(field.dependence.module, {
      value,
      field,
      url,
    })

    let targetField, card
    targetField = form.fields.find((el) => el.name === depField)
    if (targetField) {
      targetField.items = targetField.defaultItems
        ? [...targetField.defaultItems, ...data]
        : data
      if (targetField.items.length === 1) {
        formData[targetField.name] = targetField.items[0].id
      }
      //targetField.hideItems = targetField.defaultItems
      //  ? [...targetField.defaultItems, ...data]
      //  : data
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

  watch(
    () => formData,
    () => {
      if ($touched.value) {
        errorsCount()
      }
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
    addFiles,
    sortData,
    tabStorageChange,
    stageRequest,
  }
}
