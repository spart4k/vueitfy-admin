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
import FormDefault from '@/components/Form/default/index.vue'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  path: 'write-c3',
  id: 2,
  name: 'Профит',
  type: FormDefault,
  detail: true,
  lists: [
    { alias: 'shifts_without_day_night', filter: [] },
    { alias: 'bigadirs_access', filter: [] },
    {
      alias: 'brigadir_objects',
      filter: [
        {
          alias: 'brigadir_id',
          value: '',
          type: 'num',
        },
      ],
    },
  ],
  // alias: 'personal',
  active: false,
  fields: [
    selectField({
      label: 'Бригадир',
      name: 'bigadirs_access',
      requestKey: 'brigadir_id',
      // alias: 'brigadir_id',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'brigadir_objects',
          filter: [
            {
              alias: 'brigadir_id',
              value: '',
              type: 'num',
              source: 'formData.bigadirs_access',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Объект',
      name: 'brigadir_objects',
      requestKey: 'object_id',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Тип смены',
      name: 'shifts_without_day_night',
      requestKey: 'type',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата',
      name: 'date',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      color: 'defaultText',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/create',
      url: 'report/print_form',
      name: 'createForm',
      action: 'createForm',
      download: ['url', 'url_real'],
    }),
  ],
  formData: {},
}
