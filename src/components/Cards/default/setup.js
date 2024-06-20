import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import CardsItem from '../item/default/index.vue'
import CardsNew from '../item/new/index.vue'
import { v4 as uuidv4 } from 'uuid'
import Popup from '@/components/Popup/index.vue'

export default {
  name: 'Cards',
  components: {
    CardsItem,
    CardsNew,
    Popup,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const loading = ref(false)
    const isArchive = ref(false)
    const [optionsActive, optionsArchive] = props.config.tabs
    // let { options } = props.config.tabs[0]
    let options = props.config.tabs[0]

    const popupForm = ref({
      isShow: false,
    })
    const searchField = ref('')
    const pagination = ref({
      totalRows: null,
      currentPage: 1,
      totalPages: null,
      countRows: options.data.pageLength,
    })

    const dialog = ref({
      isShow: false,
      text: '',
      confirmFunc: null,
      loading: false,
    })
    const items = ref([])

    const changeTab = () => {
      isArchive.value = !isArchive.value
      if (isArchive.value) options = props.config.tabs[1]
      else options = props.config.tabs[0]
      getItems()
    }
    const createItem = () => {
      router.push({
        name: options.panel.buttons[2].url,
      })
      popupForm.value.isShow = true
    }

    const openItem = (val, param) => {
      let requestId = 'id'
      if (param) requestId = param
      // if (options.detail.requestId) requestId = options.detail.requestId

      router.push({
        name: `${route.name}/:${requestId}`,
        params: {
          [requestId]: val,
        },
      })
      popupForm.value.isShow = true
    }

    const actions = {
      delete: (id) => {
        dialog.value.isShow = true
        dialog.value.text = 'Вы подтверждаете удаление карты?'
        dialog.value.confirmFunc = async () => {
          dialog.value.loading = true
          await store.dispatch('form/putForm', {
            url: `update/corp_card/archive/${id}`,
            body: { data: { is_archive: true } },
          })
          dialog.value.isShow = false
          dialog.value.loading = false
          getItems()
        }
      },
      restore: (id) => {
        dialog.value.isShow = true
        dialog.value.text = 'Вы подтверждаете восстановление карты?'
        dialog.value.confirmFunc = async () => {
          dialog.value.loading = true
          await store.dispatch('form/putForm', {
            url: `update/corp_card/archive/${id}`,
            body: { data: { is_archive: false } },
          })
          dialog.value.isShow = false
          dialog.value.loading = false
          getItems()
        }
      },
      lock: (id) => {
        dialog.value.isShow = true
        dialog.value.text = 'Вы подтверждаете блокировку карты?'
        dialog.value.confirmFunc = async () => {
          dialog.value.loading = true
          await store.dispatch('form/putForm', {
            url: `update/corp_card/block/${id}`,
            body: { data: { is_block: true } },
          })
          dialog.value.isShow = false
          dialog.value.loading = false
          items.value.find((x) => x.id === id).status_id = 2
        }
      },
      unlock: (id) => {
        dialog.value.isShow = true
        dialog.value.text = 'Вы подтверждаете разблокировку карты?'
        dialog.value.confirmFunc = async () => {
          dialog.value.loading = true
          await store.dispatch('form/putForm', {
            url: `update/corp_card/block/${id}`,
            body: { data: { is_block: false } },
          })
          dialog.value.isShow = false
          dialog.value.loading = false
          items.value.find((x) => x.id === id).status_id = 1
        }
      },
      history: (id) => {
        openItem(id, 'history_id')
      },
      take: (id) => {
        dialog.value.isShow = true
        dialog.value.text = 'Вы подтверждаете изъятие карты?'
        dialog.value.confirmFunc = async () => {
          dialog.value.loading = true
          await store.dispatch('form/putForm', {
            url: 'update/bank/remove_assign',
            body: { data: { card_id: id } },
          })
          dialog.value.isShow = false
          dialog.value.loading = false
          getItems()
        }
      },
      give: (id) => {
        openItem(id, 'card_id')
      },
    }
    const cardChange = (obj) => {
      const { id, action } = obj
      const func = actions[action]
      func(id)
    }

    const closePopupForm = () => {
      router.push({ name: route.matched.at(-2).name })
      popupForm.value.isShow = false
    }

    const addPermission = computed(() =>
      [3, 4, 12, 16, 22].includes(store.state.user.permission_id)
    )

    let controller
    const getItems = async () => {
      if (controller) controller.abort()
      controller = new AbortController()
      loading.value = true

      const data = await store.dispatch('table/get', {
        url: options.options.url,
        data: {
          countRows: pagination.value.countRows,
          currentPage: pagination.value.currentPage,
          searchGlobal: searchField.value,
          filter: [],
          searchColumns: [],
          sorts: [],
        },
        params: {
          signal: controller.signal,
        },
      })
      if (data.rows) {
        pagination.value.totalPages = data.totalPage
        pagination.value.totalRows = data.total
        items.value = [...data.rows]
        for (let i = pagination.value.countRows; i < data.total; i++) {
          items.value.push({
            loaded: false,
            index: i,
            page: Math.floor(i / pagination.value.countRows) + 1,
            intersecting: true,
          })
        }
      }

      loading.value = false
      controller = undefined
    }

    const getPage = async (entries, observer, isIntersecting) => {
      queueMicrotask(async () => {
        const obsObject = items.value[entries[0].target.id]
        if (!obsObject.intersecting) return
        items.value.forEach((item) => {
          if (item.page === obsObject.page) {
            item.intersecting = false
          }
        })
        const data = await store.dispatch('table/get', {
          url: options.options.url,
          data: {
            countRows: pagination.value.countRows,
            currentPage: obsObject.page,
            searchGlobal: searchField.value,
            filter: [],
            searchColumns: [],
            sorts: [],
          },
        })
        data.rows.forEach((item) => {
          const emptyObjectIndex = items.value.findIndex(
            (x) => x.page === obsObject.page
          )
          Vue.set(items.value, emptyObjectIndex, item)
        })
      })
    }

    onMounted(async () => {
      await getItems()
    })

    return {
      // cards,
      loading,
      createItem,
      openItem,
      getItems,
      getPage,
      items,
      searchField,
      addPermission,
      popupForm,
      closePopupForm,
      dialog,
      cardChange,
      options,
      isArchive,
      changeTab,
    }
  },
}
