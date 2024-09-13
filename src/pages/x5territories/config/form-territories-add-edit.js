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
  id: uuidv4(),
  name: 'Редактировать территорию',
  type: 'FormDefault',
  path: 'add',
  alias: 'x5_territories',
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
      url: 'create/x5/territories',
      name: 'createForm',
      action: 'createForm',
      handlingResponse: {
        1: {
          text: 'Успешно',
          color: 'success',
        },
        2: {
          text: 'Ошибка на стороне сервера',
          color: 'error',
        },
        3: {
          text: 'Доступ запрещен',
          color: 'error',
        },
        4: {
          text: 'Территория с таким названием уже существует',
          color: 'error',
        },
        5: {
          text: 'Неверный формат входных параметров',
          color: 'error',
        },
        6: {
          text: 'Отсутствуют необходимые данные',
          color: 'error',
        },
      },
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
      module: 'form/putForm',
      url: 'update/x5/territories',
      name: 'saveForm',
      useRouteParam: 'id',
      action: 'saveForm',
      color: 'primary',
      handlingResponse: {
        1: {
          text: 'Успешно',
          color: 'success',
        },
        2: {
          text: 'Ошибка на стороне сервера',
          color: 'error',
        },
        3: {
          text: 'Доступ запрещен',
          color: 'error',
        },
        4: {
          text: 'Территория с таким названием уже существует',
          color: 'error',
        },
        5: {
          text: 'Неверный формат входных параметров',
          color: 'error',
        },
        6: {
          text: 'Отсутствуют необходимые данные',
          color: 'error',
        },
      },
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
