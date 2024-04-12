import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Добавить владельца',
  type: 'FormDefault',
  path: 'habitation-add',
  alias: 'habitations',
  active: false,
  detail: true,
  lists: [
    {
      alias: 'habitation_type',
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
    { alias: 'managers', filter: [] },
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
    // stringField({
    //   label: 'id',
    //   name: 'id',
    //   placeholder: '',
    //   value: '',
    //   class: [''],
    //   isShow: {
    //     value: true,
    //   },
    //   position: {
    //     cols: 12,
    //     sm: 12,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    // }),
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
    selectField({
      label: 'Тип объекта',
      name: 'habitation_type_id',
      alias: 'habitation_type',
      subtype: 'single',
      stringify: true,
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
    checkboxField({
      label: 'Регистрация',
      name: 'is_registation',
      value: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
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
      search: '',
      url: 'get/pagination_list/regions_id',
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
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'account_objects',
          filter: [
            {
              source: 'formData',
              type: 'num',
              value: 'id',
              field: 'region_id',
              alias: 'regions_id',
            },
          ],
        },
      ],
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
    stringField({
      label: 'Цена регистрации за человека',
      name: 'price_of_registration',
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
      label: 'Аккаунт',
      name: 'account_json',
      alias: 'managers',
      subtype: 'multiple',
      stringify: true,
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
      validations: {},
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_json',
      subtype: 'multiple',
      placeholder: '',
      stringify: true,
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/object',
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    // selectField({
    //   label: 'Объекты2',
    //   name: 'object_json',
    //   alias: 'account_objects',
    //   subtype: 'multiple',
    //   stringify: true,
    //   placeholder: '',
    //   class: [''],
    //   selectOption: {
    //     text: 'name',
    //     value: 'id',
    //   },
    //   items: [],
    //   position: {
    //     cols: 12,
    //     sm: 12,
    //   },
    //   validations: {},
    //   bootstrapClass: [''],
    //   // updateList: [
    //   //   {
    //   //     alias: 'account_id',
    //   //     filter: [
    //   //       {
    //   //         field: 'direction_json',
    //   //         value: '',
    //   //         source: 'formData',
    //   //         type: 'num',
    //   //       },
    //   //     ],
    //   //   },
    //   // ],
    // }),
    textareaField({
      label: 'Комментарий',
      name: 'comment',
      placeholder: '',
      class: [''],
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
      module: 'form/create',
      name: 'createForm',
      url: 'set/data/habitation',
      action: 'createForm',
      color: 'primary',
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
      module: 'form/update',
      url: 'set/data/habitation',
      name: 'saveForm',
      useRouteParam: 'id',
      action: 'saveForm',
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
