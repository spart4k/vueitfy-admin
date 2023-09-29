//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue from 'vue'
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
      notReadData: 0,
    })

    const allMails = computed(() => {
      const arrayId = []
      const arrayFull = []
      mailsData.value.forEach((item) => {
        if (item.mails) {
          item.mails.forEach((mail) => {
            arrayId.push(mail.id)
            arrayFull.push(mail)
          })
        }
      })
      return {
        arrayId: arrayId,
        arrayFull: arrayFull,
      }
    })

    const changeSelection = (val) => {
      if (val === 'all') {
        selectedAllMails.value = !selectedAllMails.value
        if (selectedAllMails.value) {
          selectedMails.value = allMails.value.arrayId
        } else {
          selectedMails.value = []
        }
      } else {
        if (selectedMails.value.includes(val)) {
          selectedMails.value = selectedMails.value.filter((e) => e !== val)
        } else {
          selectedMails.value.push(val)
        }
        if (allMails.value.arrayId.length === selectedMails.value.length) {
          selectedAllMails.value = true
        } else {
          selectedAllMails.value = false
        }
      }
    }

    const getMails = async () => {
      selectedAllMails.value = false
      selectedMails.value = []
      if (route?.value?.query?.id) {
        if (route?.value?.query?.filter === 'folder') {
          // mailsData.value = _.cloneDeep(filterData.value.boxData)
          mailsData.value = [{ id: Number(route?.value?.query?.id) }]
        } else {
          mailsData.value = [
            _.cloneDeep(
              filterData.value.boxData.find(
                (e) => e.id === Number(route?.value?.query?.id)
              )
            ),
          ]
        }
      } else {
        mailsData.value = _.cloneDeep(filterData.value.boxData)
        // mailsData.value = _.cloneDeep(await getPagination(mailsData.value))
      }
      for (const item of mailsData.value) {
        await getPagination(item)
      }
      // mailsData.value.sort((a, b) => b?.mails?.total - a?.mails?.total)
    }

    const getPagination = async (val) => {
      let colorTags = []
      if (route?.value?.query?.color?.length)
        colorTags = JSON.parse(route?.value?.query?.color)
      const requestData = {
        content: {
          page: 1,
          count: 20,
          tags: colorTags,
          // props: route?.value?.query?.id
          //   ? {
          //       all: true,
          //     }
          //   : {
          //       [route?.value?.query?.filter]:
          //         route?.value?.query?.filter !== 'is_read',
          //     },
        },
        id: val.id,
      }
      let data
      if (route?.value?.query?.filter === 'folder') {
        data = await store.dispatch('mail/getFolderMails', requestData)
      } else {
        data = await store.dispatch('mail/getBoxMails', requestData)
      }
      if (data?.rows) {
        Vue.set(val, 'mails', data)
      }
      // mailsData.value.sort((a, b) => b?.mails?.total - a?.mails?.total)
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

    const changeMailArrayKey = async (key, params) => {
      // console.log(key, params, selectedMails.value)
      if (key === 'del') {
        await store.dispatch('mail/deleteMails', selectedMails.value)
        selectedMails.value.forEach((item) => {
          mailsData.value.forEach((row, index) => {
            if (row?.mails?.length) {
              row.mails.forEach((mail, mailIndex) => {
                if (mail.id === item) {
                  mailsData.value[index].mails.splice(mailIndex, 1)
                }
              })
            }
          })
          if (Number(route.value.query.mail) === item) {
            const newQuery = {}
            if (route?.value?.query?.filter)
              newQuery.filter = route?.value?.query?.filter
            if (route?.value?.query?.color)
              newQuery.color = route?.value?.query?.color
            router
              .push({
                query: { ...newQuery },
              })
              .catch(() => {})
          }
        })
      }
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
      const oldQuery = route.value.query
      if (oldQuery.compose) delete oldQuery.compose
      router
        .push({
          query: { ...oldQuery, ...{ mail: val.id, box: val.box_id } },
        })
        .catch(() => {})
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

    // const changeFilter = (key, reverse) => {
    // mailsData.value.forEach((item, index) => {
    //   if (item.mails) {
    //     if (reverse) {
    //       mailsData.value[index].mails = mailsData.value[index].mails.filter(
    //         (e) => !e[key]
    //       )
    //     } else {
    //       mailsData.value[index].mails = mailsData.value[index].mails.filter(
    //         (e) => e[key]
    //       )
    //     }
    //   }
    // })
    // originalData.value.forEach((item, index) => {
    //   if (item.mails) {
    //     item.mails.forEach((mail, mailIndex) => {
    //       if (reverse) {
    //         if (!mail[key] && !mailsData.value[index].mails.includes(mail)) {
    //           mailsData.value[index].mails.splice(mailIndex, 0, mail)
    //         }
    //       } else {
    //         if (mail[key] && !mailsData.value[index].mails.includes(mail)) {
    //           mailsData.value[index].mails.splice(mailIndex, 0, mail)
    //         }
    //       }
    //     })
    //   }
    // })
    // }

    onMounted(async () => {
      if (!route?.value?.query?.filter) {
        router.push({
          query: { filter: 'all' },
        })
      }
      await getFilterData()
      getMails()
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
      changeMailArrayKey,
      getPagination,
      deleteFilter,
      editFilter,
      setActiveMail,
      changeSelection,
      getMails,
    }
  },
}
export default mails
