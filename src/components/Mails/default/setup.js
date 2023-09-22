//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue from 'vue'
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
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const router = context.root.$router
    const route = computed(() => context.root.$route)
    const mailsData = ref([])
    const filterData = ref({
      folderData: [],
      tagsData: [],
      boxData: [],
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

    const createNewFilter = (val) => {
      if (val.type === 'folder') {
        filterData.value.folderData.push(val.content)
      } else if (val.type === 'box') {
        filterData.value.boxData.push(val.content)
      }
    }
    onMounted(async () => {
      filterData.value.folderData = await mailsApi.getFolders()
      filterData.value.boxData = (
        await mailsApi.getBoxes({ accountId: 25 })
      ).data
      filterData.value.tagsData = (await mailsApi.getTags()).data

      mailsData.value = JSON.parse(JSON.stringify(filterData.value.boxData))
      mailsData.value.forEach(async (item, index) => {
        const data = await mailsApi.getPagination({
          page: 1,
          count: 20,
          boxId: item.id,
        })
        if (data.rows && data.rows.length) {
          Vue.set(mailsData.value[index], 'mails', data.rows)
        }
      })
    })
    return {
      selectedMails,
      selectedAllMails,
      allMails,
      mailsData,
      filterData,

      createNewFilter,
      setActiveMail,
      changeSelection,
    }
  },
}
export default mails
