//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import vContextmenu from '@/components/contextmenu/default/index.vue'
import Sheet from '@/components/sheet/default/index.vue'
import Popup from '@/components/popup/index.vue'

import vTableButton from '../button/index.js'
import vButton from '../../button/index.js'
import vInput from '../../input/default/index.js'
import vIconSort from '../../icons/sort/index.vue'
import TableFilter from '../filter/index.vue'
import Detail from '../detail/index.vue'
import useMobile from '@/layouts/Adaptive/checkMob.js'
import { post } from '@/api/axios'
import useTable from '@/compositions/useTable.js'
//import { tableApi } from '@/api'

const table = {
  name: 'TableDefault',
  components: {
    vTableButton,
    vButton,
    vInput,
    vIconSort,
    vContextmenu,
    Sheet,
    TableFilter,
    Popup,
    Detail,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      require: true,
    },
    tab: {
      type: Object,
      default: () => {},
    },
    filtersConfig: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: Object,
      default: () => {},
    },
    routeParam: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const headerOptions = ref([])
    const tablePosition = ref(null)
    const searchField = ref('')
    const isMobile = useMobile()
    const { generalConfig } = useTable(props.options)
    const options = generalConfig()

    const detail = ref(options?.detail)
    const filters = ref(options?.filters)
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
    const filtersColumns = ref([])
    const pagination = ref({
      totalRows: null,
      currentPage: 1,
      totalPages: null,
      countRows: options.data.pageLength,
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
    const popupForm = ref({
      isShow: false,
    })
    const wrapingRow = () => {
      const table = document.querySelector(options.selector)
      tablePosition.value = table.getBoundingClientRect().x
      options.head.forEach((headerEl) => {
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
          //console.log(options.data.rows[i].row)
          if (!options.data.rows[i].row.selected) {
            options.data.rows[i].row.selected = true
          } else {
            //console.log(i, lastSelected.value.indexRow)
            //options.data[i].row.selected = false
            //if (i === lastSelected.value.indexRow) options.data[i].row.selected = true
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
          //console.log(options.data.rows[i].row)
          if (!options.data.rows[i].row.selected) {
            options.data.rows[i].row.selected = true
          } else {
            //console.log(i)
            //options.data[i].row.selected = false
            //if (i === lastSelected.value.indexRow) options.data[i].row.selected = true
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
      return // eslint-disable-next-line
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
      //console.log($event, row) // eslint-disable-next-line
      // eslint-disable-next-line
      let direction = 'left' // eslint-disable-next-line
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
    const openFilter = ($event) => {
      filter.value.isShow = true
    }
    const closeFilter = () => {
      filter.value.isShow = false
    }
    const getItems = async () => {
      loading.value = true
      const { url } = props.options.options
      // Может быть без props. после merge cofilcts
      let sorts = []
      let searchColumns = []

      paramsQuery.value.sorts.forEach((el) => {
        if (!el.value) {
          return
        } else {
          sorts.push(el)
        }
      })
      paramsQuery.value.searchColumns.forEach((el) => {
        if (!el.value) {
          return
        } else {
          searchColumns.push(el)
        }
      })

      let by = undefined
      // console.log('props.filtersConfig', store.state.formStorage, props.detail?.stageData.id)
      if (props.routeParam || store?.state?.formStorage?.id) {
        by = [
          {
            field: props.options.options.urlDetail,
            value: +props.routeParam || store?.state?.formStorage?.id,
            // value: +props.routeParam,
            alias: props.options.options.alias,
          },
        ]
      }
      const data = await store.dispatch('table/get', {
        url: url,
        data: {
          countRows: paramsQuery.value.countRows,
          currentPage: paramsQuery.value.currentPage,
          searchGlobal: paramsQuery.value.searchGlobal,
          searchColumns,
          sorts,
          filter: filtersColumns.value,
          by,
        },
      })
      options.data.rows = data.rows
      //options.data.rows = data
      if (options.data.rows?.length && options.data.rows) {
        options.data.totalPages = data.totalPage
        options.data.totalRows = data.total
        const structuredArray = []
        options.data.rows.forEach((row) => {
          if (options.options.selecting) {
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
        options.data.rows = structuredArray
      }
      loading.value = false
    }
    const initHeadParams = () => {
      const { head } = options
      head.forEach((el) => {
        if (el.sorts?.length) {
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
      })
    }
    const watchScroll = () => {
      //const firstListItem = list.querySelector('.horizontal-scroll-container__list-item:first-child');
      //const lastHeadTable = header.options
      //const table = document.querySelector(options.selector)
    }
    const isElementXPercentInViewport = (element) => {
      /* eslint-disable */
      const { x } = element.getBoundingClientRect()
      /* eslint-disable */
      if(
          /* eslint-disable */
        element.offsetLeft + element.offsetWidth + x
          /* eslint-disable */
        && element.offsetLeft<window.innerWidth){
          /* eslint-disable */
        return true;
          /* eslint-disable */
      } else {
          /* eslint-disable */
        return false;
      }
    }
    const saveFilter = (filterData) => {
      filtersColumns.value = []
      filters.value.fields.forEach((el) => {
        if (!filterData[el.name]) {
          el.value = ''
          return
        }
        el.value = filterData[el.name]
        const obj = {
          //field: el.name,
          value: filterData[el.name],
          alias: el.aliasFilter,
          type: el.typeFilter ? el.typeFilter : el.type,
          subtype: el.subtype,
        }
        filtersColumns.value.push(obj)
      })
      getItems()
    }
    const openRow = ($event, row) => {
      if (!options.detail || options.options.noTableAction) return
      if (options.detail.type === 'popup') {
        //router.push({
        //  path: `${route.}./1`
        //})
        let requstId = 'id'
        if (props.options.detail.requstId)
          requstId = props.options.detail.requstId
        router.push(
          {
            name: `${route.name}/:${requstId}`,
            params: {
              [requstId]: row.row.id
            }
        })
        popupForm.value.isShow = true
      }
    }
    const closePopupForm = (route) => {
      console.log('close123123')
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
      if (props?.options?.detail?.getOnClose) getItems()
    }
    const addItem = () => {
      if (options.detail.type === 'popup') {
        //router.push({
        //  path: `${route.}./1`
        //})
        router.push(
          {
            name: `${route.name}-add`,
          }
        )
        popupForm.value.isShow = true
      }
    }
    const panelHandler = (button) => {
      const { type, url } = button
      const changeUrl = (url) => {
        router.push(
          {
            name: url,
          })
        popupForm.value.isShow = true
      }
      if (type === 'addItem') {
        addItem()
      } else if (type === 'changeUrl') {
        changeUrl(url)
      } else if (type === 'getFilters') {
        console.log('click inner getFilter')
        console.log(filtersColumns.value)
        console.log(url);
        axios.post(url, filtersColumns.value)
      } else if (type === 'nextStage') {
        emit('nextStage', {})
      }
      if (button.function) button.function()
    }
    // COMPUTED PROPERTIES
    const width = computed(() => {
      return window.innerWidth
    })
    const colspanLength = computed(() => {
      return options.options.selecting
        ? options.head.filter((el) => el.isShow).length + 1
        : options.head.filter((el) => el.isShow).length
    })
    const headActions = computed(() => {
      return options.head.find((cell) => cell.type === 'actions')
    })

    // // WATCH
    // watch(
    //   () => searchField,
    //   (newVal) => {
    //     props.options.options.search.function(newVal)
    //   },
    //   () => {
    //   }
    // )


      // HOOKS
      onMounted(async () => {
        initHeadParams()
        await getItems()

        watch(
          () => paramsQuery,
          async () => {
            await getItems()
          },
          { deep: true }
        )


      const table = document.querySelector(props.options.selector)
      const headerCells = table.querySelectorAll('.v-table-header-row-cell')
      let acumWidth = 0
      headerCells.forEach((headerEl) => {
        const id = headerEl.id.split('-table-header')[0]
        if (!id) return
        const headCell = options.head.find((head) => head.value === id)
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
      window.addEventListener('resize', () => watchScroll())
      watchScroll()
      pagination.value = {
        ...options.data,
      }
      if (options.detail && options.detail.type === 'popup' && route.meta.mode) {
        popupForm.value.isShow = true
      }
    })

    const styleDate = (row, cell, innerDataCallBack) => {
      if ('conditionValue' in cell) {
        const conditionValue = innerDataCallBack(row, cell.conditionValue);
        return conditionValue ? 'font-style: normal; font-size: 14px' : '';
      }
      return '';
    };
    const iconColor = (value, conditionValue) => {
      if (value === 0) {
        return 'red';
      } else if (value === 1) {
        if (conditionValue) {
          return conditionValue === null ? 'red' : 'black';
        } else {
          return 'green';
        }
      } else if (value === 2) {
        return 'orange';
      }
      return 'blue';
    };
    const iconType = (row, cell, innerDataCallBack) => {
     const value = innerDataCallBack(row, cell.value);

      if (value === 0) {
        return 'mdi-close';
      } else if (value === 1) {
        if ('conditionValue' in cell) {
          const conditionValue = innerDataCallBack(row, cell.conditionValue);
          const dateValue = new Date(conditionValue);
          const formattedDate = `${dateValue.getDate()}.${dateValue.getMonth() + 1}.${dateValue.getFullYear()}`;
          return conditionValue ? formattedDate : 'mdi-check';
        } else {
          return 'mdi-check'
        }
      } else if (value === 2) {
        return 'mdi-minus';
      }

      return 'mdi-help';
    };

    const addBackgroundClass = (cell, row, innerDataCallBack) => {
      if ('backgroundValue' in cell) {
        const value = innerDataCallBack(row, cell.backgroundValue);
        return {
          'v-table-body-row-cell--error1': value === 1,
          'v-table-body-row-cell--error2': value === 2,
        }
      }

      return {};
    }

    const checkFieldExist = computed((obj, key) => {
      return key in obj;
    });

    const permission = computed(() => store.state.user.permission_id)
    const directions = computed(() => JSON.parse(store.state.user.direction_json))
    const availablePanelBtn = computed(() => {
      const checkIncludesPermissions = (el) => {
        console.log(el.permissions.includes(permission.value))
        return el.permissions.includes(permission.value)
      }
      const checkIncludesDirections = (el) => {
        //return el.direction_id.includes(directions.value)
        console.log(_.intersection(
          el.direction_id, directions.value).length)
        if (!el.direction_id) return true
        else {
          return !!_.intersection(
            el.direction_id, directions.value).length
        }
      }
      return props.options.panel.buttons.filter((btn) => {
        if (!btn.isShow) return btn
        else {
          return btn.isShow.condition.some(el => {
            console.log(checkIncludesPermissions(el) && checkIncludesDirections(el) === el.type)
            return checkIncludesPermissions(el) && checkIncludesDirections(el) === el.type
          })
          // if ()
        }
      })
    })

    const clickHandler = () => {
      emit('closePopup')
    }

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

      addBackgroundClass,
      iconColor,
      iconType,
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
      watchScroll,
      // COMPUTED PROPERTIES
      styleDate,
      checkFieldExist,
      iconType,
      iconColor,
      width,
      colspanLength,
      headActions,
      loading,
      paramsQuery,
      rowCount,
      isElementXPercentInViewport,
      saveFilter,
      openRow,
      closePopupForm,
      popupForm,
      filtersColumns,
      detail,
      filters,
      addItem,
      panelHandler,
      availablePanelBtn,
      clickHandler,
    }
  },
}

export default table
// Vue.component('message', message)
