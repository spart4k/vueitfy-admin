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
  },
  setup() {
    const formObj = ref({
      // Паспорт
      1: useForm({
        fields: {
          pasp_ser: { validations: { required } },
          pasp_num: { validations: { required } },
          pasp_kod_podr: { validations: { required } },
          pasp_data_vid: { validations: { required } },
          pasp_kem: { validations: { required } },
        },
      }),
      // Снилс
      2: useForm({
        fields: {
          snils: { validations: { required } },
        },
      }),
      // Банковская карта
      3: useForm({
        fields: {
          pasp_ser: { validations: { required } },
          pasp_num: { validations: { required } },
          pasp_kod_podr: { validations: { required } },
          pasp_data_vid: { validations: { required } },
          pasp_kem: { validations: { required } },
        },
      }),
      // Адрес регистрации
      4: useForm({
        fields: {
          registration_address: { validations: { required } },
        },
      }),
      // Патент
      5: useForm({
        fields: {
          patent_ser: { validations: { required } },
          patent_num: { validations: { required } },
          patent_prof: { validations: { required } },
        },
      }),
      // Паспорт, страница 2
      6: useForm({
        fields: {
          pasp_address_reg: { validations: { required } },
        },
      }),
      // Мед.книжка
      8: useForm({
        fields: {
          med_book_date: { validations: { required } },
        },
      }),
      // Вид на жительство
      9: useForm({
        fields: {
          view_home_ser: { validations: { required } },
          view_home_num: { validations: { required } },
          view_home_podr: { validations: { required } },
          view_home_data_vid: { validations: { required } },
          view_home_kem: { validations: { required } },
        },
      }),
      // Миграционная карта
      10: useForm({
        fields: {
          migr_card_ser: { validations: { required } },
          migr_card_num: { validations: { required } },
          migr_card_data_in: { validations: { required } },
          migr_card_data_out: { validations: { required } },
        },
      }),
      // Чек-патент первичный
      13: useForm({
        fields: {
          check_patent_date_pay: { validations: { required } },
        },
      }),
      // Регистрация стр. 2
      14: useForm({
        fields: {
          registration_date_do_docs_in: { validations: { required } },
          registration_date_c_docs_in: { validations: { required } },
        },
      }),
      // Патент стр. 2
      15: useForm({
        fields: {
          patent_region: { validations: { required } },
          patent_date_docs_in: { validations: { required } },
        },
      }),
      // ИНН
      17: useForm({
        fields: {
          inn: { validations: { required } },
        },
      }),
      // Экзамен РФ
      18: useForm({
        fields: {
          ekz_rf: { validations: { required } },
        },
      }),
      // Чек-патент текущий
      19: useForm({
        fields: {
          check_patent_date_pay_now: { validations: { required } },
        },
      }),
      // Вид на жительство стр. 2
      22: useForm({
        fields: {
          view_home_address_reg: { validations: { required } },
        },
      }),
      // мед осмотр
      23: useForm({
        fields: {
          med_view_docs_in: { validations: { required } },
        },
      }),
      // мед осмотр ID
      24: useForm({
        fields: {
          id_card: { validations: { required } },
        },
      }),
    })
    return { formObj }
  },
})
export default docForm
