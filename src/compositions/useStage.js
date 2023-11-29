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
    if (action.url) await stageRequest(action)
    if (action.action === 'nextStage') {
      activeTab.value++
    } else if (action.action === 'prevStage') {
      activeTab.value--
    }
  }

  return { clickHandler }
}
