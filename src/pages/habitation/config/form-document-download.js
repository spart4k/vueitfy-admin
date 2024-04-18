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
import formOwnerAddEdit from './form-owner-add-edit'
import formRealtorAddEdit from './form-realtor-add-edit'

export default {
  id: uuidv4(),
  name: 'Запросить документ',
  type: 'FormDefault',
  path: 'habitation-add',
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
    // {
    //   alias: 'account_objects',
    //   filter: [
    //     {
    //       source: 'formData',
    //       type: 'num',
    //       value: 'id',
    //       field: 'region_id',
    //       alias: 'regions_id',
    //     },
    //   ],
    // },
  ],
  fields: [
    selectField({
      label: 'Документ',
      name: 'document_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [
        {
          name: 'termination',
          id: 1,
        },
        {
          name: 'conclusion',
          id: 2,
        },
        {
          name: 'employment',
          id: 3,
        },
        {
          name: 'contract',
          id: 4,
        },
        {
          name: 'gph',
          id: 5,
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Регион',
      name: 'regions_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      notSend: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'city_id',
          filter: [
            {
              field: 'regions_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Город',
      name: 'city_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5] }],
      },
      bootstrapClass: [''],
      filter: [
        {
          field: 'regions_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    }),
    dateField({
      label: 'Дата создания',
      name: 'date_contract',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Линейщик',
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
        conditions: [{ field: 'document_id', value: [1, 2, 3, 4, 5] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    selectField({
      label: 'МВД',
      name: 'mvd_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 3] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Объект',
      name: 'object_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 3, 5] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Юридическое лицо',
      name: 'juridical_person_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 3, 4, 5] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата расторжения',
      name: 'date_cancel',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    checkboxField({
      label: 'Инициатива расторжения иностранного гражданина',
      name: 'is_cancel',
      value: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата заключения',
      name: 'date_conclusion',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [2] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата подписания',
      name: 'date_create',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),

    stringField({
      label: 'Услуги',
      name: 'service',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    dateField({
      label: 'Дата начала выполнения работ',
      name: 'date_start',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата окончания выполнения работ',
      name: 'date_end',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Зарплата',
      name: 'salary',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Цена за единицу',
      name: 'price',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
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
      url: 'create/habitation',
      name: 'saveFormStore',
      action: 'saveFormStore',
    }),
  ],
}
