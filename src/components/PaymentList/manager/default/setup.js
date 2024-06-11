//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { toRef, ref, computed, watch, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import personal from '../../personal/index.vue'
import { object } from '@/pages'

//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList-Manager',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    personal,
  },
  props: {
    manager: {
      type: Object,
      default: () => {},
      require: true,
    },
    period: {
      type: String,
      default: '',
    },
    rows: {
      type: Array,
    },
    searchValue: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const isOpen = ref(false)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const period = toRef(props, 'period')
    const objects = ref(null)
    // const period = inject('period')
    const { makeRequest, loading } = useRequest({
      context,
      request: () =>
        store.dispatch('form/getPaymentList', {
          url: `payment_list/${props.manager.account_id}/personals`,
          body: {
            period: props.period,
            search: props.searchValue,
          },
        }),
    })

    const getObjects = async (touching) => {
      if (objects.value !== null) {
        if (touching) {
          objects.value.forEach((element) => {
            element.touching = true
          })
        }
        return
      }
      isOpen.value = undefined
      if (loading.value) {
        return
      } else {
        try {
          let { result } = await makeRequest()
          if (result) {
            result = result.map((el) => {
              return {
                ...el,
                touching,
              }
            })
            objects.value = result
            isOpen.value = 0
          }
        } catch (err) {
          console.log(err)
        }
        loading.value = false
        // Vue.set(type, 'content', {})
        // type.content = responseData.result
        // Vue.set(type.content, 'edit', false)
        // type.content.code = responseData.code
        // detailPanels.value.push(index)
      }
    }
    const openPersonal = (row) => {
      emit('openPersonal', row)
    }
    const touchManager = async () => {
      isOpen.value = 0
      await getObjects(true)
      if (!props.manager.touching) {
        objects.value.forEach((el) => (el.touching = false))
      }
    }
    watch(
      () => isOpen.value,
      async (newVal) => {
        await getObjects()
      }
    )
    watch(
      () => period.value,
      async (newVal) => {
        isOpen.value = null
        objects.value = null
        // await getObjects()
      }
    )
    return {
      isOpen,
      objects,

      loading,
      openPersonal,
      touchManager,
    }
  },
}

export default table
// Vue.component('message', message)
