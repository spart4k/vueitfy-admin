import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  carouselField,
  docListField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  path: 'upload',
  id: uuidv4(),
  name: 'Загрузить',
  type: 'FormDefault',
  detail: true,
  fields: [
    dateField({
      label: 'Период:',
      name: 'date',
      subtype: 'period',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      alias: 'p.date_status',
    }),
    checkboxField({
      label: 'Табель',
      name: 'tabel',
      placeholder: '',
      readonly: false,
      notSend: true,
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
      value: true,
    }),
    dropZoneField({
      label: 'Тип файла / часы:',
      name: 'file',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      options: {
        withoutSave: false,
        folder: 'parser_magnit',
        name: '`parser_magnit`',
        paramsForEmit: this,
        acceptedFiles: '.xlsx',
      },
      value: [],
    }),
    textBlock({
      label: 'Создал',
      name: 'type',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      value: 1,
      //validations: { required },
      //isShow: false,
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'text',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
    stringAction({
      text: 'Загрузить',
      type: 'submit',
      module: 'form/create',
      name: 'saveForm',
      action: 'saveForm',
      url: '',
      conditionAction: [
        {
          target: 'url',
          from: 'tabel',
          result: {
            true: 'parser/magnit_list',
            false: 'parser/magnit_pivot',
          },
        },
      ],
    }),
  ],
}
