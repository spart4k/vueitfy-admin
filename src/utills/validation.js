import { required as vueRequired } from '@vuelidate/validators'

const required = Object.assign({}, vueRequired, {
  $message: () => 'Обязательное поле',
})

const requiredIf = (needValidation) => ({
  ...required,
  $validator: (val) => {
    if (!needValidation()) {
      return true
    }
    return required.$validator(val)
  },
})

const phone = {
  $validator: (val) => val.length > 10,
  $message: () => 'Не менее 11 символов',
}
const nameLength = {
  $validator: (val) => val.length > 4,
  $message: () => 'Не менее 5 символов',
}

const sameAs = (value) => ({
  $validator: (val) => {
    try {
      return val === value()
    } catch (err) {
      return false
    }
  },
  $message: () => 'Пароли должны совпадать',
})

const password = {
  $validator: (val) => val.length > 7,
  $message: () => 'Не менее 8 символов',
}

const onlyNumeric = {
  $validator: (val) =>
    /^\+[0-9](\([0-9]{3}\)|[0-9]{3})[0-9]{3}[0-9]{4}$/.test(val),
  $message: () => 'Некорректный номер телефона',
}

export {
  required,
  requiredIf,
  sameAs,
  password,
  // email,
  phone,
  onlyNumeric,
  nameLength,
  // strongPassword
}
