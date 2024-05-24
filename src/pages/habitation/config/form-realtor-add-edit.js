import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Редактировать риэлтора',
  type: 'FormDefault',
  path: 'habitation-realtor-add',
  alias: 'realtors',
  routeParam: 'realtor_id',
  active: false,
  detail: true,
  lists: [],
  fields: [
    stringField({
      label: 'ФИО',
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
    autocompleteField({
      label: 'Регион',
      name: 'region_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      validations: { required },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Название агенства',
      name: 'agency',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { },
      bootstrapClass: [''],
    }),
    textareaField({
      label: 'Комментарий',
      name: 'comment',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
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
      module: 'form/create',
      name: 'createForm',
      url: 'set/data/realtors',
      action: 'createForm',
      color: 'primary',
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
      url: 'set/data/realtors',
      name: 'saveForm',
      useRouteParam: 'realtor_id',
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
