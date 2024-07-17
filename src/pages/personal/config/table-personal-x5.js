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
import {
  required,
  hasDate,
  hasTime,
  nameLength,
  minLength,
  maxLength,
  numeric,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  path: 'edit',
  id: uuidv4(),
  name: 'ID X5',
  type: 'TableDefault',
  active: false,
  isShow: {
    value: true,
    condition: [
      {
        direction_id: [2],
        type: true,
      },
    ],
  },
  config: {
    selector: '#mainTable',
    options: {
      selecting: true,
      search: {
        function: null,
      },
      headerFixed: true,
      //url: 'https://dummyjson.com/users',
      url: 'get/pagination/personal_num_x5',
      urlDetail: 'personal_id',
      alias: 'personal_id',
      title: 'This is an about page1',
    },
    panel: {
      buttons: [
        {
          label: 'Обновить',
          class: ['v-table-button--custom'],
          url: '$IconEdit',
          function: null,
          backgroundColor: '#ffffff',
        },
        {
          label: 'Добавить',
          class: ['v-table-button--custom'],
          type: 'changeUrl',
          url: 'personal/:id/add-x5',
          backgroundColor: '#fff',
        },
      ],
    },
    head: [
      {
        title: 'ID',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: 'left',
        },
        sorts: [
          {
            type: 'string',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        alias: 'id',
        isShow: true,
        width: '40',
        value: 'id',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Номер Х5',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: 'left',
        },
        sorts: [
          {
            type: 'string',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        alias: 'num_x5',
        isShow: true,
        width: '40',
        value: 'num_x5',
        search: {
          field: '',
          isShow: true,
        },
      },
    ],
    data: {
      rows: [],
      totalRows: null,
      pageLength: 20,
      currentPage: 1,
      totalPages: null,
      footer: null,
    },
    detail: {
      type: 'popup', // String 'popup' or 'page'
      getOnClose: true,
      classes: [''], // List class
      width: '1000px',
      method: 'get',
      alias: 'personal_num_x5',
      url: '/get/form/',
      requestId: 'x5',
      name: 'ID X5',
      bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
      activeTab: null,
      tabs: [
        {
          path: 'add-x5',
          id: 1,
          name: 'Основные',
          type: 'FormDefault',
          detail: true,
          lists: [
            {
              alias: 'personal_for_num_x5',
              filter: [
                {
                  field: 'personal_id',
                  value: '',
                  type: 'num',
                  routeKey: 'id',
                },
              ],
            },
          ],
          alias: 'personal_num_x5',
          active: false,
          routeParam: 'x5',
          fields: [
            selectField({
              label: 'Линейщик',
              name: 'personal_for_num_x5',
              requestKey: 'personal_id',
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
              value: '',
              readonly: true,
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Номер Х5',
              name: 'num_x5',
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
              validations: { required, maxLength: maxLength(15), numeric },
            }),
          ],
          actions: [
            stringAction({
              text: 'Сохранить',
              type: 'submit',
              color: 'primary',
              module: 'form/create',
              url: 'create/num_x5',
              name: 'createForm',
              action: 'createForm',
              handlingResponse: {
                1: {
                  text: 'Сохранено успешно',
                  color: 'success',
                },
                2: {
                  text: 'Что-то пошло не так...',
                  color: 'error',
                },
                3: {
                  text: 'Ключ с таким номером уже существует',
                  color: 'error',
                },
              },
            }),
            // stringAction({
            //   text: 'Сохранить',
            //   type: 'submit',
            //   color: 'primary',
            //   module: 'form/update',
            //   url: 'set/data/personal_bank',
            //   name: 'saveForm',
            //   action: 'saveForm',
            // }),
            stringAction({
              text: 'Закрыть',
              type: 'submit',
              color: 'text',
              name: 'closePopup',
              action: 'closePopup',
              skipValidation: true,
            }),
          ],
          formData: {},
        },
        {
          path: 'edit-x5',
          id: 2,
          name: 'Основные',
          type: 'FormDefault',
          detail: true,
          lists: [
            {
              alias: 'personal_for_num_x5',
              filter: [
                {
                  field: 'personal_id',
                  value: '',
                  type: 'num',
                  routeKey: 'id',
                },
              ],
            },
          ],
          alias: 'personal_num_x5',
          active: false,
          routeParam: 'x5',
          fields: [
            selectField({
              label: 'Линейщик',
              name: 'personal_for_num_x5',
              requestKey: 'personal_id',
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
              value: '',
              readonly: true,
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Номер Х5',
              name: 'num_x5',
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
              validations: { required, maxLength: maxLength(15), numeric },
            }),
          ],
          actions: [
            stringAction({
              text: 'Сохранить',
              type: 'submit',
              color: 'primary',
              module: 'form/putForm',
              url: 'update/num_x5',
              name: 'saveFormId',
              action: 'saveFormId',
              handlingResponse: {
                1: {
                  text: 'Изменено успешно',
                  color: 'success',
                },
                2: {
                  text: 'Что-то пошло не так...',
                  color: 'error',
                },
                3: {
                  text: 'Ключ с таким номером уже существует',
                  color: 'error',
                },
              },
            }),
            stringAction({
              text: 'Закрыть',
              type: 'submit',
              color: 'text',
              name: 'closePopup',
              action: 'closePopup',
              skipValidation: true,
            }),
          ],
          formData: {},
        },
      ],
    },
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
    ],
  },
}
