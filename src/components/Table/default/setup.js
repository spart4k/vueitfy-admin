//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch } from 'vue'

import vTableButton from '../button/index.js'
import vButton from '../../button/index.js'
import vInput from '../../input/default/index.js'
import vIconSort from '../../icons/sort/index.js'
import vContextmenu from '@/components/contextmenu/default/index.vue'
import Sheet from '@/components/sheet/default/index.vue'
import TableFilter from '../filter/index.vue'

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
    const lastSelected = ref({
      indexRow: null,
      row: {},
    })
    const contextmenu = ref({
      isShow: false,
      x: null,
      y: null,
      row: {},
      actions: {},
    })
    const pagination = ref({
      totalRows: null,
      currentPage: null,
      totalPages: null,
      pageLength: null,
    })
    const filter = ref({
      isShow: false,
    })
    const wrapingRow = () => {
      const table = document.querySelector(props.options.selector)
      tablePosition.value = table.getBoundingClientRect().x
      props.options.head.forEach((headerEl) => {
        const headId = headerEl.value
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
      console.log(data)
      lastSelected.value = {
        ...data,
      }
    }
    // Костыль для чистки инпута
    const clearField = () => {
      Vue.set(this, 'searchField', '')
    }
    const openSort = (head) => {
      console.log(head)
      if (head.sorts) {
        head.sorts[0].isShow = !head.sorts[0].isShow
      }
    }
    const sortRow = (head) => {
      if (head.sorts[0].value === undefined) {
        head.sorts[0].value = 'asc'
      } else if (head.sorts[0].value === 'asc') {
        head.sorts[0].value = 'desc'
      } else if (head.sorts[0].value === 'desc') {
        head.sorts[0].value = undefined
      }
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
      const data = await tableApi.get(props.options.options.url)
      console.log('end loading')
      console.log(data)
      props.options.data.rows = data
      const structuredArray = []
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
      loading.value = false
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
    // HOOKS
    onMounted(async () => {
      await getItems()
      console.log('check loading')
      const table = document.querySelector(props.options.selector)
      console.log(props.options.selector, table)
      console.log(loading.value)
      const headerCells = table.querySelectorAll('.v-table-header-row-cell')
      let acumWidth = 0
      headerCells.forEach((headerEl) => {
        const id = headerEl.id.split('-table-header')[0]
        const headCell = props.options.head.find((head) => head.value === id)

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
      wrapingRow()
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
    }
  },
}

export default table
// Vue.component('message', message)
