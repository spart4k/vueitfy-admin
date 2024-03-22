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
  path: 'add-key',
  id: uuidv4(),
  name: 'Добавить ключ',
  type: 'FormDefault',
  detail: true,
  lists: [{ alias: 'objects_personal', filter: [] }],
  fields: [
    autocompleteField({
      label: 'Сотрудник',
      name: 'personal_id',
      alias: 'personal_logistic_x5',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      selectOptionName: '',
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/personal_logistic_x5',
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'objects_personal',
          filter: [
            {
              field: 'personal_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Объекты',
      name: 'object_id',
      alias: 'objects_personal',
      //subtype: 'multiple',
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
      //readonly: true,
    }),
    dropZoneField({
      label: 'Файл акта',
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
      text: 'Сохранить',
      type: 'submit',
      module: 'form/create',
      url: 'query/user_key',
      name: 'saveForm',
      action: 'saveFormStore',
    }),
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}
