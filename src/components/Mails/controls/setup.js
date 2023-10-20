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
    const popupBroadcast = ref(false)
    const broadcast = ref({
      direction: '',
      directionArray: [
        {
          title: 'Направление',
          value: 'all',
        },
        {
          title: 'Люди',
          value: 'people',
        },
      ],
      toAll: true,
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
    return {
      broadcast,
      popupDelete,
      popupBroadcast,
      intersection,
    }
  },
}

export default controls
