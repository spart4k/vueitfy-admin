import {
  required as vueRequired,
  minLength as vueMinLength,
} from '@vuelidate/validators'

const required = Object.assign({}, vueRequired, {
  $message: () => 'Обязательное поле',
})

const minLength = Object.assign({}, vueMinLength, {
  $message: () => 'Недостаточно символов',
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

const hasDate = {
  $validator: (val) => {
    const splitedValue = val.split(' ')
    return splitedValue[0]
  },
  $message: () => 'Выберите дату',
}

const hasTime = {
  $validator: (val) => {
    const splitedValue = val.split(' ')
    return splitedValue[1]
  },
  $message: () => 'Выберите время',
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
  hasDate,
  hasTime,
  minLength,
  // strongPassword
}
