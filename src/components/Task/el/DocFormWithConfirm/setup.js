import { defineComponent, ref } from 'vue'
import FormError from '../FormError/index.vue'
import useForm from '@/compositions/useForm'
import { useRouter, useRoute } from 'vue-router/composables'
import DateTimePicker from '@/components/Date/Datetimepicker/index.vue'
import store from '@/store'

const DocFormWithConfirm = defineComponent({
  name: 'DocFormWithConfirm',
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
    bankData: {
      type: Object,
    },
  },
  data: function () {
    return {
      panel: [],
      datePickerOpen: false,
      datePickerSecondOpen: false,
    }
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
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
    const bankItems = Object.values(bankItemsSpr)
    const formObj = ref({
      // Паспорт
      1: useForm({
        fields: {
          pasp_ser: {
            default: props.docsData.pasp_ser,
          },
          pasp_num: {
            default: props.docsData.pasp_num,
          },
          pasp_kod_podr: {
            default: props.docsData.pasp_kod_podr,
          },
          pasp_data_vid: {
            default: props.docsData.pasp_data_vid,
          },
          pasp_kem: {
            default: props.docsData.pasp_kem,
          },
        },
        context,
      }),
      // Снилс
      2: useForm({
        fields: {
          snils: {
            default: props.docsData.snils,
          },
        },
        context,
      }),
      // Банковская карта
      3: useForm({
        fields: {
          number: {
            default: props?.bankData?.invoice,
          },
          priority: {
            default: props?.bankData?.priority,
          },
          bank_id: {
            default: props?.bankData?.bank_id,
          },
          cart_on_fio: {
            default: props?.bankData?.fio,
          },
          prim: {
            default: props?.bankData?.comment,
          },
        },
        context,
      }),
      // Адрес регистрации
      4: useForm({
        fields: {
          registration_address: {
            default: props.docsData.registration_address,
          },
        },
        context,
      }),
      // Патент
      5: useForm({
        fields: {
          patent_ser: {
            default: props.docsData.patent_ser,
          },
          patent_num: {
            default: props.docsData.patent_num,
          },
          patent_prof: {
            default: props.docsData.patent_prof,
          },
        },
        context,
      }),
      // Паспорт, страница 2
      6: useForm({
        fields: {
          pasp_address_reg: {
            default: props.docsData.pasp_address_reg,
          },
        },
        context,
      }),
      // Мед.книжка
      8: useForm({
        fields: {
          med_book_date: {
            default: props.docsData.med_book_date,
          },
        },
        context,
      }),
      // Вид на жительство
      9: useForm({
        fields: {
          view_home_ser: {
            default: props.docsData.view_home_ser,
          },
          view_home_num: {
            default: props.docsData.view_home_num,
          },
          view_home_podr: {
            default: props.docsData.view_home_podr,
          },
          view_home_data_vid: {
            default: props.docsData.view_home_data_vid,
          },
          view_home_kem: {
            default: props.docsData.view_home_kem,
          },
        },
        context,
      }),
      // Миграционная карта
      10: useForm({
        fields: {
          migr_card_ser: {
            default: props.docsData.migr_card_ser,
          },
          migr_card_num: {
            default: props.docsData.migr_card_num,
          },
          migr_card_data_in: {
            default: props.docsData.migr_card_data_in,
          },
          migr_card_data_out: {
            default: props.docsData.migr_card_data_out,
          },
        },
        context,
      }),
      // Чек-патент первичный
      13: useForm({
        fields: {
          check_patent_date_pay: {
            default: props.docsData.check_patent_date_pay,
          },
        },
        context,
      }),
      // Регистрация стр. 2
      14: useForm({
        fields: {
          registration_date_do_docs_in: {
            default: props.docsData.registration_date_do_docs_in,
          },
          registration_date_c_docs_in: {
            default: props.docsData.registration_date_c_docs_in,
          },
        },
        context,
      }),
      // Патент стр. 2
      15: useForm({
        fields: {
          patent_region: {
            default: props.docsData.patent_region,
          },
          patent_date_docs_in: {
            default: props.docsData.patent_date_docs_in,
          },
        },
        context,
      }),
      // ИНН
      17: useForm({
        fields: {
          inn: { default: props.docsData.inn },
        },
        context,
      }),
      // Экзамен РФ
      18: useForm({
        fields: {
          ekz_rf: { default: props.docsData.ekz_rf },
        },
        context,
      }),
      // Чек-патент текущий
      19: useForm({
        fields: {
          check_patent_date_pay_now: {
            default: props.docsData.check_patent_date_pay_now,
          },
        },
        context,
      }),
      // Вид на жительство стр. 2
      22: useForm({
        fields: {
          view_home_address_reg: {
            default: props.docsData.view_home_address_reg,
          },
        },
        context,
      }),
      // мед осмотр
      23: useForm({
        fields: {
          med_view_docs_in: {
            default: props.docsData.med_view_docs_in,
          },
        },
        context,
      }),
      // мед осмотр ID
      24: useForm({
        fields: {
          id_card: {
            default: props.docsData.id_card,
          },
        },
        context,
      }),
    })
    const confirmedDocs = ref([])
    const rejectedDocs = ref([])
    const confirmDocsLength = props.docs.filter((doc) => {
      return Boolean(formObj.value[doc.doc_id])
    }).length

    const confirmDoc = (idDoc) => {
      if (!confirmedDocs.value.includes(idDoc)) {
        confirmedDocs.value = [...confirmedDocs.value, idDoc]
      }
      rejectedDocs.value = rejectedDocs.value.filter((doc) => doc !== idDoc)
      ctx.emit('change', {
        confirmed: confirmedDocs.value,
        rejected: rejectedDocs.value,
        confirmDocsLength: confirmDocsLength,
      })
    }

    const rejectDoc = (idDoc) => {
      if (!rejectedDocs.value.includes(idDoc)) {
        rejectedDocs.value = [...rejectedDocs.value, idDoc]
      }
      confirmedDocs.value = confirmedDocs.value.filter((doc) => doc !== idDoc)
      ctx.emit('change', {
        confirmed: confirmedDocs.value,
        rejected: rejectedDocs.value,
        confirmDocsLength: confirmDocsLength,
      })
    }

    return {
      formObj,
      confirmedDocs,
      rejectedDocs,
      confirmDoc,
      rejectDoc,
      bankItemsSpr,
      bankItems,
    }
  },
})
export default DocFormWithConfirm
