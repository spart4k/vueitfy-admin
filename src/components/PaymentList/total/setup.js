//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { reactive } from 'vue'

//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList-Total',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    // Row,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
      require: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const fields = reactive({
      total_by_services: 'Сумма по выработке',
      total_everyday: 'Ежедневная ведомость',
      total_hold: 'Начислено раннее',
      total_debit: 'Сумма к удержанию',
      total_coefficient: 'Коэффициент',
      total: 'Итого',
    })
    return {
      fields,
    }
  },
}

export default table
// Vue.component('message', message)
