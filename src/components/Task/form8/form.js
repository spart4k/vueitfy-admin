import Expenses from '@/components/Form/expenses/index.vue'
import { stringAction } from '@/utils/actions'

const config = {
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '600px',
    method: 'get',
    alias: 'zayavka',
    name: 'Заявка',
    url: '/get/form/',
    requestId: 'form_id',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        path: 'zayavka-add',
        id: 0,
        name: 'Заявка на расход',
        type: Expenses,
        detail: true,
        lists: [
          { alias: 'status_zr', filter: [] },
          { alias: 'direction_id', filter: [] },
          { alias: 'category_zr', filter: [] },
          { alias: 'me', filter: [] },
          { alias: 'type_objects', filter: [] },
          { alias: 'type_pay', filter: [] },
          {
            alias: 'rashod_vid',
            filter: [
              {
                field: 'category_zr',
                alias: 'rashod_category_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'permissions_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'personal_object_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
        ],
        alias: 'zayavka',
        active: false,
        fields: null,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'disabled',
            name: 'closePopup',
            action: 'closePopup',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/create',
            url: 'create/zayavka',
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormStore',
            action: 'saveFormStore',
          }),
        ],
        formData: {},
      },
      {
        path: 'zayavka-edit',
        id: 1,
        name: 'Заявка на расход',
        type: Expenses,
        detail: true,
        lists: [
          { alias: 'status_zr', filter: [] },
          { alias: 'direction_id', filter: [] },
          { alias: 'category_zr', filter: [] },
          { alias: 'account_id', filter: [] },
          { alias: 'type_objects', filter: [] },
          { alias: 'type_pay', filter: [] },
          { alias: 'status_account_id', filter: [] },
          {
            alias: 'rashod_vid',
            filter: [
              {
                field: 'category_zr',
                alias: 'rashod_category_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },

          {
            alias: 'personal_object_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'personal_account_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_object_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },

          {
            alias: 'permissions_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'permission_accounts_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'permissions_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },

          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [1],
              },
              {
                key: 'payment_type',
                value: [1],
              },
            ],
            filter: [
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [1],
              },
              {
                key: 'payment_type',
                value: [2, 3],
              },
            ],
            filter: [
              {
                field: 'personal_account_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [2],
              },
            ],
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'object_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [3],
              },
            ],
            filter: [
              {
                field: 'account_id',
                value: 'id',
                source: '',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'on_yourself',
                value: [true],
              },
            ],
            filter: [
              {
                field: 'account_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'on_yourself',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'me',
            filter: [
              {
                field: 'from_account_id',
                alias: 'account_id',
                value: '',
                source: 'originalData',
                type: 'num',
              },
            ],
          },
        ],
        routeParam: 'form_id',
        alias: 'zayavka',
        active: false,
        fields: null,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'disabled',
            name: 'closePopup',
            action: 'closePopup',
            skipValidation: true,
          }),
          stringAction({
            text: 'Исправлено',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveFormId',
            url: 'correct/zayavka',
            action: 'saveFormId',
            color: 'primary',
            // isHide: false,
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'status',
                  target: 'formData',
                  value: [6],
                  type: false,
                },
              ],
            },
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/putForm',
            url: 'update/zayavka',
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'customFormStore',
            action: 'customFormStore',
          }),
        ],
        formData: {},
      },
    ],
    activeTab: null,
  },
}

export default config
