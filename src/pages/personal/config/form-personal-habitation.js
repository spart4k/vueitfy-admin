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
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Редактировать проживание',
  type: 'FormDefault',
  path: 'edit_habitation',
  alias: 'habitation',
  active: false,
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [],
  },
  lists: [
    {
      alias: 'personal_habitation',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
  ],
  fields: [
    // stringField({
    //   label: 'personal_habitation',
    //   name: 'personal_habitation',
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
      label: 'personal_habitation',
      name: 'personal_habitation',
      alias: 'personal_habitation',
      subtype: 'single',
      putFirst: true,
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
      //   dependence: [
      //     {
      //       type: 'default',
      //       fillField: [
      //         {
      //           formKey: 'personal_habitation',
      //           compareKey: 'id',
      //           objectKey: 'id',
      //           targetKey: 'personal_habitation_copy',
      //         },
      //       ],
      //     },
      //   ],
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'personal_habitation',
      name: 'personal_habitation',
      subtype: 'single',
      placeholder: '',
      class: ['background-down'],
      page: 1,
      search: '',
      url: 'get/pagination_list/habitation',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
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
      module: 'form/create',
      url: 'generation/personal_doc',
      useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
      download: true,
      name: 'createForm',
      action: 'createForm',
    }),
  ],
}
