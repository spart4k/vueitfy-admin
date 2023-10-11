//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue from 'vue'
import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
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
    const router = useRouter()
    const route = useRoute()

    const mailsData = ref([])

    const selectedMails = ref([])
    const selectedAllMails = ref(false)
    const selectedTemporary = ref(0)
    const allSelectionFilter = ref()

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
          item.mails.rows.forEach((mail) => {
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
          selectedTemporary.value = 0
        } else {
          selectedMails.value = []
          // selectedMails.value.push(selectedTemporary.value)
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
      resetAllSelectionFilter()
      selectedAllMails.value = false
      selectedMails.value = []
      if (route?.query?.filter) {
        if (route?.query?.id) {
          if (route?.query?.filter === 'folder') {
            mailsData.value = [{ id: Number(route?.query?.id) }]
          } else {
            mailsData.value = [
              _.cloneDeep(
                filterData.value.boxData.find(
                  (e) => e.id === Number(route?.query?.id)
                )
              ),
            ]
          }
        } else {
          mailsData.value = _.cloneDeep(filterData.value.boxData)
        }
        for (const item of mailsData.value) {
          await getPagination(item)
        }
        // mailsData.value.sort((a, b) => b?.mails?.total - a?.mails?.total)
      }
    }

    const getPagination = async (val) => {
      let colorTags = []
      if (route?.query?.color?.length)
        colorTags = JSON.parse(route?.query?.color)
      const requestData = {
        content: {
          count: 20,
          tags: colorTags,
          props: route?.query?.id
            ? {
                all: true,
              }
            : {
                [route?.query?.filter]: route?.query?.filter !== 'is_read',
              },
        },
        id: val.id,
      }
      if (!val?.mails || val?.mails?.page !== val?.mails?.totalPage) {
        if (val?.mails && val?.mails?.page !== val?.mails?.totalPage) {
          val.mails.page += 1
          requestData.content.page = val?.mails?.page
        } else {
          requestData.content.page = 1
        }
        let data
        if (route?.query?.filter === 'folder') {
          data = await store.dispatch('mail/getFolderMails', requestData)
        } else if (route?.query?.filter === 'sent') {
          ;['tags', 'props'].forEach((e) => delete requestData.content[e])
          data = await store.dispatch('mail/getSendedMessages', requestData)
        } else if (route?.query?.filter === 'trash') {
          ;['tags', 'props'].forEach((e) => delete requestData.content[e])
          data = await store.dispatch('mail/getDeletedMessages', requestData)
        } else {
          data = await store.dispatch('mail/getBoxMails', requestData)
        }
        if (data?.rows) {
          if (val?.mails) {
            for (const item of data?.rows) {
              if (selectedAllMails.value) selectedMails.value.push(item.id)
              val?.mails?.rows.push(item)
            }
          } else {
            Vue.set(val, 'mails', data)
          }
        }
      }
      // mailsData.value.sort((a, b) => b?.mails?.total - a?.mails?.total)
    }

    const setRouterPath = (add, remove, set, exception, get) => {
      let newQuery = _.cloneDeep(route?.query)
      if (add) {
        if (newQuery.compose) delete newQuery.compose
        add.forEach((item) => {
          newQuery[item.key] = item.value
        })
      } else if (remove) {
        remove.forEach((item) => {
          if (newQuery[item]) delete newQuery[item]
        })
      } else if (set) {
        newQuery = set
        if (set.color) {
          let colorArray = route?.query?.color
          if (!colorArray) colorArray = []
          if (colorArray?.length) colorArray = JSON.parse(colorArray)
          if (colorArray.includes(set.color)) {
            colorArray = colorArray.filter((e) => e !== set.color)
          } else {
            if (colorArray) colorArray.push(set.color)
            else colorArray = [set.color]
          }
          if (colorArray?.length) colorArray = JSON.stringify(colorArray)
          newQuery.color = colorArray
        }
        if (exception) {
          exception.forEach((item) => {
            if (route?.query[item]) newQuery[item] = route?.query[item]
          })
        }
      }
      router
        .push({
          query: newQuery,
        })
        .catch(() => {})
      if (get) getMails()
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
          .mails.rows
      if (company.find((x) => x.id === val.id)) {
        const mail = company.find((x) => x.id === val.id)
        mail[val.key] = !val[val.key]
      }
    }

    const changeMailArrayKey = async (key, item, params) => {
      const requestData = {}
      if (route?.query?.color?.length)
        requestData.tags = JSON.parse(route?.query?.color).toString()
      if (key === 'is_read' || key === 'del') {
        requestData.actions = {}
        requestData.actions[key] = item
      } else if (key === 'folders' || key === 'tags') {
        requestData.actionArray = {}
        requestData.actionArray[key] = `${item.id}`
        requestData.arrayOperation = params ? 'del' : 'add'
      }
      if (selectedAllMails.value) {
        requestData.props =
          route?.query?.filter === 'is_read' ? 'not_read' : route?.query?.filter
        if (route?.query?.id) requestData.props_id = route?.query?.id
      } else {
        requestData.id = selectedMails.value.toString()
      }
      console.log(requestData)
      await store.dispatch('mail/filterTest', requestData)
      // await store.dispatch('mail/changeLettersAll', requestData)
      selectedMails.value.forEach((select) => {
        mailsData.value.forEach((row, index) => {
          if (row?.mails?.rows?.length) {
            row?.mails?.rows?.forEach((mail, mailIndex) => {
              if (mail.id === select) {
                if (key === 'del') {
                  mailsData.value[index].mails.rows.splice(mailIndex, 1)
                  if (Number(route?.query?.mail) === mail.id) {
                    setRouterPath(null, null, {
                      filter: route?.query?.filter,
                      color: route?.query?.color,
                    })
                  }
                } else if (key === 'is_read') {
                  mail.is_read = item
                } else if (key === 'tags' || key === 'folders') {
                  if (params) {
                    let newArray = JSON.parse(mail[key])
                    newArray.splice(newArray.indexOf(`${item.id}`), 1)
                    mail[key] = JSON.stringify(newArray)
                  } else {
                    let newArray = JSON.parse(mail[key])
                    newArray.push(`${item.id}`)
                    mail[key] = JSON.stringify(newArray)
                  }
                }
              }
            })
          }
        })
        if (key === 'del') {
          selectedMails.value = []
          selectedAllMails.value = false
          if (selectedAllMails.value) {
            setRouterPath(null, null, {
              filter: route?.query?.filter,
              color: route?.query?.color,
            })
          }
        }
      })
      if (selectedAllMails.value) {
        if (key === 'is_read') {
          allSelectionFilter.value.read = !allSelectionFilter.value.read
        }
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
      if (selectedMails.value.includes(val.id)) {
        if (selectedTemporary.value) {
          selectedMails.value.splice(
            selectedMails.value.indexOf(selectedTemporary.value),
            1
          )
        }
        selectedTemporary.value = 0
      } else if (selectedMails.value.includes(selectedTemporary.value)) {
        selectedMails.value.splice(
          selectedMails.value.indexOf(selectedTemporary.value),
          1
        )
        selectedTemporary.value = val.id
        if (route?.query?.filter !== 'sent' && route?.query?.filter !== 'trash')
          selectedMails.value.push(selectedTemporary.value)
      } else {
        selectedTemporary.value = val.id
        if (route?.query?.filter !== 'sent' && route?.query?.filter !== 'trash')
          selectedMails.value.push(selectedTemporary.value)
      }
      if (route?.query?.compose) setRouterPath(null, ['compose'])
      setRouterPath([
        { key: 'mail', value: val.id },
        { key: 'box', value: val.box_id },
      ])
    }

    const getFilterData = async () => {
      filterData.value.folderData = await store.dispatch('mail/getFolders')
      filterData.value.boxData = await store.dispatch('mail/getBoxes', {
        accountId: 25,
      })
      filterData.value.tagsData = await store.dispatch('mail/getTags')
      filterData.value.notReadData = await store.dispatch('mail/getNotRead')
      if (!filterData.value.folderData) filterData.value.folderData = []
      if (!filterData.value.boxData) filterData.value.boxData = []
      if (!filterData.value.tagsData) filterData.value.tagsData = []
    }

    const resetAllSelectionFilter = () => {
      allSelectionFilter.value = {
        read: false,
        folder: [],
        tag: [],
      }
      filterData.value.folderData.forEach((item) => {
        allSelectionFilter.value.folder.push({ value: false, param: item.id })
      })
      filterData.value.tagsData.forEach((item) => {
        allSelectionFilter.value.tag.push({ value: false, param: item.id })
      })
    }

    const decreaseUnreadMailsCount = () => {
      filterData.value.notReadData--
    }

    onMounted(async () => {
      if (!route?.query?.filter && !route?.query?.compose) {
        setRouterPath(null, null, { filter: 'all' })
      } else if (route?.query?.mail) {
        setRouterPath(null, ['box', 'mail', 'compose'])
      }
      await getFilterData()
      getMails()
    })

    return {
      selectedTemporary,
      selectedMails,
      selectedAllMails,
      allMails,

      filterData,

      mailsData,
      allSelectionFilter,

      setRouterPath,

      resetAllSelectionFilter,
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
