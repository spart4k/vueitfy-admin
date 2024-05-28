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
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Редактировать юр. лицо',
  type: 'FormDefault',
  path: 'add',
  alias: 'juridical_person',
  active: false,
  detail: true,
  lists: [],
  fields: [
    stringField({
      label: 'Название',
      name: 'name',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Сокращенное название',
      name: 'name_reduced',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Адрес',
      name: 'address',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ФИО директора',
      name: 'director_fio',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Банк',
      name: 'bank_name',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'БИК',
      name: 'bik',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ИНН',
      name: 'inn',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'КПП',
      name: 'kpp',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'КС',
      name: 'ks',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ОГРН',
      name: 'ogrn',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ОКВЕД',
      name: 'okved',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Расчетный счет',
      name: 'rs',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Телефон',
      name: 'telephone',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
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
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      color: 'primary',
      module: 'form/create',
      url: 'set/data/juridical_person',
      name: 'createForm',
      action: 'createForm',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            field: 'mode',
            target: 'environment',
            value: ['edit'],
            type: true,
          },
        ],
      },
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/update',
      url: 'set/data/juridical_person',
      name: 'saveForm',
      useRouteParam: 'id',
      action: 'saveForm',
      color: 'primary',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            field: 'mode',
            target: 'environment',
            value: ['add'],
            type: true,
          },
        ],
      },
    }),
  ],
}
