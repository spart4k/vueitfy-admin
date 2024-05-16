import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  carouselField,
  docListField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import {
  required,
  hasDate,
  hasTime,
  numeric,
  length,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Добавить карту',
  type: 'FormDefault',
  path: 'give',
  //   alias: 'corp_bank',
  active: false,
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    // alias: 'corp_card',
    url: '/get/form/',
    bootstrapClass: [''],
  },
  lists: [
    // {
    //   alias: 'bank_id_without_nal',
    //   filter: [],
    // },
  ],
  fields: [
    autocompleteField({
      label: 'Аккаунт',
      name: 'account_id',
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
      url: 'get/pagination_list/corp_card_accounts_assign',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      color: 'primary',
      useRouteKey: [{ requestKey: 'card_id', storageKey: 'card_id' }],
      module: 'form/create',
      url: 'create/bank/assign',
      name: 'createForm',
      action: 'createForm',
    }),
  ],
}
