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
import Vue, { toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'
import tablePersonalScan from './table-personal-scan.js'
import formPersonalEdit from './form-personal-edit.js'
import _ from 'lodash'
import store from '@/store'

export default {
  id: 'personal-add',
  uuid: uuidv4(),
  path: 'add',
  name: 'Заявка на персонал',
  type: 'FormStage',
  detail: true,
  setRoute: 'personal-add',
  stages: [
    {
      id: uuidv4(),
      uuid: uuidv4(),
      name: 'Основные',
      type: 'FormDefault',
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '780px',
        method: 'get',
        alias: 'payment',
        url: '/get/form/',
        bootstrapClass: [''],
        tabs: [_.cloneDeep(formPersonalEdit), _.cloneDeep(tablePersonalScan)],
      },
      lists: [
        // 'vid_vedomost_id',
        // 'status_pt',
        { alias: 'direction_id_logistic', filter: [] },
        { alias: 'grajdanstvo_id', filter: [] },
        {
          alias: 'brigadirs',
          filter: [
            {
              field: 'object_id',
              //alias: 'object_json',
              value: '',
              source: 'formData',
              type: 'array',
            },
            {
              field: 'direction_id',
              //alias: 'direction_json',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
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
        // { alias: 'brigadirs', filter: [] },
        // 'shifts',
        // 'nutritions',
      ],
      alias: 'personal_target',
      active: false,
      label: 'personal-add',
      fields: [
        stringField({
          label: 'Фамилия',
          name: 'surname',
          placeholder: '',
          value: '',
          class: [''],
          position: {
            cols: 12,
            sm: 4,
          },
          validations: { required },
          bootstrapClass: [''],
        }),
        stringField({
          label: 'Имя',
          name: 'name_n',
          placeholder: '',
          value: '',
          class: [''],
          position: {
            cols: 12,
            sm: 4,
          },
          validations: { required },
          bootstrapClass: [''],
        }),
        stringField({
          label: 'Отчество',
          name: 'patronymic',
          placeholder: '',
          value: '',
          class: [''],
          position: {
            cols: 12,
            sm: 4,
          },
          validations: {},
          bootstrapClass: [''],
        }),
        dateField({
          label: 'Дата рождения',
          name: 'date_rojd',
          type: 'date',
          value: '',
          menu: false,
          placeholder: '',
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          validations: { required },
          bootstrapClass: [''],
          disable: false,
          //mode: 'edit',
        }),
        selectField({
          label: 'Направления',
          subtype: 'multiple',
          name: 'direction_id',
          alias: 'direction_id_logistic',
          requestKey: 'direction_json',
          placeholder: '',
          class: [''],
          value: '',
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
          dependence: [
            {
              type: 'api',
              module: 'selects/getListUpdate',
              field: 'object_id',
              url: 'get/pagination_list/object_logistic',
              alias: 'object_id',
            },
            {
              //fields: ['statement_card', 'cardowner'],
              type: 'default',
              action: {
                type: 'hideOptions',
                //values: [8],
                field: 'direction_id',
                condition: [
                  {
                    value: [7],
                    options: [1, 2, 3, 4, 5, 6],
                  },
                  {
                    value: [2],
                    options: [1, 3, 4, 5, 6, 7],
                  },
                  {
                    value: [1],
                    options: [7, 2],
                  },
                  {
                    value: [1, 6],
                    options: [7, 2],
                  },
                  {
                    value: [6],
                    options: [7, 2],
                  },
                ],
              },
              //url: 'object_id/avatar_with_user_key_id',
            },
            {
              //fields: ['statement_card', 'cardowner'],
              type: 'default',
              action: {
                type: 'hideOptions',
                field: 'direction_id',
                targetField: 'grajdanstvo_id',
                condition: [
                  {
                    value: [7],
                    options: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                  },
                ],
              },
              //url: 'object_id/avatar_with_user_key_id',
            },
            {
              type: 'computed',
              funcComputed: (context) => {
                if (context.formData.direction_id.includes(7)) {
                  context.formData.transfer = false
                  context.formData.start_point = ''
                  context.formData.object_transfer_id = null
                  context.formData.regions_id = null
                  context.formData.city_id = null
                  context.formData.end_point = ''
                }
              },
            },
          ],
          updateList: [
            {
              alias: 'brigadirs',
              filter: [
                {
                  field: 'object_id',
                  value: '',
                  source: 'formData',
                  type: 'array',
                },
                {
                  field: 'direction_id',
                  //alias: 'direction_json',
                  value: '',
                  source: 'formData',
                  type: 'array',
                },
              ],
            },
          ],
        }),
        stringField({
          label: 'Телефон',
          name: 'telefon',
          placeholder: '',
          class: [''],
          value: '',
          position: {
            cols: 12,
            sm: 12,
          },
          validations: { required },
          bootstrapClass: [''],
          isShow: {
            value: false,
            conditions: [{ field: 'direction_id', value: [[2]] }],
          },
        }),
        autocompleteField({
          label: 'Объект',
          subtype: 'multiple',
          name: 'object_id',
          alias: 'object_json',
          requestKey: 'object_json',
          //subtype: 'single',
          placeholder: '',
          class: [''],
          selectOption: {
            text: 'name',
            value: 'id',
          },
          items: [],
          page: 1,
          search: '',
          url: 'get/pagination_list/object_logistic',
          // object
          position: {
            cols: 12,
            sm: 12,
          },
          validations: { required },
          bootstrapClass: [''],
          putValueInItems: 'object_transfer_id',
          filter: [
            {
              field: 'direction_id',
              value: '',
            },
          ],
          updateList: [
            {
              alias: 'brigadirs',
              filter: [
                {
                  field: 'object_id',
                  value: '',
                  source: 'formData',
                  type: 'array',
                },
                {
                  field: 'direction_id',
                  //alias: 'direction_json',
                  value: '',
                  source: 'formData',
                  type: 'array',
                },
              ],
            },
          ],
          update: {
            module: 'selects/getList',
            fields: ['personal_id'],
          },
          isShow: {
            value: false,
            conditions: [
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
        }),
        selectField({
          label: 'Доступ',
          name: 'personal_id',
          alias: 'brigadirs',
          requestKey: 'account_json',
          subtype: 'multiple',
          placeholder: '',
          class: [''],
          value: '',
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
          update: {
            module: 'selects/getList',
            fields: ['object_id'],
          },
          requiredFields: ['object_id', 'direction_id'],
          isShow: {
            value: false,
            conditions: [
              {
                field: 'direction_id',
                value: [[1], [6], [1, 6], [6, 1], [7], [2]],
              },
            ],
          },
        }),
        selectField({
          label: 'Гражданство',
          name: 'grajdanstvo_id',
          alias: 'grajdanstvo_id',
          placeholder: '',
          class: [''],
          value: '',
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
          update: {
            module: 'selects/getList',
            fields: ['object_id'],
          },
        }),
        checkboxField({
          label: 'Трансфер',
          name: 'transfer',
          value: false,
          placeholder: '',
          readonly: false,
          class: [''],
          isShow: {
            value: false,
            conditions: [
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
          position: {
            cols: 12,
            sm: 12,
          },
          bootstrapClass: [''],
        }),
        stringField({
          label: 'Адрес А',
          name: 'start_point',
          placeholder: '',
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          validations: { required, nameLength },
          bootstrapClass: [''],
          isShow: {
            value: false,
            conditions: [
              { field: 'transfer', value: [true] },
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
        }),
        selectField({
          label: 'Объект',
          subtype: 'single',
          name: 'object_transfer_id',
          placeholder: '',
          class: [''],
          selectOption: {
            text: 'name',
            value: 'id',
          },
          items: [],
          // object
          position: {
            cols: 12,
            sm: 3,
          },
          validations: { required },
          bootstrapClass: [''],
          dependence: [
            {
              type: 'default',
              fillField: ['city_id', 'regions_id', 'region_name', 'city_name'],
            },
            {
              type: 'api',
              module: 'selects/getListUpdate',
              field: 'regions_id',
              url: 'get/pagination_list/regions_id',
            },
          ],
          isShow: {
            value: false,
            conditions: [
              { field: 'transfer', value: [true] },
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
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
            sm: 3,
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
          dependence: [
            {
              type: 'default',
              fillField: ['region_name'],
            },
          ],
          isShow: {
            value: false,
            conditions: [
              { field: 'transfer', value: [true] },
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
        }),
        selectField({
          label: 'Населённый пункт',
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
            sm: 3,
          },
          dependence: [
            {
              type: 'default',
              fillField: ['city_name'],
            },
          ],
          isShow: {
            value: false,
            conditions: [
              { field: 'transfer', value: [true] },
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
          validations: { required },
          bootstrapClass: [''],
          // requiredFields: ['regions_id'],
        }),
        stringField({
          label: 'Адрес Б',
          name: 'end_point',
          placeholder: 'ул., д.',
          class: [''],
          position: {
            cols: 12,
            sm: 3,
          },
          validations: { required, nameLength },
          bootstrapClass: [''],
          isShow: {
            value: false,
            conditions: [
              { field: 'transfer', value: [true] },
              { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
            ],
          },
        }),
        stringField({
          label: 'Имя региона',
          name: 'region_name',
          placeholder: '',
          notSend: true,
          class: [''],
          position: {
            cols: 12,
            sm: 6,
          },
          isShow: {
            value: true,
          },
          // validations: { required, nameLength },
          bootstrapClass: [''],
        }),
        stringField({
          label: 'Имя города',
          name: 'city_name',
          placeholder: '',
          notSend: true,
          class: [''],
          position: {
            cols: 12,
            sm: 6,
          },
          isShow: {
            value: true,
          },
          // validations: { required, nameLength },
          bootstrapClass: [''],
        }),
        checkboxField({
          label: 'Штатный',
          name: 'in_state',
          value: false,
          placeholder: '',
          class: [''],
          isShow: {
            value: false,
            conditions: [{ field: 'direction_id', value: [[2]] }],
          },
          position: {
            cols: 12,
            sm: 12,
          },
          bootstrapClass: [''],
        }),
        stringField({
          label: 'Псевдоним',
          name: 'alias',
          placeholder: '',
          class: [''],
          position: {
            cols: 12,
            sm: 12,
          },
          isShow: {
            value: false,
            conditions: [{ field: 'in_state', value: [true] }],
          },
          validations: { required },
          bootstrapClass: [''],
        }),
      ],
      actions: [
        stringAction({
          text: 'Закрыть',
          color: 'textDefault',
          name: 'closePopup',
          action: 'closePopup',
          to: 'personal',
          skipValidation: true,
        }),
        stringAction({
          text: 'Сохранить',
          type: 'submit',
          color: 'primary',
          // action: 'nextStage',
          module: 'form/create',
          url: 'create/unfinished_personal',
          name: 'nextStage',
          action: 'nextStage',
          conditionCode: {
            key: 'code',
            results: [
              {
                value: 1,
                type: 'success',
                toStorage: ['id'],
              },
              {
                value: 2,
                type: 'error',
                text: 'На объект не назначен менеджер',
              },
              {
                value: 3,
                type: 'warning',
                text: '',
                component: Vue.component('component', {
                  template:
                    '<template><p>Сотрудник уже есть в системе, <a @click="changeRoute">перейти</a></p></template>',
                  props: {
                    data: {
                      type: Object,
                      default: () => {},
                    },
                  },
                  setup(props, ctx) {
                    const router = useRouter()
                    const route = useRoute()
                    const proxyValue = toRef(props, 'data')
                    const changeRoute = () => {
                      store.commit('changeFormStorage', {
                        key: 'account_json',
                        value: proxyValue.value.formData.personal_id || [],
                      })
                      store.commit('changeFormStorage', {
                        key: 'direction_json',
                        value: proxyValue.value.formData.direction_id || [],
                      })
                      store.commit('changeFormStorage', {
                        key: 'object_json',
                        value: proxyValue.value.formData.object_id || [],
                      })
                      router.push({
                        name: `${route.name}/:id`,
                        params: {
                          id: proxyValue.value.response.id,
                        },
                      })
                      proxyValue.value.popupForm.isShow = true
                    }
                    return {
                      changeRoute,
                    }
                  },
                }),
              },
            ],
          },
        }),
      ],
      formData: {},
    },
    {
      id: uuidv4(),
      name: 'Документы',
      type: 'TableDefault',
      active: false,
      label: 'personal-add-doc',
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
              url: 'personal-add-new',
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
                method: async (context) => {
                  Vue.downloadFile(context.row.row.path_doc)
                },
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
          name: 'Персонал',
          bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
          activeTab: null,
          tabs: [
            {
              path: 'id',
              id: 0,
              name: 'Основные',
              type: 'FormDefault',
              detail: true,
              lists: [{ alias: 'documents', filter: [] }],
              alias: 'personal_doc',
              active: false,
              label: 'personal-add-doc-document',
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
                  label: 'Скан-копия/фото',
                  name: 'path_doc',
                  placeholder: '',
                  notPut: true,
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
                    countFiles: 1,
                  },
                  value: [],
                }),
                textareaField({
                  label: 'Примечание',
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
                  useStorageKey: [
                    { requestKey: 'personal_id', storageKey: 'id' },
                  ],
                  name: 'updateFormStore',
                  action: 'updateFormStore',
                }),
                stringAction({
                  text: 'Закрыть',
                  type: 'submit',
                  color: 'textDefault',
                  name: 'closePopup',
                  action: 'closePopup',
                  to: 'personal-add',
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
              lists: [
                {
                  alias: 'documents',
                  filter: [
                    {
                      field: 'personal_id',
                      value: '',
                      formStorage: 'id',
                      type: 'array',
                    },
                  ],
                },
              ],
              alias: 'personal_doc',
              active: false,
              label: 'personal-add-doc-document-new',
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
                  label: 'Скан-копия/фото',
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
                    countFiles: 1,
                  },
                  value: [],
                }),
                checkboxField({
                  label: '',
                  name: 'from_document_prishel',
                  value: true,
                  placeholder: '',
                  readonly: false,
                  class: [''],
                  position: {
                    cols: 12,
                    sm: 12,
                  },
                  isShow: {
                    value: true,
                  },
                  bootstrapClass: [''],
                }),
                textareaField({
                  label: 'Примечание',
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
                  useStorageKey: [
                    { requestKey: 'personal_id', storageKey: 'id' },
                  ],
                  name: 'saveFormStore',
                  action: 'saveFormStore',
                }),
                stringAction({
                  text: 'Закрыть',
                  type: 'submit',
                  color: 'textDefault',
                  name: 'closePopup',
                  action: 'closePopup',
                  to: 'personal-add',
                  skipValidation: true,
                }),
              ],
              formData: {},
            },
          ],
        },
      },
      actions: [
        stringAction({
          text: 'Оставить заявку',
          type: 'submit',
          color: 'primary',
          module: 'form/create',
          url: 'query/personal',
          to: 'personal',
          name: 'createForm',
          action: 'createForm',
          skipValidation: true,
          requestBody: {
            store: [
              { requestKey: 'manager_id', storageKey: 'user.user.id' },
              { requestKey: 'personal_id', storageKey: 'formStorage.id' },
            ],
            static: { type_parent_action: 3, parent_action: 1 },
            formData: [
              { requestKey: 'direction_json', formKey: 'direction_id' },
              { requestKey: 'object_json', formKey: 'object_id' },
              'grajdanstvo_id',
              'transfer',
              'start_point',
              'end_point',
              'city_id',
              'regions_id',
              'object_transfer_id',
              'region_name',
              'city_name',
            ],
          },
          conditionCode: {
            key: 'code',
            results: [
              {
                value: 1,
                type: 'success',
                emit: 'closePopup',
                to: 'personal',
              },
              {
                value: 2,
                type: 'error',
                text: 'Необходимо приложить паспорт',
              },
              {
                value: 3,
                type: 'error',
                text: 'Необходимо приложить ID карту или паспорт',
              },
            ],
          },
          // nextForm: true,
        }),
        stringAction({
          text: 'Вернуться',
          type: 'submit',
          color: 'disabled',
          module: 'form/del',
          url: 'delete/unfinished_personal',
          name: 'prevStage',
          action: 'prevStage',
          escapeTrigger: true,
          // conditionCode: {
          //   key: 'code',
          //   results: [
          //     {
          //       value: 1,
          //       type: 'success',
          //       fromStorage: ['id'],
          //     },
          //   ],
          // },
        }),
      ],
    },
  ],
}
