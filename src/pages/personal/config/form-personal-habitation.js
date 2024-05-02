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
  name: 'Редактировать проживание',
  type: 'FormDefault',
  path: 'edit_habitation',
  alias: 'habitation',
  active: false,
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [],
  },
  lists: [
    {
      alias: 'personal_habitation',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
  ],
  fields: [
    selectField({
      label: 'personal_habitation_orig',
      name: 'personal_habitation',
      subtype: 'single',
      putFirst: true,
      notSend: true,
      readonly: true,
      isShow: {
        value: true,
      },
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
          type: 'default',
          fillField: [
            {
              formKey: 'personal_habitation',
              compareKey: 'id',
              objectKey: 'id',
              targetKey: 'habitation_id',
            },
          ],
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'habitation_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      search: '',
      url: 'get/pagination_list/habitation',
      defaultItems: [
        {
          id: 11,
          name: '--Самостоятельное--',
        },
      ],
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
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
      label: 'Дата выселения',
      name: 'date_out',
      subtype: 'date',
      placeholder: '',
      classes: [''],
      isShow: {
        value: false,
        reverse: true,
        conditions: [{ field: 'personal_habitation', value: [11] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    textareaField({
      label: 'Причина',
      name: 'why',
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        reverse: true,
        conditions: [{ field: 'personal_habitation', value: [11] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата заселения',
      name: 'date_in',
      subtype: 'date',
      placeholder: '',
      classes: [''],
      isShow: {
        value: false,
        reverse: true,
        conditions: [{ field: 'habitation_id', value: [11] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    checkboxField({
      label: 'С регистрацией',
      name: 'with_check_in',
      value: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        reverse: true,
        conditions: [{ field: 'habitation_id', value: [11] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    textareaField({
      label: 'Комментарий',
      name: 'comment',
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        reverse: true,
        conditions: [{ field: 'habitation_id', value: [11] }],
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
      color: 'primary',
      module: 'form/create',
      url: 'tempalweq/personal_doc',
      useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
      download: true,
      name: 'createForm',
      action: 'createForm',
    }),
  ],
}
