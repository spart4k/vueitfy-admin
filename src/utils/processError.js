/* eslint-disable */
// import isArray from 'lodash/isArray'
//import i18n from '@/plugins/vueI18n'

const processError = (err) => {
  const error = {
    string: '',
    array: [],
    object: {},
  }
  if (err.response.data.length) {
    const { data } = err.response
    //if (err.response.status === 500) {
    //  error.text =
    //} else {
      error.text = data.type
      error.array = [data.type]
      error.object = { error: data.type }
    //}
    // else if (data.errors) {
    //   error.array = Object
    //     .values(data.errors)
    //     .map(item => item.join(', '))
    //
    //   error.object = Object
    //     .keys(data.errors)
    //     .reduce((obj, key) => {
    //       obj[key] = data.errors[key].join(', ')
    //       return obj
    //     }, {})
    //
    //   error.text = error.array.join(', ')
    // } else if (data.messages) {
    //   error.text = isArray(data.messages) ? data.messages.join(', ') : data.messages
    // }
  } else {
    error.text = err.message
  }
  return error
}

export default processError
