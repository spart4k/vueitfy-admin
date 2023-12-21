<template>
  <div>
    <div class="testRed">
      {{ testRef }}
    </div>
    <hr />
    <TableDefault @changeheadershow="changeheadershow" :options="config3" />
  </div>
</template>

<script>
import { ref } from 'vue'
import filters from '@/pages/documents/filters'
import FormDefault from '@/components/form/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import useTable from '@/compositions/useTable'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textBlock,
  dropZoneField,
} from '@/utils/fields.js'
import { required } from '@/utils/validation.js'
import { stringAction } from '@/utils/actions'

export default {
  name: 'Test-View',
  components: {
    TableDefault,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    const testRef = ref('testS')

    const config = {
      options: {
        url: 'get/pagination_pivot/personal_target_personal',
        title: 'new title',
      },
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            // function: consolePanel,
            backgroundColor: '#ffffff',
          },
          {
            label: 'Добавить',
            class: ['v-table-button--custom'],
            url: '$IconSetting',
            type: 'addItem',
            //function: consolePanel,
            backgroundColor: '#fff',
          },
          {
            label: 'Скачать',
            class: ['v-table-button--custom'],
            // function: consolePanel,
            backgroundColor: '#fff',
          },
          {
            label: 'Объекты',
            class: ['v-table-button--custom'],
            url: '$IconUpdate',
            function: () => {},
            backgroundColor: '#ffffff',
            type: 'changeUrl',
          },
        ],
      },
      head: [
        {
          id: 1,
          title: 'ФИО',
          align: 'center',
          type: 'default',
          isShow: true,
          width: '200',
          alias: 'p.personal_name',
          value: 'personal_name',
          changeable: true,
          fixed: {
            value: true,
            position: 'left',
          },
          search: {
            field: '',
            isShow: true,
          },
          sorts: [
            {
              type: 'string',
              default: '',
              value: '',
              isShow: false,
            },
          ],
        },
        {
          id: 2,
          title: 'Должность',
          alias: 'p.personal_name2',
          value: 'personal_name2',
          align: 'center',
          type: 'default',
          isShow: true,
          width: '200',
          changeable: true,
          fixed: {
            value: true,
            position: 'left',
          },
          search: {
            field: '',
            isShow: true,
          },
          sorts: [
            {
              type: 'string',
              default: '',
              value: '',
              isShow: false,
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal2',
        url: '/get/form/',
        name: 'Добавить',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          {
            path: 'add',
            id: 5,
            name: 'Запросить документы',
            type: 'FormStage',
            detail: true,
            stages: [
              {
                id: 0,
                name: '',
                type: FormDefault,
                // detail: true,
                lists: [
                  {
                    alias: 'personal_missing_documents',
                    filter: [
                      {
                        field: 'personal_id',
                        type: 'num',
                        value: '',
                        source: 'formData',
                      },
                      {
                        field: 'grajdanstvo_id',
                        type: 'num',
                        value: '',
                        source: 'formData',
                      },
                    ],
                  },
                ],
                alias: 'personal_target',
                active: true,
                fields: [
                  //   selectField({
                  //     label: 'Сотрудник',
                  //     name: 'grajdanstvo_id',
                  //     // alias: 'direction_id_logistic',
                  //     placeholder: '',
                  //     class: [''],
                  //     selectOption: {
                  //       text: 'name',
                  //       value: 'id',
                  //     },
                  //     disabled: true,
                  //     value: 0,
                  //     items: [
                  //       { id: 0, name: 'Новые' },
                  //       { id: 1, name: 'ЕАЭС' },
                  //       { id: 2, name: 'Нерезиденты' },
                  //       { id: 3, name: 'РФ' },
                  //     ],
                  //     position: {
                  //       cols: 12,
                  //       sm: 12,
                  //     },
                  //     validations: { required },
                  //     bootstrapClass: [''],
                  //     update: {
                  //       module: 'selects/getList',
                  //       fields: ['object_id'],
                  //     },
                  //   }),
                  //   dateField({
                  //     label: ' Дата',
                  //     name: 'data_rojd',
                  //     subtype: 'date',
                  //     placeholder: '',
                  //     classes: [''],
                  //     position: {
                  //       cols: 12,
                  //       sm: 12,
                  //     },
                  //     validations: { required },
                  //     bootstrapClass: ['changeSelect'],
                  //   }),
                  //   stringField({
                  //     label: 'Рабочие часы',
                  //     name: 'seriya',
                  //     placeholder: '',
                  //     readonly: false,
                  //     class: [''],
                  //     position: {
                  //       cols: 12,
                  //       sm: 12,
                  //     },
                  //     bootstrapClass: [''],
                  //     //validations: { required },
                  //     //isShow: false,
                  //   }),
                ],
                actions: [
                  // stringAction({
                  //   text: 'Создать',
                  //   type: 'submit',
                  //   module: 'personal/create',
                  //   url: 'query/docs',
                  //   name: 'createForm',
                  //   action: 'createForm',
                  //   color: 'primary',
                  // }),
                ],
                formData: {},
              },
            ],
          },
        ],
        activeTab: null,
      },
      filters,
    }

    const defaultForm = [
      {
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [
          { alias: 'user_keys', filter: [] },
          { alias: 'habitation_id', filter: [] },
          { alias: 'account_id', filter: [] },
          { alias: 'direction_id', filter: [] },
          { alias: 'grajdanstvo_id', filter: [] },
        ],
        alias: 'personal',
        active: false,
        fields: [
          stringField({
            label: 'ФИО',
            name: 'name',
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
          stringField({
            label: 'Телефон',
            name: 'telefon',
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
          selectField({
            label: 'Гражданство',
            name: 'status',
            alias: 'grajdanstvo_id',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Примечание',
            name: 'comment',
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
          dateField({
            label: ' Дата рождения',
            name: 'data_rojd',
            subtype: 'date',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: ['changeSelect'],
          }),
          selectField({
            label: 'Личный ключ',
            name: 'user_key',
            subtype: 'multiselect',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Направление',
            name: 'direction_json',
            alias: 'direction_id',
            subtype: 'multiselect',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Доступ',
            name: 'account_json',
            alias: 'account_id',
            subtype: 'multiselect',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'Штатный',
            name: 'in_state',
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
          selectField({
            label: 'Проживание',
            name: 'habitation_id',
            alias: 'direction_json',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 4,
            },
            defaultItems: [
              {
                id: 11,
                name: '--Самостоятельное--',
                bank_id: 11,
              },
            ],
            validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: '',
            name: 'saveForm',
            nextForm: true,
          }),
        ],
      },
      {
        id: 1,
        name: 'Расход',
        type: TableDefault,
        active: false,
        config: () => {},
      },
      {
        id: 2,
        name: 'Данные документов',
        type: () => {},
        detail: true,
        lists: [
          'user_keys',
          'habitation_id',
          'account_id',
          'direction_id',
          'grajdanstvo_id',
        ],
        alias: 'personal',
        active: false,
        documents: [
          {
            type: 'passport',
            name: 'Паспорт',
            fields: [
              stringField({
                label: 'Серия',
                name: 'seriya',
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
              stringField({
                label: 'Номер',
                name: 'number',
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
              stringField({
                label: 'К/П',
                name: 'code',
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
              dateField({
                label: 'Дата выдачи',
                name: 'date_issue',
                subtype: 'date',
                placeholder: '',
                classes: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: ['changeSelect'],
              }),
              stringField({
                label: 'Кем выдан',
                name: 'issued_by',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
            ],
          },
          {
            type: 'Snils',
            name: 'Снилс',
            fields: [
              stringField({
                label: 'Номер',
                name: 'name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
            ],
          },
          {
            type: 'passport_page_2',
            name: 'Паспорт стр.2',
            fields: [
              stringField({
                label: 'Адрес регистрации',
                name: 'issued_by',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
            ],
          },
          {
            type: 'inn',
            name: 'ИНН',
            fields: [
              stringField({
                label: 'Адрес регистрации',
                name: 'issued_by',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
            ],
          },
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: '',
            name: 'saveForm',
            nextForm: true,
          }),
        ],
      },
      {
        id: 3,
        name: 'Сканы',
        type: TableDefault,
        active: false,
        config: () => {},
      },
      {
        id: 4,
        name: 'Начисления и выплаты',
        type: TableDefault,
        active: false,
        config: () => {},
      },
      {
        path: 'add',
        id: 5,
        name: 'Заявка на персонал',
        type: 'FormStage',
        detail: true,
        stages: [
          {
            id: 0,
            name: 'Основные0',
            type: FormDefault,
            detail: true,
            lists: [
              { alias: 'direction_id_logistic', filter: [] },
              { alias: 'grajdanstvo_id', filter: [] },
            ],
            alias: 'personal_target',
            active: false,
            fields: [
              stringField({
                label: 'ФИО',
                name: 'fio',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
              }),
              dateField({
                label: 'Дата рождения',
                name: 'date_target',
                value: [],
                type: 'date',
                subtype: 'multiple',
                readonly: true,
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
                name: 'direction_id',
                alias: 'direction_id_logistic',
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
                update: {
                  module: 'selects/getList',
                  fields: ['object_id'],
                },
              }),
              autocompleteField({
                label: 'Объект',
                name: 'object_id',
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
                url: 'get/pagination_list/object_logistic',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                filters: [
                  {
                    field: 'direction_id',
                    value: '',
                  },
                ],
                dependence: {
                  type: 'default',
                  fillField: ['sum_nutrition', 'with_nutrition'],
                },
                update: {
                  module: 'selects/getList',
                  fields: ['personal_id'],
                },
                requiredFields: ['direction_id'],
              }),
              autocompleteField({
                label: 'Бригадир',
                name: 'personal_id',
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
                url: 'get/pagination_list/personal',
                position: {
                  cols: 12,
                  sm: 12,
                },
                // validations: { required },
                bootstrapClass: [''],
                filters: [
                  {
                    field: 'object_id',
                    value: '',
                  },
                ],
                requiredFields: ['object_id'],
              }),
              selectField({
                label: 'Гражданство',
                name: 'grajdanstvo_id',
                alias: 'grajdanstvo_id',
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
                update: {
                  module: 'selects/getList',
                  fields: ['object_id'],
                },
              }),
              checkboxField({
                label: 'Трансфер',
                name: 'transfer',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Адрес А',
                name: 'addressA',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    { field: 'transfer', value: [true] },
                    { field: 'grajdanstvo_id', value: [1, 2] },
                  ],
                },
              }),
              stringField({
                label: 'Адрес Б',
                name: 'addressB',
                placeholder: '',
                class: [''],
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
                text: 'Сохранить',
                type: 'submit',
                module: '',
                name: 'saveForm',
                action: 'nextStage',
                color: 'primary',
              }),
            ],
            formData: {},
          },
          {
            id: 1,
            name: 'Основные',
            type: () => {},
            //detail: true,
            lists: ['avatar_with_user_key_id'],
            alias: 'personal_target',
            active: false,
            fromLastTab: [
              {
                name: 'personal_id',
                alias: 'name',
                nameInTab: 'account_name',
                type: 'list',
              },
            ],
            fields: [
              textBlock({
                label: 'Создал',
                name: 'account_name',
                placeholder: '',
                readonly: true,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
              autocompleteField({
                label: '',
                name: 'avatar_with_user_key_id',
                alias: 'personal_id',
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
                url: 'get/pagination_list/avatar_with_user_key_id',
                position: {
                  cols: 12,
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
                filters: [
                  {
                    field: 'object_id',
                    value: '',
                  },
                ],
                dependence: {
                  //fields: ['statement_card', 'cardowner'],
                  type: 'api',
                  module: 'personal/getKeys',
                  //url: 'object_id/avatar_with_user_key_id',
                  field: 'print_form_key',
                  url: [
                    {
                      source: 'props',
                      field: 'object_id',
                    },
                    {
                      source: 'formData',
                      field: 'avatar_with_user_key_id',
                    },
                  ],
                },
              }),
              selectField({
                label: 'Ключ',
                name: 'print_form_key',
                //alias: 'direction_id_logistic',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'user_key',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 2,
                },
                validations: { required },
                bootstrapClass: [''],
              }),
            ],
            actions: [
              stringAction({
                text: 'Назад',
                type: 'cancel',
                module: '',
                name: 'saveForm',
                action: 'prevStage',
                color: 'normal',
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: '',
                name: 'saveForm',
                action: 'nextStage',
                color: 'primary',
              }),
            ],
            formData: {},
          },
        ],
      },
    ]

    const config3 = {
      // selector: '#mainTable',
      options: {
        url: 'get/pagination/personal_active',
        title: 'new title',
        type: 'typeComponent',
      },
      head: [
        {
          //id: 1
          title: 'ФИО',
          alias: 'p.personal_name',
          value: 'name',
        },
        {
          //id: 2,
          title: 'Должность',
          alias: 'p.personal_name2',
          value: 'personal_name2',
          // isShow: false,
        },
      ],
      detail: {
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        tabs: defaultForm,
      },
    }

    const { generalConfig } = useTable(config3)

    const configuration = generalConfig()

    return {
      testRef,
      config,
      config3,
      configuration,
    }
  },
}
</script>

<style lang="scss" scoped>
.testRed {
  font-size: $fontSizeTest;
}
</style>
