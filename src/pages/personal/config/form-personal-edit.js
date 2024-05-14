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
import formPersonalHabitation from './form-personal-habitation'

const editFormPermissions = {
  // Бригадир(id = 13) - все readonly
  brigadir: {
    permissions: [13],
    type: true,
  },
  //  Менеджер(id = 1) - если направление логистика, то может менять доступ, остальное readonly, если направление розница, то все поля readonly
  manager: [
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [1],
      type: false,
    },
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [2],
      type: true,
    },
  ],
  //  Рук. фил.(id = 15), ЦУП(id = 2), Директор(id = 3) - может менять телефон, доступ, остальное readonly
  rukFIlCUPDirector: {
    access: {
      permissions: [15, 2, 3],
      type: false,
    },
    denied: {
      permissions: [15, 2, 3],
      type: true,
    },
  },
  DBA: {
    access: {
      permissions: [4],
      type: false,
    },
    denied: {
      permissions: [4],
      type: true,
    },
  },
  OBDandOKK: {
    access: {
      permissions: [7, 8],
      type: false,
    },
    denied: {
      permissions: [7, 8],
      type: true,
    },
  },
  // Убрать ОКК
}

export default {
  id: uuidv4(),
  path: 'edit',
  name: 'Основные',
  type: 'FormDefault',
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    name: 'Редактировать проживание',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [Object.assign({}, formPersonalHabitation)],
  },
  lists: [
    { alias: 'user_keys', filter: [] },
    { alias: 'account_id', filter: [] },
    { alias: 'direction_id', filter: [] },
    { alias: 'grajdanstvo_id', filter: [] },
    {
      alias: 'objects_personal',
      filter: [
        {
          field: 'object_id',
          alias: 'personal_id',
          value: '',
          // source: '+route.params.id',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
  ],
  alias: 'personal',
  active: false,
  fields: [
    stringField({
      label: 'Фамилия',
      name: 'surname',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      validations: { required },
      //isShow: false,
      readonly: false,
      // readonly: {
      //   value: false,
      //   condition: [
      //     // editFormPermissions.brigadir,
      //     // editFormPermissions.manager[1],
      //     // editFormPermissions.rukFIlCUPDirector.denied,
      //     // editFormPermissions.DBA.access,
      //     // editFormPermissions.OBDandOKK.access,
      //   ],
      // },
    }),
    stringField({
      label: 'Имя',
      name: 'name_n',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      validations: { required },
      //isShow: false,
      readonly: false,
      // readonly: {
      //   value: false,
      //   condition: [
      //     // editFormPermissions.brigadir,
      //     // editFormPermissions.manager[1],
      //     // editFormPermissions.rukFIlCUPDirector.denied,
      //     // editFormPermissions.DBA.access,
      //     // editFormPermissions.OBDandOKK.access,
      //   ],
      // },
    }),
    stringField({
      label: 'Отчество',
      name: 'patronymic',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      validations: {},
      //isShow: false,
      readonly: false,
      // readonly: {
      //   value: false,
      //   condition: [
      //     // editFormPermissions.brigadir,
      //     // editFormPermissions.manager[1],
      //     // editFormPermissions.rukFIlCUPDirector.denied,
      //     // editFormPermissions.DBA.access,
      //     // editFormPermissions.OBDandOKK.access,
      //   ],
      // },
    }),
    stringField({
      label: 'Телефон',
      name: 'telefon',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
      readonly: false,
      // readonly: {
      //   value: false,
      //   condition: [
      //     // editFormPermissions.brigadir,
      //     // editFormPermissions.manager[1],
      //     // editFormPermissions.rukFIlCUPDirector.access,
      //     // editFormPermissions.DBA.access,
      //     // editFormPermissions.OBDandOKK.access,
      //   ],
      // },
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
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: {
        value: false,
        condition: [
          editFormPermissions.brigadir,
          editFormPermissions.manager[1],
          editFormPermissions.rukFIlCUPDirector.denied,
          // editFormPermissions.DBA.access,
          // editFormPermissions.OBDandOKK.access,
        ],
      },
    }),
    stringField({
      label: 'Примечание',
      name: 'comment',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
      readonly: {
        value: false,
        condition: [
          editFormPermissions.brigadir,
          editFormPermissions.manager[1],
          editFormPermissions.rukFIlCUPDirector.denied,
          // editFormPermissions.DBA.access,
          // editFormPermissions.OBDandOKK.access,
        ],
      },
    }),
    dateField({
      label: ' Дата рождения',
      name: 'data_rojd',
      subtype: 'date',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: ['changeSelect'],
      readonly: {
        value: false,
        condition: [
          editFormPermissions.brigadir,
          editFormPermissions.manager[1],
          editFormPermissions.rukFIlCUPDirector.denied,
          // editFormPermissions.DBA.access,
          // editFormPermissions.OBDandOKK.access,
        ],
      },
    }),
    selectField({
      label: 'Личный ключ',
      name: 'user_key',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      //validations: { required },
      bootstrapClass: [''],
      readonly: true,
      //readonly: {
      //  value: false,
      //  condition: [
      //    editFormPermissions.brigadir,
      //    editFormPermissions.manager[1],
      //    editFormPermissions.rukFIlCUPDirector.denied,
      //    editFormPermissions.DBA.access,
      //    editFormPermissions.OBDandOKK.access,
      //  ],
      //},
    }),
    selectField({
      label: 'Направление',
      name: 'direction_json',
      alias: 'direction_id',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
      // readonly: {
      //   value: false,
      //   condition: [
      //     editFormPermissions.brigadir,
      //     editFormPermissions.manager[1],
      //     editFormPermissions.rukFIlCUPDirector.denied,
      //     // editFormPermissions.DBA.access,
      //     editFormPermissions.OBDandOKK.denied,
      //   ],
      // },
    }),
    selectField({
      label: 'Доступ',
      name: 'account_json',
      alias: 'account_id',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: {
        value: false,
        condition: [
          editFormPermissions.brigadir,
          ...editFormPermissions.manager,
          editFormPermissions.rukFIlCUPDirector.access,
          editFormPermissions.DBA.access,
          editFormPermissions.OBDandOKK.denied,
        ],
      },
    }),
    // selectField({
    //   label: 'Проживание',
    //   name: 'habitation_id',
    //   alias: 'habitation',
    //   placeholder: '',
    //   class: [''],
    //   selectOption: {
    //     text: 'name',
    //     value: 'id',
    //   },
    //   items: [],
    //   position: {
    //     cols: 12,
    //     sm: 6,
    //   },
    //   defaultItems: [
    //     {
    //       id: 11,
    //       name: '--Самостоятельное--',
    //       bank_id: 11,
    //     },
    //   ],
    //   //validations: { required },
    //   bootstrapClass: [''],
    //   readonly: {
    //     value: false,
    //     condition: [
    //       editFormPermissions.brigadir,
    //       editFormPermissions.manager[1],
    //       editFormPermissions.rukFIlCUPDirector.denied,
    //       editFormPermissions.DBA.denied,
    //       editFormPermissions.OBDandOKK.access,
    //     ],
    //   },
    // }),
    selectField({
      label: 'Объекты',
      name: 'object_id',
      alias: 'objects_personal',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    checkboxField({
      label: 'Штатный',
      name: 'in_state',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      readonly: false,
      // readonly: {
      //   value: false,
      //   condition: [
      //     // editFormPermissions.brigadir,
      //     // editFormPermissions.manager[1],
      //     // editFormPermissions.rukFIlCUPDirector.denied,
      //     // editFormPermissions.DBA.access,
      //     // editFormPermissions.OBDandOKK.access,
      //   ],
      // },
    }),
    autocompleteField({
      label: 'Проживание',
      name: 'habitation_id',
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
      url: 'get/pagination_list/habitation',
      defaultItems: [
        {
          id: 0,
          name: '--Самостоятельное--',
        },
      ],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'object_id',
          value: '',
          type: 'num',
        },
      ],
      appendAction: [
        {
          icon: '$IconHome',
          label: 'Сменить проживание',
          action: {
            type: 'changeUrl',
            name: 'personal/:id/edit_habitation',
            refreshForm: true,
          },
          isShow: {
            value: false,
            condition: [
              {
                permissions: [1, 3, 4, 5],
                type: true,
              },
            ],
          },
        },
      ],
      readonly: true,
      // readonly: {
      //   value: false,
      //   condition: [
      //     editFormPermissions.brigadir,
      //     editFormPermissions.manager[1],
      //     editFormPermissions.rukFIlCUPDirector.denied,
      //     editFormPermissions.DBA.denied,
      //     editFormPermissions.OBDandOKK.access,
      //   ],
      // },
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/personal',
      action: 'saveFormId',
      color: 'primary',
    }),
  ],
}
