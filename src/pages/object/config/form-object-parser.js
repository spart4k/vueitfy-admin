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
import FormOutput from '@/components/Form/output/index.vue'
import Vue, { toRef, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'

export default {
  path: 'tarif_parser',
  id: uuidv4(),
  name: 'Парсер реестра',
  type: FormOutput,
  detail: true,
  initialRequestUrl: 'get/parser/active/',
  lastStage: 'TarifStage',
  outputType: 5,
  lists: [{ alias: 'x5_territories', filter: [] }],
  fields: [
    // dateField({
    //   label: 'Период',
    //   name: 'period',
    //   subtype: 'period',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 12,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    // }),
    selectField({
      label: 'Территория',
      name: 'territory_id',
      alias: 'x5_territories',
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
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'agreement_id',
          url: 'get/pagination_list/territories_agreement',
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Договор',
      name: 'agreement_id',
      subtype: 'single',
      placeholder: '',
      notSend: true,
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/territories_agreement',
      filter: [
        {
          field: 'territory_id',
          value: '',
          required: true,
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'type_contract_id',
          url: 'get/pagination_list/versions_agreement',
        },
        {
          type: 'default',
          fillField: ['type_id'],
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Версия',
      name: 'type_contract_id',
      subtype: 'single',
      placeholder: '',
      notSend: true,
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/versions_agreement',
      position: {
        cols: 12,
        sm: 12,
      },
      filter: [
        {
          field: 'agreement_id',
          value: '',
          required: true,
        },
      ],
      dependence: [
        {
          type: 'default',
          fillField: ['contract_id', 'contract_type'],
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'contract_id',
      name: 'contract_id',
      requestType: 'number',
      placeholder: '',
      class: [''],
      disabled: true,
      isShow: {
        value: true,
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'contract_type',
      name: 'contract_type',
      requestKey: 'type_contract_id',
      requestType: 'number',
      placeholder: '',
      class: [''],
      disabled: true,
      isShow: {
        value: true,
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'type_id',
      name: 'type_id',
      requestType: 'number',
      requestKey: 'type_parser',
      placeholder: '',
      class: [''],
      disabled: true,
      isShow: {
        value: true,
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dropZoneField({
      label: 'Файл',
      name: 'file',
      notPut: true,
      placeholder: '',
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
        maxSize: 500,
        type: ['xlsx'],
        valueId: 'parser_employment',
        folder: 'parser',
        name: '`parser_employment`',
        paramsForEmit: this,
        countFiles: 1,
      },
      value: [],
    }),
    checkboxField({
      name: 'reparse',
      value: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      disabled: true,
      isShow: {
        value: true,
      },
      bootstrapClass: [''],
    }),
  ],
  outputData: {
    file: {
      text: 'По файлу:',
      value: null,
      stage: 1,
    },
    search: {
      text: 'Найдено:',
      value: null,
      stage: 1,
    },
    error: {
      text: 'С ошибками:',
      value: null,
      stage: 1,
    },
    count: {
      text: 'Кол-во:',
      value: null,
      stage: 2,
    },
  },
  stageActions: [
    {
      actions: [
        stringAction({
          text: 'Закрыть',
          color: 'error',
          name: 'closePopup',
          action: 'closePopup',
          skipValidation: true,
        }),
        stringAction({
          text: 'Сохранить',
          type: 'submit',
          color: 'primary',
          name: 'saveFormStore',
          action: 'saveFormStore',
          notClose: true,
          module: 'form/loadParser',
          url: 'load/parser/',
        }),
      ],
    },
    {
      actions: [
        stringAction({
          text: 'Закрыть',
          color: 'error',
          name: 'closePopup',
          action: 'closePopup',
          skipValidation: true,
        }),
        stringAction({
          text: 'К выработке',
          type: 'submit',
          color: 'primary',
          confirm: {
            text: '`Вы подтверждаете переход к выработке?`',
            width: 550,
          },
          action: 'changeStage',
          changeDirection: 1,
          local: true,
        }),
      ],
    },
    {
      actions: [
        stringAction({
          text: 'Вернуться',
          color: 'error',
          action: 'changeStage',
          changeDirection: -1,
          local: true,
        }),
        stringAction({
          text: 'Отправить',
          type: 'submit',
          color: 'primary',
          confirm: {
            text: '`Подтвердите действие`',
            width: 350,
          },
          action: 'loadParser',
          local: true,
          conditionCode: {
            key: 'code',
            results: [
              {
                value: 1,
                type: 'success',
                text: '',
                component: Vue.component('component', {
                  template: `<template>
                      <div>
                        <p>Оформлено {{proxyValue.response.data.count - proxyValue.response.data.errors_count}}/{{proxyValue.response.data.count}} сотрудников</p>
                        <p v-if="proxyValue.response.data.errors_count"><a @click="dialog = true" class="font-weight-bold">Просмотреть ошибки</a></p>
                        <v-dialog persistent v-model="dialog" width="600">
                          <v-card class="py-6 px-6">
                            <v-card-title class="py-0 px-0 text--text text-h5 font-weight-bold"
                              >Вывод ошибок</v-card-title
                            >
                            <v-divider class="mt-3"></v-divider>
                            <div style="max-height: 70vh" class="text--text py-3 overflow-auto">
                              <v-row v-for="(item, index) in proxyValue.response.data?.errors" :key="index">
                                <v-icon color="error" class="mr-3"> mdi-alert </v-icon>
                                {{ item }}
                              </v-row>
                            </div>
                            <v-divider class="mb-3"></v-divider>
                            <v-row class="justify-end">
                              <v-btn @click="dialog = false" color="text" text> Закрыть </v-btn>
                            </v-row>
                          </v-card>
                        </v-dialog>
                      </div>
                    </template>`,
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
                    const dialog = ref(false)
                    return {
                      dialog,
                      proxyValue,
                    }
                  },
                }),
              },
            ],
          },
        }),
      ],
    },
  ],
}
