import Vue, { onMounted, reactive, ref } from 'vue'
import {
  stringField,
  selectField,
  // dropZoneField,label:"label:"ФИО директора"
} from '@/utils/fields.js'

import useRequest from '@/compositions/useRequest'
import store from '@/store'
import useForm from '@/compositions/useForm.js'
export default {
  name: 'form-output-correct-row',
  props: {
    service: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
        store,
      },
    }
    const loading = ref(false)
    const switchType = (key) => {
      let result = ''
      switch (key) {
        case 'price':
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
        case 'qty':
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
        case 'sum':
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
        case 'service_id':
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
        case 'pasp_ser':
          result = 'Серия'
          break
        case 'pasp_num':
          result = 'Номер'
          break
        case 'pasp_kod_podr':
          result = 'Код подразделения'
          break
        case 'pasp_kem':
          result = 'Кем выдан'
          break
        case 'snils':
          result = 'Снилс'
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
          result = 'Адрес'
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
          result = 'С'
          break
        case 'migr_card_data_out':
          result = 'До'
          break
        case 'inn':
          result = 'ИНН'
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
        case 'patent_special_marks_date':
          result = 'Специальные отметки'
          break
        default:
          result = key
      }
      return result
    }
    const addGroup = async () => {
      // let qty
      // let serviceId
      // let dataForService
      // if (data.entity.direction_id === 6) {
      //   const dolToService = {
      //     24: 61,
      //     25: 62,
      //     26: 63,
      //     27: 64,
      //     49: 70,
      //     50: 77,
      //     55: 70,
      //     51: 78,
      //   }
      //   // qty = JSON.parse(data.entity.services)['3'][0].services[0].qty
      //   serviceId = dolToService[data.entity.doljnost_id]
      //   dataForService = await getServiceInfo(serviceId)
      // }
      // formGroup.value = [...formGroup.value]
    }
    const services = reactive({
      services: [
        {
          service_id: 9,
          qty: '161',
          price: 11,
          sum: 1771,
        },
        {
          service_id: 10,
          qty: '54',
          price: 3,
          sum: 162,
        },
      ],
      payment_id: 1,
      is_hold: false,
      is_pay: false,
      sum: 1933,
    })
    const fieldsData = ref([])
    // const fields = ref([])
    const initFields = () => {
      for (let key in props.service) {
        console.log(key)
        console.log(fieldsData.value)
        fieldsData.value.push(switchType(key))
      }
    }
    initFields()
    const fields = () => {
      const fields = {}
      const tabFields = fieldsData.value
      tabFields.forEach((el) => {
        // const { validations } = tabFields[key]
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'default', props.service[el.name])
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
      console.log(fields)
      return fields
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const form = {
      id: 0,
      name: 'Данные документов',
      lists: [
        {
          alias: 'sex',
          filter: [],
        },
      ],
      fields: fieldsData.value,
    }
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
    onMounted(() => {
      // addGroup()
      // initFields()
    })
    return {
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
      fieldsData,
      services,
    }
  },
}
