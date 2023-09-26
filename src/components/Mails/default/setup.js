//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { watch } from 'vue'
import { ref, onMounted, computed } from '@vue/composition-api'
// import { tableApi } from '@/api'
import MailsFilters from '../filters/index.vue'
import MailsControls from '../controls/index.vue'
import MailsContainer from '../container/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'
import { mailsApi } from '@/api'
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
    console.log('context', context)
    const router = context.root.$router
    const route = computed(() => context.root.$route)
    const originalData = ref([])
    const mailsData = ref([])
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

    const selectedMails = ref([])
    const selectedAllMails = ref(false)
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
        console.log(allMails.value.length, selectedMails.value.length)
        if (allMails.value.length === selectedMails.value.length) {
          selectedAllMails.value = true
        } else {
          selectedAllMails.value = false
        }
      }
    }

    const setActiveMail = (val) => {
      router
        .push({
          path: 'mails',
          query: { ...route.value.query, ...{ mail: val.id } },
        })
        .catch(() => {})
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
    const getPagination = async () => {
      mailsData.value.forEach(async (item, index) => {
        const data = await mailsApi.getPagination({
          page: 1,
          count: 20,
          boxId: item.id,
        })
        if (data && data.rows && data.rows.length) {
          Vue.set(mailsData.value[index], 'mails', data.rows)
        }
      })
      console.log('zxc', 1, mailsData.value)
    }
    const getFilterData = async () => {
      try {
        filterData.value.folderData = await mailsApi.getFolders()
        filterData.value.boxData = (
          await mailsApi.getBoxes({ accountId: 25 })
        ).data
        filterData.value.tagsData = (await mailsApi.getTags()).data
        filterData.value.notReadData = (await mailsApi.getNotRead()).count
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(async () => {
      await getFilterData()
      mailsData.value = JSON.parse(JSON.stringify(filterData.value.boxData))
      await getPagination()
      // console.log('zxc', 2, mailsData.value)
      originalData.value = JSON.parse(JSON.stringify(mailsData.value))
      // console.log('zxc', 3, mailsData.value, originalData.value)
    })
    const changeFilter = (key) => {
      mailsData.value.forEach((item, index) => {
        if (item.mails) {
          mailsData.value[index].mails = mailsData.value[index].mails.filter(
            (e) => e[key]
          )
        }
      })
      originalData.value.forEach((item, index) => {
        if (item.mails) {
          item.mails.forEach((mail, mailIndex) => {
            if (mail[key] && !mailsData.value[index].mails.includes(mail)) {
              mailsData.value[index].mails.splice(mailIndex, 0, mail)
            }
          })
        }
      })
      console.log(originalData.value)
    }
    const checkFilterChange = () => {
      if (route.value.query.filter === 'starred') {
        changeFilter('isfavorites')
      } else if (route.value.query.filter === 'inbox') {
        changeFilter('id')
      } else if (route.value.query.filter === 'attachment') {
        changeFilter('attachment')
      }
    }
    watch(
      () => route.value.fullPath,
      () => {
        checkFilterChange()
      }
    )
    return {
      selectedMails,
      selectedAllMails,
      allMails,
      originalData,
      mailsData,
      filterData,

      getPagination,
      deleteFilter,
      editFilter,
      setActiveMail,
      changeSelection,
      changeFilter,
      checkFilterChange,
    }
  },
}
export default mails
