/* eslint-disable */
import { ref, unref } from 'vue'

import _throttle from 'lodash/throttle'

import processError from '@/utils/processError'

function asyncThrottle(func, wait) {
  const throttled = _throttle(
    (resolve, reject, args) => {
      func(...args)
        .then(resolve)
        .catch(reject)
    },
    wait,
    { leading: false, trailing: true }
  )
  return (...args) =>
    new Promise((resolve, reject) => {
      throttled(resolve, reject, args)
    })
}

/**
 *
 * @param request {function}
 * @param context {object} – контекст vue приложения, получаем из setup(props, context)
 * @param successMessage {string}
 * @param successCallback {function}
 * @param failCallback {function}
 * @param withErrors {boolean}
 * @param unconditionalMessage {string}
 * @param throttled {number}
 * @returns {{loading: *, makeRequest: *}}
 */
export default function ({
  request,
  context,
  successMessage,
  successCallback,
  failCallback,
  withErrors = true,
  //unconditionalMessage,
  throttled = 0,
}) {
  const { store } = context.root
  const loading = ref(false)

  let makeRequest = (data) => {
    console.log('sadf',data);
    //loading.value = true
    return request(data)
      .then((responseData) =>
      {
        //if (successMessage) $notifier.showMessage({ content: unref(successMessage), color: 'success' })
        if (successMessage) store.commit(
          'notifies/showMessage',
          {
            color: 'success',
            content: unref(successMessage),
          },
        )
        if (successCallback) successCallback()
        return responseData
      })
      .catch((err) => {
        console.log(err)
        //if (withErrors) $notifier.showMessage({ content: processError(err).text, color: 'error' })
        if (withErrors) store.commit(
          'notifies/showMessage',
          {
            color: 'error',
            content: processError(err).text,
          },
        )
        if (failCallback) failCallback()
        throw err
      })
      .finally(() => {
        //if (unconditionalMessage) $notifier.showMessage({ content: unconditionalMessage, color: 'grey' })
        loading.value = false
      })
  }

  if (throttled) {
    makeRequest = asyncThrottle(makeRequest, throttled)
    // makeRequest = _throttle(makeRequest, throttled, { trailing: true, leading: false })
  }

  return {
    loading,
    makeRequest,
  }
}
