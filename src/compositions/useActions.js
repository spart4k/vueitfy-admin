/* eslint-disable */

import form from "../store/modules/form"

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
  context,
  changeForm,
  tab,
  nextForm,
  loading,
  formData,
  validate,
}) {
  const { emit } = context.root.ctx
  const clickHandler = async (action) => {
    //if (!validate()) return
    if (action.action === 'saveFilter') {
      emit('sendFilter', formData)
    } else if (action.action === 'nextStage') {
      emit('nextStage', formData)
    } else if (action.action === 'prevStage') {
      console.log(action)
      emit('prevStage')
    } else if (action.action === 'saveForm') {
      loading.value = true
      await changeForm()
      loading.value = false
      const isNextForm = true
      if (isNextForm) {
        nextForm()
      }
    }

  }
  const submit = async () => {
    //if (!validate()) return
    loading.value = true
    if (props.tab.isFilter) {
      emit('sendFilter', formData)
    } else if (props.tab.actions[0].nextForm) {
      emit('nextStage', formData)
    } else if (props) {
      await changeForm()
      const isNextForm = true
      if (isNextForm) {
        nextForm()
      }
    }
    loading.value = false
  }
  return {
    clickHandler,
    //submit,
  }
}
