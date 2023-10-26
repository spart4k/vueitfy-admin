//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { dateField, selectField, autocompleteField } from '@/utils/fields.js'
import Vue, { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/store'
import _ from 'lodash'
// import { tableApi } from '@/api'
import Popup from '../../popup/index.vue'
import filters from './filters.js'
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
    // let debounce = ref()
    console.log('filters', filters)
    const popupDelete = ref(false)
    const popupBroadcast = ref(true)
    const broadcast = ref({
      direction: {
        title: 'Сотрудники',
        value: 'people',
      },
      directionArray: [
        {
          title: 'Сотрудники',
          value: 'people',
        },
        {
          title: 'Направление',
          value: 'route',
        },
        {
          title: 'Подразделение',
          value: 'unit',
        },
      ],

      route: {
        name: 'xzc',
        items: [],
        page: 1,
        search: '',
        alias: 'p.object_id',
      },
      unit: null,
      object: null,
      people: null,

      search: {
        people: '',
      },

      routeArray: [],
      unitArray: [],
      objectArray: [],
      peopleArray: [],
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

    const showField = (type, field) => {
      return type === field.type && field.isShow
    }

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

    const changeDirection = () => {
      broadcast.value.route = null
      broadcast.value.unit = null
      broadcast.value.object = null
      broadcast.value.people = null
    }

    const clearKey = (val) => {
      val.forEach((key) => {
        broadcast.value[key] = null
      })
    }

    const getItems = async () => {
      const data = await store.dispatch('mail/getDirections')
      const data1 = await store.dispatch('mail/getUnit', 1)
      console.log(data)
    }

    // const getItems = () => {
    //   // cancel pending call
    //   clearTimeout(debounce)
    //   // delay new call 500ms
    //   debounce = setTimeout(() => {
    //     // this.fetch()
    //     console.log(broadcast.value.search.people)
    //   }, 500)
    // }

    onMounted(async () => {
      getItems()
    })

    // watch(
    //   // () => broadcast.value.search.people,
    //   // (newVal) => {
    //   //   // console.log(newVal)
    //   //   getItems()
    //   //   // const params = {
    //   //   //   id: props.value,
    //   //   //   search: props.field.search,
    //   //   // }
    //   //   // if (newVal !== null) querySelections(params)
    //   // }
    // )

    return {
      broadcast,
      popupDelete,
      popupBroadcast,
      intersection,
      filters,

      showField,
      checkAll,
      clearKey,
      changeDirection,
    }
  },
}

export default controls
