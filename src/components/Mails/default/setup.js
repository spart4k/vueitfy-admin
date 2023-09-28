//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { watch } from 'vue'
import { ref, onMounted, computed } from '@vue/composition-api'
import _ from 'lodash'
import { useStore } from '@/store'
// import { tableApi } from '@/api'
import MailsFilters from '../filters/index.vue'
import MailsControls from '../controls/index.vue'
import MailsContainer from '../container/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'

const mails = {
  name: 'Mails',
  components: {
    MailsFilters,
    MailsControls,
    MailsContainer,
    MailsLetterExpanded,
  },
  props: {},
  setup(props, context) {
    const store = useStore()
    const router = context.root.$router
    const route = computed(() => context.root.$route)
    const originalData = ref([])
    const folderData = ref([])
    const mailsData = ref([])
    const selectedMails = ref([])
    const selectedAllMails = ref(false)
    const filterData = ref({
      folderData: [],
      tagsData: [],
      boxData: [],
      notReadData: null,
    })

    const allMails = computed(() => {
      const array = []
      mailsData.value.forEach((item) => {
        if (item.mails) {
          item.mails.forEach((mail) => {
            array.push(mail.id)
          })
        }
      })
      return array
    })

    const changeSelection = (val) => {
      if (val === 'all') {
        selectedAllMails.value = !selectedAllMails.value
        if (selectedAllMails.value) {
          selectedMails.value = allMails.value
        } else {
          selectedMails.value = []
        }
      } else {
        if (selectedMails.value.includes(val)) {
          selectedMails.value = selectedMails.value.filter((e) => e !== val)
        } else {
          selectedMails.value.push(val)
        }
        if (allMails.value.length === selectedMails.value.length) {
          selectedAllMails.value = true
        } else {
          selectedAllMails.value = false
        }
      }
    }

    const changeMailKey = async (val) => {
      const request = {
        content: {
          [val.key]: !val[val.key],
        },
        id: val.id,
      }
      await store.dispatch('mail/changeMail', request)
      const company =
        mailsData.value[mailsData.value.findIndex((x) => x.id === val.box_id)]
          .mails
      const mail = company.find((x) => x.id === val.id)
      mail[val.key] = !val[val.key]
    }

    const editFilter = (val) => {
      if (val.index) {
        filterData.value[`${val.type}Data`][val.index] = Object.assign(
          {},
          val.content
        )
      } else {
        filterData.value[`${val.type}Data`].push(val.content)
      }
    }

    const deleteFilter = (val) => {
      filterData.value[`${val.type}Data`].splice(val.index, 1)
    }

    const setActiveMail = (val) => {
      router
        .push({
          path: 'mails',
          query: { ...route.value.query, ...{ box: val.box_id, mail: val.id } },
        })
        .catch(() => {})
    }

    const getPagination = async (val) => {
      for (const item of originalData.value) {
        const data = await store.dispatch('mail/getPagination', {
          content: {
            page: 1,
            count: 20,
          },
          id: item.id,
        })
        if (data?.rows?.length) {
          Vue.set(item, 'mails', data.rows)
        }
      }
      return originalData.value
    }

    const getFilterData = async () => {
      filterData.value.folderData = await store.dispatch('mail/getFolders')
      filterData.value.boxData = await store.dispatch('mail/getBoxes', {
        accountId: 25,
      })
      filterData.value.tagsData = await store.dispatch('mail/getTags')
      filterData.value.notReadData = await store.dispatch('mail/getNotRead')
    }

    const decreaseUnreadMailsCount = () => {
      filterData.value.notReadData--
    }

    const changeFilter = (key, reverse) => {
      mailsData.value.forEach((item, index) => {
        if (item.mails) {
          if (reverse) {
            mailsData.value[index].mails = mailsData.value[index].mails.filter(
              (e) => !e[key]
            )
          } else {
            mailsData.value[index].mails = mailsData.value[index].mails.filter(
              (e) => e[key]
            )
          }
        }
      })
      originalData.value.forEach((item, index) => {
        if (item.mails) {
          item.mails.forEach((mail, mailIndex) => {
            if (reverse) {
              if (!mail[key] && !mailsData.value[index].mails.includes(mail)) {
                mailsData.value[index].mails.splice(mailIndex, 0, mail)
              }
            } else {
              if (mail[key] && !mailsData.value[index].mails.includes(mail)) {
                mailsData.value[index].mails.splice(mailIndex, 0, mail)
              }
            }
          })
        }
      })
    }

    const checkFilterChange = () => {
      if (route.value.query.filter === 'starred') {
        changeFilter('isfavorites')
      } else if (route.value.query.filter === 'inbox') {
        changeFilter('id')
      } else if (route.value.query.filter === 'attachment') {
        changeFilter('attachment')
      } else if (route.value.query.filter === 'tags') {
        changeFilter('ismain')
      } else if (route.value.query.filter === 'unread') {
        changeFilter('is_read', true)
      }
    }

    const checkRouteFilter = () => {
      console.log('dsa')
    }

    watch(
      () => route.value.fullPath,
      () => {
        checkFilterChange()
      }
    )
    onMounted(async () => {
      await getFilterData()
      originalData.value = _.cloneDeep(filterData.value.boxData)
      checkRouteFilter()
      mailsData.value = _.cloneDeep(await getPagination())
    })
    return {
      selectedMails,
      selectedAllMails,
      allMails,

      filterData,

      originalData,
      folderData,
      mailsData,

      decreaseUnreadMailsCount,
      changeMailKey,
      getPagination,
      deleteFilter,
      editFilter,
      setActiveMail,
      changeSelection,
      changeFilter,
      checkFilterChange,
      checkRouteFilter,
    }
  },
}
export default mails
