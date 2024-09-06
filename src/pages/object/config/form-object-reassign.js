import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'reassign',
  name: 'Переназначить',
  type: 'FormDefault',
  detail: true,
  alias: 'object',
  active: false,
  lists: [
    {
      alias: 'reassign_directions_object',
      filter: [],
    },
  ],
  fields: [
    selectField({
      label: 'Направление',
      name: 'reassign_directions_object',
      requestKey: 'direction_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_json',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/reassign_object_slave',
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'reassign_accounts_slave',
          filter: [
            {
              field: 'object_json',
              alias: 'object_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Назначенные',
      name: 'reassign_accounts_slave',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      notSend: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
      readonly: true,
      items: [],
      valueEqualList: true,

      // object

      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Аккаунт',
      name: 'account_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/reassign_account_slave',
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      dependence: [
        {
          type: 'default',
          fillField: ['permission_id'],
        },
        {
          type: 'computed',
          funcComputed: (context) => {
            if (context.formData.permission_id !== 9) {
              context.formData.with_target = false
            }
          },
        },
      ],
    }),
    textBlock({
      label: 'Создал',
      name: 'permission_id',
      placeholder: '',
      readonly: true,
      notSend: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    checkboxField({
      label: 'С назначением',
      name: 'with_target',
      value: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      isShow: {
        value: false,
        conditions: [{ field: 'permission_id', value: [9] }],
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
      module: 'form/putForm',
      name: 'createForm',
      url: 'object/reassign',
      action: 'createForm',
      color: 'primary',
      handlingResponse: {
        1: {
          text: 'Запрос прошел успешно',
          color: 'success',
        },
        2: {
          text: 'Произошла ошибка, попробуйте ещё раз',
          color: 'error',
          func: (context) => {
            context.formData.object_json = context.result.data.reduce(
              (acc, item) => {
                if (item.critical_error === false) acc.push(item.object_id)
                return acc
              },
              []
            )
            context.changeAutocomplete({
              field: context.fields.object_json,
              value: context.formData.object_json,
            })
          },
        },
        3: {
          text: 'Ошибка с доступами',
          color: 'error',
        },
      },
    }),
  ],
}
