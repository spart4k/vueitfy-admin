import Vue, { ref, onMounted, computed, toRef } from 'vue'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/Autocomplete/form'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datepicker from '@/components/Date/Default/index.vue'
import { required } from '@/utils/validation.js'
import { getList } from '@/api/selects'
import {
  stringField,
  dateField,
  selectField,
  checkboxField,
  autocompleteField,
  // dropZoneField,label:"label:"ФИО директора"
} from '@/utils/fields.js'

export default {
  name: 'Form-Documents-Row',
  props: {
    document: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    skan: {
      type: Boolean,
      default: false,
    },
    personalId: {
      type: Number,
      default: null,
    },
    docNames: {
      type: Object,
      default: () => {},
    },
    showScan: {
      type: Boolean,
      default: false,
    },
    showDropzone: {
      type: Boolean,
      default: true,
    },
    allFieldsRequireds: {
      type: Boolean,
      default: false,
    },
    acceptDocPanel: {
      type: Boolean,
      default: false,
    },
    correct: {
      type: Boolean,
      default: false,
    },
    docsData: {
      type: Object,
      default: () => {},
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    citizenship: {
      type: Array,
      default: () => [],
    },
    fromTask: {
      type: Boolean,
      default: false,
    },
    withoutSave: {
      type: Boolean,
      default: false,
    },
    delFile: {
      type: Boolean,
      default: true,
    },
    showFields: {
      type: Boolean,
      default: true,
    },
    bankCompleted: {
      type: Boolean,
      default: false,
    },
    taskInfo: {
      type: Object,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Autocomplete,
    DropZone,
    Datepicker,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
        store,
      },
    }
    const loading = ref(false)
    const dropZoneOptions = {
      withoutSave: true,
      folder: 'personal_doc',
    }
    // const documentData = computed(() => {
    //   let result = []
    //   result = Object.values(props.document)[0].reduce((acc, item) => {
    //     acc.push({
    //       name: Object.keys(item)[0],
    //       value: Object.values(item)[0],
    //     })
    //     return acc
    //   }, [])
    //   return result
    // })
    const folderPanel = ref(false)
    const documentName = computed(() => Object.keys(props.document)[0])
    const switchType = (key) => {
      let result = ''
      switch (key) {
        case 'pasp_data_vid':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'date_rojd':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'name':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'grajdanstvo_id':
          result = selectField({
            label: switchLabel(key),
            name: key,
            // alias: 'status_pt',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            defaultItems: props.citizenship,
            items: props.citizenship,
            position: {
              cols: 12,
              sm: 6,
            },
            value: 1,
            disable: true,
            // validations: { required },
            bootstrapClass: [''],
          })
          break
        case 'pasp_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'pasp_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'pasp_kod_podr':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'pasp_kem':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'snils':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'invoice':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'priority':
          result = checkboxField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            value: false,
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          })
          break
        case 'bank_id':
          result = selectField({
            label: switchLabel(key),
            name: key,
            // alias: 'status_pt',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [
              {
                text: 'СБЕРБАНК',
                value: 1,
              },
              {
                text: 'Почта Банк',
                value: 2,
              },
              {
                text: 'Пром Связь',
                value: 3,
              },
              {
                text: 'Альфабанк',
                value: 4,
              },
              {
                text: 'Тинькофф',
                value: 5,
              },
              {
                text: 'ВТБ',
                value: 7,
              },
              {
                text: '-НАЛИЧНЫЕ-',
                value: 11,
              },
              {
                text: 'УБРИР',
                value: 12,
              },
              {
                text: 'Открытие',
                value: 13,
              },
              {
                text: 'МТС Банк',
                value: 14,
              },
            ],
            position: {
              cols: 12,
              sm: 6,
            },
            value: 1,
            disable: true,
            // validations: { required },
            bootstrapClass: [''],
          })
          break
        case 'comment':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'registration_address':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'patent_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'patent_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'patent_prof':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'pasp_address_reg':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'med_book_date':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'view_home_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'view_home_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'migr_card_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'migr_card_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'migr_card_data_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'migr_card_data_out':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'registration_date_c_docs_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'registration_date_do_docs_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'check_patent_date_pay':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'check_patent_date_pay_now':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'med_view_docs_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            subtype: 'period',
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'sex':
          result = selectField({
            label: switchLabel(key),
            name: key,
            // alias: 'status_pt',
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
            value: 1,
            disable: true,
            // validations: { required },
            bootstrapClass: [''],
          })
          break
        case 'pasp_date_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'pasp_date_out':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'citizenship':
          result = selectField({
            label: switchLabel(key),
            name: key,
            // alias: 'status_pt',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            defaultItems: [
              {
                id: 1,
                name: 'РФ',
              },
              {
                id: 2,
                name: 'Узбекистан',
              },
              {
                id: 3,
                name: 'Таджикистан',
              },
              {
                id: 4,
                name: 'Киргизия',
              },
              {
                id: 5,
                name: 'Украина',
              },
              {
                id: 6,
                name: 'Казахстан',
              },
              {
                id: 7,
                name: 'Бєларусь',
              },
              {
                id: 8,
                name: 'Азербайджан',
              },
              {
                id: 9,
                name: 'Армения',
              },
              {
                id: 10,
                name: 'Молдова',
              },
              {
                id: 11,
                name: 'Туркменистан',
              },
            ],
            items: [
              {
                id: 1,
                name: 'РФ',
              },
              {
                id: 2,
                name: 'Узбекистан',
              },
              {
                id: 3,
                name: 'Таджикистан',
              },
              {
                id: 4,
                name: 'Киргизия',
              },
              {
                id: 5,
                name: 'Украина',
              },
              {
                id: 6,
                name: 'Казахстан',
              },
              {
                id: 7,
                name: 'Бєларусь',
              },
              {
                id: 8,
                name: 'Азербайджан',
              },
              {
                id: 9,
                name: 'Армения',
              },
              {
                id: 10,
                name: 'Молдова',
              },
              {
                id: 11,
                name: 'Туркменистан',
              },
            ],
            position: {
              cols: 12,
              sm: 6,
            },
            value: 1,
            disable: true,
            // validations: { required },
            bootstrapClass: [''],
          })
          break
        case 'goal_visit':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'card_id_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'card_id_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'card_id_period_date_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'card_id_period_date_out':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'card_id_kem':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'card_id_date_vid':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'patent_date_docs_in':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'patent_date_docs_out':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: '',
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'card_id_pers_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'patent_region':
          result = autocompleteField({
            label: switchLabel(key),
            name: key,
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
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
          })
          break
        case 'patent_special_marks_date':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: null,
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'dms_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'dms_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'check_patent_period':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'dms_name':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'oms_name':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'oms_num':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'oms_ser':
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
          break
        case 'dms_vidachi':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: null,
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break
        case 'oms_vidachi':
          result = dateField({
            label: switchLabel(key),
            name: key,
            value: null,
            type: 'date',
            //subtype: 'single',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          })
          break

        default:
          result = stringField({
            label: switchLabel(key),
            name: key,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            // required: { required },
          })
      }
      return result
    }

    const switchLabel = (key) => {
      let result = ''
      switch (key) {
        case 'pasp_data_vid':
          result = 'Дата выдачи'
          break
        case 'name':
          result = 'ФИО'
          break
        case 'Дата рождения':
          result = 'data_rojd'
          break
        case 'Гражданство':
          result = 'grajdanstvo_id'
          break
        case 'pasp_ser':
          result = 'Серия'
          break
        case 'pasp_num':
          result = 'Номер'
          break
        case 'pasp_kod_podr':
          result = 'К/П'
          break
        case 'pasp_kem':
          result = 'Кем выдан'
          break
        case 'snils':
          result = 'Номер'
          break
        case 'invoice':
          result = 'Номер Р/С'
          break
        case 'priority':
          result = 'Приоритет'
          break
        case 'bank_id':
          result = 'Банк'
          break
        case 'comment':
          result = 'Примечание'
          break
        case 'registration_address':
          result = 'Адрес'
          break
        case 'patent_ser':
          result = 'Серия'
          break
        case 'patent_num':
          result = 'Номер'
          break
        case 'patent_prof':
          result = 'Профессия'
          break
        case 'pasp_address_reg':
          result = 'Адрес регистрации'
          break
        case 'med_book_date':
          result = 'Дата'
          break
        case 'view_home_ser':
          result = 'Серия'
          break
        case 'view_home_num':
          result = 'Номер'
          break
        case 'migr_card_ser':
          result = 'Серия'
          break
        case 'migr_card_num':
          result = 'Номер'
          break
        case 'migr_card_data_in':
          result = 'Дата въезда'
          break
        case 'migr_card_data_out':
          result = 'Дата выезда'
          break
        case 'inn':
          result = 'Номер'
          break
        case 'fio':
          result = 'ФИО'
          break
        case 'surname':
          result = 'фамилия'
          break
        case 'name_n':
          result = 'Имя'
          break
        case 'patronymic':
          result = 'Отчество'
          break
        case 'registration_date_c_docs_in':
          result = 'C'
          break
        case 'registration_date_do_docs_in':
          result = 'По'
          break
        case 'check_patent_date_pay':
          result = 'Дата оплаты'
          break
        case 'check_patent_date_pay_now':
          result = 'Дата оплаты'
          break
        case 'med_view_docs_in':
          result = 'Период'
          break
        case 'sex':
          result = 'Пол'
          break
        case 'pasp_date_in':
          result = 'С'
          break
        case 'pasp_date_out':
          result = 'По'
          break
        case 'citizenship':
          result = 'Гражданство'
          break
        case 'goal_visit':
          result = 'Цель визита '
          break
        case 'card_id_num':
          result = 'Номер'
          break
        case 'card_id_ser':
          result = 'Серия'
          break
        case 'card_id_period_date_in':
          result = 'С'
          break
        case 'card_id_period_date_out':
          result = 'По'
          break
        case 'card_id_kem':
          result = 'Орган выдачи'
          break
        case 'card_id_date_vid':
          result = 'Дата выдачи'
          break
        case 'card_id_pers_num':
          result = 'Персональный номер'
          break
        case 'patent_region':
          result = 'Регион'
          break
        case 'patent_date_docs_in':
          result = 'С'
          break
        case 'patent_date_docs_out':
          result = 'По'
          break
        case 'dms_ser':
          result = 'Серия'
          break
        case 'dms_num':
          result = 'Номер'
          break
        case 'dms_vidachi':
          result = 'Дата выдачи'
          break
        case 'check_patent_period':
          result = 'Период оплаты'
          break
        case 'dms_name':
          result = 'Наименование полиса'
          break
        case 'oms_name':
          result = 'Наименование полиса'
          break
        case 'patent_special_marks_date':
          result = 'Особые отметки'
          break

        case 'oms_num':
          result = 'Номер'
          break
        case 'oms_ser':
          result = 'Серия'
          break
        case 'oms_vidachi':
          result = 'Дата выдачи'
          break

        default:
          result = key
      }
      return result
    }

    const { makeRequest: sendBankCardRequest } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setBankData', {
          data: {
            data: {
              id: props.bankCompleted ? props.bankCompleted : undefined,
              bank_id: formData.bank_id,
              fio: formData.fio,
              invoice: formData.invoice,
              priority: formData.priority,
              personal_id: props.personalId,
              comment: formData.comment,
            },
          },
        })
      },
      successMessage: 'Банковские реквизиты успешно добавлены',
    })

    const isCorrect = ref(false)
    const sendBankCard = async () => {
      const { result } = await sendBankCardRequest()
      if (result && !props.bankCompleted) {
        const { makeRequest: updateDopData } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/updateDopData', {
              id: props.taskInfo.task.id,
              dop: {
                bank_card_id: result,
              },
            })
          },
          successMessage: 'Успешно',
        })
        await updateDopData()
      }
      const bankCardId = result !== 0 ? result : props.bankCompleted
      ctx.emit('changeDocs', {
        bank_card_id: bankCardId,
        // formObj: formObj,
      })
    }
    const confirmDoc = () => {
      isCorrect.value = true
    }
    const confirmCorrect = async (doc) => {
      isCorrect.value = true
      if (props.document.doc_id === 3) {
        sendBankCard()
      }
      // correctedDocs.value[doc.id] = formObj.value[doc.doc_id].getData()
      // const { result } = await makeRequest(doc.id)

      // const bankCardId = result

      // correctedDocs.value = {
      //   ...correctedDocs.value,
      //   [doc.id]: formObj.value[doc.doc_id].formData,
      // }
      // ctx.emit('change', {
      //   // bank_card_id: bankCardId,
      //   // correctedDocs: correctedDocs.value,
      // })
    }
    const docs_data = props.document.docs_data
    const fieldsData = ref([])
    const initFields = () => {
      for (let key in docs_data) {
        const field = switchType(key)
        if (props.allFieldsRequireds) {
          if (
            field.name === 'comment' ||
            field.name === 'patent_special_marks_date'
          )
            field.validations = ''
          else {
            field.validations = { required }
          }
        }
        fieldsData.value.push(field)
      }
    }
    initFields()
    const docFields = {}
    const fields = () => {
      const fields = {}
      const tabFields = fieldsData.value
      tabFields.forEach((el) => {
        // const { validations } = tabFields[key]
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'default', docs_data[el.name])
      })
      // for (let key in tabFields) {
      //   console.log(key, tabFields)
      //   const { validations } = tabFields[key]
      //   if (typeof tabFields[key].isShow === 'boolean' && tabFields[key].isShow)
      //     Vue.set(fields, tabFields[key].name, {})
      //   else if (
      //     typeof tabFields[key].isShow === 'object' &&
      //     tabFields[key].isShow.value
      //   ) {
      //     // console.log('CONDITION TRUE', el.name)
      //     Vue.set(fields, tabFields[key].name, {})
      //   } else {
      //     return
      //   }
      //   console.log(tabFields[key], 'FIELD-EL')
      //   Vue.set(fields, tabFields[key].name, {})
      //   Vue.set(fields[tabFields[key].name], 'validations', validations)
      //   Vue.set(fields[tabFields[key].name], 'default', docs_data[key])
      // }
      // props.tab.fields.forEach((el) => {})
      return fields
    }
    fields()
    const form = {
      id: 0,
      name: 'Данные документов',
      lists: [
        {
          alias: 'sex',
          filter: [],
        },
        {
          alias: 'bank_id',
          filter: [],
        },
        {
          alias: 'citizenship',
          filter: [],
        },
      ],
      fields: fieldsData.value,
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const {
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
    } = useForm({
      // form: props.document,
      fields: fields(),
      context,
      loading,
      form,
      makeRequestList,
      //makeRequestList,
    })
    let fileExt
    let fileName
    let form_data
    const isEdit = ref(false)
    let file = ref('')
    const basketFiles = ref({})
    const dropZoneRef = ref(null)
    const pathDock = ref('')
    const toEdit = () => {
      isEdit.value = true
    }
    const toPreview = () => {
      isEdit.value = false
    }
    const listRequestsForUpload = ref([])
    let addFiles = async (e) => {
      console.log(e[0])
      file.value = e[0]
      fileExt = file.value.type.split('/')[1]
      fileName = `personal_doc_` + Date.now() + '.' + fileExt
      form_data = new FormData()
      form_data.append('file', e[0])

      basketFiles.value = {
        fileExt,
        fileName,
        form_data,
        file,
      }
      const { makeRequest: delInfoAFile } = useRequest({
        context,
        request: (id) =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              id: props.document.id,
              del: 1,
            },
          }),
      })
      const { makeRequest: loadImage } = useRequest({
        context,
        request: () => {
          return store.dispatch('storage/loadFilePut', {
            // id: 1,
            folder: 'personal_doc',
            fileName,
            file: file.value,
          })
        },
        successMessage: 'Файл успешно загружен',
      })
      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () => {
          const path_doc = `/personal_doc/${fileName}`
          return store.dispatch('taskModule/updateFileData', {
            data: {
              personal_id: props.personalId,
              doc_id: props.document.doc_id,
              path_doc,
              id: !props.delFile ? props.document.id : undefined,
              from_task: props.fromTask ? props.fromTask : undefined,
            },
          })
        },
      })
      if (!props.withoutSave) {
        if (pathDock.value.length && props.delFile) {
          await delInfoAFile(props.document.id)
        }
        await loadImage(basketFiles.value)
        await updateFileData()
        const path_doc = `/personal_doc/${basketFiles.value.fileName}`
        pathDock.value = [path_doc]
        props.document.path_doc = path_doc
      } else {
        const clearBasket = () => {
          basketFiles.value = {}
          dropZoneRef.value.clearDropzone()
        }
        listRequestsForUpload.value.push({
          delInfoAFile,
          loadImage,
          updateFileData,
          clearBasket,
        })
        pathDock.value = [e[0].dataURL]
      }

      toPreview()
    }
    const listRequestsResult = ref([])
    const document = toRef(props, 'document')
    const loadDocument = async () => {
      await Promise.all(
        listRequestsForUpload.value.map(async (doc, index) => {
          const objectResult = {}
          if (pathDock.value.length) {
            await doc.delInfoAFile()
          }
          const res = await doc.loadImage()
          objectResult.imageId = res
          const docRes = await doc.updateFileData()
          objectResult.docId = docRes
          if (docRes.result) {
            listRequestsResult.push(docRes)
            // doc.document.inProcess = false
            // const searchedDoc = listDocuments.value.find(
            //   (el) => el.id === doc.document.id
            // )
            // searchedDoc.inProcess = false
            // Vue.set(doc, 'document', doc.document)
            // Vue.set(doc.document, 'inProcess', false)
            // console.log(doc.document.inProcess)
            // doc.document.newId = docRes.result
            // doc.document.newId = docRes.result
            // await createFillScanProcess(docRes.result)
          }
        })
      )
    }
    const listData = ref({})
    const loadList = async () => {
      const listQuery = form?.lists?.flatMap((list) => {
        let filter = list.filter.reduce((acc, el) => {
          const source = eval(el.source)
          if (
            source &&
            source[el.field] !== null &&
            source[el.field] !== undefined &&
            source[el.field] !== ''
          ) {
            acc.push({
              alias: el.alias ?? el.field,
              value: Array.isArray(source[el.field])
                ? source[el.field]
                : [source[el.field]],
              type: el.type,
            })
          } else if (el.sendEmpty) {
            acc.push({
              alias: el.alias ?? el.field,
              value: el.value,
              type: el.type,
            })
          }
          return acc
        }, [])

        const element = {
          alias: list.alias,
          filter,
          readonly: 0,
        }
        return element
      })
      const lists = await makeRequestList(listQuery)
      listData.value = lists.data
      for (let keyList in lists.data) {
        const field = form?.fields.find((el) => {
          return el.alias ? el.alias === keyList : el.name === keyList
        })
        if (field) {
          field.hideItems = lists.data[keyList]
          // field.items =
          Vue.set(
            field,
            'items',
            lists.data[keyList] ? lists.data[keyList] : field.items
          )
          if (field.items.length === 1) {
            // Если массив, вставить массив
            if (field.putFirst)
              formData[field.name] = field.items[0][field.selectOption.value]
          }
        }
      }
    }
    const isRejected = ref(false)
    const rejectDoc = (idDoc) => {
      // if (!rejectedDocs.value.includes(idDoc)) {
      //   rejectedDocs.value = [...rejectedDocs.value, idDoc]
      // }
      isRejected.value = true
      isCorrect.value = false
      // confirmedDocs.value = confirmedDocs.value.filter((doc) => doc !== idDoc)
      // ctx.emit('change', {
      //   confirmed: confirmedDocs.value,
      //   rejected: rejectedDocs.value,
      //   confirmDocsLength: confirmDocsLength,
      // })
    }
    const loadAutocompletes = async () => {
      const fields = form?.fields
        .filter((el) => el.type === 'autocomplete' && el.isShow)
        .map((el) => el)
      const queryFields = fields.map(async (el) => {
        const filters = []
        const { url } = el
        if (el.filter && el.filter.length) {
          el.filter.forEach((filter) => {
            let value, type
            if (filter.source === 'fromPrev') {
              value = form?.formData[filter.field]
            } else if (filter.source && filter.source !== 'formData') {
              const source = eval(filter.source)
              value = source
            } else if (filter.source === 'formData') {
              value = formData[filter.field]
            } else {
              value = formData[filter.field]
            }
            if (filter.type) type = filter.type
            filters.push({
              alias: filter.field,
              value,
              type,
            })
          })
        }
        const data = await getList(url, {
          countRows: 200,
          currentPage: 1,
          searchValue: '',
          id: formData[el.name ? el.name : el.alias]
            ? formData[el.name ? el.name : el.alias]
            : -1,
          filter: filters,
        })

        if (data.rows) {
          el.items = [...el.items, ...data.rows]
          el.items = data.rows
        }

        return data
      })
      await Promise.all(queryFields)
    }
    // const docName = () =>
    onMounted(async () => {
      // if (props.document.path_doc) {
      //   isEdit.value = false
      // }
      // initFields()
      // initDocFields()
      loadList()
      loadAutocompletes()
      if (props.document.path_doc) {
        pathDock.value = [props.document.path_doc]
      }
      if (props.document.inProcess !== undefined) {
        !props.document.inProcess ? (isCorrect.value = true) : false
      }
    })
    return {
      loading,
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
      dropZoneOptions,
      documentName,
      switchLabel,
      basketFiles,
      pathDock,
      addFiles,
      isEdit,
      toEdit,
      toPreview,
      switchType,
      context,
      fields: fields(),
      fieldsData,
      docFields,
      listData,
      sendBankCard,
      confirmCorrect,
      isCorrect,
      isRejected,
      rejectDoc,
      confirmDoc,
      listRequestsForUpload,
      listRequestsResult,
      loadDocument,
      document,
      dropZoneRef,
      folderPanel,
      // documentData,
    }
  },
}
