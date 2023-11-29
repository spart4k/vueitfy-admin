import { onMounted, ref } from 'vue'
import tab from '../tab/index.vue'
import { stringAction } from '@/utils/actions'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'

import store from '@/store'

export default {
  name: 'Rates',
  components: { tab },
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const { id } = route?.params
    const activeTab = ref(0)
    const actions = ref([
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
      }),
    ])
    const dialog = ref(false)
    const loading = ref(false)
    const tabs = ref([
      {
        id: 0,
        name: 'Активные',
      },
      {
        id: 1,
        name: 'Не выставленный',
      },
      {
        id: 2,
        name: 'Не активные',
      },
    ])
    const openDialog = () => {
      dialog.value = true
    }
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch(
          'form/gets',
          `get/form/${props.tab.alias}/${route.params.id}`
        ),
    })
    onMounted(async () => {
      const type = await makeRequest()
      //console.log(type)
    })
    return {
      tabs,
      activeTab,
      actions,
      loading,
      dialog,
      openDialog,
    }
  },
}
