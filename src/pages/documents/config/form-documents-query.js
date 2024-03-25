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
  path: 'query',
  id: uuidv4(),
  name: 'Запросить документы',
  type: 'FormStage',
  detail: true,
  stages: [
    {
      id: uuidv4(),
      name: '',
      type: 'FormDefault',
      // detail: true,
      lists: [
        {
          alias: 'personal_missing_documents',
          filter: [
            {
              field: 'personal_id',
              type: 'num',
              value: '',
              source: 'formData',
            },
            {
              field: 'grajdanstvo_id',
              type: 'num',
              value: '',
              source: 'formData',
            },
          ],
        },
      ],
      alias: 'personal_target',
      active: true,
      fields: [
        selectField({
          label: 'Тип граждан',
          name: 'grajdanstvo_id',
          // alias: 'direction_id_logistic',
          placeholder: '',
          class: [''],
          selectOption: {
            text: 'name',
            value: 'id',
          },
          disabled: true,
          value: 0,
          items: [
            { id: 0, name: 'Новые' },
            { id: 1, name: 'ЕАЭС' },
            { id: 2, name: 'Нерезиденты' },
            { id: 3, name: 'РФ' },
          ],
          position: {
            cols: 12,
            sm: 12,
          },
          validations: { required },
          bootstrapClass: [''],
          update: {
            module: 'selects/getList',
            fields: ['object_id'],
          },
        }),
        checkboxField({
          label: 'Персонально',
          name: 'personally',
          placeholder: '',
          notSend: true,
          readonly: false,
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          bootstrapClass: [''],
        }),
        autocompleteField({
          label: 'Линейщики',
          name: 'personal_id',
          subtype: 'single',
          placeholder: '',
          class: [''],
          selectOption: {
            text: 'name',
            value: 'id',
          },
          isShow: {
            value: false,
            conditions: [{ field: 'personally', value: [true] }],
          },
          items: [],
          page: 1,
          search: '',
          url: 'get/pagination_list/personal_logistic_document',
          position: {
            cols: 12,
            sm: 12,
          },
          // validations: { required },
          bootstrapClass: [''],
          updateList: [
            {
              alias: 'personal_missing_documents',
              filter: [
                {
                  field: 'grajdanstvo_id',
                  type: 'num',
                  value: '',
                  source: 'formData',
                },
                {
                  field: 'personal_id',
                  type: 'num',
                  value: '',
                  source: 'formData',
                },
              ],
            },
          ],
        }),
        selectField({
          label: 'Документы',
          name: 'docs_id',
          alias: 'personal_missing_documents',
          // url: 'get/pagination_list/personal_logistic_document',
          subtype: 'multiple',
          placeholder: '',
          class: [''],
          selectOption: {
            text: 'name',
            value: 'id',
          },
          isShow: {
            value: false,
            conditions: [{ field: 'personally', value: [true] }],
          },
          // value: 3,
          items: [
            // { id: 1, name: 'Новые' },
            // { id: 2, name: 'ЕАЭС' },
            // { id: 3, name: 'Нерезиденты' },
            // { id: 4, name: 'РФ' },
          ],
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
          text: 'Создать',
          type: 'submit',
          module: 'personal/create',
          url: 'query/docs',
          name: 'createForm',
          action: 'createForm',
          color: 'primary',
        }),
      ],
      formData: {},
    },
  ],
}
