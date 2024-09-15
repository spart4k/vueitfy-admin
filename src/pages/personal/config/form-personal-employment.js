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
  path: 'employment',
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  lists: [
    {
      alias: 'grajdanstvo_id',
      filter: [],
    },
    {
      alias: 'employed_registry',
      filter: [],
    },
  ],
  // alias: 'personal',
  active: false,
  fields: [
    selectField({
      label: 'Гражданство',
      name: 'citizenship',
      alias: 'grajdanstvo_id',
      subtype: 'multiple',
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
      updateList: [
        {
          alias: 'documents',
          filter: [
            {
              field: 'grajdanstvo_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
        {
          alias: 'employed_registry',
          filter: [],
        },
      ],
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Документы',
      name: 'docs',
      alias: 'documents',
      subtype: 'multiple',
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
      label: 'Тип реестров',
      name: 'reestr',
      alias: 'employed_registry',
      //   subtype: 'multiple',
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
      dependence: [
        {
          type: 'computed',
          funcComputed: (context) => {
            if (context.formData.reestr === 2) {
              context.formData.employed = true
            } else {
              context.formData.employed = false
            }
          },
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    checkboxField({
      label: 'Трудоустроенные',
      name: 'employed',
      placeholder: '',
      value: false,
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) => {
              return context.formData?.reestr === 2
            },
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
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
      module: 'form/update',
      name: 'createForm',
      url: 'report/personal/employed',
      withTableFilter: true,
      download: true,
      action: 'createForm',
      color: 'primary',
      // handlingResponse: {
      //   result: 'code',
      //   1: {
      //     text: 'Направление добавлено',
      //     color: 'success',
      //   },
      //   2: {
      //     text: 'Направление не добавлено',
      //     color: 'error',
      //   },
      //   3: {
      //     text: 'Направление уже добавлено',
      //     color: 'warning',
      //   },
      // },
    }),
  ],
}
