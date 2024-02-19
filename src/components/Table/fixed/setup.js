//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, nextTick, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'

import vContextmenu from '@/components/Contextmenu/default/index.vue'
import Sheet from '@/components/Sheet/default/index.vue'
import Popup from '@/components/Popup/index.vue'
import DropZone from '@/components/Dropzone/default/index.vue'

//import vTableButton from '../button/index.js'
//import vButton from '../../button/index.js'
//import vInput from '../../input/default/index.js'
import vIconSort from '../../Icons/sort/index.vue'
import TableFilter from '../filter/index.vue'
import Detail from '../detail/index.vue'
import useMobile from '@/layouts/Adaptive/checkMob.js'

//import { tableApi } from '@/api'

const table = {
  name: 'TableFixed',
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
    DropZone,
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
    routeParam: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const globalLoading = ref(false)
    const prepaymentLoading = ref(false)
    const headerOptions = ref([])
    const tablePosition = ref(null)
    const searchField = ref('')
    const isMobile = useMobile()
    const detail = ref(props.options?.detail)
    const filters = ref(props.options?.filters)
    const panel = ref(props.options?.panel)
    const confirmPayment = ref(false)
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
    const popupForm = ref({
      isShow: false,
      isShowCellForm: true,
      dataCellForm: {},
    })
    const currentDate = ref({
      month: new Date().getMonth(),
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
      year: new Date().getFullYear(),
    })
    const cells = ref(null)
    const cellItems = ref(null)
    const mainTable = ref(null)
    const dropzone = ref(null)
    const acceptData = ref({
      popup: false,
      valueDate: new Date().toISOString().substr(0, 7),
      valueProfit: { title: 'Аванс', value: 5 },
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
      console.log(head, paramsQuery.value.sorts)
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
      //let filter = []
      paramsQuery.value.sorts.forEach((el) => {
        if (!el.value) {
          return
        } else {
          sorts.push(el)
        }
      })
      console.log(paramsQuery.value.sorts)
      paramsQuery.value.searchColumns.forEach((el) => {
        if (!el.value) {
          return
        } else {
          searchColumns.push(el)
        }
      })
      //props.filtersConfig.forEach((el) => {
      //  if (!el.value) {
      //    return
      //  } else {
      //    filter.push({
      //      field: el.name,
      //      value: el.value,
      //      alias: el.alias,
      //      type: el.type,
      //      subtype: el.subtype,
      //    })
      //  }
      //})
      let by = undefined
      if (props.routeParam || store?.state?.formStorage?.id) {
        by = [
          {
            field: props.options.options.urlDetail,
            value: +props.routeParam,
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
          period: props.options.panel.date
            ? acceptData.value.valueDate
            : undefined,
          searchColumns,
          sorts,
          filter: filtersColumns.value,
          by,
        },
      })
      props.options.data.rows = data.rows
      if (props.options.data.rows?.length && props.options.data.rows) {
        props.options.data.totalPages = data.totalPage
        props.options.data.totalRows = data.total
        const structuredArray = []
        props.options.data.rows.forEach((row) => {
          if (props.options.options.selecting) {
            Vue.set(row, 'selected', false)
          }
          structuredArray.push({
            row,
            child: {
              isShow: true,
              data: row,
            },
          })
        })
        props.options.data.rows = structuredArray
      } else {
        paramsQuery.value.currentPage = 1
      }
      loading.value = false
      setTimeout(() => {
        coutingCells()
      }, 0)
    }

    const initHeadParams = () => {
      const { head } = props.options
      head.forEach((el) => {
        if (el.sorts?.length) {
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
      })
    }
    const watchScroll = () => {
      //const firstListItem = list.querySelector('.horizontal-scroll-container__list-item:first-child');
      //const lastHeadTable = header.options
      //const table = document.querySelector(props.options.selector)
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
    const permission = computed(() => store.state.user.permission_id)
    const directions = computed(() =>
      JSON.parse(store.state.user.direction_json)
    )
    const availablePanelBtn = computed(() => {
      const checkIncludesPermissions = (el) => {
        console.log(el.permissions.includes(permission.value))
        return el.permissions.includes(permission.value)
      }
      const checkIncludesDirections = (el) => {
        //return el.direction_id.includes(directions.value)
        console.log(_.intersection(el.direction_id, directions.value).length)
        if (!el.direction_id) return true
        else {
          return !!_.intersection(el.direction_id, directions.value).length
        }
      }
      return props.options.panel.buttons.filter((btn) => {
        if (!btn.isShow) return btn
        else {
          return btn.isShow.condition.some((el) => {
            console.log('condition1')
            console.log(
              checkIncludesPermissions(el),
              checkIncludesDirections(el),
              el.type
            )
            return (
              checkIncludesPermissions(el) &&
              checkIncludesDirections(el) === el.type
            )
          })
          // if ()
        }
      })
    })
    const saveFilter = (filterData) => {
      console.log('saveFilter', filterData)
      filtersColumns.value = []
      filters.value.fields.forEach((el) => {
        if (!filterData[el.name]) {
          el.value = ''
          return
        }
        el.value = filterData[el.name]
        if (
          el.type === 'dateRange' &&
          filterData[el.name].every(
            (el) =>
              el === null ||
              el === undefined ||
              el === '' ||
              el === '' ||
              el === null ||
              el === null
          )
        ) {
          return
        }
        let type = el.typeFilter ? el.typeFilter : el.type
        type = type === 'autocomplete' ? 'select' : type
        type = type === 'dateRange' && 'date'
        type = type === 'datetime' ? 'date' : type
        console.log('filterData', filterData)
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
      getItems()
    }

    const openCell = ($event, row, cell) => {
      if (props.options.detail.type === 'popup' && !cell.noAction) {
        const routeKey = props.options.options.routeKey
        const dataCell = row.row
        console.log('CELL', cell, dataCell)
        const hour = '11' //Рабочие часы
        const day = cell.value
        const month = currentDate.value.month
        const year = currentDate.value.year

        const date = new Date(year, month, day)
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        //console.log(dataCell);
        const porpsContent = {
          account_id: dataCell.account_id,
          account_name: dataCell.account_name,
          hour,
          date: formattedDate,
        }
        console.log(dataCell.hasOwnProperty(day))
        if (dataCell.hasOwnProperty(day)) {
          if (cell.routeParam) {
            router.push({
              name: cell.routeName,
              params: {
                id: row.row[cell.routeParam],
              },
            })
            console.log('PARAMS', cell)
          } else {
            console.log('Ключ "pattern" существует в объекте regex')
            porpsContent.id = dataCell[day][0].id
            router.push({
              name: `${route.name}-edit`,
              params: {
                id: porpsContent.id,
              },
            })
          }
        } else {
          console.log('Ключ "pattern" не существует в объекте regex')
          if (routeKey) {
            router.push({
              name: `${route.name}-new`,
              // params: {
              //   id: row.row[routeKey]
              // }
            })
          } else {
            router.push({
              name: `${route.name}/:id`,
              params: {
                id: row.row.id,
              },
            })
          }
        }

        popupForm.value.isShow = true
        // popupForm.value.isShowCellForm = true
        popupForm.value.dataCellForm = porpsContent
        //  popupForm.value.isShow =
      }
    }

    const openRow = ($event, row, cell) => {
      if (!props.options.detail) return
      if (props.options.detail.type === 'popup') {
        router.push({
          name: `${route.name}/:id`,
          params: {
            id: row.row.id,
          },
        })
        popupForm.value.isShow = true
      }
    }

    const doubleHandler = ($event, row, cell) => {
      if (props.options.options.doubleHandlerType === 'cell') {
        openCell($event, row, cell)
      }
      if (props.options.options.doubleHandlerType === 'row') {
        openRow($event, row, cell)
      }
      console.log($event, row, cell)
    }

    const closePopupForm = () => {
      router.push({ name: route.matched.at(-2).name })
      popupForm.value.isShow = false
    }

    const addItem = () => {
      if (props.options.detail.type === 'popup') {
        //router.push({
        //  path: `${route.}./1`
        //})
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
    const panelHandler = async (button) => {
      const { type, url } = button
      if (button.function) button.function()
      if (type === 'addItem') {
        addItem()
      } else if (type === 'importFile') {
        dropzone.value.$children[0].$el.click()
      } else if (type === 'acceptPeriod') {
        acceptData.value.popup = true
      } else if (type === 'changeUrl') {
        changeUrl(url)
      } else if (type === 'confirmPayment') {
        confirmPayment.value = true
      } else if (button.label === 'Обновить' || type === 'refresh') {
        await getItems()
        if (button?.subtype === 'changeHeads') {
          initHeadParams()
        }
      }
    }
    const countingDistances = () => {
      let left = 0
      let right = 0
      let all = 0
      cells?.value?.forEach((item, index) => {
        all += Number(props?.options?.head[index].width)
        if (props?.options?.head[index]?.fixed?.position === 'left') {
          item.style.left = `${left}px`
          left += Number(getComputedStyle(item).width.replace('px', ''))
        }
      })

      for (let index = props?.options?.head.length - 1; index >= 0; index--) {
        if (props?.options?.head[index]?.fixed?.position === 'right') {
          const item = cells.value.find(
            (x) => x.innerText === props?.options?.head[index]?.title
          )
          item.style.right = `${right}px`
          right += Number(getComputedStyle(item).width.replace('px', ''))
        }
      }
      mainTable.value.style.width = `${all}px`
    }

    const coutingCells = () => {
      let left = 0
      let right = 0

      cells?.value?.forEach((item, index) => {
        if (props?.options?.head[index]?.fixed?.position === 'left') {
          cellItems?.value?.forEach((element) => {
            element.children[index].style.left = `${left}px`
          })
          left += Number(getComputedStyle(item).width.replace('px', ''))
        }
      })

      for (let index = props?.options?.head.length - 1; index >= 0; index--) {
        if (props?.options?.head[index]?.fixed?.position === 'right') {
          const item = cells.value.find(
            (x) => x.innerText === props?.options?.head[index]?.title
          )
          cellItems?.value?.forEach((element) => {
            element.children[index].style.right = `${right}px`
          })
          right += Number(getComputedStyle(item).width.replace('px', ''))
        }
      }
    }

    const addDayOfMonth = () => {
      props.options.head = props.options.head.filter((item) => !item.added)
      const date = new Date(currentDate.value.year, currentDate.value.month, 1)
      const dateNow = new Date()
      let lastLeftIndex = props.options.head.findLastIndex(
        (x) => x.fixed.position === 'left'
      )
      const pushDay = () => {}

      if (props.options.panel.date) {
        while (date.getMonth() === currentDate.value.month) {
          props.options.head.splice(lastLeftIndex + 1, 0, {
            id: uuidv4(),
            title: `${new Date(date).getDate()}`,
            align: 'center',
            type: props.options.panel.addedItemsChildrenType
              ? 'object'
              : 'default',
            isShow: true,
            width: '75',
            added: true,
            alias: `p.${new Date(date).getDate()}`,
            value: `${new Date(date).getDate() < 10 ? '0' : ''}${new Date(
              date
            ).getDate()}`,
            currentDate:
              dateNow.getDate() === date.getDate() &&
              dateNow.getMonth() === date.getMonth() &&
              dateNow.getFullYear() === date.getFullYear(),
            weekendDate: date.getDay() === 0 || date.getDay() === 6,
            fixed: {
              value: false,
            },
            search: {
              field: '',
              isShow: true,
            },
            sorts: [
              {
                type: 'string',
                default: '',
                value: '',
                isShow: false,
              },
            ],
          })
          lastLeftIndex += 1
          date.setDate(date.getDate() + 1)
        }
      } else {
        let dateIndex = 1
        while (dateIndex < 32) {
          props.options.head.splice(lastLeftIndex + 1, 0, {
            id: uuidv4(),
            title: `${dateIndex}`,
            align: 'center',
            type: 'default',
            isShow: true,
            width: '75',
            added: true,
            alias: `p.col${dateIndex}`,
            value: `col${dateIndex < 10 ? '0' : ''}${dateIndex}`,
            fixed: {
              value: false,
            },
            search: {
              field: '',
              isShow: true,
            },
            sorts: [
              {
                type: 'string',
                default: '',
                value: '',
                isShow: false,
              },
            ],
          })
          lastLeftIndex += 1
          dateIndex += 1
        }
      }
      nextTick(() => {
        let all = 0
        cells?.value?.forEach((item, index) => {
          all += Number(props?.options?.head[index].width)
        })
        mainTable.value.style.width = `${all}px`
      })
    }
    const changeMonth = async (val) => {
      currentDate.value.month += val
      if (currentDate.value.month < 0) {
        currentDate.value.month = 11
        currentDate.value.year -= 1
      } else if (currentDate.value.month > 11) {
        currentDate.value.month = 0
        currentDate.value.year += 1
      }
      acceptData.value.valueDate = `${currentDate.value.year}-${
        currentDate.value.month < 10 ? '0' : ''
      }${currentDate.value.month + 1}`
      // acceptData.value.valueDate
      // setTimeout(() => {
      //   countingDistances()
      // }, 0)
      addDayOfMonth()
      await getItems()
    }
    const fileUpload = async (val) => {
      const requestData = {
        filepath: val,
      }
      globalLoading.value = true
      const data = await store.dispatch('table/getImportX5', requestData)
      globalLoading.value = false
      panel.value.buttons.find((x) => x.value === 'accept').isDisabled = false
      getItems()
    }

    const getDownLoadLink = async (val) => {
      const date = `${currentDate.value.year}-${
        currentDate.value.month < 10 ? '0' : ''
        }${currentDate.value.month + 1}`
      globalLoading.value = true
      const data = await store.dispatch('table/getDetail', `report/personal/period_target?object_id=${val}&period=${date}`)
      Vue.downloadFile(data.url)
      globalLoading.value = false
    }

    const acceptForm = async () => {
      const requestData = {
        period: acceptData.value.valueDate,
        vid: acceptData.value.valueProfit.value,
      }
      const data = await store.dispatch('table/getLoadX5', requestData)
      panel.value.buttons.find((x) => x.value === 'accept').isDisabled = true
      acceptData.value.popup = false
    }

    const createPayment = async () => {
      prepaymentLoading.value = true
      const date = `${currentDate.value.year}-${
        currentDate.value.month < 10 ? '0' : ''
      }${currentDate.value.month + 1}`
      const response = await store.dispatch('table/createPrepayment', {
        data: {
          period: date,
        },
      })
      store.commit('notifies/showMessage', {
        content: `<div>Создано начислений: ${response.count} </div><div>Ошибок: ${response.count_error} </div><div>Пропущено: ${response.count_fall} </div>`,
        color: 'success',
        timeout: 5000,
      })
      confirmPayment.value = false
      prepaymentLoading.value = false
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
    provide('refreshTableFixed', {
      getItems,
    })
    // HOOKS
    onMounted(async () => {
      addDayOfMonth()
      initHeadParams()
      // await getItems()
      countingDistances()

      const table = document.querySelector(props.options.selector)
      const headerCells = table.querySelectorAll('.v-table-header-row-cell')
      let acumWidth = 0
      headerCells.forEach((headerEl) => {
        const id = headerEl.id.split('-table-header')[0]
        if (!id) return
        const headCell = props.options.head.find((head) => head.value === id)
        const { width, x } = headerEl.getBoundingClientRect()
        headerOptions.value.push({
          id,
          headCell,
          width,
          x,
          fixed: headCell.fixed,
        })
      })
      // setTimeout(() => {
      //   //console.log(headerEl.previousElementSibling.offsetWidth)
      //   // acumWidth = headerEl.previousElementSibling.offsetWidth + acumWidth
      // }, 0)
      //wrapingRow()
      window.addEventListener('resize', () => watchScroll())
      watchScroll()
      pagination.value = {
        ...props.options.data,
      }
      // .includes('add')
      if (
        props.options.detail &&
        props.options.detail.type === 'popup' &&
        (route.params.id || route.meta.mode)
      ) {
        popupForm.value.isShow = true
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
      panel,
      isMobile,
      cells,
      cellItems,
      mainTable,
      currentDate,
      dropzone,
      acceptData,
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
      watchScroll,
      countingDistances,
      coutingCells,
      addDayOfMonth,
      changeMonth,
      fileUpload,
      acceptForm,
      // COMPUTED PROPERTIES
      width,
      colspanLength,
      headActions,
      loading,
      globalLoading,
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
      confirmPayment,
      createPayment,
      availablePanelBtn,
      prepaymentLoading,
      getDownLoadLink,
    }
  },
}

export default table
// Vue.component('message', message)
