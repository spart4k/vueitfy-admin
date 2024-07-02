//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import vContextmenu from '@/components/Contextmenu/default/index.vue'
import Sheet from '@/components/Sheet/default/index.vue'
import Popup from '@/components/Popup/index.vue'
import SwitchDefault from '@/components/Switch/default/index.vue'

//import vTableButton from '../button/index.js'
//import vButton from '../../button/index.js'
//import vInput from '../../input/default/index.js'
import vIconSort from '../../Icons/sort/index.vue'
import TableFilter from '../filter/index.vue'
import Detail from '../detail/index.vue'
import useMobile from '@/layouts/Adaptive/checkMob.js'
import useTable from '@/compositions/useTable.js'
import moment from 'moment/moment'
// import { post } from '@/api/axios'
// import { personal } from '@/pages/index.js'
//import { tableApi } from '@/api'

const table = {
  name: 'TableDefault',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    vIconSort,
    vContextmenu,
    Sheet,
    TableFilter,
    Popup,
    Detail,
    SwitchDefault,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      require: true,
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
  methods: {
    update() {
      this.$forceUpdate()
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
    const proxyOptions = toRef(options, 'head')
    const detail = ref(options?.detail)
    const filters = ref(options?.filters)
    const panel = ref(options?.panel)
    const lastSelected = ref({
      items: [],
      indexRow: 0,
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
    const confirmDialog = ref({
      isShow: false,
      text: '',
      function: null,
      context: null,
      loading: false,
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
    const currentDate = ref({
      monthArray: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: moment(new Date()).format('YYYY-MM'),
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
          //
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
      let delta = null
      if (indexRow > lastSelected.value.indexRow) {
        delta = indexRow - lastSelected.value.indexRow
        for (
          let i = lastSelected.value.indexRow;
          i < lastSelected.value.indexRow + delta;
          i++
        ) {
          if (!options.data.rows[i].row.selected) {
            options.data.rows[i].row.selected = true
            lastSelected.value.items.push(options.data.rows[i])
          } else {
            //options.data[i].row.selected = false
            //if (i === lastSelected.value.indexRow) options.data[i].row.selected = true
          }
        }
      } else {
        delta = lastSelected.value.indexRow - indexRow
        for (
          let i = lastSelected.value.indexRow;
          i > lastSelected.value.indexRow - delta;
          i--
        ) {
          if (!options.data.rows[i].row.selected) {
            options.data.rows[i].row.selected = true
            lastSelected.value.items.push(options.data.rows[i])
          } else {
            //options.data[i].row.selected = false
            //if (i === lastSelected.value.indexRow) options.data[i].row.selected = true
          }
        }
      }
    }
    const saveLastSelected = (row, indexRow, value) => {
      lastSelected.value.indexRow = indexRow
      if (value) {
        lastSelected.value.items.push(row)
      } else {
        const delIndex = lastSelected.value.items.findIndex(
          (x) => x.row.id === row.row.id
        )
        lastSelected.value.items.splice(delIndex, 1)
      }
    }
    // Костыль для чистки инпута
    const clearField = () => {
      Vue.set(this, 'searchField', '')
    }
    function openSort(head) {
      proxyOptions.value.forEach((el, id) => {
        if (head.title === el.title) el.sorts[0].isShow = !el.sorts[0].isShow
      })
      this.update()
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
      //
    }
    const contextMenuRef = ref(null)
    const openContext = ($event, row) => {
      //return // eslint-disable-next-line
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
      //
      //
      // eslint-disable-next-line
      let direction = 'left' // eslint-disable-next-line
      let clientX = $event.clientX
      if ($event.clientX + contextWidth >= window.innerWidth) {
        direction = 'right'
        clientX = window.innerWidth - $event.clientX
      }
      // if (!contextMenuRef.value.availableContext.length) {
      //   return
      // }

      setTimeout(
        () => {
          contextmenu.value.isShow = true
          contextmenu.value.x = clientX
          contextmenu.value.y = $event.clientY
          ;(contextmenu.value.row = row),
            (contextmenu.value.direction = direction)
          contextmenu.value.actions = props.options.options.contextMenu
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
      //
      const { width } = headerOptions.value.find((el) => el.id === head.value)
      //
      if (head.fixed.value && head.fixed.position) {
        //
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
    const handlerContext = async ({ action, row }) => {
      if (action.action.type === 'changeUrl') {
        changeUrlPath(action.action.url + '/' + row.row[action.action.target])
      } else if (action.action.type === 'delete') {
        await deleteRow(row.row.id, action.action.alias)
      } else if (action.action.type === 'toRoute') {
        // await deleteRow(row.row.id, action.action.alias)
        router.push({
          name: action.action.routeName,
          params: {
            [action.action.routeTarget]: row.row[action.action.routeParam],
          },
        })
        popupForm.value.isShow = true
      } else if (action.action.type === 'confirm') {
        const context = {
          store,
          data: row,
        }
        confirmDialog.value.text = action.action.dialog.text
        confirmDialog.value.function = action.action.dialog.function
        confirmDialog.value.context = context
        confirmDialog.value.isShow = true
      } else {
        openRow(undefined, row)
      }
      contextmenu.value.isShow = false
    }
    const deleteRow = async (id, alias) => {
      await store.dispatch('table/get', {
        url: `set/data/${alias}`,
        data: {
          data: {
            del: 1,
            id,
          },
        },
      })
      getItems()
    }
    const openFilter = ($event) => {
      filter.value.isShow = true
    }
    const closeFilter = () => {
      filter.value.isShow = false
    }

    const triggerDialogFunction = async () => {
      confirmDialog.value.loading = true
      confirmDialog.value.function(confirmDialog.value.context)
      confirmDialog.value.loading = false
      confirmDialog.value.isShow = false
      getItems()
    }

    // Something like this should work:

    // function makeRequestCreator() {
    //     var call;
    //     return function(url) {
    //         if (call) {
    //             call.cancel();
    //         }
    //         call = axios.CancelToken.source();
    //         return axios.get(url, { cancelToken: call.token }).then((response) => {
    //
    //         }).catch(function(thrown) {
    //             if (axios.isCancel(thrown)) {
    //
    //             } else {
    //                 // handle error
    //             }
    //         });
    //     }
    // }
    // You then use it with

    //  var get = makeRequestCreator();
    //  get('someurl');

    //  Each new request will cancel the previous one

    let controller
    const getItems = async () => {
      if (controller) controller.abort()
      controller = new AbortController()
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
      //
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
          // period: props.options.panel.date ? currentDate.value.date : undefined,
          searchColumns,
          sorts,
          filter: filtersColumns.value,
          by,
        },
        params: {
          signal: controller.signal,
        },
      })
      options.data.rows = data.rows
      if (options.data.rows?.length && options.data.rows) {
        options.data.totalPages = data.totalPage
        options.data.totalRows = data.total
        options.data.footer = data.footer
        // options.
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
      } else {
        paramsQuery.value.totalPages = options.data.totalPages
        paramsQuery.value.currentPage = 1
      }
      loading.value = false
      lastSelected.value.items = []
      lastSelected.value.indexRow = 0
      controller = undefined
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
      if (
        /* eslint-disable */
        element.offsetLeft + element.offsetWidth + x &&
        /* eslint-disable */
        element.offsetLeft < window.innerWidth
      ) {
        /* eslint-disable */
        return true
        /* eslint-disable */
      } else {
        /* eslint-disable */
        return false
      }
    }
    const saveFilter = async (filterData) => {
      filtersColumns.value = []
      filters.value?.fields?.forEach((el) => {
        if (!filterData[el.name]) {
          el.value = ''
          return
        }
        el.value = filterData[el.name]
        if (
          el.type === 'dateRange' &&
          filterData[el.name].every(
            (el) => el === null || el === undefined || el === ''
          )
        ) {
          return
        }
        let type = el.typeFilter ? el.typeFilter : el.type
        type = type === 'autocomplete' ? 'select' : type
        type = type === 'dateRange' && 'date'
        type = type === 'datetime' ? 'date' : type

        const obj = {
          //field: el.name,
          value: filterData[el.name],
          alias: el.aliasFilter,
          // alias: el.name,
          type: el.typeFilter ? el.typeFilter : el.type,
          subtype: el.subtype,
        }
        filtersColumns.value.push(obj)
      })
      paramsQuery.value.currentPage = 1
      await getItems()
    }

    const doubleHandler = (
      $event,
      row,
      cell,
      indexRow = null,
      indexCell,
      activeIndexCells
    ) => {
      if (!options.detail || options.options.noTableAction) return
      if (props.options.options.doubleHandlerType === 'cell') {
        openCell($event, row, cell, indexRow, indexCell, activeIndexCells)
      } else {
        openRow($event, row, cell)
      }
    }

    const openRow = ($event, row) => {
      if (options.detail?.click) {
        if (options.detail.click.condition) {
          const condition = options.detail.click.condition.permissions.includes(
            store.state.user.permission_id
          )
          if (condition !== options.detail.click.condition.type) return
        }
      }
      if (options.detail.type === 'popup') {
        let requestId = 'id'
        if (props.options.detail.requestId)
          requestId = props.options.detail.requestId

        router.push({
          name: `${route.name}/:${requestId}`,
          params: {
            [requestId]: row.id,
          },
        })
        popupForm.value.isShow = true
      }
    }

    const openCell = (
      $event,
      row,
      cell,
      indexRow,
      indexCell,
      activeIndexCells
    ) => {
      if (options.detail.type === 'popup') {
        if (activeIndexCells.includes(indexCell)) {
          const name = `documents-personal-id`

          router.push({
            name,
            params: {
              id: row.personal_id,
            },
          })
          popupForm.value.isShow = true
        }
      }
    }

    const closePopupForm = () => {
      router.push({ name: route.matched.at(-2).name })
      popupForm.value.isShow = false
    }

    const changeMonth = async (val) => {
      currentDate.value.date = moment(`${currentDate.value.date}-10`)
        .add(val, 'M')
        .format('YYYY-MM')
      currentDate.value.year = currentDate.value.date.split('-')[0]
      currentDate.value.month = Number(currentDate.value.date.split('-')[1]) - 1
      await getItems()
    }

    const addItem = () => {
      if (options.detail.type === 'popup') {
        router.push({
          name: `${route.name}-add`,
        })
        popupForm.value.isShow = true
      }
    }
    const changeUrl = (url) => {
      router.push({
        name: url,
      })
      popupForm.value.isShow = true
    }
    const changeUrlPath = (url) => {
      router.push({
        path: url,
      })
      popupForm.value.isShow = true
    }
    const panelHandler = async (button) => {
      const { type, url } = button
      if (button.function) button.function(props.options)
      if (type === 'addItem') {
        addItem()
      } else if (type === 'changeUrl') {
        changeUrl(url)
      } else if (type === 'getFilters') {
        axios.post(url, filtersColumns.value)
      } else if (type === 'nextStage') {
        emit('nextStage', {})
      } else if (button.label === 'Обновить') {
        await getItems()
      } else if (type === 'sendPage') {
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
        const path = await store.dispatch('table/sendPage', {
          page: button.requestPage,
          content: {
            searchGlobal: paramsQuery.value.searchGlobal,
            filter: filtersColumns.value,
            searchColumns,
            sorts,
            countRows: paramsQuery.value.countRows,
            currentPage: paramsQuery.value.currentPage,
          },
        })
        const link = document.createElement('a')
        link.download = path.url
        link.setAttribute('target', '_blank')
        link.href = process.env.VUE_APP_STORE + path.url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        getItems()
      } else if (type === 'changeComp') {
        emit('changeComp')
      } else if (type === 'selectedItems') {
        const context = {
          store,
          items: lastSelected.value.items,
          idArray: lastSelected.value.items.map((x) => x.row.id),
        }
        await button.method(context)
      }
      if (button.refreshTable) {
        getItems()
      }
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
    const initialFilter = () => {
      const filter = {}
      filters.value?.fields?.forEach((item) => {
        filter[item.name] = item.value
      })
      return filter
    }

    onMounted(async () => {
      initHeadParams()
      await saveFilter(initialFilter())
      // await getItems()

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
          //
          acumWidth = headerEl?.previousElementSibling?.offsetWidth + acumWidth
        }, 0)
      })
      //wrapingRow()
      window.addEventListener('resize', () => watchScroll())
      watchScroll()
      pagination.value = {
        ...options.data,
      }
      if (
        options.detail &&
        options.detail.type === 'popup' &&
        route.meta.mode
      ) {
        popupForm.value.isShow = true
      }
    })

    const styleDate = (row, cell, innerDataCallBack) => {
      if ('conditionValue' in cell) {
        const conditionValue = innerDataCallBack(row, cell.conditionValue)
        return conditionValue ? 'font-style: normal; font-size: 14px' : ''
      }
      return ''
    }

    const iconColor = (value, conditionValue) => {
      if (value === 0) {
        return 'red'
      } else if (value === 1) {
        if (conditionValue) {
          return conditionValue === null ? 'red' : 'black'
        } else {
          return 'green'
        }
      } else if (value === 2) {
        return 'orange'
      }
      return 'blue'
    }
    const iconType = (row, cell, innerDataCallBack) => {
      const value = innerDataCallBack(row, cell.value)

      if (value === 0) {
        return 'mdi-close'
      } else if (value === 1) {
        if ('conditionValue' in cell) {
          const conditionValue = innerDataCallBack(row, cell.conditionValue)
          const dateValue = new Date(conditionValue)
          const formattedDateMax = `${dateValue.getDate()}.${
            dateValue.getMonth() + 1
          }.${dateValue.getFullYear()}`
          return conditionValue
            ? moment(dateValue, 'YYYY-MM-DD').format('DD.MM.YYYY')
            : 'mdi-check'
        } else {
          return 'mdi-check'
        }
      } else if (value === 2) {
        return 'mdi-minus'
      }
      return 'mdi-help'
    }

    const addBackgroundClass = (cell, row, innerDataCallBack) => {
      if ('backgroundValue' in cell) {
        const value = innerDataCallBack(row, cell.backgroundValue)
        return {
          'v-table-body-row-cell--error1': value === 1,
          'v-table-body-row-cell--error2': value === 2,
        }
      }

      return {}
    }

    const checkFieldExist = computed((obj, key) => {
      return key in obj
    })

    const permission = computed(() => store.state.user.permission_id)
    const vertical = computed(() => store.state.user.is_personal_vertical)
    const directions = computed(() =>
      JSON.parse(store.state.user.direction_json)
    )
    const availablePanelBtn = computed(() => {
      const checkIncludesPermissions = (el) => {
        if (!el.permissions) return true
        else {
          return el.permissions.includes(permission.value)
        }
      }
      const checkIncludesDirections = (el) => {
        //return el.direction_id.includes(directions.value)
        if (!el.direction_id) return true
        else {
          return !!_.intersection(el.direction_id, directions.value).length
        }
      }
      const checkIncludesVertical = (el) => {
        if (!el.vertical) return true
        else {
          return vertical.value
        }
      }
      return props.options.panel.buttons.filter((btn) => {
        if (!btn.isShow) return btn
        else {
          return btn.isShow.condition.every((el) => {
            const result =
              el.type === checkIncludesPermissions(el) &&
              checkIncludesVertical(el) &&
              checkIncludesDirections(el)
            return result
          })
          // if ()
        }
      })
    })

    const insertStyle = (row) => {
      let styles = {}
      if (props.options.options.styleRow) {
        props.options.options.styleRow.forEach((el) => {
          const style = el.result[row[el.targetKey]]
          for (let key in style) {
            styles = {
              ...style,
            }
          }
        })
      }
      return styles
    }

    const clickHandler = ({ action }) => {
      emit('closePopup', action.to)
    }

    const showAction = (action, cell, row) => {
      if (action.funcCondition) {
        const conditionContext = {
          store,
          action,
          cell,
          row,
        }
        return action.funcCondition(conditionContext)
      }
      return true
    }

    const triggerAction = (action, cell, row) => {
      if (action.method) {
        const conditionContext = {
          store,
          action,
          cell,
          row,
          Vue,
        }
        action.method(conditionContext)
      }
    }

    const downloadFile = (val) => {
      Vue.downloadFile(val)
    }

    const changeHeaders = async () => {
      initHeadParams()
      await getItems()
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
      proxyOptions,
      panel,
      currentDate,
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
      handlerContext,
      changeMonth,
      showAction,
      triggerAction,
      // COMPUTED PROPERTIES
      styleDate,
      checkFieldExist,
      // iconType,
      // iconColor,
      width,
      colspanLength,
      headActions,
      loading,
      paramsQuery,
      rowCount,
      isElementXPercentInViewport,
      saveFilter,
      doubleHandler,
      closePopupForm,
      popupForm,
      filtersColumns,
      detail,
      filters,
      addItem,
      panelHandler,
      availablePanelBtn,
      clickHandler,
      insertStyle,
      downloadFile,
      contextMenuRef,
      changeHeaders,
      confirmDialog,
      triggerDialogFunction,
      route,
    }
  },
}

export default table
// Vue.component('message', message)
