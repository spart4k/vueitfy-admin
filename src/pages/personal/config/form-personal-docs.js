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
import TableDefault from '@/components/Table/default/index.vue'

export default {
  id: uuidv4(),
  path: 'edit',
  name: 'Данные документов',
  type: 'FormDocuments',
  detail: true,
  lists: [
    'user_keys',
    'habitation_id',
    'account_id',
    'direction_id',
    'grajdanstvo_id',
  ],
  alias: 'personal',
  active: false,
  documents: [
    {
      type: 'passport',
      name: 'Паспорт',
      fields: [],
    },
    {
      type: 'Snils',
      name: 'Снилс',
      fields: [
        stringField({
          label: 'Номер',
          name: 'name',
          placeholder: '',
          readonly: false,
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          bootstrapClass: [''],
          //validations: { required },
          //isShow: false,
        }),
      ],
    },
    {
      type: 'passport_page_2',
      name: 'Паспорт стр.2',
      fields: [
        stringField({
          label: 'Адрес регистрации',
          name: 'issued_by',
          placeholder: '',
          readonly: false,
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          bootstrapClass: [''],
          //validations: { required },
          //isShow: false,
        }),
      ],
    },
    {
      type: 'inn',
      name: 'ИНН',
      fields: [
        stringField({
          label: 'Адрес регистрации',
          name: 'issued_by',
          placeholder: '',
          readonly: false,
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          bootstrapClass: [''],
          //validations: { required },
          //isShow: false,
        }),
      ],
    },
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'disabled',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: '',
      name: 'saveForm',
      nextForm: true,
    }),
  ],
}
