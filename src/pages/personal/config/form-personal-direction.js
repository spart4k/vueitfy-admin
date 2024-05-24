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
  path: 'direction',
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  lists: [
    {
      alias: 'directions_free_personal',
      filter: [
        {
          field: 'personal_id',
          value: '',
          // source: '+route.params.id',
          routeKey: 'id',
          type: 'num',
        },
      ],
      emptyWarning: {
        text: 'Все доступные направления добавлены',
      },
    },
    // 'user_keys',
    // 'habitation_id',
    // 'account_id',
    // 'direction_id',
    // 'grajdanstvo_id',
  ],
  alias: 'personal',
  active: false,
  notReadonly: true,
  fields: [
    selectField({
      label: 'Направление',
      name: 'direction_json',
      alias: 'directions_free_personal',
      subtype: 'multiple',
      // subtype: 'multiple',
      placeholder: '',
      notPut: true,
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
      // readonly: true,
      // readonly: {
      //   value: false,
      //   condition: [
      //     editFormPermissions.brigadir,
      //     editFormPermissions.manager[1],
      //     editFormPermissions.rukFIlCUPDirector.denied,
      //     // editFormPermissions.DBA.access,
      //     editFormPermissions.OBDandOKK.denied,
      //   ],
      // },
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
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveForm',
      url: 'update/personal/direction',
      action: 'saveForm',
      color: 'primary',
      handlingResponse: {
        result: 'code',
        1: {
          text: 'Направление добавлено',
          color: 'success',
        },
        2: {
          text: 'Направление не добавлено',
          color: 'error',
        },
        3: {
          text: 'Направление уже добавлено',
          color: 'warning',
        },
      },
    }),
  ],
}
