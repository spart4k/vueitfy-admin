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
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    return {}
  },
}

export default table
// Vue.component('message', message)
