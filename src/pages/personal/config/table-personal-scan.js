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
import TableDefault from '@/components/Table/default/index.vue'

export default {
  path: 'edit',
  id: uuidv4(),
  name: 'Сканы',
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
      url: 'get/pagination/personal_doc',
      alias: 'personal_id',
      title: 'This is an about page1',
      contextMenu: {
        actions: [
          {
            icon: 'mdi-delete',
            label: 'Удалить документ',
            action: {
              type: 'delete',
              alias: 'personal_doc',
            },
          },
        ],
      },
    },
    type: TableDefault,
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
          url: 'personal/:id/new',
          type: 'changeUrl',
          // function: addQuery,
          // type: 'nextStage',
          backgroundColor: '#fff',
        },
      ],
    },
    head: [
      {
        title: 'Тип документа',
        type: 'default',
        align: 'center',
        fixed: {
          value: true,
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
        alias: 'pds.name',
        isShow: true,
        width: '40',
        value: 'doc_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Скан-копия/фото',
        type: 'download',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
        },
        sorts: undefined,
        isShow: true,
        width: '150',
        value: 'path_doc',
        alias: 'pd.path_doc',
        search: {
          field: '',
          isShow: true,
        },
        actions: [
          {
            type: 'download',
            url: '$IconDownload',
            label: 'Скачать',
          },
        ],
      },

      {
        title: 'Примечание',
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
        alias: 'pd.note',
        value: 'comment',
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
      width: '500px',
      method: 'get',
      alias: 'personal_doc',
      url: '/get/form/',
      requestId: 'object_id',
      name: 'Персонал',
      bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
      activeTab: null,
      tabs: [
        {
          path: 'object_id',
          id: 0,
          name: 'Основные',
          type: 'FormDefault',
          detail: true,
          lists: [{ alias: 'documents', filter: [] }],
          alias: 'personal_doc',
          active: false,
          fields: [
            selectField({
              label: 'Тип документа',
              name: 'doc_id',
              alias: 'documents',
              placeholder: '',
              class: [''],
              selectOption: {
                text: 'name',
                value: 'id',
              },
              position: {
                cols: 12,
                sm: 12,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            dropZoneField({
              label: 'Скан-копия/фото:',
              name: 'path_doc',
              notPut: true,
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
                removeble: true,
                withoutSave: false,
                folder: 'personal_doc',
                name: '`personal_doc`',
                paramsForEmit: this,
              },
              value: [],
            }),
            textareaField({
              label: 'Примечание:',
              name: 'note',
              alias: 'pd.note',
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
              text: 'Сохранить',
              type: 'submit',
              color: 'primary',
              module: 'form/update',
              url: 'set/data/personal_doc',
              useRouteKey: [
                { requestKey: 'personal_id', storageKey: 'id' },
                { requestKey: 'id', storageKey: 'object_id' },
              ],
              // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
              name: 'updateFormStore',
              action: 'updateFormStore',
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
        {
          path: 'new',
          id: 1,
          name: 'Основные',
          type: 'FormDefault',
          detail: true,
          lists: [{ alias: 'documents', filter: [] }],
          alias: 'personal_doc',
          active: false,
          fields: [
            selectField({
              label: 'Тип документа',
              name: 'doc_id',
              alias: 'documents',
              placeholder: '',
              class: [''],
              selectOption: {
                text: 'name',
                value: 'id',
              },
              position: {
                cols: 12,
                sm: 12,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            dropZoneField({
              label: 'Скан-копия/фото:',
              name: 'path_doc',
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
                removeble: true,
                withoutSave: false,
                folder: 'personal_doc',
                name: '`personal_doc`',
                paramsForEmit: this,
              },
              value: [],
            }),
            textareaField({
              label: 'Примечание:',
              name: 'note',
              alias: 'pd.note',
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
              text: 'Сохранить',
              type: 'submit',
              color: 'primary',
              module: 'personal/createForm',
              url: 'set/data/personal_doc',
              useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
              // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
              name: 'saveFormStore',
              action: 'saveFormStore',
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
        color: 'text',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
    ],
  },
}
