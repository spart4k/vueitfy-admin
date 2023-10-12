//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
import { useRoute } from 'vue-router/composables'
import { ref, onMounted, unref } from 'vue'
import Popup from '../../popup/index.vue'
import { useStore } from '@/store'

const filters = {
  name: 'Filters',
  components: {
    Popup,
  },
  props: {
    filterData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore()
    const { emit } = context
    const route = useRoute()
    const dayOfWeek = ref(['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'])
    const filters = ref([
      {
        label: 'Входящие',
        url: '$IconMailActive',
        number: 0,
        query: 'all',
      },
      {
        label: 'Избранные',
        url: '$IconStarMail',
        number: 0,
        query: 'is_favorites',
      },
      {
        label: 'С вложениями',
        url: '$IconAttachMail',
        number: 0,
        query: 'attachment',
      },
      {
        label: 'Отправленные',
        url: '$IconSendMail',
        number: 0,
        query: 'sent',
      },
      {
        label: 'Удаленные',
        url: '$IconDelete',
        number: 0,
        query: 'trash',
      },
      // {
      //   label: 'Черновики',
      //   url: '$IconDocument',
      //   number: 0,
      //   query: 'drafts',
      // },
    ])
    const boxPanel = ref()
    const folderPanel = ref()
    const newCase = ref({
      name: '',
      color: getComputedStyle(document.documentElement).getPropertyValue(
        '--v-primary-base'
      ),
      loading: false,
      type: '',
    })
    const openPicker = ref(false)
    const popupCase = ref(false)
    const popupDelete = ref()
    const rules = ref([
      (value) => !!value || '',
      (value) => (value && value.length >= 1) || 'Минимум 1 символ',
    ])
    const openCreatePopup = (val, action) => {
      popupCase.value = true
      newCase.value.type = val
      popupDelete.value = action
    }
    const closePopup = () => {
      popupCase.value = false
      openPicker.value = false
      newCase.value = {
        name: '',
        color: getComputedStyle(document.documentElement).getPropertyValue(
          '--v-primary-base'
        ),
        loading: false,
        type: '',
      }
    }

    const deleteFolder = async () => {
      newCase.value.loading = true
      let response
      if (newCase.value.type === 'folder') {
        response = await store.dispatch('mail/deleteFolder', newCase.value.id)
      } else if (newCase.value.type === 'box') {
        response = await store.dispatch('mail/deleteBox', newCase.value.id)
      }
      context.emit('deleteFilter', {
        type: newCase.value.type,
        index: newCase.value.index,
      })
      closePopup()
    }
    const editFolder = async () => {
      if (newCase.value.name.length) {
        let requestData
        if (newCase.value.id) {
          requestData = compareItems()
        } else {
          requestData = {
            name: newCase.value.name,
            accountid: newCase.value.type === 'folder' ? 25 : undefined,
            accountjson:
              newCase.value.type === 'box' ? JSON.stringify([25]) : undefined,
            color: newCase.value.color,
          }
        }
        if (
          !props.filterData.folderData.find((x) => x.name === requestData.name)
        ) {
          if (Object.keys(requestData).length) {
            newCase.value.loading = true
            let newObject
            if (newCase.value.type === 'folder') {
              if (newCase.value.id) {
                newObject = await store.dispatch('mail/editFolder', {
                  content: requestData,
                  id: newCase.value.id,
                })
              } else {
                newObject = await store.dispatch(
                  'mail/createFolder',
                  requestData
                )
              }
            } else if (newCase.value.type === 'box') {
              if (newCase.value.id) {
                newObject = await store.dispatch('mail/editBox', {
                  content: requestData,
                  id: newCase.value.id,
                })
              } else {
                newObject = await store.dispatch('mail/createBox', requestData)
              }
            }
            context.emit('editFilter', {
              type: newCase.value.type,
              content: newObject[0],
              index: newCase.value.index,
            })
            closePopup()
          }
        } else {
          store.commit('notifies/showMessage', {
            color: 'error',
            content: unref('Папка с таким названием уже существует'),
          })
        }
      }
    }
    const compareItems = () => {
      const itemOld =
        props.filterData[`${newCase.value.type}Data`][newCase.value.index]
      let itemNew = {
        color:
          newCase.value.color !== itemOld.color
            ? newCase.value.color
            : undefined,
        name:
          newCase.value.name !== itemOld.name ? newCase.value.name : undefined,
      }
      Object.keys(itemNew).forEach((key) => {
        if (itemNew[key] === undefined) {
          delete itemNew[key]
        }
      })
      return (itemNew = Object.entries(itemNew).map((entry) => {
        return { [entry[0]]: entry[1] }
      }))
    }
    const editItem = (val, type, index, action) => {
      newCase.value = JSON.parse(JSON.stringify(val))
      newCase.value.loading = false
      newCase.value.index = index
      openCreatePopup(type, action)
    }
    onMounted(async () => {
      if (route.query.filter === 'box') {
        boxPanel.value = 0
      }
      if (route.query.filter === 'folder') {
        folderPanel.value = 0
      }
    })
    return {
      newCase,
      openPicker,
      popupCase,
      popupDelete,
      filters,

      dayOfWeek,

      boxPanel,
      folderPanel,
      rules,

      compareItems,
      editItem,
      editFolder,
      deleteFolder,
      openCreatePopup,
      closePopup,
    }
  },
}
export default filters
