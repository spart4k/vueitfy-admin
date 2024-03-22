import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'load',
  name: 'load',
  type: 'FormDefault',
  detail: true,
  alias: 'personal',
  active: false,
  fields: [
    dropZoneField({
      label: 'Файл',
      name: 'file_path',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
      options: {
        withoutSave: false,
        folder: 'accounting',
        name: '`accounting_payment`',
        paramsForEmit: this,
      },
      value: [],
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'payment',
      skipValidation: true,
    }),
    stringAction({
      text: 'Загрузить',
      type: 'submit',
      module: 'table/loadStatus',
      url: 'accounting/payment/import',
      successMessage: false,
      name: 'saveForm',
      action: 'saveFormStore',
    }),
    //stringAction({
    //  text: 'Сохранить',
    //  type: 'submit',
    //  module: '',
    //  name: 'saveForm',
    //  //action: 'saveForm',
    //  nextForm: true,
    //}),
  ],
}
