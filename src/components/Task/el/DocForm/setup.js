import { defineComponent, ref } from 'vue'
import FormError from '../FormError/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import DateTimePicker from '@/components/datetimepicker/index.vue'

const docForm = defineComponent({
  name: 'DocForm',
  components: {
    FormError,
    DateTimePicker,
  },
  props: {
    listNames: {
      type: Object,
      default: () => {},
    },
    docs: {
      type: Array,
      default: () => [],
    },
    docsData: {
      type: Object,
    },
  },
  data: function () {
    return {
      datePickerOpen: false,
      datePickerSecondOpen: false,
    }
  },
  setup(props) {
    const formObj = ref({
      // Паспорт
      1: useForm({
        fields: {
          pasp_ser: {
            validations: { required },
            default: props.docsData.pasp_ser,
          },
          pasp_num: {
            validations: { required },
            default: props.docsData.pasp_num,
          },
          pasp_kod_podr: {
            validations: { required },
            default: props.docsData.pasp_kod_podr,
          },
          pasp_data_vid: {
            validations: { required },
            default: props.docsData.pasp_data_vid,
          },
          pasp_kem: {
            validations: { required },
            default: props.docsData.pasp_kem,
          },
        },
      }),
      // Снилс
      2: useForm({
        fields: {
          snils: {
            validations: { required },
            default: props.docsData.snils,
          },
        },
      }),
      // Банковская карта
      3: useForm({
        fields: {
          pasp_ser: {
            validations: { required },
            default: props.docsData.pasp_ser,
          },
          pasp_num: {
            validations: { required },
            default: props.docsData.pasp_num,
          },
          pasp_kod_podr: {
            validations: { required },
            default: props.docsData.pasp_kod_podr,
          },
          pasp_data_vid: {
            validations: { required },
            default: props.docsData.pasp_data_vid,
          },
          pasp_kem: {
            validations: { required },
            default: props.docsData.pasp_kem,
          },
        },
      }),
      // Адрес регистрации
      4: useForm({
        fields: {
          registration_address: {
            validations: { required },
            default: props.docsData.registration_address,
          },
        },
      }),
      // Патент
      5: useForm({
        fields: {
          patent_ser: {
            validations: { required },
            default: props.docsData.patent_ser,
          },
          patent_num: {
            validations: { required },
            default: props.docsData.patent_num,
          },
          patent_prof: {
            validations: { required },
            default: props.docsData.patent_prof,
          },
        },
      }),
      // Паспорт, страница 2
      6: useForm({
        fields: {
          pasp_address_reg: {
            validations: { required },
            default: props.docsData.pasp_address_reg,
          },
        },
      }),
      // Мед.книжка
      8: useForm({
        fields: {
          med_book_date: {
            validations: { required },
            default: props.docsData.med_book_date,
          },
        },
      }),
      // Вид на жительство
      9: useForm({
        fields: {
          view_home_ser: {
            validations: { required },
            default: props.docsData.view_home_ser,
          },
          view_home_num: {
            validations: { required },
            default: props.docsData.view_home_num,
          },
          view_home_podr: {
            validations: { required },
            default: props.docsData.view_home_podr,
          },
          view_home_data_vid: {
            validations: { required },
            default: props.docsData.view_home_data_vid,
          },
          view_home_kem: {
            validations: { required },
            default: props.docsData.view_home_kem,
          },
        },
      }),
      // Миграционная карта
      10: useForm({
        fields: {
          migr_card_ser: {
            validations: { required },
            default: props.docsData.migr_card_ser,
          },
          migr_card_num: {
            validations: { required },
            default: props.docsData.migr_card_num,
          },
          migr_card_data_in: {
            validations: { required },
            default: props.docsData.migr_card_data_in,
          },
          migr_card_data_out: {
            validations: { required },
            default: props.docsData.migr_card_data_out,
          },
        },
      }),
      // Чек-патент первичный
      13: useForm({
        fields: {
          check_patent_date_pay: {
            validations: { required },
            default: props.docsData.check_patent_date_pay,
          },
        },
      }),
      // Регистрация стр. 2
      14: useForm({
        fields: {
          registration_date_do_docs_in: {
            validations: { required },
            default: props.docsData.registration_date_do_docs_in,
          },
          registration_date_c_docs_in: {
            validations: { required },
            default: props.docsData.registration_date_c_docs_in,
          },
        },
      }),
      // Патент стр. 2
      15: useForm({
        fields: {
          patent_region: {
            validations: { required },
            default: props.docsData.patent_region,
          },
          patent_date_docs_in: {
            validations: { required },
            default: props.docsData.patent_date_docs_in,
          },
        },
      }),
      // ИНН
      17: useForm({
        fields: {
          inn: { validations: { required }, default: props.docsData.inn },
        },
      }),
      // Экзамен РФ
      18: useForm({
        fields: {
          ekz_rf: { validations: { required }, default: props.docsData.ekz_rf },
        },
      }),
      // Чек-патент текущий
      19: useForm({
        fields: {
          check_patent_date_pay_now: {
            validations: { required },
            default: props.docsData.check_patent_date_pay_now,
          },
        },
      }),
      // Вид на жительство стр. 2
      22: useForm({
        fields: {
          view_home_address_reg: {
            validations: { required },
            default: props.docsData.view_home_address_reg,
          },
        },
      }),
      // мед осмотр
      23: useForm({
        fields: {
          med_view_docs_in: {
            validations: { required },
            default: props.docsData.med_view_docs_in,
          },
        },
      }),
      // мед осмотр ID
      24: useForm({
        fields: {
          id_card: {
            validations: { required },
            default: props.docsData.id_card,
          },
        },
      }),
    })
    return { formObj }
  },
})
export default docForm
