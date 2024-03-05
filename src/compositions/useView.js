import Vue, { ref, computed, watch, unref, reactive, readonly } from 'vue'
import store from '@/store'
import moment from 'moment'
import _ from 'lodash'

/**
 * @param loading {boolean}
 * @param fields {object}
 * @param watcher {function} - Используется для ленивой подгрузки данных из стора. Должно быть реактивным. Например computed
 * @returns {{$v: *, $invalid: *, reset: *, $errors: *, formData: *, getDataForm: *, validate: *, update: *}}
 */
export default function () {
  return {}
}
