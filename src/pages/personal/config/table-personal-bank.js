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
  numeric,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'
import TableDefault from '@/components/Table/default/index.vue'

export default {
  path: 'edit',
  id: uuidv4(),
  name: 'Банковские карты',
  type: TableDefault,
  active: false,
  config: {
    selector: '#mainTable',
    options: {
      selecting: true,
      search: {
        function: null,
      },
      headerFixed: true,
      //url: 'https://dummyjson.com/users',
      url: 'get/pagination/personal_bank',
      urlDetail: 'personal_id',
      alias: 'pb.personal_id',
      title: 'This is an about page1',
      contextMenu: {
        actions: [
          {
            icon: 'mdi-delete',
            label: 'Удалить карту',
            action: {
              type: 'delete',
              alias: 'personal_bank',
            },
          },
        ],
      },
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
        // {
        //   label: 'Скачать',
        //   class: ['v-table-button--custom'],
        //   function: consolePanel,
        //   backgroundColor: '#fff',
        // },
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
        alias: 'pb.id',
        isShow: true,
        width: '40',
        value: 'id',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Приоритет',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
        },
        sorts: [
          {
            type: 'boolean',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        value: 'priority',
        alias: 'pb.priority',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Банк',
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
        isShow: true,
        width: '90',
        alias: 'b.name',
        value: 'bank_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Номер счета',
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
        isShow: true,
        width: '150',
        alias: 'pb.invoice',
        value: 'invoice',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Карта на ФИО',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
        },
        sorts: [
          {
            type: 'number',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        value: 'fio',
        alias: 'pb.fio',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Примечание',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
        },
        sorts: [
          {
            type: 'date',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        alias: 'ab.comment',
        value: 'comment',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Действия',
        type: 'actions',
        align: 'center',
        fixed: {
          value: false,
          position: 'right',
        },
        isShow: true,
        width: '100',
        value: 'actions',
        actions: [
          {
            type: 'button',
            url: '$IconSetting',
            function: null,
            label: 'Редактировать',
          },
          {
            type: 'button',
            url: '$IconSetting',
            function: null,
            label: 'Удалить',
          },
        ],
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
      width: '500px',
      method: 'get',
      alias: 'personal_bank',
      url: '/get/form/',
      requestId: 'card_id',
      name: 'Банковская карта',
      bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
      activeTab: null,
      tabs: [
        {
          path: 'new_card',
          id: 1,
          name: 'Основные',
          type: 'FormDefault',
          detail: true,
          lists: [{ alias: 'bank_id_without_nal', filter: [] }],
          alias: 'personal_bank',
          active: false,
          routeParam: 'card_id',
          fields: [
            selectField({
              label: 'Банк',
              name: 'bank_id',
              alias: 'bank_id_without_nal',
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
              disable: true,
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'ФИО',
              name: 'fio',
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
              validations: { required },
            }),
            stringField({
              label: 'БИК',
              name: 'bik',
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
              validations: { minLength: minLength(8), numeric, required },
            }),
            stringField({
              label: 'Номер счета',
              name: 'invoice',
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
              validations: { minLength: minLength(20), numeric, required },
            }),
            stringField({
              label: 'Примечание',
              name: 'comment',
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
            }),
            checkboxField({
              label: 'Приоритет',
              name: `priority`,
              value: false,
              placeholder: '',
              readonly: false,
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
            }),
            // textBlock({
            //   label: 'Создал',
            //   name: 'id',
            //   placeholder: '',
            //   notSend: true,
            //   readonly: true,
            //   class: [''],
            //   position: {
            //     cols: 12,
            //     sm: 12,
            //   },
            //   bootstrapClass: [''],
            // }),
          ],
          actions: [
            // stringAction({
            //   text: 'Сохранить',
            //   type: 'submit',
            //   color: 'primary',
            //   module: 'form/create',
            //   url: 'set/data/personal_bank',
            //   useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            //   // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            //   useRouteParam: 'card_id',
            //   name: 'saveForm',
            //   action: 'saveForm',
            //   isHide: {
            //     value: false,
            //     type: 'every',
            //     condition: [
            //       {
            //         field: 'mode',
            //         target: 'environment',
            //         value: ['edit'],
            //         type: true,
            //       },
            //     ],
            //   },
            // }),
            stringAction({
              text: 'Сохранить',
              type: 'submit',
              color: 'primary',
              module: 'form/update',
              url: 'set/data/personal_bank',
              useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
              // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
              name: 'saveForm',
              useRouteParam: 'card_id',
              action: 'saveForm',
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
                  {
                    field: 'readonlyAll',
                    target: 'environment',
                    value: [1],
                    type: true,
                  },
                ],
              },
            }),
            stringAction({
              text: 'Закрыть',
              type: 'submit',
              color: 'text',
              name: 'closePopup',
              action: 'closePopup',
              to: 'personal/:id',
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
