//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, nextTick, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import Row from '../personal/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { required } from '@/utils/validation.js'
import moment from 'moment'
import { stringAction } from '@/utils/actions'
import Manager from '../manager/default/index.vue'
import FormDefault from '@/components/Form/default/index.vue'
import Popup from '@/components/Popup/index.vue'
import { dateField } from '@/utils/fields.js'
console.log('CREATED PAYMENTS')
//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    Row,
    Manager,
    Popup,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      require: true,
    },
    filtersConfig: {
      type: Object,
      default: () => {},
    },
    routeParam: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const currentDate = ref({
      monthArray: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: moment(new Date()).format('YYYY-MM'),
    })
    provide('period', currentDate.value.date)
    const rows = ref([])
    const acceptData = ref({
      popup: false,
      valueDate: new Date().toISOString().substr(0, 7),
      valueProfit: { title: 'Аванс', value: 5 },
    })
    const changeMonth = async (val) => {
      currentDate.value.date = moment(`${currentDate.value.date}-10`)
        .add(val, 'M')
        .format('YYYY-MM')
      currentDate.value.year = currentDate.value.date.split('-')[0]
      currentDate.value.month = Number(currentDate.value.date.split('-')[1]) - 1
      // setTimeout(() => {
      // countingDistances()
      // }, 0)
      // addDayOfMonth()
      searchInput.value = ''
      await getItems()
    }
    console.log('CREATED PAYMENTS')
    const { makeRequest, loading } = useRequest({
      context,
      request: () =>
        store.dispatch('form/getPaymentList', {
          url: 'payment_list/accounts',
          body: {
            period: currentDate.value.date,
            search: searchInput.value,
          },
        }),
    })

    const popupForm = ref({
      isShow: false,
    })
    const searchInput = ref('')
    const managers = ref([])
    const fakeInitManager = () => {}
    const getItems = async () => {
      if (store.state.user.permission_id === 1) {
        loading.value = true
        managers.value = [
          {
            account_id: store.state.user.id,
            account_name: store.state.user.name,
            total: 0,
          },
        ]
        loading.value = false
      } else {
        try {
          let { result } = await makeRequest()
          if (result) {
            // rows.value = result.splice(0, 10)
            result = result.map((el) => {
              return {
                ...el,
                touching: false,
              }
            })
            managers.value = result
            // fakeInitManager()
            console.log('getItems')
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    const openExport = () => {}
    const openPersonal = (row) => {
      console.log('row', row)
      popupForm.value.isShow = true
      activePerson.value = row
      router.push({
        path: `/payment_list/${row.personal_id}`,
      })
    }
    const closePopupForm = () => {
      popupForm.value.isShow = false
      router.back()
    }
    const managerRef = ref([])
    const detail = {
      type: 'popup', // String 'popup' or 'page'
      getOnClose: true,
      classes: [''], // List class
      width: '500px',
      method: 'get',
      alias: 'account_bank',
      url: '/get/form/',
      requestId: 'card_id',
      name: 'Банковская карта',
      bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
      activeTab: null,
      tabs: [
        {
          path: 'new_card',
          id: 1,
          name: 'Основные',
          type: FormDefault,
          detail: true,
          lists: [{ alias: 'bank_id_without_nal', filter: [] }],
          alias: 'account_bank',
          active: false,
          routeParam: 'card_id',
          fields: [
            dateField({
              label: 'Период',
              name: 'period',
              subtype: 'period',
              placeholder: '',
              class: [''],
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
              color: 'error',
              name: 'closePopup',
              action: 'closePopup',
              skipValidation: true,
            }),
            stringAction({
              text: 'Сохранить',
              type: 'submit',
              module: 'form/create',
              url: 'create/pay/by_service',
              name: 'createForm',
              action: 'createForm',
              handlingResponse: {
                context: 'result',
                result: 'data',
                data: {
                  text: 'Создано начислений %count_payment% на сумму %sum_payment% <br/> Создано %count_zero% начислений с полным вычетом на сумму %sum_zero% <br/> Создано задолженностей %count_hold% на сумму %sum_hold%',
                  color: 'success',
                },
              },
            }),
          ],
          formData: {},
        },
      ],
    }
    watch(
      () => searchInput.value,
      () => {
        console.log('search')
        getItems()
      }
    )
    const activePerson = ref({})
    onMounted(() => {
      getItems()
    })
    return {
      currentDate,
      changeMonth,
      getItems,
      rows,
      loading,
      managers,
      openPersonal,
      popupForm,
      closePopupForm,
      activePerson,
      period: currentDate.value.date,
      searchInput,
      managerRef,
    }
  },
}

export default table
// Vue.component('message', message)
