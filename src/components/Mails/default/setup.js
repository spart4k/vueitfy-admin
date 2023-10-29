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

    const selected = ref({
      mails: [],
      mailsAll: false,
      temporary: 0,
      filterAll: null,
    })

    const filterData = ref({
      folderData: [],
      tagsData: [],
      boxData: [],
      notReadData: 0,
    })

    const allMails = computed(() => {
      const arrayId = []
      const arrayFull = []
      let mailsCount = 0
      let load = false
      mailsData.value.forEach((item) => {
        if (item.mails) {
          mailsCount += item.mails.total
          item.mails.rows.forEach((mail) => {
            arrayId.push(mail.id)
            arrayFull.push(mail)
          })
        }
      })
      if (arrayFull.length === mailsCount) load = true
      return {
        arrayId: arrayId,
        arrayFull: arrayFull,
        loadAll: load,
        count: mailsCount,
      }
    })

    const changeSelection = (val) => {
      if (val === 'all') {
        selected.value.mailsAll = !selected.value.mailsAll
        if (selected.value.mailsAll) {
          selected.value.mails = allMails.value.arrayId
          selected.value.temporary = 0
        } else {
          selected.value.mails = []
          // selected.value.mails.push(selected.value.temporary)
        }
      } else {
        if (selected.value.mails.includes(val)) {
          selected.value.mails = selected.value.mails.filter((e) => e !== val)
        } else {
          selected.value.mails.push(val)
        }
        if (allMails.value.arrayId.length === selected.value.mails.length) {
          selected.value.mailsAll = true
        } else {
          selected.value.mailsAll = false
        }
      }
    }

    const getMails = async () => {
      selected.value.mailsAll = false
      selected.value.mails = []
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
      resetAllSelectionFilter()
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
              if (selected.value.mailsAll) selected.value.mails.push(item.id)
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
        mailsData?.value[
          mailsData?.value?.findIndex((x) => x.id === val.box_id)
        ]?.mails?.rows
      if (route?.query?.filter === 'folder') {
        const mail = mailsData.value[0].mails.rows.find((x) => x.id === val.id)
        mail[val.key] = !val[val.key]
      } else {
        if (company.find((x) => x.id === val.id)) {
          const mail = company.find((x) => x.id === val.id)
          mail[val.key] = !val[val.key]
        }
      }
      if (val[val.key] && val.key === route?.query?.filter) {
        hideCurrentMail(val.id)
        company.splice(
          company.findIndex((x) => x.id === val.id),
          1
        )
        if (selected.value.mails.includes(val.id)) {
          selected.value.mails.splice(selected.value.mails.indexOf(val.id), 1)
        }
      }
    }

    const broadcast = async (val) => {
      const requestData = {
        data: {},
      }
      if (selected.value.mailsAll) {
        if (route?.query?.color?.length)
          requestData.data.tags = JSON.parse(route?.query?.color).toString()
        requestData.data.props = route?.query?.filter
        if (route?.query?.id) requestData.data.props_id = route?.query?.id
      } else {
        requestData.data.id = selected.value.mails.toString()
      }
      if (val.account[0] === 'all') {
        requestData.filter = val.filter
      } else {
        requestData.account = val.account.toString()
      }
      const data = await store.dispatch('mail/broadcast', requestData)
      console.log(data)
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
      if (selected.value.mailsAll) {
        requestData.props =
          route?.query?.filter === 'is_read' ? 'not_read' : route?.query?.filter
        if (route?.query?.id) requestData.props_id = route?.query?.id
      } else {
        requestData.id = selected.value.mails.toString()
      }
      await store.dispatch('mail/filterMail', requestData)
      selected.value.mails.forEach((select) => {
        mailsData.value.forEach((row, index) => {
          if (row?.mails?.rows?.length) {
            row?.mails?.rows?.forEach((mail, mailIndex) => {
              if (mail.id === select) {
                if (key === 'del') {
                  mailsData.value[index].mails.rows.splice(mailIndex, 1)
                  hideCurrentMail(mail.id)
                  mailsData.value[index].mails.total -= 1
                  resetAllSelectionFilter()
                } else if (key === 'is_read') {
                  mail.is_read = item
                  if (item) selected.value.filterAll[key].count += 1
                  else selected.value.filterAll[key].count -= 1
                } else if (key === 'tags' || key === 'folders') {
                  if (params) {
                    let newArray = JSON.parse(mail[key])
                    newArray.splice(newArray.indexOf(`${item.id}`), 1)
                    if (
                      item.id === Number(route?.query?.id) ||
                      (route?.query?.color &&
                        JSON?.parse(route?.query?.color)?.includes(item.id))
                    ) {
                      mailsData.value[index].mails.rows.splice(mailIndex, 1)
                      hideCurrentMail(mail.id)
                      selected.value.mails = []
                      selected.value.mailsAll = false
                      mailsData.value[index].mails.total -= 1
                      resetAllSelectionFilter()
                    }
                    mail[key] = JSON.stringify(newArray)
                    selected.value.filterAll[key].find(
                      (x) => x.id === item.id
                    ).count -= 1
                  } else {
                    let newArray = JSON.parse(mail[key])
                    if (!newArray.includes(`${item.id}`))
                      newArray.push(`${item.id}`)
                    mail[key] = JSON.stringify(newArray)
                    selected.value.filterAll[key].find(
                      (x) => x.id === item.id
                    ).count += 1
                  }
                }
              }
            })
          }
          if (key === 'del') {
            getPagination(row)
          }
        })
        if (key === 'del') {
          selected.value.mails = []
          selected.value.mailsAll = false
          if (selected.value.mailsAll) {
            setRouterPath(
              null,
              null,
              {
                filter: route?.query?.filter,
                color: route?.query?.color,
              },
              ['id']
            )
          }
        }
      })
      if (key === 'is_read' || key === 'del') {
        filterData.value.notReadData = await store.dispatch('mail/getNotRead')
      }
      if (selected.value.mailsAll) {
        if (key === 'is_read') {
          if (item) selected.value.filterAll[key].count = allMails.value.count
          else selected.value.filterAll[key].count = 0
        } else if (key === 'tags' || key === 'folders') {
          if (!params)
            selected.value.filterAll[key].find((x) => x.id === item.id).count =
              allMails.value.count
          else
            selected.value.filterAll[key].find(
              (x) => x.id === item.id
            ).count = 0
        }
      }
      compareFiltersCount()
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

    const hideCurrentMail = (val) => {
      if (Number(route?.query?.mail) === val) {
        setRouterPath(null, ['mail', 'box', 'compose'])
      }
    }

    const deleteFilter = (val) => {
      filterData.value[`${val.type}Data`].splice(val.index, 1)
    }

    const setActiveMail = (val) => {
      if (selected.value.mails.includes(val.id)) {
        if (selected.value.temporary) {
          selected.value.mails.splice(
            selected.value.mails.indexOf(selected.value.temporary),
            1
          )
        }
        selected.value.temporary = 0
      } else if (selected.value.mails.includes(selected.value.temporary)) {
        selected.value.mails.splice(
          selected.value.mails.indexOf(selected.value.temporary),
          1
        )
        selected.value.temporary = val.id
        if (route?.query?.filter !== 'sent' && route?.query?.filter !== 'trash')
          selected.value.mails.push(selected.value.temporary)
      } else {
        selected.value.temporary = val.id
        if (route?.query?.filter !== 'sent' && route?.query?.filter !== 'trash')
          selected.value.mails.push(selected.value.temporary)
      }
      if (route?.query?.compose) setRouterPath(null, ['compose'])
      setRouterPath([
        { key: 'mail', value: val.id },
        { key: 'box', value: val.box_id },
      ])
    }

    const getFilterData = async () => {
      filterData.value.folderData = await store.dispatch('mail/getFolders')
      filterData.value.boxData = await store.dispatch('mail/getBoxes')
      filterData.value.tagsData = await store.dispatch('mail/getTags')
      filterData.value.notReadData = await store.dispatch('mail/getNotRead')
      if (!filterData.value.folderData) filterData.value.folderData = []
      if (!filterData.value.boxData) filterData.value.boxData = []
      if (!filterData.value.tagsData) filterData.value.tagsData = []
    }

    const resetAllSelectionFilter = async () => {
      if (route?.query?.filter !== 'trash' && route?.query?.filter !== 'sent') {
        const requestData = {}
        if (route?.query?.color?.length)
          requestData.tags = JSON.parse(route?.query?.color).toString()
        requestData.props = route?.query?.filter
        if (route?.query?.id) requestData.props_id = route?.query?.id
        const tags = await store.dispatch('mail/countTags', requestData)
        const folders = await store.dispatch('mail/countFolders', requestData)
        selected.value.filterAll = {
          is_read: {
            count: tags.is_read,
            value: true,
          },
          folders: [],
          tags: [],
        }
        filterData.value.folderData.forEach((item) => {
          selected.value.filterAll.folders.push({
            id: item.id,
            count: folders[item.id],
            value: false,
          })
        })
        filterData.value.tagsData.forEach((item) => {
          selected.value.filterAll.tags.push({
            id: item.id,
            count: tags[item.id],
            value: false,
          })
        })
        compareFiltersCount()
      }
    }

    const compareFiltersCount = () => {
      if (selected.value.filterAll.is_read.count === allMails.value.count) {
        selected.value.filterAll.is_read.value = false
      } else {
        selected.value.filterAll.is_read.value = true
      }
      selected.value.filterAll.folders.forEach((item) => {
        if (item.count === allMails.value.count) item.value = true
        else item.value = false
      })
      selected.value.filterAll.tags.forEach((item) => {
        if (item.count === allMails.value.count) item.value = true
        else item.value = false
      })
    }

    const decreaseUnreadMailsCount = () => {
      filterData.value.notReadData--
    }

    onMounted(async () => {
      if (!route?.query?.filter) {
        setRouterPath(null, null, { filter: 'all' })
      } else if (route?.query?.mail) {
        setRouterPath(null, ['box', 'mail', 'compose'])
      }
      await getFilterData()
      getMails()
    })

    return {
      allMails,
      selected,

      filterData,
      mailsData,

      setRouterPath,

      compareFiltersCount,
      resetAllSelectionFilter,
      decreaseUnreadMailsCount,
      changeMailKey,
      changeMailArrayKey,
      broadcast,
      getPagination,
      deleteFilter,
      hideCurrentMail,
      editFilter,
      setActiveMail,
      changeSelection,
      getMails,
    }
  },
}
export default mails
