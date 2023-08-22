//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue from 'vue'

import vTableButton from '../button/index.js'
import vButton from '../../button/index.js'
import vInput from '../../input/default/index.js'
import vIconSort from '../../icons/sort/index.js'
import vContextmenu from '@/components/contextmenu/default/index.vue'
import Sheet from '@/components/right-sheet/default/index.vue'

const table = {
  name: 'Table',
  components: {
    vTableButton,
    vButton,
    vInput,
    vIconSort,
    vContextmenu,
    Sheet,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      count: 0,
      headerOptions: [],
      tablePosition: null,
      searchField: '',
      lastSelected: {
        indexRow: null,
        row: {},
      },
      contextmenu: {
        isShow: false,
        x: null,
        y: null,
        row: {},
        actions: {},
      },
      pagination: {
        totalRows: null,
        currentPage: null,
        totalPages: null,
        pageLength: null,
      },
    }
  },
  methods: {
    wrapingRow() {
      const table = document.querySelector(this.options.selector)
      this.tablePosition = table.getBoundingClientRect().x
      this.options.head.forEach((headerEl) => {
        const headId = headerEl.value
        const { width, x } = this.headerOptions.find((el) => el.id === headId)
        if (
          x + width + this.tablePosition >= window.innerWidth &&
          headerEl.isShow
        ) {
          console.log(width, x, window.innerWidth)
          this.$emit('changeheadershow', { headerEl, value: false })
        } else if (
          x + width + this.tablePosition <= window.innerWidth &&
          !headerEl.isShow
        ) {
          this.$emit('changeheadershow', { headerEl, value: true })
        }
      })
    },
    openChildRow($event, row) {
      $event.stopPropagation()
      if (row.child.isShow) {
        row.child.isShow = false
      } else {
        row.child.isShow = true
      }
      if (this.contextmenu.isShow) {
        this.contextmenu.isShow = false
      }
    },
    checkboxInput(row, indexRow) {
      console.log(row, indexRow)
      console.log('checkbox')
      let delta = null
      if (indexRow > this.lastSelected.indexRow) {
        delta = indexRow - this.lastSelected.indexRow
        if (this.lastSelected.indexRow === null) this.lastSelected.indexRow = 0
        for (
          let i = this.lastSelected.indexRow;
          i < this.lastSelected.indexRow + delta;
          i++
        ) {
          console.log(i)
          console.log(this.options.data.rows[i].row)
          if (!this.options.data.rows[i].row.selected) {
            this.options.data.rows[i].row.selected = true
          } else {
            //console.log(i, this.lastSelected.indexRow)
            //this.options.data[i].row.selected = false
            //if (i === this.lastSelected.indexRow) this.options.data[i].row.selected = true
          }
        }
      } else {
        console.log('down')
        delta = this.lastSelected.indexRow - indexRow
        for (
          let i = this.lastSelected.indexRow;
          i > this.lastSelected.indexRow - delta;
          i--
        ) {
          console.log(i)
          console.log(this.options.data.rows[i].row)
          if (!this.options.data.rows[i].row.selected) {
            this.options.data.rows[i].row.selected = true
          } else {
            //console.log(i)
            //this.options.data[i].row.selected = false
            //if (i === this.lastSelected.indexRow) this.options.data[i].row.selected = true
          }
        }
      }
      console.log(delta)
      console.log(this.lastSelected.indexRow)
    },
    saveLastSelected(data) {
      console.log(data)
      this.lastSelected = {
        ...data,
      }
    },
    // Костыль для чистки инпута
    clearField() {
      Vue.set(this, 'searchField', '')
    },
    openSort(head) {
      console.log(head)
      if (head.sorts) {
        head.sorts[0].isShow = !head.sorts[0].isShow
      }
    },
    sortRow(head) {
      if (head.sorts[0].value === undefined) {
        head.sorts[0].value = 'asc'
      } else if (head.sorts[0].value === 'asc') {
        head.sorts[0].value = 'desc'
      } else if (head.sorts[0].value === 'desc') {
        head.sorts[0].value = undefined
      }
    },
    openContext($event, row) {
      if (!this.contextmenu.isShow) {
        $event.preventDefault()
      } else {
        return
      }
      const contextWidth = 200
      if (this.contextmenu.isShow) {
        setTimeout(() => {
          this.contextmenu.isShow = false
        }, 0)
      }
      console.log($event.clientX, $event.clientY)
      console.log($event, row)
      let direction = 'left'
      let clientX = $event.clientX
      if ($event.clientX + contextWidth >= window.innerWidth) {
        direction = 'right'
        clientX = window.innerWidth - $event.clientX
      }
      setTimeout(
        () => {
          this.contextmenu.isShow = true
          this.contextmenu.x = clientX
          this.contextmenu.y = $event.clientY
          ;(this.contextmenu.row = row),
            (this.contextmenu.direction = direction)
          this.contextmenu.actions = this.headActions
        },
        this.contextmenu.isShow ? 450 : 0
      )
    },
    getWidth(value) {
      if (!value || !this.headerOptions.length) return
      const element = this.headerOptions.find((el) => el.id === value)
      return element.x
    },
    setStickyCells() {
      this.headerOptions()
    },
    getFixedStyle(head) {
      console.log(head)
      const { width } = this.headerOptions.find((el) => el.id === head.value)
      console.log(width)
      if (head.fixed.value && head.fixed.position) {
        console.log({ [head.fixed.position]: this.getWidth(head.value) })
        //if (head.fixed.position === 'right') {

        //}
        return {
          [head.fixed.position]:
            head.fixed.position === 'right'
              ? window.innerWidth - this.getWidth(head.value) - width * 2 + 'px'
              : this.getWidth(head.value) + 'px',
        }
      } else {
        return undefined
      }
    },
  },
  computed: {
    width() {
      return window.innerWidth
    },
    colspanLength() {
      return this.options.options.selecting
        ? this.options.head.filter((el) => el.isShow).length + 1
        : this.options.head.filter((el) => el.isShow).length
    },
    headActions() {
      return this.options.head.find((cell) => cell.type === 'actions')
    },
  },
  watch: {
    searchField(newVal) {
      console.log(newVal)
      this.options.options.search.function(newVal)
    },
  },
  mounted() {
    console.log(vContextmenu)
    const table = document.querySelector(this.options.selector)
    console.log(this.options.selector, table)
    const headerCells = table.querySelectorAll('.v-table-header-row-cell')
    let acumWidth = 0
    headerCells.forEach((headerEl) => {
      const id = headerEl.id.split('-table-header')[0]
      const headCell = this.options.head.find((head) => head.value === id)

      const { width, x } = headerEl.getBoundingClientRect()
      this.headerOptions.push({
        id,
        headCell,
        width,
        x,
        fixed: headCell.fixed,
      })
      setTimeout(() => {
        console.log(headerEl.previousElementSibling.offsetWidth)
        acumWidth = headerEl.previousElementSibling.offsetWidth + acumWidth
      }, 0)
    })
    this.wrapingRow()
    window.addEventListener('resize', () => this.wrapingRow())
    this.pagination = {
      ...this.options.data,
    }
  },
}

export default table
// Vue.component('message', message)
