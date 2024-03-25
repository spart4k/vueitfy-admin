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
  path: 'load',
  name: 'load',
  type: 'FormDefault',
  detail: true,
  alias: 'personal',
  active: false,
  fields: [
    dropZoneField({
      label: 'Файл',
      name: 'photo_path',
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
        folder: 'user_keys',
        name: '`Заявка_ФИО_${form.fields.find((el) => el.name === "personal_id").selectOptionName}_${formData["object_id"]}`',
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
      to: 'personal',
      skipValidation: true,
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
