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
    const originalData = ref([])
    const folderData = ref([])
    const mailsData = ref([])
    const selectedMails = ref([])
    const selectedAllMails = ref(false)
    const selectedTemporary = ref(0)
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
      selectedAllMails.value = false
      selectedMails.value = []
      if (route?.query?.id) {
        if (route?.query?.filter === 'folder') {
          // mailsData.value = _.cloneDeep(filterData.value.boxData)
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
        // mailsData.value = _.cloneDeep(await getPagination(mailsData.value))
      }
      for (const item of mailsData.value) {
        await getPagination(item)
      }
      // mailsData.value.sort((a, b) => b?.mails?.total - a?.mails?.total)
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
          delete requestData.content.tags
          delete requestData.content.props
          data = await store.dispatch('mail/getSendedMessages', requestData)
        } else if (route?.query?.filter === 'trash') {
          delete requestData.content.tags
          delete requestData.content.props
          data = await store.dispatch('mail/getDeletedMessages', requestData)
        } else {
          data = await store.dispatch('mail/getBoxMails', requestData)
        }
        if (data?.rows) {
          if (val?.mails) {
            for (const item of data?.rows) {
              if (selectedAllMails.value) selectedMails.value.push(item.id)
              val?.mails?.rows.push(item)
              console.log(item)
            }
          } else {
            Vue.set(val, 'mails', data)
          }
        }
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
          .mails.rows
      if (company.find((x) => x.id === val.id)) {
        const mail = company.find((x) => x.id === val.id)
        mail[val.key] = !val[val.key]
      }
    }

    const changeMailArrayKey = async (key, item, params) => {
      const requestData = {
        content: {},
      }
      if (route?.query?.color?.length)
        requestData.content.tags = JSON.parse(route?.query?.color).toString()
      if (key === 'is_read' || key === 'del') {
        requestData.content.actions = {}
        requestData.content.actions[key] = item
      } else if (key === 'folders' || key === 'tags') {
        requestData.content.actionArray = {}
        requestData.content.actionArray[key] = `${item.id}`
      }
      if (selectedAllMails.value) {
        if (
          route?.query?.filter !== 'folder' &&
          route?.query?.filter !== 'box'
        ) {
          requestData.content.props = {}
          if (route?.query?.filter === 'is_read') {
            requestData.content.props[route?.query?.filter] = false
          } else {
            requestData.content.props[route?.query?.filter] = true
          }
        }
      } else {
        requestData.content.id = selectedMails.value.toString()
      }
      // await store.dispatch('mail/changeLettersAll', requestData.content)
      if (key === 'del' || key === 'is_read') {
        selectedMails.value.forEach((select) => {
          mailsData.value.forEach((row, index) => {
            if (row?.mails?.rows?.length) {
              row?.mails?.rows?.forEach((mail, mailIndex) => {
                if (mail.id === select) {
                  if (key === 'del')
                    mailsData.value[index].mails.rows.splice(mailIndex, 1)
                  if (key === 'is_read') {
                    console.log(item)
                    mail.is_read = item
                  }
                }
              })
            }
          })
          if (key === 'del')
            if (Number(route.query.mail) === item) {
              const newQuery = {}
              if (route?.query?.filter) newQuery.filter = route?.query?.filter
              if (route?.query?.color) newQuery.color = route?.query?.color
              router
                .push({
                  query: { ...newQuery },
                })
                .catch(() => {})
            }
        })
        // selectedMails.value = []
        // selectedAllMails.value = false
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
        selectedMails.value.splice(
          selectedMails.value.indexOf(selectedTemporary.value),
          1
        )
        selectedTemporary.value = 0
      } else if (selectedMails.value.includes(selectedTemporary.value)) {
        selectedMails.value.splice(
          selectedMails.value.indexOf(selectedTemporary.value),
          1
        )
        selectedTemporary.value = val.id
        selectedMails.value.push(selectedTemporary.value)
      } else {
        selectedTemporary.value = val.id
        selectedMails.value.push(selectedTemporary.value)
      }
      const oldQuery = route.query
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

    onMounted(async () => {
      if (!route?.query?.filter && !route?.query?.compose) {
        router.push({
          query: { filter: 'all' },
        })
      } else if (route?.query?.mail) {
        const newQuery = _.cloneDeep(route?.query)
        delete newQuery.box
        delete newQuery.mail
        router
          .push({
            query: newQuery,
          })
          .catch(() => {})
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
