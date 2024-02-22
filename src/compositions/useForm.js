import Vue, { ref, computed, watch, unref, reactive, readonly } from 'vue'
import { useVuelidate } from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import store from '@/store'
import { getList } from '@/api/selects'
// import { useRoute } from 'vue-router/composables'
// import { required } from '@/utils/validation.js'
// import { data } from 'jquery'
// import { filter } from 'lodash'
import moment from 'moment'
import useRequest from '@/compositions/useRequest'
import _ from 'lodash'
import router from '@/router'

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
  deleteFormById,
  changeFormId,
}) {
  const $touched = ref(false)
  const $invalid = ref(false)
  const $autoDirty = true
  // const route = useRoute()
  const { route } = context.root
  const filesBasket = ref({})
  const { emit } = context.root.ctx
  const permission = computed(() => store.state.user.permission_id)

  const formData = reactive(
    Object.keys(fields).reduce((obj, key) => {
      obj[key] = ref(fields[key].default)
      return obj
    }, {})
  )
  let originalData

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
      console.log(key)
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
    // Object.assign(
    //   formData,
    //   reactive(
    //     Object.keys(setFields()).reduce((obj, key) => {
    //       if (formData[key]) obj[key] = ref(formData[key])
    //       else obj[key] = Vue.set(formData, key, ref(fields[key].default))
    //       return obj
    //     }, {})
    //   )
    // )
    const fields = setFields()
    for (let key in fields) {
      if (formData.hasOwnProperty(key)) continue
      Vue.set(formData, key, ref(fields[key].default))
    }
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

  const clickHandler = async ({ action, skipValidation, notClose = false }) => {
    if (!skipValidation) if (!validate(true)) return
    const sortedData = sortData({ action })
    console.log('/////////////////////////', action.action)
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
    } else if (action.action === 'saveFormId') {
      loading.value = true
      const result = await changeFormId({
        url: action.url,
        module: action.module,
        formData: sortedData,
      })
      loading.value = false
      emit('getItems')
      emit('closePopup')
    } else if (action.action === 'saveForm') {
      loading.value = true
      let result
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
        result = await changeForm({
          url: action.url,
          module: action.module,
          formData: sortedData,
          action,
        })
      }
      loading.value = false
      emit('getItems')
      //if (action.actionKey === 'schedule') {
      if (result.code === 1) {
        emit('closePopup')
      } else if (result.result === 1) {
        emit('closePopup')
      }
    } else if (action.action === 'saveFormStore') {
      loading.value = true
      await loadStoreFile({
        url: action.url,
        module: action.module,
        formData: sortedData,
        action,
      })
      loading.value = false
    } else if (action.action === 'deleteFormById') {
      loading.value = true
      await deleteFormById({
        url: action.url,
        module: action.module,
      })
      emit('closePopup')
      if (action.actionKey) {
        emit('getItems')
      }
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
    } else if (action.action === 'customFormStore') {
      loading.value = true
      await loadStoreFile(
        {
          url: action.url,
          module: action.module,
          formData: sortedData,
        },
        { change: true }
      )
      loading.value = false
    } else if (action.action === 'createForm') {
      loading.value = true
      const result = await createForm({
        url: action.url,
        module: action.module,
        formData: sortedData,
        params: action,
      })
      loading.value = false
      if (result.code && result.code === 1) {
        if (!notClose) {
          emit('getItems')
          emit('closePopup')
        }
      } else if (!result.code) {
        if (!notClose) {
          emit('getItems')
          emit('closePopup')
        }
      }
      //const message = action.handlingResponse[result.code].text
      //const color = action.handlingResponse[result.code].color
      if (action.handlingResponse) {
        const conditionContext = {
          formData,
          result,
        }
        let res = result.code
        let contextData = formData

        if (action.handlingResponse.result) res = action.handlingResponse.result
        if (action.handlingResponse.context)
          contextData = _.get(
            conditionContext[action.handlingResponse.context],
            res
          )
        let { text, color } = action.handlingResponse[res]
        // /%\w{n}%/
        //const text = 'Объект с именем %name% уже существует'
        // eslint-disable-next-line
        const key = text.match(/\%\w{1,}\%/g)

        key.forEach((item) => {
          const keyFormated = item.split('%')[1]
          text = text.replace(item, contextData[keyFormated])
        })

        store.commit('notifies/showMessage', {
          content: text,
          color,
        })
      }
      //emit('closePopup')
    } else if (action.action === 'closePopup') {
      if (!notClose) emit('closePopup', action.to)
    } else if (action.action === 'turnOff') {
      action.variable = false
    } else if (action.action === 'custom') {
      loading.value = true
      const result = await changeForm({
        url: action.url,
        module: action.module,
        formData: sortedData,
      })
      loading.value = false
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
      if (item?.prescription) {
        if (!newForm[item.prescription]) newForm[item.prescription] = []
        let itemIndex = item.name.split('%')[1]
        if (!itemIndex) itemIndex = 0
        if (!newForm[item.prescription][itemIndex])
          newForm[item.prescription][itemIndex] = {}
        newForm[item.prescription][itemIndex][key.split('%')[0]] = formData[key]
      }

      if (
        ((typeof item.isShow === 'boolean' && item.isShow) ||
          (typeof item.isShow === 'object' && item.isShow.value)) &&
        !item.notSend
      ) {
        if (item.requestKey) newForm[item.requestKey] = formData[key]
        else newForm[key] = formData[key]

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

        if (item.requestType === 'number') {
          if (item.requestKey)
            newForm[item.requestKey] = Number(newForm[item.requestKey])
          else newForm[key] = Number(newForm[key])
        }

        if (item.stringify) {
          if (item.requestKey)
            newForm[item.requestKey] = JSON.stringify(newForm[item.requestKey])
          else newForm[key] = JSON.stringify(newForm[key])
          // newForm[key] = JSON.stringify(formData[key])
        }

        if (item.name === 'subtype' && formData[key] === '') {
          delete newForm[key]
        }

        if (item.toNumber && item.type === 'checkbox') {
          if (formData[key]) {
            newForm[key] = 1
          } else {
            newForm[key] = 0
          }
        }

        if (item.type === 'date') {
          if (item.subtype === 'multiple') {
            newForm[key].forEach((item, index) => {
              newForm[key][index] = moment(item, 'YYYY.MM.DD').format(
                'YYYY-MM-DD'
              )
            })
          } else if (item.subtype === 'period') {
            newForm[key] = moment(newForm[key], 'YYYY.MM').format('YYYY-MM')
          } else {
            newForm[key] = moment(newForm[key], 'YYYY.MM.DD').format(
              'YYYY-MM-DD'
            )
          }
        } else if (item.type === 'dateRange') {
          newForm[key].forEach((item, index) => {
            if (item)
              newForm[key][index] = moment(item, 'YYYY.MM.DD').format(
                'YYYY-MM-DD'
              )
          })
        }
      }

      // if (item.round) {
      //   const result = formData[key].replaceAll(',', '.')
      //   newForm[key] = Math.ceil(+result)
      // }

      // if (item.notSend || item.prescription) delete newForm[key]
    })
    return newForm
  }
  const addFiles = (files, field) => {
    // if (field.options.countFiles?.length > 1) {
    //   // Vue.set(filesBasket.value, field.name, files)
    // } else {
    //   filesBasket.value[field.name] = { name: '', files, field }
    // }
    // filesBasket.value.push(files)
  }

  const getStoreQueries = async () => {
    return await store.dispatch('storage/loadFile')
  }

  const loadStoreFile = async (queryParams, params = {}) => {
    // const promises = []
    const { update } = params
    const { change } = params

    const queries = []

    for (let i = 0; i < form.fields.length; i++) {
      const item = form.fields[i]
      const isShow =
        (typeof item.isShow === 'boolean' && item.isShow) ||
        (typeof item.isShow === 'object' && item.isShow.value)
      if (item.type === 'dropzone' && isShow) {
        const dropzone = item

        const setFormData = (val) => {
          if (queryParams && queryParams.formData) {
            queryParams.formData[dropzone.name] = val
          } else {
            formData[dropzone.name] = val
          }
        }

        let fileIndex = 1
        if (dropzone.value.length) {
          for (let l = 0; l < dropzone.value.length; l++) {
            const file = dropzone.value[l][0]
            if (file?.accepted) {
              const valueId =
                formData[dropzone.options.valueId] ?? store?.state?.user.id
              const name =
                eval(dropzone.options.name).split(' ').join('_') +
                '_' +
                valueId +
                '_' +
                new Date().getTime()
              const ext = file.name.split('.').pop()
              const storeForm = new FormData()
              storeForm.append('name', name + '.' + ext)
              storeForm.append('file', file)
              const params = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
              queries.push({
                request: await store.dispatch('file/create', {
                  data: storeForm,
                  folder: `${dropzone.options.folder}/${name}.${ext}`,
                  params,
                }),
                path: '/' + dropzone.options.folder + '/' + name + '.' + ext,
                index: fileIndex,
              })
              if (dropzone.grouping) {
                fileIndex += 1
              } else {
                break
              }
            }
          }
          const data = await Promise.all(queries)
          if (dropzone.grouping) {
            const fileArray = [...data]
            fileArray.forEach((file) => {
              // file.name = file.path
              delete file.request
              // delete file.path
            })
            setFormData(fileArray)
          } else {
            setFormData(data[0].path)
          }
        }

        if (dropzone.stash) {
          formData[dropzone.stash].forEach((file, index) => {
            queryParams.formData[dropzone.name].push({
              path: file.name,
              index: queryParams.formData[dropzone.name].length + 1,
            })
          })
        }
      }
    }

    if (update) {
      const result = await changeForm(queryParams)
    } else if (change) {
      const result = await changeFormId(queryParams)
    } else {
      const result = await createForm(queryParams, params)
    }
    if (!queryParams?.action?.notClose) {
      emit('getItems')
      emit('closePopup')
    } else {
      $v.value.$reset()
      errorsCount()
    }
  }

  const getDetail = () => {
    if (detail?.requestId) {
      return form?.detail && route.params[detail.requestId]
    } else {
      return form?.detail && route.params.id
    }
  }

  const hasSelect = () => {
    return form?.fields.some(
      (field) => field.type === 'select' && field.isShow && !field.withoutList
    )
  }

  //const initPreRequest = async () => {
  //  //if (hasSelect()) {
  //  //  listData = form?.lists?.map((list) => {
  //  //    let filter = list.filter.reduce((acc, el) => {
  //  //      const source = eval(el.source)
  //  //      if (source[el.field] !== null && source[el.field] !== undefined) {
  //  //        acc.push({
  //  //          alias: el.alias ?? el.field,
  //  //          value: Array.isArray(source[el.field])
  //  //            ? source[el.field]
  //  //            : [source[el.field]],
  //  //          type: el.type,
  //  //        })
  //  //      }
  //  //      return acc
  //  //    }, [])

  //  //    const element = {
  //  //      alias: list.alias,
  //  //      filter,
  //  //    }
  //  //    return element
  //  //  })
  //  //}
  //  //const getListData = () => {
  //  //  listData = form?.lists?.map((list) => {
  //  //    let filter = list.filter.reduce((acc, el) => {
  //  //      const source = eval(el.source)
  //  //      if (source[el.field] !== null && source[el.field] !== undefined) {
  //  //        acc.push({
  //  //          alias: el.alias ?? el.field,
  //  //          value: Array.isArray(source[el.field])
  //  //            ? source[el.field]
  //  //            : [source[el.field]],
  //  //          type: el.type,
  //  //        })
  //  //      }
  //  //      return acc
  //  //    }, [])

  //  //    const element = {
  //  //      alias: list.alias,
  //  //      filter,
  //  //    }
  //  //    return element
  //  //  })
  //  //}
  //  //if (hasSelect() && getDetail()) {

  //  //  getListData()
  //  //  const lists = await makeRequestList(listData)
  //  //  queries = [syncForm, lists]
  //  //  return queries
  //  //} else if (getDetail() && !hasSelect()) {
  //  //  const syncForm = makeRequest()
  //  //  queries = [syncForm, undefined]
  //  //  return queries
  //  //} else if (!getDetail() && hasSelect()) {
  //  //  const lists = makeRequestList(listData)
  //  //  queries = [undefined, lists]
  //  //  return queries
  //  //} else return [undefined, undefined]
  //  const syncForm = await makeRequest()
  //}

  const changeAutocomplete = async (params) => {
    queueMicrotask(async () => {
      await getDependies(params)
    })
    if (params.field.hasOwnProperty('selectOptionName')) {
      const item = params.field.items.find((el) => el.id === params.value)
      params.field.selectOptionName = item[params.field.selectOption.text]
    }
    if (params.field.hasOwnProperty('putValueInItems')) {
      const array = []
      params.value?.forEach((item) => {
        array.push(params.field.items.find((x) => x.id === item))
      })
      form.fields.find((x) => x.name === params.field.putValueInItems).items =
        array
    }
    const { field } = params
    if (field.updateList && field.updateList.length) {
      const listData = field?.updateList?.flatMap((list) => {
        if (list.condition) {
          const conditionContext = {
            store,
            formData,
            environment,
          }
          for (let i = 0; i < list.condition.length; i++) {
            let item = list.condition[i]
            if (item.hasOwnProperty('funcCondition')) {
              if (!item.funcCondition(conditionContext)) {
                return []
              }
            } else if (!item.value.includes(formData[item.key])) return []
          }
        }

        // if (list.condition) return []
        let filter = list.filter.reduce((acc, el) => {
          const source = eval(el.source)
          if (source[el.field] !== null && source[el.field] !== undefined) {
            acc.push({
              alias: el.alias ?? el.field,
              value: Array.isArray(source[el.field])
                ? source[el.field]
                : [source[el.field]],
              type: el.type,
            })
          } else if (el.source !== 'formData') {
            acc.push({
              alias: el.alias ?? el.field,
              value: Array.isArray(source) ? source : [source],
              type: el.type,
            })
          } else if (el.source === 'formData') {
            acc.push({
              alias: el.alias ?? el.field,
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
            // Если массив, вставить массив
            if (field.putFirst)
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
    console.log('GET DEP')
    field.dependence?.forEach(async (dependence) => {
      if (dependence.condition?.length) {
        const success = dependence.condition.every((conditionEl) => {
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
          //  url = url + '/' + formData[fieldValue]
          //}
        })
      } else if (dependence.url && typeof dependence.url === 'string') {
        url = dependence.url
        console.log('745')
        if (targetField?.type === 'autocomplete') {
          const filter = []
          const query = (target) => {
            target.filter.forEach((el) => {
              if (!formData[el.field] && !el.source) return
              if (el.source)
                filter.push({
                  alias: el.alias ?? el.field,
                  type: el.type,
                  value: el.source ? eval(el.source) : formData[el.field],
                })
              else {
                filter.push({
                  alias: el.alias ?? el.field,
                  type: el.type,
                  value: formData[el.field],
                })
              }
            })
          }
          if (targetField.filter && targetField.filter.length) {
            query(targetField)
          } else if (dependence.filter && dependence.filter.length) {
            query(dependence)
          }
          body = {
            countRows: 10,
            currentPage: 1,
            searchValue: '',
            //id: params.id ? params.id : -1,
            id: formData[
              targetField.name ? targetField.name : targetField.alias
            ]
              ? formData[
                  targetField.name ? targetField.name : targetField.alias
                ]
              : -1,
            filter,
          }
        }
      }
      //if (dependence && (dependence.type !== 'api' || !dependence.type)) {
      //  const data = field.items.find((el) => el.id === value)
      //  dependence.fields.forEach((el) => (formData[el] = data[el]))
      //  //return
      //}
      if (dependence && dependence.type === 'default' && dependence.fillField) {
        dependence.fillField.forEach((el) => {
          console.log('FILL FIELDS', el, params)
          if (typeof el === 'string') {
            if (params?.item) formData[el] = params?.item[el]
            else if (formData[el] && params.hasOwnProperty('item'))
              formData[el] = null
          } else if (typeof el === 'object') {
            const targetObject = form.fields.find((item) => {
              return item.name === el.formKey
            })
            if (
              (typeof targetObject.isShow === 'boolean' &&
                targetObject.isShow) ||
              (typeof targetObject.isShow === 'object' &&
                targetObject.isShow.value)
            ) {
              formData[el.targetKey] = targetObject.items?.find(
                (item) => item[el.compareKey] === formData[el.formKey]
              )?.[el.objectKey]
            }
          }
        })
        return
      } else if (
        dependence &&
        dependence.type === 'default' &&
        dependence.action.type === 'hideOptions'
      ) {
        let selectField
        if (dependence.action.targetField)
          selectField = form.fields.find(
            (el) => el.name === dependence.action.targetField
          )
        else
          selectField = form.fields.find(
            (el) => el.name === dependence.action.field
          )

        const dep = dependence.action.condition.find((condition) => {
          let cloneAi
          let cloneFieldEl

          if (Array.isArray(condition.value)) cloneAi = [...condition.value]
          else cloneAi = [condition.value]

          if (Array.isArray(condition.value)) {
            cloneFieldEl = [...formData[dependence.action.field]]
          } else cloneFieldEl = [formData[dependence.action.field]]

          return _.isEqual(cloneAi.sort(), cloneFieldEl.sort())
        })
        if (dep) {
          selectField.items = selectField.hideItems.filter((item) => {
            return !dep.options.includes(item.id)
          })
        } else {
          selectField.items = selectField.hideItems
        }

        return
      }
      field.loading = true
      if (depField) targetField.loading = true
      let data
      console.log('DATA 847', dependence.module, url, value)

      if (dependence.module) {
        data = await store.dispatch(dependence.module, {
          value,
          field,
          url,
          body,
        })
      }
      if (targetField) {
        console.log(JSON.stringify(targetField), targetField)
        //if (typeof data === 'object') data = [data]
        console.log('DEFAULT ITEMS', targetField, targetField.defaultItems)
        targetField.items = targetField.defaultItems
          ? [...targetField.defaultItems, ...data]
          : data
        if (targetField?.items?.length === 1) {
          // Если массив, вставить массив
          // formData[targetField.name] = targetField.items[0].id
        } else if (!targetField.items?.length) {
          formData[targetField.name] = null
        }
        targetField.hideItems = targetField.defaultItems
          ? [...targetField.defaultItems, ...data]
          : data
        card = targetField.items.find((el) => el.id === formData[depField])
        if (targetField.hasOwnProperty('objectData')) {
          if (data.length) {
            targetField.objectData = data
            console.log(targetField.objectData, 'targetField.objectData')
          } else {
            const findedDep = targetField.dependence.find(
              (depTarget) => depTarget.type === 'update'
            )
            findedDep.fields.forEach((el) => (formData[el] = ''))
          }
        }
      }
      if (data?.length === 1) {
        // formData[depField] = card.id
      }

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
          selectField.items = selectField.hideItems.filter((el) => {
            return el.id !== dependence.action.condition[data.result]
          })
          // говно чтобы прятать option после обновления
          if (selectField.hiding) {
            if (selectField.hiding.conditions) {
              const condition = selectField.hiding.conditions.find(
                (el) => mode === el.value
              )
              selectField.items = selectField.items.filter((el) => {
                return !condition.values.includes(el.id)
              })
            }
          }
          // говно чтобы прятать option после обновления
        }
      }
      if (dependence.type === 'update') {
        // dependence
        console.log('FILL FIELD', field)
        if (field.hasOwnProperty('objectData')) {
          if (field.objectData?.length) {
            const findedEl = field.objectData?.find((el) => el.id === value)
            if (findedEl) {
              dependence.fields.forEach((el) => {
                formData[el] = findedEl[el]
              })
            }
          } else {
            dependence.fields.forEach((el) => {
              formData[el] = ''
            })
          }
        }
        if (
          formData[field.name] === '' ||
          formData[field.name] === null ||
          formData[field.name] === undefined
        ) {
          dependence.fields.forEach((el) => {
            formData[el] = ''
          })
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
      console.log('IT AUTOCOMPLETE', el.name)
      const filters = []
      const { url } = el
      if (el.filter && el.filter.length) {
        el.filter.forEach((filter) => {
          let value, type
          if (filter.source === 'fromPrev') {
            value = form?.formData[filter.field]
          } else if (filter.source && filter.source !== 'formData') {
            const source = eval(filter.source)
            value = source
          } else if (filter.source === 'formData') {
            value = formData[filter.field]
          } else {
            value = formData[filter.field]
          }
          if (filter.type) type = filter.type
          filters.push({
            alias: filter.field,
            value,
            type,
          })
        })
      }
      const data = await getList(url, {
        countRows: 10,
        currentPage: 1,
        searchValue: '',
        id: formData[el.name ? el.name : el.alias]
          ? formData[el.name ? el.name : el.alias]
          : -1,
        filter: filters,
      })
      console.log(data, 'DATA DATA')
      if (data.rows) {
        el.items = [...el.items, ...data.rows]
        el.items = data.rows
      }
      console.log('LOAD AUTOCOMPLETE ', formData[el.name])
      if (mode === 'edit') {
        console.log(' MODE EDIT')
        await getDependies({ field: el, value: formData[el.name] })
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
        field.hideItems = lists.data[keyList]
        if (field.hiding) {
          if (field.hiding.conditions) {
            const condition = field.hiding.conditions.find(
              (el) => mode === el.value && el.target !== 'formData'
            )
            if (condition) {
              lists.data[keyList] = lists.data[keyList].filter((el) => {
                return !condition.values.includes(el.id)
              })
            }
            // Условие для скрытие по значению из формы
            const formTargets = field.hiding.conditions.filter(
              (el) => el.target === 'formData'
            )
            if (formTargets?.length) {
              formTargets.forEach((formTarget) => {
                if (formTarget.value.includes(formData[formTarget.field])) {
                  lists.data[keyList] = lists.data[keyList].filter((el) => {
                    return formTarget.values.includes(el.id)
                  })
                }
              })
            }
          }
        }
        field.items = lists.data[keyList]
        if (field.items.length === 1) {
          // Если массив, вставить массив
          // formData[field.name] = field.items[0][field.selectOption.value]
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
            alias: el.alias ?? el.field,
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
    putSelectItems(lists)
    if (clear) formData[field.name] = ''
    field.loading = false
  }
  //const readonlyAll = ref(false)
  const environment = reactive({
    readonlyAll: false,
    mode,
    ...store.state.user,
  })
  const getData = async () => {
    //if (!initPreRequest()) {
    //  return false
    //}
    //const [syncForm] = await initPreRequest()
    //let listQuery = undefined
    let syncForm = undefined
    let lists = undefined
    if (getDetail()) {
      syncForm = await makeRequest()
      entityData.value = syncForm.data
    }
    console.log('///////////////////////////')
    if (syncForm) {
      for (let formKey in syncForm.data) {
        const field = form?.fields.find((fieldEl) => fieldEl.name === formKey)
        console.log(field?.name, 'FIELD NAME')
        if (field) {
          if (stringIsArray(syncForm.data[formKey]))
            syncForm.data[formKey] = JSON.parse(syncForm.data[formKey])
          if (!field.notPut) {
            Vue.set(formData, field.name, syncForm.data[formKey])
            if (field.type === 'checkbox')
              formData[field.name] = !!syncForm.data[formKey]
          }
          // Подгрузка полей с дополнительными зависимостями ( Например загрузка банк-их карт по id сотрудника)
          // if (field.hasOwnProperty('dependence')) {
          //   await getDependies({
          //     value: formData[field.name],
          //     field,
          //   })
          // }
          if (field.updateList && field.updateList.length) {
            //await queryList(field, false)
          }
        }
      }
      console.log(JSON.stringify(formData), 'FORM DATA CONSOLE')
      const prescription = form?.fields.find(
        (x) => x.prescription
      )?.prescription
      if (prescription) {
        syncForm.data[prescription].forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            const obj = form?.fields.find((x) => x.prescription_name === key)
            if (obj) {
              Vue.set(
                formData,
                obj.name + (index ? `%${index}` : ''),
                item[obj.prescription_name]
              )
            }
          })
        })
      }

      if (syncForm.hasOwnProperty('readonly')) {
        environment.readonlyAll = syncForm.readonly
      }

      originalData = _.cloneDeep(formData)
    }
    if (hasSelect()) {
      const listQuery = form?.lists?.flatMap((list) => {
        if (list.condition) {
          for (let i = 0; i < list.condition.length; i++) {
            let item = list.condition[i]
            if (item.hasOwnProperty('funcCondition')) {
              const conditionContext = {
                store,
                formData,
                originalData,
                environment,
              }
              if (item.funcCondition(conditionContext) === item.type) return []
            } else {
              if (!item.value.includes(formData[item.key])) return []
            }
          }
        }
        let filter = list.filter.reduce((acc, el) => {
          const source = eval(el.source)
          if (
            source &&
            source[el.field] !== null &&
            source[el.field] !== undefined &&
            source[el.field] !== ''
          ) {
            acc.push({
              alias: el.alias ?? el.field,
              value: Array.isArray(source[el.field])
                ? source[el.field]
                : [source[el.field]],
              type: el.type,
            })
          } else if (el.source === '+route.params.id') {
            acc.push({
              alias: el.alias ?? el.field,
              value: [+route.params.id],
              type: el.type,
            })
          } else if (el.sendEmpty) {
            acc.push({
              alias: el.alias ?? el.field,
              value: el.value,
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
      lists = await makeRequestList(listQuery)
      for (let keyList in lists.data) {
        const field = form?.fields.find((el) => {
          return el.alias ? el.alias === keyList : el.name === keyList
        })
        if (field) {
          field.hideItems = lists.data[keyList]
          if (field.hiding) {
            if (field.hiding.conditions) {
              const condition = field.hiding.conditions.find(
                (el) => mode === el.value && el.target !== 'formData'
              )
              if (condition) {
                lists.data[keyList] = lists.data[keyList].filter((el) => {
                  return !condition.values.includes(el.id)
                })
              }
            }
          }
          field.items = lists.data[keyList]
          if (field.items.length === 1) {
            // Если массив, вставить массив
            if (field.putFirst)
              formData[field.name] = field.items[0][field.selectOption.value]
          }
        }
      }
      putSelectItems(lists)
    }
    await loadAutocompletes()
    loading.value = false
    console.log(JSON.stringify(formData), 'FORM DATA CONSOLE')
  }

  const isHideBtn = (button) => {
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
    if (typeof button.isHide === 'boolean') return button.isHide
    else if (typeof button.isHide === 'object') {
      if (button.isHide.condition?.length) {
        const condition = () =>
          button.isHide.condition.some((conditionEl) => {
            if (
              (conditionEl.target === 'formData' ||
                conditionEl.target === 'environment') &&
              !conditionEl.permissions
            ) {
              return checkIncludesData(conditionEl) === conditionEl.type
            } else if (conditionEl.permissions?.length && !conditionEl.target) {
              return checkIncludesPermissions(conditionEl) === conditionEl.type
            } else if (conditionEl.hasOwnProperty('funcCondition')) {
              const conditionContext = {
                store,
                formData,
                environment,
              }
              return (
                conditionEl.funcCondition(conditionContext) === conditionEl.type
              )
            } else {
              return (
                checkIncludesData(conditionEl) &&
                checkIncludesPermissions(conditionEl) === conditionEl.type
              )
            }
          })
        button.isHide.value = condition()
        return button.isHide.value
      }
    } else if (typeof button.isHide === 'undefined') return false
  }

  const readonlyField = (field) => {
    const checkIncludesData = (el) => {
      let source = eval(el.target)
      let result
      if (el.array) {
        result = _.isEqual(el.value, source[el.field])
      } else {
        result = el.value.includes(source[el.field])
      }
      return result
    }
    const checkIncludesPermissions = (el) => {
      console.log(
        field.name,
        el.permissions.includes(permission.value),
        permission.value,
        el.permissions,
        [4].includes(4),
        el
      )
      return el.permissions.includes(permission.value)
    }
    if (typeof field.readonly === 'boolean')
      return environment.readonlyAll ? true : field.readonly
    else if (typeof field.readonly === 'object') {
      if (field.readonly.condition?.length) {
        const condition = () =>
          field.readonly.condition.some((conditionEl) => {
            if (
              (conditionEl.target === 'formData' ||
                conditionEl.target === 'environment' ||
                conditionEl.target === 'originalData') &&
              !conditionEl.permissions
            ) {
              return checkIncludesData(conditionEl) === conditionEl.type
            } else if (conditionEl.permissions?.length && !conditionEl.target) {
              const result = checkIncludesPermissions(conditionEl)
              // if (!result && !conditionEl.type) {
              // }
              return checkIncludesPermissions(conditionEl) === conditionEl.type
            } else if (conditionEl.hasOwnProperty('funcCondition')) {
              const conditionContext = {
                store,
                formData,
                originalData,
                environment,
              }
              return (
                conditionEl.funcCondition(conditionContext) === conditionEl.type
              )
            } else {
              return (
                (checkIncludesData(conditionEl) &&
                  checkIncludesPermissions(conditionEl)) === conditionEl.type
              )
            }
          })
        field.readonly.value = condition()
        return environment.readonlyAll ? true : field.readonly.value
      }
    } else if (typeof field.readonly === 'undefined') {
      return environment.readonlyAll
    }
  }
  const entityData = ref({})
  const showField = (type, field, loaded) => {
    const condition = () => {
      return (
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
                const cloneAi = [...ai]
                const cloneFieldEl = [...formData[el.field]]
                return _.isEqual(cloneAi.sort(), cloneFieldEl.sort())
              } else {
                return [ai].includes(
                  el.source ? eval(el.source) : formData[el.field]
                )
              }
            })
          }
        })
      )
    }
    if (field.isShow.conditions && field.isShow.conditions.length) {
      //if (field.name === 'print_form_key') {
      //}
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
    return field.disabled || field.requiredFields
      ? field.disabled || field.requiredFields.some((el) => !formData[el])
      : false
  }

  const colsField = (field) => {
    if (typeof field.position?.sm === 'object') {
      const conditionContext = {
        store,
        formData,
        environment,
      }
      let value = null
      field.position.sm.condiiton.forEach((el) => {
        const resultFuncCondition = el.funcCondition(conditionContext)
        if (resultFuncCondition) {
          value = el.value[resultFuncCondition]
        } else {
          value = el.value[false]
        }
      })
      return value
    } else return field.position.sm
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
  const wrapFormData = ref(formData)
  watch(
    () => wrapFormData,
    () => {
      form?.fields?.forEach((el) => {
        showField(el.type, el)
      })
      if ($touched.value) {
        errorsCount()
      }
      startFormData = formData
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
    tabStorageChange,
    stageRequest,
    responseHandler,
    readonlyField,
    isHideBtn,
    colsField,
    entityData,
  }
}
