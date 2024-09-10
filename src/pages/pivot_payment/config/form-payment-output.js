import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  // autocompleteField,
  dateField,
  checkboxField,
  dropZoneField,
} from '@/utils/fields.js'
import _ from 'lodash'
import { stringAction } from '@/utils/actions'
import FormOutput from '@/components/Form/output/index.vue'

export default {
  path: 'output',
  id: 1,
  name: 'Парсер X5',
  type: FormOutput,
  detail: true,
  initialRequestUrl: 'get/parser/active/',
  outputType: 1,
  lastStage: 'PaymentStage',
  lists: [
    {
      alias: 'object_type_period',
      filter: [
        {
          alias: 'type_parser',
          sendEmpty: true,
          value: [1],
          type: 'num',
        },
      ],
    },
    // { alias: 'object_period', filter: [] },
    // { alias: 'service_spr', filter: [] },
  ],
  fields: [
    dateField({
      label: 'Период',
      name: 'period',
      subtype: 'period',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Тип',
      name: 'type_parser',
      alias: 'object_type_period',
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
        valueId: 'parser_objects',
        folder: 'parser',
        name: '`parser_payment`',
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
      text: 'Начислений:',
      value: null,
      stage: 2,
    },
    sum: {
      text: 'На сумму:',
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
            text: '`Вы подтверждаете начисления на сумму ${outputData.value.sum.value}р?`',
            width: 650,
          },
          action: 'loadParser',
          local: true,
        }),
      ],
    },
  ],
}
