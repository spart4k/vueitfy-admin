import Vue, { ref, computed, watch, unref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import store from '@/store'
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

export default function ({ context, loading, activeTab, createForm }) {
  const { stageRequest } = useForm({ context, loading, createForm })

  const clickHandler = async ({ action }) => {
    console.log('clickHandler', action.action)
    // if (!validate(true) && !skipValidation) return
    if (action.action === 'nextStage') {
      if (action.url) {
        await stageRequest(action)
      }
      activeTab.value++
    } else if (action.action === 'prevStage') {
      if (action.url) {
        await stageRequest(action)
      }
      activeTab.value--
    }
    // if (action.action === 'saveFilter') {
    //   emit('sendFilter', formData)
    // } else if (action.action === 'nextStage') {
    //   if (action.url) {
    //     await stageRequest(action)
    //   }
    //   Vue.set(form, 'formData', formData)
    //   emit('nextStage', { formData, action })
    // } else if (action.action === 'prevStage') {
    //   // if (action.url) {
    //   //   await stageRequest(action)
    //   // }
    //   emit('prevStage')
    // } else if (action.action === 'saveForm') {
    //   loading.value = true
    //   if (action.conditionAction) {
    //     console.log('action')
    //     action.conditionAction.forEach((el) => {
    //       action[el.target] = el.result[formData[el.from]]
    //     })
    //     //await createForm({ url: action.url, module: action.module })
    //     loadStoreFile({ url: action.url, module: action.module })
    //   } else {
    //     await changeForm({ url: action.url, module: action.module })
    //   }
    //   loading.value = false
    //   //const isNextForm = true
    //   //if (isNextForm) {
    //   //  nextForm()
    //   //}
    // } else if (action.action === 'saveFormStore') {
    //   loadStoreFile()
    // }
  }

  return { clickHandler }
}
