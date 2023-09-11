//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch } from 'vue'

import vTableButton from '../button/index.js'
import vButton from '../../button/index.js'
import vInput from '../../input/default/index.js'
import vIconSort from '../../icons/sort/index.vue'
import vContextmenu from '@/components/contextmenu/default/index.vue'
import Sheet from '@/components/sheet/default/index.vue'
import TableFilter from '../filter/index.vue'
import useMobile from '@/layouts/Adaptive/checkMob.js'

import { tableApi } from '@/api'

const table = {
  name: 'Table',
  components: {
    vTableButton,
    vButton,
    vInput,
    vIconSort,
    vContextmenu,
    Sheet,
    TableFilter,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      require: true,
    },
    filtersConfig: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)
    const headerOptions = ref([])
    const tablePosition = ref(null)
    const searchField = ref('')
    const isMobile = useMobile()
    const lastSelected = ref({
      indexRow: null,
      row: {},
    })
    const rowCount = [5, 10, 15, 20, 25, 30]
    const contextmenu = ref({
      isShow: false,
      x: null,
      y: null,
      row: {},
      actions: {},
    })
    const pagination = ref({
      totalRows: null,
      currentPage: 1,
      totalPages: null,
      countRows: props.options.data.pageLength,
    })
    const filter = ref({
      isShow: false,
    })
    const paramsQuery = ref({
      currentPage: pagination.value.currentPage,
      searchGlobal: searchField.value,
      countRows: pagination.value.countRows,
      sorts: [],
      searchColumns: [],
    })
    const wrapingRow = () => {
      console.log('RESIZE1')
      const table = document.querySelector(props.options.selector)
      tablePosition.value = table.getBoundingClientRect().x
      props.options.head.forEach((headerEl) => {
        const headId = headerEl.value
        console.log(headId)
        const { width, x } = headerOptions.value.find((el) => el.id === headId)
        if (
          x + width + tablePosition.value >= window.innerWidth &&
          headerEl.isShow
        ) {
          //console.log(width, x, window.innerWidth)
          emit('changeheadershow', { headerEl, value: false })
        } else if (
          x + width + tablePosition.value <= window.innerWidth &&
          !headerEl.isShow
        ) {
          emit('changeheadershow', { headerEl, value: true })
        }
      })
    }
    const openChildRow = ($event, row) => {
      $event.stopPropagation()
      if (row.child.isShow) {
        row.child.isShow = false
      } else {
        row.child.isShow = true
      }
      if (contextmenu.value.isShow) {
        contextmenu.value.isShow = false
      }
    }
    const checkboxInput = (row, indexRow) => {
      //console.log(row, indexRow)
      //console.log('checkbox')
      let delta = null
      if (indexRow > lastSelected.value.indexRow) {
        delta = indexRow - lastSelected.value.indexRow
        if (lastSelected.value.indexRow === null) {
          lastSelected.value.indexRow = 0
        }
        for (
          let i = lastSelected.value.indexRow;
          i < lastSelected.value.indexRow + delta;
          i++
        ) {
          //console.log(i)
          //console.log(props.options.data.rows[i].row)
          if (!props.options.data.rows[i].row.selected) {
            props.options.data.rows[i].row.selected = true
          } else {
            //console.log(i, lastSelected.value.indexRow)
            //props.options.data[i].row.selected = false
            //if (i === lastSelected.value.indexRow) props.options.data[i].row.selected = true
          }
        }
      } else {
        //console.log('down')
        delta = lastSelected.value.indexRow - indexRow
        for (
          let i = lastSelected.value.indexRow;
          i > lastSelected.value.indexRow - delta;
          i--
        ) {
          //console.log(i)
          //console.log(props.options.data.rows[i].row)
          if (!props.options.data.rows[i].row.selected) {
            props.options.data.rows[i].row.selected = true
          } else {
            //console.log(i)
            //props.options.data[i].row.selected = false
            //if (i === lastSelected.value.indexRow) props.options.data[i].row.selected = true
          }
        }
      }
      //console.log(delta)
      //console.log(lastSelected.value.indexRow)
    }
    const saveLastSelected = (data) => {
      lastSelected.value = {
        ...data,
      }
    }
    // Костыль для чистки инпута
    const clearField = () => {
      Vue.set(this, 'searchField', '')
    }
    const openSort = (head) => {
      if (head.sorts) {
        head.sorts[0].isShow = !head.sorts[0].isShow
      }
    }
    const sortRow = (head) => {
      console.log(head)
      const { value } = head
      const paramsCol = paramsQuery.value.sorts.find((el) => el.field === value)
      if (!paramsCol.value) {
        paramsCol.value = 'asc'
      } else if (paramsCol.value === 'asc') {
        paramsCol.value = 'desc'
      } else if (paramsCol.value === 'desc') {
        paramsCol.value = undefined
      }
      //if (head.sorts[0].value === undefined) {
      //  head.sorts[0].value = 'asc'
      //} else if (head.sorts[0].value === 'asc') {
      //  head.sorts[0].value = 'desc'
      //} else if (head.sorts[0].value === 'desc') {
      //  head.sorts[0].value = undefined
      //}
      //console.log(paramsCol)
    }
    const openContext = ($event, row) => {
      if (!contextmenu.value.isShow) {
        $event.preventDefault()
      } else {
        return
      }
      const contextWidth = 200
      if (contextmenu.value.isShow) {
        setTimeout(() => {
          contextmenu.value.isShow = false
        }, 0)
      }
      //console.log($event.clientX, $event.clientY)
      //console.log($event, row)
      let direction = 'left'
      let clientX = $event.clientX
      if ($event.clientX + contextWidth >= window.innerWidth) {
        direction = 'right'
        clientX = window.innerWidth - $event.clientX
      }
      setTimeout(
        () => {
          contextmenu.value.isShow = true
          contextmenu.value.x = clientX
          contextmenu.value.y = $event.clientY
          ;(contextmenu.value.row = row),
            (contextmenu.value.direction = direction)
          contextmenu.value.actions = headActions
        },
        contextmenu.value.isShow ? 450 : 0
      )
    }
    const getWidth = (value) => {
      if (!value || !headerOptions.value.length) return
      const element = headerOptions.value.find((el) => el.id === value)
      return element.x
    }
    const setStickyCells = () => {
      headerOptions.value()
    }
    const getFixedStyle = (head) => {
      //console.log(head)
      const { width } = headerOptions.value.find((el) => el.id === head.value)
      //console.log(width)
      if (head.fixed.value && head.fixed.position) {
        //console.log({ [head.fixed.position]: getWidth(head.value) })
        //if (head.fixed.position === 'right') {

        //}
        return {
          [head.fixed.position]:
            head.fixed.position === 'right'
              ? window.innerWidth - getWidth(head.value) - width * 2 + 'px'
              : getWidth(head.value) + 'px',
        }
      } else {
        return undefined
      }
    }
    const openFilter = () => {
      filter.value.isShow = true
    }
    const closeFilter = () => {
      filter.value.isShow = false
    }
    const getItems = async () => {
      //this.
      loading.value = true
      const { url } = props.options.options
      //const data = await tableApi.get(url, {
      //  currentPage: pagination.value.currentPage,
      //  countRows: 30,
      //  searchGlobal: searchField.value,
      //})
      //body.sorts = Object.assign(target, source).sorts
      let sorts = []
      let searchColumns = []
      paramsQuery.value.sorts.forEach((el, elIndex) => {
        console.log(el, elIndex)
        if (!el.value) {
          return
        } else {
          sorts.push(el)
        }
      })
      paramsQuery.value.searchColumns.forEach((el, elIndex) => {
        console.log(el, elIndex)
        if (!el.value) {
          return
        } else {
          searchColumns.push(el)
        }
      })

      const data = await tableApi.getApi(url, {
        countRows: paramsQuery.value.countRows,
        currentPage: paramsQuery.value.currentPage,
        searchGlobal: paramsQuery.value.searchGlobal,
        searchColumns,
        sorts,
      })
      console.log(data)
      props.options.data.rows = data.rows
      console.log(props.options.data.rows)
      if (props.options.data.rows?.length && props.options.data.rows) {
        props.options.data.totalPages = data.totalPage
        props.options.data.totalRows = data.total
        const structuredArray = []
        console.log(props.options.data.rows)
        props.options.data.rows.forEach((row) => {
          if (props.options.options.selecting) {
            Vue.set(row, 'selected', false)
          }
          structuredArray.push({
            row,
            child: {
              isShow: false,
              data: row,
            },
          })
        })
        props.options.data.rows = structuredArray
      }
      loading.value = false
    }
    const initHeadParams = () => {
      const { head } = props.options
      head.forEach((el) => {
        if (el.sorts?.length) {
          console.log(el.value)
          //Vue.set(el.sorts, 'field', el.value)
          paramsQuery.value.sorts.push({
            field: el.value,
            value: el.sorts[0].default,
            alias: el.alias,
          })
        }
        if (el.search?.isShow) {
          paramsQuery.value.searchColumns.push({
            field: el.value,
            value: el.search.field,
            alias: el.alias,
          })
        }
        console.log(paramsQuery.value)
      })
    }
    // COMPUTED PROPERTIES
    const width = computed(() => {
      return window.innerWidth
    })
    const colspanLength = computed(() => {
      return props.options.options.selecting
        ? props.options.head.filter((el) => el.isShow).length + 1
        : props.options.head.filter((el) => el.isShow).length
    })
    const headActions = computed(() => {
      return props.options.head.find((cell) => cell.type === 'actions')
    })
    // WATCH
    watch(
      () => searchField,
      (newVal) => {
        props.options.options.search.function(newVal)
      }
    )
    //watch(
    //  () => pagination.value.currentPage,
    //  async () => {
    //    await getItems()
    //  }
    //)
    watch(
      () => paramsQuery,
      async () => {
        await getItems()
      },
      { deep: true }
    )
    // HOOKS
    onMounted(async () => {
      initHeadParams()
      await getItems()
      const table = document.querySelector(props.options.selector)
      const headerCells = table.querySelectorAll('.v-table-header-row-cell')
      console.log(headerCells)
      let acumWidth = 0
      headerCells.forEach((headerEl) => {
        const id = headerEl.id.split('-table-header')[0]
        console.log(headerEl.id)
        if (!id) return
        const headCell = props.options.head.find((head) => head.value === id)
        console.log(headCell)
        const { width, x } = headerEl.getBoundingClientRect()
        headerOptions.value.push({
          id,
          headCell,
          width,
          x,
          fixed: headCell.fixed,
        })
        setTimeout(() => {
          //console.log(headerEl.previousElementSibling.offsetWidth)
          acumWidth = headerEl.previousElementSibling.offsetWidth + acumWidth
        }, 0)
      })
      //wrapingRow()
      window.addEventListener('resize', () => wrapingRow())
      pagination.value = {
        ...props.options.data,
      }
    })
    return {
      // DATA
      headerOptions,
      tablePosition,
      searchField,
      lastSelected,
      contextmenu,
      pagination,
      filter,
      isMobile,
      // METHODS
      wrapingRow,
      openChildRow,
      checkboxInput,
      saveLastSelected,
      clearField,
      openSort,
      sortRow,
      openContext,
      getWidth,
      setStickyCells,
      getFixedStyle,
      openFilter,
      closeFilter,
      getItems,
      // COMPUTED PROPERTIES
      width,
      colspanLength,
      headActions,
      loading,
      paramsQuery,
      rowCount,
    }
  },
}

export default table
// Vue.component('message', message)
