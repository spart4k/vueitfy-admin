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
  setup(props) {
    const store = useStore()
    const popupDelete = ref(false)
    const popupBroadcast = ref(true)
    const formData = ref([])
    // const broadcast = ref({
    //   direction: {
    //     title: 'Сотрудники',
    //     value: 'people',
    //   },
    //   directionArray: [],

    //   route: {
    //     name: 'xzc',
    //     items: [],
    //     page: 1,
    //     search: '',
    //     alias: 'p.object_id',
    //   },
    //   unit: null,
    //   object: null,
    //   people: null,

    //   search: {
    //     people: '',
    //   },

    //   routeArray: [],
    //   unitArray: [],
    //   objectArray: [],
    //   peopleArray: [],
    // })
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
        page: 1,
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
        page: 1,
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
        page: 1,
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

    const checkAll = (val) => {
      if (val[val?.length - 1]?.name === '-ВСЕ-') {
        broadcast.value.people = [{ name: '-ВСЕ-' }]
      } else if (val.find((x) => x.name === '-ВСЕ-')) {
        broadcast.value.people.splice(
          val.findIndex((x) => x.name === '-ВСЕ-'),
          1
        )
      }
    }

    const changeKey = (val) => {
      if (broadcast.value[val].name === 'path') {
        clearKeyValue(['direction', 'otdel', 'object', 'account'])
        if (broadcast.value[val].value === 'otdel') {
          getItems(['otdel'])
        } else if (broadcast.value[val].value === 'account') {
          getItems(['account'])
        }
      }
    }

    const clearKeyValue = (val) => {
      val.forEach((key) => {
        broadcast.value[key].value = null
        broadcast.value[key].page = 1
        broadcast.value[key].search = ''
      })
    }

    const getItems = (val) => {
      val.forEach(async (valItem) => {
        const requestData = {
          searchColumn: broadcast.value[valItem].search,
          countRows: 15,
          currentPage: 1,
          filter: [],
        }
        broadcast.value[valItem].dependences.forEach((item) => {
          if (
            (broadcast?.value[item]?.multiple &&
              broadcast?.value[item]?.value?.length) ||
            (!broadcast?.value[item]?.multiple && broadcast?.value[item]?.value)
          ) {
            requestData.filter.push({
              field: broadcast.value[item].alias,
              alias: broadcast.value[item].name,
              value: broadcast.value[item].value.toString(),
            })
          }
        })
        // const
        const data = await store.dispatch(
          `mail/${broadcast.value[valItem].request}`,
          requestData
        )
        broadcast.value[valItem].items = [...data.Rows]
      })
      // const data1 = await store.dispatch('mail/getUnit', 1)
      // console.log(data)
    }

    // const changeSelect = (val) => {
    //   console.log(val)
    //   if (val.name === 'direction') {
    //     changeDirection(val.value)
    //   }
    //   // changeDisable()
    // }

    // const changeDirection = (val) => {
    //   filtersData.value.fields.forEach((item) => {
    //     if (item.clearable) item.value = null
    //     if (item?.isShowWhen?.includes(val)) {
    //       item.isShow = true
    //       if (item.name == 'otdel') {
    //         if (val === 'unit') item.position.sm = 12
    //         else item.position.sm = 6
    //       }
    //     } else {
    //       item.isShow = false
    //     }
    //   })
    // }

    const searchItems = (val) => {
      clearTimeout(val.debounce)
      val.debounce = setTimeout(() => {
        getItems([val.name])
      }, 500)
    }

    onMounted(async () => {
      getItems(['account'])
      broadcast.value.direction.items = await store.dispatch(
        'mail/getDirections'
      )
    })

    watch(
      () => broadcast.value.account.search,
      () => {
        searchItems(broadcast.value.account)
      }
    )

    watch(
      () => broadcast.value.object.search,
      () => {
        searchItems(broadcast.value.object)
      }
    )

    watch(
      () => broadcast.value.otdel.search,
      () => {
        searchItems(broadcast.value.otdel)
      }
    )

    return {
      formData,
      broadcast,
      popupDelete,
      popupBroadcast,
      intersection,
      // filters,
      // filtersData,

      changeKey,
      getItems,
      searchItems,
      // changeSelect,
      // showField,
      checkAll,
      // clearKey,
      // changeDirection,
    }
  },
}

export default controls
