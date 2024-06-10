import {
  required as vueRequired,
  minLength as vueMinLength,
  maxLength as vueMaxLength,
  numeric as vueNumeric,
} from '@vuelidate/validators'
import moment from 'moment'

const numeric = Object.assign({}, vueNumeric, {
  $message: () => 'Только числа',
})

const required = Object.assign({}, vueRequired, {
  $message: () => 'Обязательное поле',
})

// const length = (value) => {
//   return {
//     $validator: (val) => val.length === { value },
//     $message: () => 'Не менее 11 символов',
//   }
// }

const length = (param) => {
  return {
    $validator: (value) => param === value.length,
    $message: () => `Необходимое кол-во символов: ${param}`,
  }
}

const minLength = (value) =>
  Object.assign({}, vueMinLength(value), {
    $message: () => `Недостаточно символов (${value})`,
  })

const maxLength = (value) =>
  Object.assign({}, vueMaxLength(value), {
    $message: () => `Максимум символов: ${value}`,
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

const validDate = {
  $validator: (val) => {
    const date = moment(val)
    return date.isValid()
  },
  $message: () => 'Указанная дата не существует',
}

const hasTime = {
  $validator: (val) => {
    const splitedValue = val.split(' ')
    return splitedValue[1]
  },
  $message: () => 'Выберите время',
}
const hasBothDateMessage = ['', '']
const hasBothDate = {
  $validator: (val) => {
    // const splitedValue = val.split(' ')
    if (val.every((el) => !el)) {
      return true
    } else if (val.every((el) => el)) {
      return true
    } else {
      return val.some((el, index) => {
        if (!el) {
          hasBothDateMessage[index] = 'Выберите дату'
          return false
        }
      })
    }

    // return splitedValue[0] !== null && splitedValue[1] !== null
  },
  $message: () => hasBothDateMessage,
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

const number = {
  $validator: (val) =>
    val === '' && val === null
      ? true
      : Number(val) && !val.toString().split('').includes(' '),
  $message: () => 'Некорректные символы',
}

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
  validDate,
  hasTime,
  minLength,
  numeric,
  hasBothDate,
  length,
  number,
  maxLength,
  // strongPassword
}
