import filters from './filters'
import FormDefault from '@/components/Form/default/index.vue'
import TargetPersonal from '@/components/Form/targetPersonal/default/index.vue'
import FormStage from '@/components/Form/stage/index.vue'
import FormTarget from '@/components/Form/target/default/index.vue'

import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  dateField,
  textBlock,
  checkboxField,
  colorPicker,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'

export const editFields = [
  stringField({
    label: 'Название',
    name: 'name',
    placeholder: '',
    readonly: false,
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
    validations: { required },
    //isShow: false,
  }),
  colorPicker({
    label: 'Цвет',
    name: 'color',
    value: '#000000',
    placeholder: '',
    readonly: false,
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
  }),
  stringField({
    label: 'Адрес',
    name: 'address',
    placeholder: '',
    readonly: false,
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
    validations: { required },
    //isShow: false,
  }),
  autocompleteField({
    label: 'Регион',
    name: 'regions_id',
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
      sm: 12,
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
  }),
  selectField({
    label: 'Город',
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
      sm: 12,
    },
    validations: { required },
    bootstrapClass: [''],
    requiredFields: ['regions_id'],
  }),
  // autocompleteField({
  //   label: 'Офис-менеджер',
  //   name: 'office_manager_id',
  //   subtype: 'single',
  //   placeholder: '',
  //   class: [''],
  //   selectOption: {
  //     text: 'name',
  //     value: 'id',
  //   },
  //   items: [],
  //   page: 1,
  //   search: '',
  //   url: 'get/pagination_list/office_manager',
  //   position: {
  //     cols: 12,
  //     sm: 12,
  //   },
  //   value: null,
  //   readonly: {
  //     value: false,
  //     condition: [
  //       {
  //         funcCondition: (context) => {
  //           console.log(context.store.state.user)
  //           return context.store.state.user.permission_id !== 4
  //         },
  //         type: true,
  //       },
  //     ],
  //   },
  //   // value: null,
  //   // validations: { required },
  //   bootstrapClass: [''],
  // }),
]

import MainOffice from './main/index'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

const config = {
  title: 'Офисы',
  activeTab: 2,
  tabs: [MainOffice],
}

export default MainOffice
