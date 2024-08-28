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

export default {
  path: 'employment_parser',
  id: uuidv4(),
  name: 'Парсер реестра',
  type: FormOutput,
  detail: true,
  initialRequestUrl: 'get/parser/active/',
  lastStage: 'EmploymentStage',
  outputType: 4,
  lists: [{ alias: 'employed_registry_parser', filter: [] }],
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
      label: 'Тип реестра',
      name: 'type_parser',
      alias: 'employed_registry_parser',
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
        }),
      ],
    },
  ],
}
