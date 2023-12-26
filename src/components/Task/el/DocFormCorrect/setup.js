import { defineComponent, ref } from 'vue'
import FormError from '../FormError/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import DateTimePicker from '@/components/Datetimepicker/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const bankItemsSpr = {
  1: {
    text: 'СБЕРБАНК',
    value: 1,
  },
  2: {
    text: 'Почта Банк',
    value: 2,
  },
  3: {
    text: 'Пром Связь',
    value: 3,
  },
  4: {
    text: 'Альфабанк',
    value: 4,
  },
  5: {
    text: 'Тинькофф',
    value: 5,
  },
  7: {
    text: 'ВТБ',
    value: 7,
  },
  11: {
    text: '-НАЛИЧНЫЕ-',
    value: 11,
  },
  12: {
    text: 'УБРИР',
    value: 12,
  },
  13: {
    text: 'Открытие',
    value: 13,
  },
  14: {
    text: 'МТС Банк',
    value: 14,
  },
}

const DocFormCorrect = defineComponent({
  name: 'DocFormCorrect',
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
    entity: {
      type: Object,
    },
  },
  data: function () {
    return {
      panel: [],
      pasp_data_vid_open: false,
      med_book_date_open: false,
      view_home_data_vid_open: false,
      migr_card_data_in_open: false,
      migr_card_data_out_open: false,
      check_patent_date_pay_open: false,
      registration_date_do_docs_in_open: false,
      registration_date_c_docs_in_open: false,
      patent_date_docs_in_open: false,
      check_patent_date_pay_now_open: false,
      med_view_docs_in_open: false,
    }
  },
  setup(props, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const bankItems = Object.values(bankItemsSpr)
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
        context,
      }),
      // Снилс
      2: useForm({
        fields: {
          snils: {
            validations: { required },
            default: props.docsData.snils,
          },
        },
        context,
      }),
      // Банковская карта
      3: useForm({
        fields: {
          invoice: {
            validations: { required },
            default: '',
          },
          priority: {
            default: false,
          },
          bank_id: {
            validations: { required },
          },
          fio: {
            validations: { required },
            default: '',
          },
          comment: {
            default: '',
          },
        },
        context,
      }),
      // Адрес регистрации
      4: useForm({
        fields: {
          registration_address: {
            validations: { required },
            default: props.docsData.registration_address,
          },
        },
        context,
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
        context,
      }),
      // Паспорт, страница 2
      6: useForm({
        fields: {
          pasp_address_reg: {
            validations: { required },
            default: props.docsData.pasp_address_reg,
          },
        },
        context,
      }),
      // Мед.книжка
      8: useForm({
        fields: {
          med_book_date: {
            validations: { required },
            default: props.docsData.med_book_date,
          },
        },
        context,
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
        context,
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
        context,
      }),
      // Чек-патент первичный
      13: useForm({
        fields: {
          check_patent_date_pay: {
            validations: { required },
            default: props.docsData.check_patent_date_pay,
          },
        },
        context,
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
        context,
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
        context,
      }),
      // ИНН
      17: useForm({
        fields: {
          inn: { validations: { required }, default: props.docsData.inn },
        },
        context,
      }),
      // Экзамен РФ
      18: useForm({
        fields: {
          ekz_rf: { default: props.docsData.ekz_rf ?? false },
        },
        context,
      }),
      // Чек-патент текущий
      19: useForm({
        fields: {
          check_patent_date_pay_now: {
            validations: { required },
            default: props.docsData.check_patent_date_pay_now,
          },
        },
        context,
      }),
      // Вид на жительство стр. 2
      22: useForm({
        fields: {
          view_home_address_reg: {
            validations: { required },
            default: props.docsData.view_home_address_reg,
          },
        },
        context,
      }),
      // мед осмотр
      23: useForm({
        fields: {
          med_view_docs_in: {
            validations: { required },
            default: props.docsData.med_view_docs_in,
          },
        },
        context,
      }),
      // мед осмотр ID
      24: useForm({
        fields: {
          id_card: {
            validations: { required },
            default: props.docsData.id_card,
          },
        },
        context,
      }),
    })
    const correctedDocs = ref({})

    const bankCardId = ref(0)

    const { makeRequest } = useRequest({
      context,
      request: () => {
        const bankData = formObj.value['3'].formData
        return store.dispatch('taskModule/setBankData', {
          data: {
            data: {
              bank_id: bankData.bank_id,
              fio: bankData.fio,
              invoice: bankData.invoice,
              priority: bankData.priority,
              personal_id: props.entity.id,
            },
          },
        })
      },
      successMessage: 'Банковские реквизиты успешно добавлены',
    })

    const sendBankCard = async () => {
      const { result } = await makeRequest()
      bankCardId.value = result
      ctx.emit('change', {
        bank_card_id: bankCardId.value,
        correctedDocs: correctedDocs.value,
      })
    }

    const confirmCorrect = (doc) => {
      // correctedDocs.value[doc.id] = formObj.value[doc.doc_id].getData()
      correctedDocs.value = {
        ...correctedDocs.value,
        [doc.id]: formObj.value[doc.doc_id].formData,
      }
      ctx.emit('change', {
        bank_card_id: bankCardId.value,
        correctedDocs: correctedDocs.value,
      })
    }
    return { formObj, confirmCorrect, correctedDocs, sendBankCard, bankItems }
  },
})
export default DocFormCorrect
