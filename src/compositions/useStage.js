import Vue, { ref, computed, watch, unref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import store from '@/store'
import _ from 'lodash'
import { getList } from '@/api/selects'
// import { required } from '@/utils/validation.js'
// import { data } from 'jquery'
// import { filter } from 'lodash'
import useForm from '@/compositions/useForm'

/**
 * @param loading {boolean}
 * @param fields {object}
 * @param watcher {function} - Используется для ленивой подгрузки данных из стора. Должно быть реактивным. Например computed
 * @returns {{$v: *, $invalid: *, reset: *, $errors: *, formData: *, getDataForm: *, validate: *, update: *}}
 */

export default function ({ context, loading, activeTab, createForm, form }) {
  const { stageRequest, responseHandler } = useForm({
    context,
    loading,
    createForm,
    form: { fields: [] },
  })
  const { emit } = context.root.ctx
  const clickHandler = async ({ action }) => {
    if (action.action === 'nextStage') {
      const response = await stageRequest(action)
      if (!response) return
      activeTab.value++
    } else if (action.action === 'prevStage') {
      const response = await stageRequest(action)
      if (!response) return
      activeTab.value--
    } else if (action.action === 'createForm') {
      loading.value = true
      let obj = {}
      action?.requestBody?.store?.forEach((item) => {
        obj[item.requestKey] = _.get(store.state, item.storageKey)
      })
      if (action?.requestBody?.static) {
        obj = { ...obj, ...action?.requestBody?.static }
      }
      action?.requestBody?.formData?.forEach((item) => {
        if (item in form.stageData) obj[item] = form.stageData[item]
        else if (item.formKey in form.stageData)
          obj[item.requestKey] = form.stageData[item.formKey]
      })
      const data = await createForm({
        url: action.url,
        module: action.module,
        formData: obj,
      })
      loading.value = false
      responseHandler({ action, data })
    }
  }

  return { clickHandler }
}
