//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { ref, computed } from 'vue'
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
    const popupDelete = ref(false)
    const popupBroadcast = ref(true)
    const broadcast = ref({
      direction: {
        title: 'Сотрудники',
        value: 'people',
      },
      route: null,
      unit: null,
      object: null,
      people: null,

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
      routeArray: [
        { name: 'Логистика' },
        { name: 'Бедолаги' },
        { name: 'Горимыки' },
        { name: 'Лево' },
      ],
      unitArray: [{ name: 'IT' }, { name: 'HUIT' }, { name: 'APTI' }],
      objectArray: [
        { name: 'Прогресс' },
        { name: 'Коробка' },
        { name: 'ООО Глина' },
        { name: 'Прогресс1' },
        { name: 'Коробка1' },
        { name: 'ООО Глина1' },
        { name: 'Прогресс2' },
        { name: 'Коробка2' },
        { name: 'ООО Глина2' },
      ],
      peopleArray: [
        { name: '-ВСЕ-' },
        { name: 'Азаров', role: 'Главный' },
        { name: 'Тихонравов', role: 'Подглавный' },
        { name: 'Громконравов', role: 'Работяга' },
      ],
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
    return {
      broadcast,
      popupDelete,
      popupBroadcast,
      intersection,

      checkAll,
    }
  },
}

export default controls
