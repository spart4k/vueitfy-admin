//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, onMounted, watch } from 'vue'
import { useStore } from '@/store'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    filterData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VueEditor,
  },
  setup(props, ctx) {
    const store = useStore()
    const user = ref({
      items: [],
      search: '',
      page: 0,
      total: null,
      debounce: null,
    })

    const getItems = async () => {
      const obj = user.value
      if (obj.total === null || obj.total >= obj.page) {
        obj.page += 1
        const requestData = {
          searchColumn: obj.search,
          countRows: 15,
          currentPage: obj.page,
          filter: [],
        }
        const data = await store.dispatch('mail/getAccounts', requestData)
        obj.total = data.totalPage
        let newItems = data.Rows.length
        data.Rows.forEach((item) => {
          if (obj.items.some((x) => x.id === item.id)) {
            newItems -= 1
          } else {
            obj.items.push(item)
          }
        })
        if (!newItems) getItems()
      }
    }

    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        getItems()
      }
    }

    const delaySearch = () => {
      clearTimeout(user.value.debounce)
      user.value.debounce = setTimeout(() => {
        getItems()
      }, 250)
    }

    const accountFilter = (item, queryText) => {
      return (
        item?.fio?.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item?.doljnost
          ?.toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      )
    }

    watch(
      () => user.value.search,
      () => {
        user.value.page = 0
        user.value.total = null
        delaySearch()
      }
    )

    // onMounted(() => {
    //   getItems()
    // })

    return {
      user,

      getItems,
      endIntersect,
      delaySearch,
      accountFilter,
    }
  },
}
export default edit
