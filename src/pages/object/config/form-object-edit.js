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
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  path: 'edit',
  lists: [
    {
      alias: 'direction_object',
      filter: [],
    },
    {
      alias: 'type',
      filter: [],
    },
    {
      alias: 'object_type',
      filter: [],
    },
    {
      alias: 'object_subtype',
      filter: [
        {
          field: 'type',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
    {
      alias: 'filial_id',
      filter: [],
    },
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
  alias: 'object',
  active: false,
  fields: [
    selectField({
      label: 'Направление',
      name: 'direction_json',
      alias: 'direction_object',
      subtype: 'multiple',
      placeholder: '',
      stringify: true,
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
          alias: 'object_type',
          filter: [
            {
              field: 'direction_json',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
      ],
      bootstrapClass: [''],
      dependence: [
        {
          //fields: ['statement_card', 'cardowner'],
          type: 'default',
          action: {
            type: 'hideOptions',
            //values: [8],
            field: 'direction_json',
            condition: [
              {
                value: [2],
                options: [1, 6],
              },
              {
                value: [6],
                options: [2],
              },
              {
                value: [1],
                options: [2],
              },
              {
                value: [1, 6],
                options: [2],
              },
            ],
          },
          //url: 'object_id/avatar_with_user_key_id',
        },
      ],
    }),
    selectField({
      label: 'Тип',
      name: 'type',
      alias: 'object_type',
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
      requiredFields: ['direction_json'],
      updateList: [
        {
          alias: 'object_subtype',
          filter: [
            {
              field: 'type',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Подтип',
      name: 'subtype',
      alias: 'object_subtype',
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
      requiredFields: ['type'],
      isShow: {
        value: false,
        conditions: [
          {
            field: 'subtype',
            target: 'items',
            value: 'notEmpty',
          },
          {
            field: 'type',
            target: 'value',
            value: 'notEmpty',
          },
        ],
      },
    }),
    stringField({
      label: 'Название',
      name: 'name',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 8,
      },
      bootstrapClass: [''],
      required: { required },
    }),
    colorPicker({
      label: 'Цвет',
      name: 'color',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    autocompleteField({
      label: 'Регион',
      name: 'regions_id',
      alias: 'regions_id',
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
      url: 'get/pagination_list/regions_id',
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
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
      //alias: 'city_id',
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
      validations: { required },
      bootstrapClass: [''],
      requiredFields: ['regions_id'],
    }),
    stringField({
      label: 'Адрес',
      name: 'address',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
      //validations: { required },
      //isShow: false,
    }),
    stringField({
      label: 'ФИО директора',
      name: 'fio_director',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
      //isShow: false,
    }),
    stringField({
      label: 'Телефон',
      name: 'tel_director',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
      //isShow: false,
    }),
    checkboxField({
      label: 'Питание',
      name: 'with_nutrition',
      placeholder: '',
      value: false,
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
      isShow: {
        value: false,
        conditions: [
          {
            field: 'direction_json',
            type: 'array',
            value: [[1], [6], [1, 6]],
          },
        ],
      },
    }),
    stringField({
      label: 'Стоимость питания',
      name: 'sum_nutrition',
      placeholder: '',
      //value: 0,
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      isShow: {
        value: false,
        conditions: [
          {
            field: 'with_nutrition',
            value: [true],
          },
        ],
      },
      validations: { required },
      //isShow: false,
    }),
    stringField({
      label: 'Имя печатной формы',
      name: 'print_form_name',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      isShow: {
        value: false,
        conditions: [
          {
            field: 'direction_json',
            type: 'array',
            value: [[1], [1, 6]],
          },
          {
            field: 'type',
            value: [8, 11],
          },
        ],
      },
      validations: { required },
      //isShow: false,
    }),
    stringField({
      label: 'ID X5',
      name: 'num_from_x5',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      isShow: {
        value: false,
        conditions: [
          {
            field: 'direction_json',
            type: 'array',
            value: [[1], [1, 6], [6], [2]],
          },
          {
            field: 'type',
            value: [11, 1],
          },
        ],
      },
      validations: { required },
      //isShow: false,
    }),
    stringField({
      label: 'Площадь М^2',
      name: 'square',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      isShow: {
        value: false,
        conditions: [
          {
            field: 'direction_json',
            type: 'array',
            value: [[6], [1, 6]],
          },
        ],
      },
      validations: { required },
      //isShow: false,
    }),
    selectField({
      label: 'Филиал',
      name: 'filial_id',
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
      isShow: {
        value: false,
        conditions: [
          {
            field: 'direction_json',
            type: 'array',
            value: [[2]],
          },
          {
            field: 'type',
            value: [2],
          },
        ],
      },
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'object',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'set/object',
      action: 'saveFormId',
      color: 'primary',
    }),
  ],
}
