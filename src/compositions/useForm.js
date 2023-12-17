import Vue, { ref, computed, watch, unref, reactive, readonly } from 'vue'
import { useVuelidate } from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import store from '@/store'
import { getList } from '@/api/selects'
import { useRoute, useRouter } from 'vue-router/composables'
// import { required } from '@/utils/validation.js'
// import { data } from 'jquery'
// import { filter } from 'lodash'
import useRequest from '@/compositions/useRequest'
import _ from 'lodash'

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
  const route = useRoute()
  const filesBasket = ref({})
  const { emit } = context.root.ctx
  const permission = computed(() => store.state.user.permission)
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

  let startFormData = formData

  const validations = () => {
    const formFields = {}
    if (form) {
      form?.fields?.forEach((el) => {
        formFields[el.name] = el
      })
      if (!form) return
    }
    return Object.keys(formData || fields).reduce((obj, key) => {
      if (
        (typeof formFields[key]?.isShow === 'boolean' &&
          !formFields[key]?.isShow) ||
        (typeof formFields[key]?.isShow === 'object' &&
          !formFields[key]?.isShow.value)
      ) {
        return obj
      }
      if (form) obj[key] = { ...formFields[key].validations, $autoDirty }
      else obj[key] = { ...fields[key].validations, $autoDirty }
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
    console.log($errors.value)
    $errors.value = Object.keys(formData).reduce((obj, key) => {
      if ($touched.value && $v.value[key]) {
        obj[key] = $v.value[key].$errors.map(({ $message }) => $message)
      } else {
        obj[key] = []
      }
      return obj
    }, {})
    console.log($errors.value)
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
  const clickHandler = async ({ action, skipValidation }) => {
    if (!skipValidation) if (!validate(true)) return
    const sortedData = sortData({ action })
    if (action.action === 'saveFilter') {
      emit('sendFilter', formData)
    } else if (action.action === 'nextStage') {
      if (action.url) {
        const response = await stageRequest(action)
        if (!response) return
      }
      Vue.set(form, 'formData', formData)
      emit('setStageData', formData)
      emit('nextStage', { formData, action })
    } else if (action.action === 'prevStage') {
      if (action.url) {
        const response = await stageRequest(action)
        if (!response) return
      }
      emit('prevStage')
    } else if (action.action === 'saveForm') {
      console.log('SAVE FORM')
      loading.value = true
      if (action.conditionAction) {
        action.conditionAction.forEach((el) => {
          action[el.target] = el.result[formData[el.from]]
        })
        //await createForm({ url: action.url, module: action.module })
        await loadStoreFile({
          url: action.url,
          module: action.module,
          formData: sortedData,
        })
      } else {
        await changeForm({
          url: action.url,
          module: action.module,
          formData: sortedData,
        })
      }
      loading.value = false
    } else if (action.action === 'saveFormStore') {
      loading.value = true
      await loadStoreFile({
        url: action.url,
        module: action.module,
        formData: sortedData,
      })
      loading.value = false
    } else if (action.action === 'updateFormStore') {
      loading.value = true
      await loadStoreFile(
        {
          url: action.url,
          module: action.module,
          formData: sortedData,
        },
        { update: true }
      )
      loading.value = false
    } else if (action.action === 'createForm') {
      loading.value = true
      await createForm({
        url: action.url,
        module: action.module,
        formData: sortedData,
      })
      loading.value = false
    } else if (action.action === 'closePopup') {
      emit('closePopup', action.to)
    } else if (action.action === 'turnOff') {
      action.variable = false
    }
  }

  const stageRequest = async (action) => {
    const sortedData = sortData({ action })
    loading.value = true
    const data = await createForm({
      url: action.url,
      module: action.module,
      formData: sortedData,
    })
    loading.value = false
    const response = responseHandler({ action, data })
    if (!response) return false
    return true
  }

  const responseHandler = ({ action, data }) => {
    const response = action?.conditionCode?.results?.find(
      (x) => x.value === data[action.conditionCode.key]
    )
    if (response?.type === 'success') {
      if (response?.toStorage) {
        tabStorageChange(response, data)
      }
      if (response?.emit === 'closePopup') {
        emit('closePopup', response?.to)
      }
    } else if (response?.type === 'error') {
      store.commit('notifies/showMessage', {
        color: 'error',
        content: unref(response.text),
      })
      return false
    }
    return true
  }

  const tabStorageChange = (response, data) => {
    // if (response?.toStorage) {
    response.toStorage.forEach((item) => {
      // detail.stageData[item] = data[item]
      store.commit('changeFormStorage', { key: item, value: data[item] })
    })
    // }
    // if (response?.fromStorage) {
    //   response.fromStorage.forEach((item) => {
    //     delete detail.stageData[item]
    //   })
    // }
  }

  const sortData = ({ action }) => {
    const newForm = {}
    if (!form) return
    Object.keys(formData).forEach((key) => {
      const item = form?.fields?.find((x) => x.name === key)
      if (
        (typeof item.isShow === 'boolean' && item.isShow) ||
        (typeof item.isShow === 'object' && item.isShow.value) ||
        !item.notSend
      ) {
        if (item.requestKey) newForm[item.requestKey] = formData[key]
        else newForm[key] = formData[key]
      }
      if (item.notSend) delete newForm[key]
      if (action?.useStorageKey?.length) {
        action.useStorageKey.forEach((item) => {
          newForm[item.requestKey] =
            store?.state?.formStorage?.[item?.storageKey]
        })
      }
      if (action?.useRouteKey?.length) {
        action.useRouteKey.forEach((item) => {
          newForm[item.requestKey] = +route.params?.[item?.storageKey]
        })
      }
      if (item.stringify) {
        if (item.requestKey)
          newForm[item.requestKey] = JSON.stringify(newForm[item.requestKey])
        else newForm[key] = JSON.stringify(formData[key])
        // newForm[key] = JSON.stringify(formData[key])
      }
    })
    return newForm
  }
  const addFiles = (files, field) => {
    if (field.options.countFiles?.length > 1) {
      // Vue.set(filesBasket.value, field.name, files)
    } else {
      filesBasket.value[field.name] = { name: '', files, field }
    }
    // filesBasket.value.push(files)
  }

  const getStoreQueries = async () => {
    return await store.dispatch('storage/loadFile')
  }

  const loadStoreFile = async (queryParams, params = {}) => {
    // const promises = []
    const { update } = params

    const queries = []
    for (let key in filesBasket.value) {
      const name =
        eval(filesBasket.value[key].field.options.name).split(' ').join('_') +
        '_' +
        new Date().getTime()
      const ext = filesBasket.value[key].files[0].name.split('.').pop()
      //getStoreQueris(filesBasket.value[key]., name)
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
        if (queryParams && queryParams.formData) {
          queryParams.formData[filesBasket.value[key].field.name] = path
        } else {
          formData[filesBasket.value[key].field.name] = path
        }
      }
    }
    if (update) {
      const result = await changeForm(queryParams)
    } else {
      const result = await createForm(queryParams)
    }
    //context.root.router.go(-1)
    emit('closePopup')
    // const
  }
  const getDetail = () => form?.detail

  const hasSelect = () => {
    return form?.fields.some(
      (field) => field.type === 'select' && field.isShow && !field.withoutList
    )
  }

  const initPreRequest = () => {
    let queries = []
    let listData
    if (hasSelect()) {
      listData = form?.lists?.map((list) => {
        let filter = list.filter.reduce((acc, el) => {
          const source = eval(el.source)
          if (source[el.field] !== null && source[el.field] !== undefined) {
            acc.push({
              alias: el.field,
              value: Array.isArray(source[el.field])
                ? source[el.field]
                : [source[el.field]],
              type: el.type,
            })
          }
          return acc
        }, [])

        const element = {
          alias: list.alias,
          filter,
        }
        return element
      })
    }
    if (hasSelect() && getDetail()) {
      const syncForm = makeRequest()
      const lists = makeRequestList(listData)
      queries = [syncForm, lists]
      return queries
    } else if (getDetail() && !hasSelect()) {
      const syncForm = makeRequest()
      queries = [syncForm, undefined]
      return queries
    } else if (!getDetail() && hasSelect()) {
      const lists = makeRequestList(listData)
      queries = [undefined, lists]
      return queries
    } else return [undefined, undefined]
  }

  const changeAutocomplete = async (params) => {
    await getDependies(params)
    if (params.field.hasOwnProperty('selectOptionName')) {
      const item = params.field.items.find((el) => el.id === params.value)
      params.field.selectOptionName = item[params.field.selectOption.text]
    }
    const { field } = params
    if (field.updateList && field.updateList.length) {
      const listData = field?.updateList?.map((list) => {
        let filter = list.filter.reduce((acc, el) => {
          const source = eval(el.source)
          if (source[el.field] !== null && source[el.field] !== undefined) {
            acc.push({
              alias: el.field,
              value: Array.isArray(source[el.field])
                ? source[el.field]
                : [source[el.field]],
              type: el.type,
            })
          }
          return acc
        }, [])

        const element = {
          alias: list.alias,
          filter,
        }
        return element
      })
      field.loading = true
      const lists = await makeRequestList(listData)
      for (let keyList in lists.data) {
        const field = form?.fields.find((el) =>
          el.alias ? el.alias === keyList : el.name === keyList
        )
        if (field) {
          console.log(field)
          formData[field.name] = ''
          field.hideItems = lists.data[keyList]
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
          if (field.items.length === 1) {
            formData[field.name] = field.items[0][field.selectOption.value]
          }
          showField(field.type, field, true)
        }
      }

      field.loading = false
    }
  }

  const hasDepenceFieldsApi = () =>
    form?.fields.some(
      (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
    )

  const getDependies = async (params) => {
    const { value, field } = params
    console.log('field', field)
    field.dependence?.forEach(async (dependence) => {
      if (dependence.condition?.length) {
        const success = dependence.condition.evert((conditionEl) => {
          return conditionEl.value.includes(formData[conditionEl.field])
        })
        if (!success) return
      }
      const depField = dependence.field
      let fieldValue, targetField, card, body
      targetField = form.fields.find((el) => el.name === depField)
      let url = ''
      if (dependence.url && Array.isArray(dependence.url)) {
        //const splitedUrl = dependence.url.split('/')
        dependence.url.forEach((el) => {
          if (el.field === 'this' && el.source === 'formData') {
            fieldValue = value
          } else if (el.source === 'formData' && el.field !== 'this') {
            fieldValue = formData[el.field]
          } else if (el.source === 'props') {
            fieldValue = form?.formData[el.field]
          }
          url = url + '/' + fieldValue
          //if (el.source === 'props') {
          //  url = url + '/' + form?.formData[fieldValue]
          //} else if (el.source === 'formData') {
          //  console.log(JSON.stringify(formData))
          //  url = url + '/' + formData[fieldValue]
          //}
        })
      } else if (dependence.url && typeof dependence.url === 'string') {
        console.log('LOG DEPENDE', targetField.type)
        url = dependence.url
        if (targetField.type === 'autocomplete') {
          const filters = []
          if (targetField.filters && targetField.filters.length) {
            targetField.filters.forEach((el) => {
              if (!formData[el.field]) return
              filters.push({
                field: el.field,
                value: formData[el.field],
              })
            })
          }
          if (dependence.filter && dependence.filter.length) {
            dependence.filter.forEach((el) => {
              if (!formData[el.field]) return
              filters.push({
                field: el.field,
                value: formData[el.field],
              })
            })
          }
          body = {
            countRows: 10,
            currentPage: 1,
            searchValue: '',
            //id: params.id ? params.id : -1,
            id: -1,
            filters,
          }
        }
      }
      //if (dependence && (dependence.type !== 'api' || !dependence.type)) {
      //  const data = field.items.find((el) => el.id === value)
      //  dependence.fields.forEach((el) => (formData[el] = data[el]))
      //  //return
      //}
      if (dependence && dependence.type === 'default' && dependence.fillField) {
        if (params.item) {
          dependence.fillField.forEach((el) => (formData[el] = params.item[el]))
        }
        return
      } else if (
        dependence &&
        dependence.type === 'default' &&
        dependence.action.type === 'hideOptions'
      ) {
        const selectField = form.fields.find(
          (el) => el.name === dependence.action.field
        )
        dependence.action.condition.forEach((condition) => {
          if (
            JSON.stringify(condition.value) ===
            JSON.stringify(formData[dependence.action.field])
          ) {
            selectField.items = selectField.hideItems.filter((item) => {
              return !condition.options.includes(item.id)
            })
          } else if (
            !formData[dependence.action.field] ||
            !formData[dependence.action.field].length
          ) {
            selectField.items = selectField.hideItems
          }
        })
        //selectField.items = selectField.hideItems.filter((el) => {

        //})
        return
      }
      field.loading = true

      if (depField) targetField.loading = true

      const data = await store.dispatch(dependence.module, {
        value,
        field,
        url,
        body,
      })
      if (targetField) {
        //if (typeof data === 'object') data = [data]
        targetField.items = targetField.defaultItems
          ? [...targetField.defaultItems, ...data]
          : data
        if (targetField.items.length === 1) {
          formData[targetField.name] = targetField.items[0].id
        } else if (!targetField.items.length) {
          formData[targetField.name] = null
        }
        targetField.hideItems = targetField.defaultItems
          ? [...targetField.defaultItems, ...data]
          : data
        card = targetField.items.find((el) => el.id === formData[depField])
      }
      //if (data.length === 1) formData[depField] = card.id
      if (card) {
        if (dependence.fillField) {
          dependence.fillField.forEach((el) => (formData[el] = card[el]))
        } else if (data.length === 1) {
          formData[depField] = data[0].id
          card = targetField.items.find((el) => el.id === formData[depField])
          if (dependence.fillField) {
            dependence.fillField.forEach((el) => (formData[el] = card[el]))
          }
        } else if (data.length === 0) {
          formData[depField] = 11
          if (dependence.fillField) {
            dependence.fillField.forEach((el) => (formData[el] = ''))
          }
        } else {
          if (dependence.fillField) {
            dependence.fillField.forEach((el) => (formData[el] = ''))
          }
        }
      }

      if (dependence.action) {
        if (dependence.action.type === 'hideOptions') {
          const selectField = form.fields.find(
            (el) => el.name === dependence.action.field
          )
          console.log(selectField)
          selectField.items = selectField.hideItems.filter((el) => {
            return el.id !== dependence.action.condition[data.result]
          })
          // говно чтобы прятать option после обновления
          if (selectField.hiding) {
            if (selectField.hiding.conditions) {
              const condition = selectField.hiding.conditions.find(
                (el) => mode === el.value
              )
              //selectField.hideItems = lists.data[keyList]
              selectField.items = selectField.items.filter((el) => {
                return !condition.values.includes(el.id)
              })
            }
          }
          // говно чтобы прятать option после обновления
        }
      }
      field.loading = false
      if (depField) targetField.loading = false
    })

    //formData[dependence.field] = data
  }

  const checkInvalidSelect = (field) => {
    const result = field.items.find((el) => el.id === formData[field.name])
    if (!result) formData[field.name] = ''
  }

  const changeCheckbox = (field) => {
    showField(field.type, field)
  }

  const changeSelect = async ({ value, field }) => {
    if (field.dependence) {
      await getDependies({ value, field })
    }
    if (field.updateList && field.updateList.length) {
      await queryList(field, false)
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
    const fields = form?.fields
      .filter((el) => el.type === 'autocomplete' && el.isShow)
      .map((el) => el)
    const queryFields = fields.map(async (el) => {
      const filters = []
      const { url } = el
      if (el.filters && el.filters.length) {
        el.filters.forEach((filter) => {
          let value, type
          if (filter.source === 'fromPrev') {
            value = form?.formData[filter.field]
          } else if (filter.source === undefined) {
            value = filter.value
          } else {
            value = formData[filter.field]
          }
          if (filter.type) type = filter.type
          filters.push({
            field: filter.field,
            value,
            type,
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
  const putSelectItems = (lists) => {
    for (let keyList in lists.data) {
      const field = form?.fields.find((el) =>
        el.alias ? el.alias === keyList : el.name === keyList
      )
      if (field) {
        console.log(field)
        field.hideItems = lists.data[keyList]
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
        if (field.items.length === 1) {
          formData[field.name] = field.items[0][field.selectOption.value]
        }
        showField(field.type, field, true)
      }
    }
  }
  const queryList = async (field, clear = true) => {
    const listData = field?.updateList?.map((list) => {
      let filter = list.filter.reduce((acc, el) => {
        const source = eval(el.source)
        if (source[el.field] !== null && source[el.field] !== undefined) {
          acc.push({
            alias: el.field,
            value: Array.isArray(source[el.field])
              ? source[el.field]
              : [source[el.field]],
            type: el.type,
          })
        }
        return acc
      }, [])

      const element = {
        alias: list.alias,
        filter,
      }
      return element
    })
    console.log(field, 'field')
    field.loading = true
    const lists = await makeRequestList(listData)
    putSelectItems(lists)
    if (clear) formData[field.name] = ''
    field.loading = false
  }

  const getData = async () => {
    if (!initPreRequest()) {
      return false
    }
    const [syncForm, lists] = await Promise.all(initPreRequest())
    console.log(syncForm, lists)
    if (syncForm) {
      for (let formKey in syncForm.data) {
        const field = form?.fields.find((fieldEl) => fieldEl.name === formKey)
        if (field) {
          if (stringIsArray(syncForm.data[formKey]))
            syncForm.data[formKey] = JSON.parse(syncForm.data[formKey])
          console.log('syncForm', syncForm.data[formKey], formKey)
          formData[field.name] = syncForm.data[formKey]
          console.log(formData.city_id)
          // Подгрузка полей с дополнительными зависимостями ( Например загрузка банк-их карт по id сотрудника)
          if (
            field.hasOwnProperty('dependence') &&
            field.dependence.type === 'api'
          ) {
            //await getDependies({ value: formData[field.name], field })
          }
          if (field.updateList && field.updateList.length) {
            await queryList(field, false)
          }
        }
      }
      console.log(formData)
    }
    if (hasSelect()) {
      console.log(lists.data)
      putSelectItems(lists)
    }
    await loadAutocompletes()
    loading.value = false
  }

  const readonlyField = (field) => {
    const checkIncludesData = (el) => {
      const source = eval(el.target)
      let result
      if (el.array) {
        result = _.isEqual(el.value, source[el.field])
      } else {
        result = el.value.includes(source[el.field])
      }
      return result
    }
    const checkIncludesPermissions = (el) => {
      return el.permissions.includes(permission.value)
    }
    if (typeof field.readonly === 'boolean') return field.readonly
    else if (typeof field.readonly === 'object') {
      if (field.readonly.condition?.length) {
        const condition = () =>
          field.readonly.condition.some((conditionEl) => {
            if (conditionEl.target === 'formData' && !conditionEl.permissions) {
              return checkIncludesData(conditionEl) && conditionEl.type
            } else if (conditionEl.permissions?.length && !conditionEl.target) {
              return checkIncludesPermissions(conditionEl) && conditionEl.type
            } else {
              console.log('target and perm')
              console.log(
                checkIncludesData(conditionEl),
                checkIncludesPermissions(conditionEl),
                conditionEl.type
              )
              return (
                checkIncludesData(conditionEl) &&
                checkIncludesPermissions(conditionEl) === conditionEl.type
              )
            }
          })
        field.readonly.value = condition()
        return field.readonly.value
      }
    }
  }

  const showField = (type, field, loaded) => {
    // console.log(field.name)
    const condition = () =>
      (typeof field.isShow === 'boolean' && field.isShow) ||
      field.isShow.conditions?.every((el) => {
        if (el.target === 'items') {
          if (el.value === 'notEmpty') {
            return field.items.length
          }
        } else if (el.target === 'value') {
          if (el.value === 'notEmpty') {
            return formData[el.field]
          }
        } else {
          return el.value.some((ai) => {
            if (Array.isArray(ai)) {
              //return ai.includes(el.source ? eval(el.source) : 1)
              //return JSON.stringify(ai) === JSON.stringify(formData[el.field])
              return _.isEqual(ai, formData[el.field])
            } else {
              return [ai].includes(
                el.source ? eval(el.source) : formData[el.field]
              )
            }
          })
        }
      })
    if (field.isShow.conditions && field.isShow.conditions.length) {
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
      console.log('change form')
      form?.fields?.forEach((el) => {
        showField(el.type, el)
      })
      if ($touched.value) {
        errorsCount()
      }
      startFormData = formData
      console.log(startFormData)
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
    rebuildFormData,
    changeCheckbox,
    tabStorageChange,
    stageRequest,
    responseHandler,
    readonlyField,
  }
}
