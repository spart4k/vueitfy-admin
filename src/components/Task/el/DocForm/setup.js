import { defineComponent, onMounted, ref, watch } from 'vue'
import FormError from '../FormError/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import DateTimePicker from '@/components/Date/Datetimepicker/index.vue'
import useRequest from '@/compositions/useRequest'
import { useRouter, useRoute } from 'vue-router/composables'
import FormDocumentsRow from '@/components/Form/documents/row/index.vue'
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

const docForm = defineComponent({
  name: 'DocForm',
  components: {
    FormError,
    DateTimePicker,
    FormDocumentsRow,
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
    correct: {
      type: Boolean,
      default: false,
    },
    acceptDocPanel: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    bankData: {
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
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        ctx,
        route,
        router,
      },
    }
    const bankItems = Object.values(bankItemsSpr)
    const loadedData = {
      ...props.docsData,
      ...props.bankData,
    }
    const getPassportField = (grajdanstvo_id) => {
      const fieldsPass = {
        pasp_ser: loadedData.pasp_ser ? loadedData.pasp_ser : '',
        pasp_num: loadedData.pasp_num ? loadedData.pasp_num : '',
        pasp_data_vid: loadedData.pasp_data_vid ? loadedData.pasp_data_vid : '',
        pasp_kem: loadedData.pasp_kem ? loadedData.pasp_kem : '',
      }
      console.log()
      if (grajdanstvo_id === 1) {
        fieldsPass.pasp_kod_podr = loadedData.pasp_kod_podr
          ? loadedData.pasp_kod_podr
          : ''
      } else {
        fieldsPass.citizenship = loadedData.citizenship
          ? loadedData.citizenship
          : ''
        fieldsPass.sex = loadedData.sex ? loadedData.sex : ''
        fieldsPass.pasp_date_in = loadedData.pasp_date_in
          ? loadedData.pasp_date_in
          : ''
        fieldsPass.pasp_date_out = loadedData.pasp_date_out
          ? loadedData.pasp_date_out
          : ''
      }
      return fieldsPass
    }

    const docFields = {
      1: getPassportField(props.entity.grajdanstvo_id),
      2: { snils: loadedData.snils ? loadedData.snils : '' },
      3: {
        invoice: loadedData.invoice ? loadedData.invoice : '',
        priority: false,
        bank_id: loadedData.bank_id ? loadedData.bank_id : '',
        fio: loadedData.fio ? loadedData.fio : '',
        comment: '',
      },
      4: {
        registration_address: loadedData.registration_address
          ? loadedData.registration_address
          : '',
      },
      5: {
        patent_num: loadedData.patent_num ? loadedData.patent_num : '',
        patent_prof: loadedData.patent_prof ? loadedData.patent_prof : '',
        patent_ser: loadedData.patent_ser ? loadedData.patent_ser : '',
      },
      6: {
        pasp_address_reg: loadedData.pasp_address_reg
          ? loadedData.pasp_address_reg
          : '',
      },
      7: {},
      8: {
        med_book_date: loadedData.med_book_date ? loadedData.med_book_date : '',
      },
      9: {
        view_home_ser: loadedData.view_home_ser ? loadedData.view_home_ser : '',
        view_home_num: loadedData.view_home_num ? loadedData.view_home_num : '',
        view_home_podr: loadedData.view_home_podr
          ? loadedData.view_home_podr
          : '',
        view_home_data_vid: loadedData.view_home_data_vid
          ? loadedData.view_home_data_vid
          : '',
        vew_home_kem: loadedData.vew_home_kem ? loadedData.vew_home_kem : '',
      },
      10: {
        goal_visit: loadedData.goal_visit ? loadedData.goal_visit : '',
        migr_card_data_in: loadedData.migr_card_data_in
          ? loadedData.migr_card_data_in
          : '',
        migr_card_data_out: loadedData.migr_card_data_out
          ? loadedData.migr_card_data_out
          : '',
        migr_card_num: loadedData.migr_card_num ? loadedData.migr_card_num : '',
        migr_card_ser: loadedData.migr_card_ser ? loadedData.migr_card_ser : '',
      },
      11: {},
      13: {
        check_patent_date_pay: loadedData.check_patent_date_pay
          ? loadedData.check_patent_date_pay
          : '',
      },
      14: {
        registration_date_c_docs_in: loadedData.registration_date_c_docs_in
          ? loadedData.registration_date_c_docs_in
          : '',
        registration_date_do_docs_in: loadedData.registration_date_do_docs_in
          ? loadedData.registration_date_do_docs_in
          : '',
      },
      15: {
        patent_date_docs_in: loadedData.patent_date_docs_in
          ? loadedData.patent_date_docs_in
          : '',
        patent_date_docs_out: loadedData.patent_date_docs_out
          ? loadedData.patent_date_docs_out
          : '',
        patent_region: loadedData.patent_region ? loadedData.patent_region : '',
        patent_special_marks_date: loadedData.patent_special_marks_date
          ? loadedData.patent_special_marks_date
          : '',
      },
      16: {},
      17: { inn: loadedData.inn ? loadedData.inn : '' },
      18: {},
      19: {
        check_patent_date_pay_now: loadedData.check_patent_date_pay_now
          ? loadedData.check_patent_date_pay_now
          : '',
      },
      20: {},
      21: {},
      22: {
        view_home_address_reg: loadedData.view_home_address_reg
          ? loadedData.view_home_address_reg
          : '',
      },
      23: {
        med_view_docs_in: loadedData.med_view_docs_in
          ? loadedData.med_view_docs_in
          : '',
      },
      24: {
        sex: loadedData.sex ? loadedData.sex : '',
        card_id_num: loadedData.card_id_num ? loadedData.card_id_num : '',
        card_id_ser: loadedData.card_id_ser ? loadedData.card_id_ser : '',
        card_id_period_date_in: loadedData.card_id_period_date_in
          ? loadedData.card_id_period_date_in
          : '',
        card_id_period_date_out: loadedData.card_id_period_date_out
          ? loadedData.card_id_period_date_out
          : '',
        citizenship: loadedData.citizenship ? loadedData.citizenship : '',
      },
      25: {},
      26: {
        card_id_kem: loadedData.card_id_kem ? loadedData.card_id_kem : '',
        card_id_date_vid: loadedData.card_id_date_vid
          ? loadedData.card_id_date_vid
          : '',
        card_id_pers_num: loadedData.card_id_pers_num
          ? loadedData.card_id_pers_num
          : '',
      },
    }
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
            default: loadedData.patent_num ? loadedData.patent_num : '',
          },
          priority: {
            default: false,
          },
          bank_id: {
            validations: { required },
          },
          fio: {
            validations: { required },
            default: loadedData.patent_num ? loadedData.patent_num : '',
          },
          comment: {
            default: loadedData.patent_num ? loadedData.patent_num : '',
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
    const docRows = ref([])
    const sendBankCard = async () => {
      const { result } = await makeRequest()
      bankCardId.value = result
      ctx.emit('changeDocs', {
        bank_card_id: bankCardId.value,
        formObj: formObj,
      })
    }
    const docsData = ref([])
    const initDocData = () => {
      docsData.value = props.docs.map((el) => {
        return {
          doc_id: el.doc_id,
          doc_name: props.listNames[el.doc_id],
          docs_data: docFields[el.doc_id],
          id: el.id,
          path_doc: el.path_doc,
        }
      })
    }
    watch(
      formObj,
      () => {
        ctx.emit('changeDocs', {
          bank_card_id: bankCardId.value,
          formObj: formObj,
        })
      },
      { deep: true }
    )
    onMounted(() => {
      initDocData()
    })
    return {
      formObj,
      bankItems,
      sendBankCard,
      bankCardId,
      docsDataFormated: docsData,
      docRows,
    }
  },
})
export default docForm
