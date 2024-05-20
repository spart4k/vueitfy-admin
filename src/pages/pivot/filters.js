import {
  dateField,
  selectField,
  autocompleteField,
  dateRangeField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    { alias: 'filter_personal_target_vid_vedomost', filter: [] },
    { alias: 'filter_personal_target_status', filter: [] },
    { alias: 'filter_personal_target_direction', filter: [] },
    { alias: 'filter_personal_target_manager', filter: [] },
    { alias: 'shifts', filter: [] },
    { alias: 'filter_personal_target_doljnost', filter: [] },
  ],
  alias: 'payment',
  active: false,
  fields: [
    selectField({
      label: 'Статус',
      name: 'status_id',
      alias: 'filter_personal_target_status',
      subtype: 'single',
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
      bootstrapClass: [''],
      aliasFilter: 'pt.status',
    }),
    selectField({
      label: 'Вид ведомости:',
      name: 'vid_vedomost_id',
      alias: 'filter_personal_target_vid_vedomost',
      subtype: 'single',
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
      bootstrapClass: [''],
      aliasFilter: 'pt.vid_vedomost_id',
    }),
    selectField({
      label: 'Направления',
      name: 'direction_id',
      subtype: 'single',
      alias: 'filter_personal_target_direction',
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
      bootstrapClass: [''],
      aliasFilter: 'pt.direction_id',
    }),
    autocompleteField({
      label: 'Менеджеры',
      name: 'account_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/filter_personal_target_manager',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'pt.manager',
      isShow: {
        value: false,
        condition: [
          {
            permissions: [13, 1],
            type: false,
          },
        ],
      },
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/filter_personal_target_object',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'pt.object_id',
    }),
    autocompleteField({
      label: 'Линейщик',
      name: 'personal_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/filter_personal_target_personal',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'pt.personal_id',
    }),
    selectField({
      label: 'Должность:',
      name: 'doljnost_id',
      subtype: 'single',
      alias: 'filter_personal_target_doljnost',
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
      bootstrapClass: [''],
      aliasFilter: 'pt.doljnost_id',
    }),
    selectField({
      label: 'Тип смены',
      name: 'type_shift',
      alias: 'shifts',
      subtype: 'single',
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
      bootstrapClass: [''],
      aliasFilter: 'pt.type_shift',
    }),
  ],
  actions: [
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      action: 'saveFilter',
      name: 'saveFilter',
      nextForm: true,
    }),
  ],
}

export default filters
