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
  dateRangeField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, numeric, dateRange } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'tarif',
  name: 'Тариф',
  type: 'FormDefault',
  detail: true,
  alias: 'object',
  active: false,
  lists: [
    {
      alias: 'type_change_rate',
      filter: [],
    },
    {
      alias: 'object_type',
      filter: [
        {
          alias: 'direction_json',
          sendEmpty: true,
          value: [2],
          type: 'array',
        },
      ],
    },
  ],
  fields: [
    selectField({
      label: 'Тип',
      name: 'type_change_rate',
      placeholder: '',
      notSend: true,
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
      label: 'Тип объекта',
      name: 'object_type',
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
      updateList: [
        {
          alias: 'object_subtype',
          filter: [
            {
              field: 'object_type',
              alias: 'type',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
        {
          alias: 'category_change_rate',
          filter: [
            {
              field: 'object_type',
              alias: 'type',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'doljnost',
          url: 'get/pagination_list/object_change_rate_position',
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Подтип объекта',
      name: 'subtype',
      alias: 'object_subtype',
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
      isShow: {
        value: false,
        conditions: [
          {
            target: 'items',
            value: 'notEmpty',
          },
        ],
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Регион',
      name: 'regions_id',
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
      defaultItems: [
        {
          id: 0,
          name: '--Все--',
        },
      ],
      url: 'get/pagination_list/regions_id',
      validations: { required },
      position: {
        cols: 12,
        sm: 12,
      },
      dependence: [
        {
          type: 'computed',
          funcComputed: (context) => {
            if (context.formData.regions_id.length) {
              if (context.formData.regions_id.at(-1) === 0) {
                context.formData.regions_id = [0]
              } else {
                context.formData.regions_id =
                  context.formData.regions_id.filter((item) => {
                    return item
                  })
              }
            }
          },
        },
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'city_id',
          url: 'get/pagination_list/city_regions',
        },
      ],
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Город',
      name: 'city_id',
      requestKey: 'citys',
      subtype: 'multiple',
      autoselectNew: true,
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      defaultItems: [
        {
          id: 0,
          name: '--Все--',
        },
      ],
      page: 1,
      search: '',
      url: 'get/pagination_list/city_regions',
      position: {
        cols: 12,
        sm: 12,
      },
      filter: [
        {
          field: 'regions_id',
          alias: 'regions_id',
          value: '',
        },
      ],
      dependence: [
        {
          type: 'computed',
          funcComputed: (context) => {
            if (context.formData.city_id.length) {
              if (context.formData.city_id.at(-1) === 0) {
                context.formData.city_id = [0]
              } else {
                context.formData.city_id = context.formData.city_id.filter(
                  (item) => {
                    return item
                  }
                )
              }
            }
          },
        },
      ],
      isShow: {
        value: false,
        conditions: [
          { field: 'regions_id', value: [[0]], reverse: true },
          {
            target: 'value',
            value: 'notEmpty',
            field: 'regions_id',
          },
        ],
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Должности',
      name: 'doljnost',
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
      url: 'get/pagination_list/object_change_rate_position',
      position: {
        cols: 12,
        sm: 12,
      },
      filter: [
        {
          field: 'object_type',
          alias: 'type',
          value: '',
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Категории',
      name: 'category_change_rate',
      requestKey: 'category',
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
      label: 'Период с',
      name: 'date_active_s',
      value: '',
      type: 'date',
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: {
        required,
        dateRange: dateRange('date_active_s', 'date_active_po'),
      },
    }),
    dateField({
      label: 'Период по',
      name: 'date_active_po',
      value: '',
      type: 'date',
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: {
        required,
        dateRange: dateRange('date_active_s', 'date_active_po'),
      },
    }),
    stringField({
      label: 'Сумма',
      name: 'price',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { numeric, required },
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
      url: 'update/object/change_rate',
      action: 'createForm',
      color: 'primary',
      handlingResponse: {
        1: {
          text: 'Тариф успешно изменён',
          color: 'success',
        },
        2: {
          text: 'Ошибка сервера',
          color: 'error',
        },
        3: {
          text: 'Недостаточно данных для обработки запроса',
          color: 'error',
        },
      },
    }),
  ],
}
