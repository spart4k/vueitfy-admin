//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { dateField, selectField, autocompleteField } from '@/utils/fields.js'
import Vue, { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/store'
import _ from 'lodash'
// import { tableApi } from '@/api'
import Popup from '../../popup/index.vue'
const controls = {
  name: 'Controls',
  components: {
    Popup,
  },
  props: {
    selectedAllMails: {
      type: Boolean,
      default: false,
    },
    selectedMails: {
      type: Array,
      default: () => [],
    },
    filterData: {
      type: Object,
      default: () => {},
    },
    allMails: {
      type: Object,
      default: () => {},
    },
    allSelectionFilter: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const store = useStore()
    const { emit } = ctx
    const popupDelete = ref(false)
    const popupBroadcast = ref(false)
    const broadcast = ref({
      path: {
        name: 'path',
        value: 'account',
        dependences: ['direction', 'otdel', 'object', 'account'],
        items: [
          {
            name: 'Сотрудники',
            value: 'account',
          },
          {
            name: 'Направление',
            value: 'direction',
          },
          {
            name: 'Подразделение',
            value: 'otdel',
            disabled: true,
          },
        ],
      },
      direction: {
        name: 'direction',
        alias: 'direction_json',
        value: null,
        multiple: false,
        items: [],
      },
      otdel: {
        name: 'otdel',
        alias: 'otdel',
        page: 0,
        total: null,
        search: '',
        multiple: true,
        debounce: null,
        value: null,
        dependences: ['direction'],
        request: 'getOtdel',
        items: [],
      },
      object: {
        name: 'object',
        alias: 'object_json',
        value: null,
        page: 0,
        total: null,
        search: '',
        multiple: true,
        debounce: null,
        dependences: ['direction'],
        request: 'getObjects',
        items: [],
      },
      account: {
        name: 'account',
        value: null,
        page: 0,
        total: null,
        search: '',
        multiple: true,
        debounce: null,
        dependences: ['direction', 'object', 'otdel'],
        request: 'getAccounts',
        items: [],
      },
    })
    const intersection = computed(() => {
      const array = {
        full: [],
        tags: [],
        folders: [],
        read: [],
        tagsCount: props.filterData.tagsData,
        foldersCount: props.filterData.folderData,
      }
      array.tagsCount.forEach((item) => {
        Vue.set(item, 'value', 0)
      })
      array.foldersCount.forEach((item) => {
        Vue.set(item, 'value', 0)
      })
      props.selectedMails.forEach((item) => {
        array.full.push(props.allMails.arrayFull.find((e) => e.id === item))
      })
      array.full.forEach((item) => {
        array.tags.push(JSON.parse(item.tags))
        array.folders.push(JSON.parse(item.folders))
        array.read.push(item.is_read)
      })
      array.tags.forEach((tag) => {
        tag.forEach((soloTag) => {
          array.tagsCount.find((x) => x.id === Number(soloTag)).value += 1
        })
      })
      array.folders.forEach((folder) => {
        folder.forEach((soloFolder) => {
          array.foldersCount.find((x) => x.id === Number(soloFolder)).value += 1
        })
      })
      array.tags = _.intersection(...array.tags)
      array.folders = _.intersection(...array.folders)
      array.read = array.read.filter((e) => e === true)
      return array
    })

    const checkAll = () => {
      if (broadcast.value.account.value.at(-1) === 'all') {
        broadcast.value.account.value = ['all']
      } else if (broadcast.value.account.value.includes('all')) {
        broadcast.value.account.value.splice(
          broadcast.value.account.value.findIndex((x) => x === 'all'),
          1
        )
      }
    }

    const changeKey = (val) => {
      if (broadcast.value[val].name === 'path') {
        clearKeyValue(['otdel', 'object', 'account'])
        if (broadcast.value[val].value === 'otdel') {
          getItems({ val: ['otdel'] })
        } else if (broadcast.value[val].value === 'account') {
          getItems({ val: ['account'] })
        }
      }
    }

    const clearKeyValue = (val) => {
      val.forEach((key) => {
        broadcast.value[key].value = null
        broadcast.value[key].page = 0
        broadcast.value[key].total = null
        broadcast.value[key].search = ''
        broadcast.value[key].items = []
      })
    }

    const getItems = ({ val, resetAcc }) => {
      if (resetAcc) clearKeyValue(['account'])
      val.forEach(async (valItem) => {
        if (
          broadcast.value[valItem].total === null ||
          broadcast.value[valItem].total >= broadcast.value[valItem].page
        ) {
          broadcast.value[valItem].page += 1
          const requestData = {
            searchColumn: broadcast.value[valItem].search,
            countRows: 15,
            currentPage: broadcast.value[valItem].page,
            filter: [],
          }
          broadcast.value[valItem].dependences.forEach((item) => {
            if (
              (broadcast?.value[item]?.multiple &&
                broadcast?.value[item]?.value?.length) ||
              (!broadcast?.value[item]?.multiple &&
                broadcast?.value[item]?.value)
            ) {
              requestData.filter.push({
                field: broadcast.value[item].alias,
                alias: broadcast.value[item].name,
                value: broadcast.value[item].value.toString(),
              })
            }
          })
          const data = await store.dispatch(
            `mail/${broadcast.value[valItem].request}`,
            requestData
          )
          broadcast.value[valItem].total = data.totalPage

          let newItems = data.Rows.length
          data.Rows.forEach((item) => {
            if (broadcast.value[valItem].items.some((x) => x.id === item.id)) {
              newItems -= 1
            } else {
              broadcast.value[valItem].items.push(item)
            }
          })
          if (!newItems) getItems({ val: [valItem] })

          if (
            valItem === 'account' &&
            !_.includes(broadcast.value[valItem].items, {
              fio: '-ВСЕ-',
              id: 'all',
            })
          ) {
            broadcast.value[valItem].items.unshift({ fio: '-ВСЕ-', id: 'all' })
          }
        }
      })
    }

    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        getItems({ val: [entries[0].target.id] })
      }
    }

    const searchItems = (val) => {
      clearTimeout(val.debounce)
      val.debounce = setTimeout(() => {
        getItems({ val: [val.name] })
      }, 250)
    }

    const accountFilter = (item, queryText) => {
      return (
        item?.fio?.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item?.doljnost
          ?.toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      )
    }

    const broadcastLetters = () => {
      const data = {
        account: broadcast.value.account.value,
        filter: [],
      }
      broadcast.value.account.dependences.forEach((item) => {
        if (
          (broadcast?.value[item]?.multiple &&
            broadcast?.value[item]?.value?.length) ||
          (!broadcast?.value[item]?.multiple && broadcast?.value[item]?.value)
        ) {
          data.filter.push({
            field: broadcast.value[item].alias,
            alias: broadcast.value[item].name,
            value: broadcast.value[item].value.toString(),
          })
        }
      })
      emit('broadcast', data)
      clearKeyValue(['otdel', 'object', 'account'])
      broadcast.value.direction.value = null
      broadcast.value.path.value = 'account'
      popupBroadcast.value = false
    }

    onMounted(async () => {
      getItems({ val: ['account'] })
      broadcast.value.direction.items = await store.dispatch(
        'mail/getDirections'
      )
    })

    watch(
      () => broadcast.value.account.search,
      () => {
        broadcast.value.account.page = 0
        broadcast.value.account.total = null
        searchItems(broadcast.value.account)
      }
    )

    watch(
      () => broadcast.value.object.search,
      () => {
        broadcast.value.object.page = 0
        broadcast.value.object.total = null
        searchItems(broadcast.value.object)
      }
    )

    watch(
      () => broadcast.value.otdel.search,
      () => {
        broadcast.value.otdel.page = 0
        broadcast.value.otdel.total = null
        searchItems(broadcast.value.otdel)
      }
    )

    return {
      broadcast,
      popupDelete,
      popupBroadcast,
      intersection,

      changeKey,
      getItems,
      searchItems,
      endIntersect,
      broadcastLetters,
      checkAll,
      accountFilter,
    }
  },
}

export default controls
