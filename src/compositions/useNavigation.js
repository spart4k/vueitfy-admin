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

export default function () {
  const addOrUpdateURLParam = (key, value) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value)
    const newRelativePathQuery =
      window.location.pathname + '?' + searchParams.toString()
    history.pushState(null, '', newRelativePathQuery)
  }

  const removeURLParam = (key) => {
    console.log(key)
  }

  return { addOrUpdateURLParam, removeURLParam }
}
