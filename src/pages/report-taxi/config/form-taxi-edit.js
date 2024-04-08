import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'edit',
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  lists: [],
  alias: 'taxi',
  active: false,
  fields: [
    stringField({
      label: 'Менеджер',
      name: 'account_name',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: 'Телефон',
      name: 'telephone',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    dateField({
      label: 'Дата поездки',
      name: 'date',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      disable: false,
      //mode: 'edit',
    }),
    stringField({
      label: 'Откуда',
      name: 'address_from',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: 'Куда',
      name: 'address_to',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: 'Оплата',
      name: 'card',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: 'Тариф',
      name: 'tarif',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: 'Цена',
      name: 'price',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: 'Время в пути',
      name: 'time_ride',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
  ],
}
