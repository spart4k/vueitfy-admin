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
  name: 'Редактировать проживание',
  type: 'FormDefault',
  path: 'habitation-add',
  alias: 'habitation',
  routeParam: 'habitation_id',
  active: false,
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [
      Object.assign({}, formOwnerAddEdit),
      Object.assign({}, formRealtorAddEdit),
    ],
  },
  lists: [
    {
      alias: 'habitation_type',
      filter: [],
    },
    {
      alias: 'city_id',
      filter: [
        {
          alias: 'regions_id',
          field: 'region_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
    {
      alias: 'managers',
      filter: [
        {
          alias: 'permission_id',
          value: [1],
          type: 'num',
          source: 'environment.permission_id',
        },
      ],
    },
    { alias: 'owner_habitation', filter: [] },
    { alias: 'realtors', filter: [] },
    { alias: 'owner_type', filter: [] },
    {
      alias: 'object_habitation',
      filter: [
        {
          field: 'account_json',
          value: [],
          type: 'num',
          source: 'formData',
        },
      ],
    },
  ],
  fields: [
    carouselField({
      name: 'photo_path',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
    }),
    dropZoneField({
      label: 'Фото',
      name: 'photo_path_load',
      notPut: true,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      toObject: {
        stash: 'photo_path',
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
      options: {
        removeble: true,
        withoutSave: false,
        folder: 'habitation',
        name: '`habitation_photo`',
        paramsForEmit: this,
        countFiles: 10,
        placeholder: 'Переместите или выберите фото',
      },
      value: [],
    }),
    stringField({
      label: 'Название',
      name: 'name',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Адрес',
      name: 'address',
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
    selectField({
      label: 'Тип объекта',
      name: 'habitation_type_id',
      alias: 'habitation_type',
      subtype: 'single',
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      dependence: [
        {
          type: 'computed',
          funcComputed: (context) => {
            const capacity = context.form.fields.find(
              (x) => x.name === 'capacity'
            )
            if (
              context.formData.habitation_type_id === 1 ||
              context.formData.habitation_type_id === 2
            ) {
              context.formData.square = ''
              if (context.formData.is_registration) {
                if (
                  context.formData.capacity !== context.originalData?.capacity
                ) {
                  context.formData.capacity = ''
                }
                capacity.readonly = false
              } else {
                context.formData.capacity = '0'
                capacity.readonly = true
              }
            } else if (context.formData.habitation_type_id === 3) {
              if (context.formData.is_registration) {
                if (
                  Number(context.formData.square) &&
                  Math.floor(Number(context.formData.square) / 8) > 0
                ) {
                  context.formData.capacity = Math.floor(
                    Number(context.formData.square) / 8
                  )
                } else {
                  if (
                    context.formData.capacity !== context.originalData?.capacity
                  ) {
                    context.formData.capacity = ''
                  }
                }
                capacity.readonly = true
              } else {
                context.formData.capacity = '0'
                capacity.readonly = true
              }
            } else {
              if (
                context.formData.capacity !== context.originalData?.capacity
              ) {
                context.formData.capacity = ''
              }
              capacity.readonly = true
            }
          },
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
    checkboxField({
      label: 'Регистрация',
      name: 'is_registration',
      value: false,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      dependence: [
        {
          type: 'computed',
          funcComputed: (context) => {
            const capacity = context.form.fields.find(
              (x) => x.name === 'capacity'
            )
            if (
              context.formData.habitation_type_id === 1 ||
              context.formData.habitation_type_id === 2
            ) {
              context.formData.square = ''
              if (context.formData.is_registration) {
                if (
                  context.formData.capacity !== context.originalData?.capacity
                ) {
                  context.formData.capacity = ''
                }
                capacity.readonly = false
              } else {
                context.formData.capacity = '0'
                capacity.readonly = true
              }
            } else if (context.formData.habitation_type_id === 3) {
              if (context.formData.is_registration) {
                if (
                  Number(context.formData.square) &&
                  Math.floor(Number(context.formData.square) / 8) > 0
                ) {
                  context.formData.capacity = Math.floor(
                    Number(context.formData.square) / 8
                  )
                } else {
                  if (
                    context.formData.capacity !== context.originalData?.capacity
                  ) {
                    context.formData.capacity = ''
                  }
                }
                capacity.readonly = true
              } else {
                context.formData.capacity = '0'
                capacity.readonly = true
              }
            } else {
              if (
                context.formData.capacity !== context.originalData?.capacity
              ) {
                context.formData.capacity = ''
              }
              capacity.readonly = true
            }
          },
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Цена регистрации за человека',
      name: 'price_of_registration',
      placeholder: '',
      value: '',
      requestType: 'number',
      isShow: {
        value: false,
        conditions: [{ field: 'is_registration', value: [true] }],
      },
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Регион',
      name: 'region_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      search: '',
      url: 'get/pagination_list/regions_id',
      validations: { required },
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
              field: 'region_id',
              alias: 'regions_id',
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
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'region_id',
          alias: 'regions_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    }),
    selectField({
      label: 'Аккаунт',
      name: 'account_json',
      alias: 'managers',
      subtype: 'multiple',
      stringify: true,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      updateList: [
        {
          alias: 'object_habitation',
          filter: [
            {
              field: 'account_json',
              value: [],
              type: 'num',
              source: 'formData',
            },
          ],
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
    selectField({
      label: 'Объекты',
      name: 'object_json',
      alias: 'object_habitation',
      subtype: 'multiple',
      stringify: true,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
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
    checkboxField({
      label: 'Риэлтор',
      name: 'is_realtor',
      value: false,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [1, 2] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Риэлтор',
      name: 'realtor_id',
      alias: 'realtors',
      subtype: 'single',
      requestType: 'number',
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [
          { field: 'is_realtor', value: [true] },
          { field: 'habitation_type_id', value: [1, 2] },
        ],
      },
      appendAction: [
        {
          icon: '$IconAdd',
          label: 'Добавить риэлтора',
          action: {
            type: 'changeUrl',
            name: 'habitation/:habitation_id/add-realtor',
            refresh: true,
          },
          isShow: true,
        },
      ],
      dependence: [
        {
          type: 'default',
          fillField: [
            {
              formKey: 'realtor_id',
              compareKey: 'id',
              objectKey: 'telephone',
              targetKey: 'realtor_telephone',
            },
          ],
        },
      ],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Номер телефона риэлтора',
      name: 'realtor_telephone',
      placeholder: '',
      value: '',
      class: [''],
      readonly: true,
      isShow: {
        value: false,
        conditions: [
          { field: 'is_realtor', value: [true] },
          { field: 'habitation_type_id', value: [1, 2] },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Тип владельца',
      name: 'owner_type_id',
      alias: 'owner_type',
      subtype: 'single',
      stringify: true,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2, 3] }],
      },
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
    stringField({
      label: 'Точное наименование',
      name: 'owner_name',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [
          { field: 'owner_type_id', value: [2, 3] },
          { field: 'habitation_type_id', value: [2, 3] },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ИНН',
      name: 'owner_inn',
      placeholder: '',
      value: '',
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      class: [''],
      isShow: {
        value: false,
        conditions: [
          { field: 'owner_type_id', value: [2, 3] },
          { field: 'habitation_type_id', value: [2, 3] },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    selectField({
      label: 'Владелец',
      name: 'owner_id',
      alias: 'owner_habitation',
      subtype: 'single',
      stringify: true,
      placeholder: '',
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      class: [''],
      appendAction: [
        {
          icon: '$IconAdd',
          label: 'Добавить владельца',
          action: {
            type: 'changeUrl',
            name: 'habitation/:habitation_id/add-owner',
            refresh: true,
          },
          isShow: true,
        },
      ],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        type: 'some',
        conditions: [
          { field: 'habitation_type_id', value: [1] },
          { field: 'owner_type_id', value: [1] },
        ],
      },
      dependence: [
        {
          type: 'default',
          fillField: [
            {
              formKey: 'owner_id',
              compareKey: 'id',
              objectKey: 'telephone',
              targetKey: 'owner_telephone',
            },
          ],
        },
      ],
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: {},
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Номер телефона владельца',
      name: 'owner_telephone',
      placeholder: '',
      value: '',
      class: [''],
      readonly: true,
      isShow: {
        value: false,
        type: 'some',
        conditions: [
          { field: 'habitation_type_id', value: [1] },
          { field: 'owner_type_id', value: [1] },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    stringField({
      label: 'Аренда от',
      name: 'rent_from',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2, 3] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ФИО представителя',
      name: 'representative_fio',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2, 3] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Телефон представителя',
      name: 'representative_telephone',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2, 3] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    checkboxField({
      label: 'Администратор',
      name: 'is_administrator',
      value: false,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2, 3] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ФИО администратора',
      name: 'administrator_name',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'is_administrator', value: [true] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Телефон администратора',
      name: 'administrator_telephone',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'is_administrator', value: [true] }],
      },
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    stringField({
      label: 'Площадь',
      name: 'square',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [3] }],
      },
      dependence: [
        {
          type: 'computed',
          funcComputed: (context) => {
            if (context.formData.is_registration) {
              if (
                Number(context.formData.square) &&
                Math.floor(Number(context.formData.square) / 8) > 0
              ) {
                context.formData.capacity = Math.floor(
                  Number(context.formData.square) / 8
                )
              } else {
                if (
                  context.formData.capacity !== context.originalData?.capacity
                ) {
                  context.formData.capacity = ''
                }
              }
            } else {
              context.formData.capacity = '0'
            }
          },
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Вместимость',
      name: 'capacity',
      placeholder: '',
      value: '',
      class: [''],
      readonly: true,
      // isShow: {
      //   value: false,
      //   conditions: [{ field: 'habitation_type_id', value: [3] }],
      // },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    stringField({
      label: 'Кол-во мест',
      name: 'count_place',
      placeholder: '',
      value: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Цена за месяц до копеек',
      name: 'price_of_month',
      placeholder: '',
      value: '',
      class: [''],
      requestType: 'number',
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [1] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Цена за место',
      name: 'price_of_place',
      placeholder: '',
      value: '',
      class: [''],
      requestType: 'number',
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата заключения договора',
      name: 'date_contract',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [1, 2] }],
      },
      validations: { required },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      // mode: 'edit',
    }),
    dateField({
      label: 'Дата начала аренды',
      name: 'date_rental_from',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [1] }],
      },
      validations: { required },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      // mode: 'edit',
    }),
    dateField({
      label: 'Дата платежа',
      name: 'date_payment',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [{ field: 'habitation_type_id', value: [2] }],
      },
      validations: { required },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      // mode: 'edit',
    }),
    dropZoneField({
      label: 'Договор',
      name: 'doc_path_load',
      notPut: true,
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      toObject: {
        stash: 'doc_path',
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      // validations: { required },
      options: {
        removeble: true,
        withoutSave: false,
        folder: 'habitation',
        name: '`habitation_doc`',
        paramsForEmit: this,
        countFiles: 10,
        placeholder: 'Переместите или выберите договор',
      },
      value: [],
    }),
    docListField({
      name: 'doc_path',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
    }),

    textareaField({
      label: 'Комментарий',
      name: 'comment',
      placeholder: '',
      class: [''],
      readonly: {
        value: false,
        condition: [
          {
            field: 'status',
            permissions: [16],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
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
      url: 'update/habitation',
      name: 'updateFormStore',
      useRouteParam: 'habitation_id',
      action: 'updateFormStore',
      color: 'primary',
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
