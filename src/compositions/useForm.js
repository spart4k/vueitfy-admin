import { ref, computed, watch, unref, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'

/**
 *
 * @param fields {object}
 * @param watcher {function} - Используется для ленивой подгрузки данных из стора. Должно быть реактивным. Например computed
 * @returns {{$v: *, $invalid: *, reset: *, $errors: *, formData: *, getData: *, validate: *, update: *}}
 */
export default function ({ fields = {}, watcher }) {
  const $touched = ref(false)
  const $invalid = ref(false)
  const $autoDirty = true
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
        console.log(key)
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

  const getData = () =>
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
    getData,
    reset,
    update,
  }
}
