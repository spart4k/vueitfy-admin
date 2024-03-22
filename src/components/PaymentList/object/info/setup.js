//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
// import Row from '../row/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import ObjectInfoOutput from '../output/index.vue'
import ObjectInfoOverpayment from '../output/index.vue'
import ObjectInfoConsumption from '../output/index.vue'
//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList-Row-Object',
  components: {
    ObjectInfoOutput,
    ObjectInfoOverpayment,
    ObjectInfoConsumption,
    //vTableButton,
    //vButton,
    //vInput,
    // Row,
  },
  props: {
    row: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const isOpen = ref(false)
    const isOpenObject = ref(false)
    watch(
      () => isOpen.value,
      (newVal) => {
        console.log(newVal + '_' + props.row.personal_id)
      }
    )
    return {
      isOpen,
    }
  },
}

export default table
// Vue.component('message', message)
