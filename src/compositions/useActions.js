/* eslint-disable */

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
}) {
  const { emit } = context.root.ctx
  const clickHandler = async (action) => {
    loading.value = true
    if (action.action === 'saveFilter') {
      emit('sendFilter', formData)
    } else if (action.action === 'nextStage') {
      emit('nextStage')
    } else if (action.action === 'prevStage') {
      console.log(action)
      emit('prevStage')
    } else if (action.action === 'saveForm') {
      await changeForm()
      const isNextForm = true
      if (isNextForm) {
        nextForm()
      }
    }
    loading.value = false
  }
  const submit = async () => {
    //if (!validate()) return
    loading.value = true
    if (props.tab.isFilter) {
      emit('sendFilter', formData)
    } else if (props.tab.actions[0].nextForm) {
      emit('nextStage')
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
