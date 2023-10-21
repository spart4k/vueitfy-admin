//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'

import vContextmenu from '@/components/contextmenu/default/index.vue'
import Sheet from '@/components/sheet/default/index.vue'
import Popup from '@/components/popup/index.vue'
import DropZone from '@/components/dropzone/default/index.vue'

import vTableButton from '../button/index.js'
import vButton from '../../button/index.js'
import vInput from '../../input/default/index.js'
import vIconSort from '../../icons/sort/index.vue'
import TableFilter from '../filter/index.vue'
import Detail from '../detail/index.vue'
import useMobile from '@/layouts/Adaptive/checkMob.js'

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
    const headerOptions = ref([])
    const tablePosition = ref(null)
    const searchField = ref('')
    const isMobile = useMobile()
    const detail = ref(props.options?.detail)
    const filters = ref(props.options?.filters)
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
      if (props.routeParam) {
        by = [
          {
            field: props.options.options.urlDetail,
            value: +props.routeParam,
            alias: props.options.options.alias,
          },
        ]
      }
      // const data = await store.dispatch('table/get', {
      //   url: url,
      //   data: {
      //     countRows: paramsQuery.value.countRows,
      //     currentPage: paramsQuery.value.currentPage,
      //     searchGlobal: paramsQuery.value.searchGlobal,
      //     searchColumns,
      //     sorts,
      //     filter: filtersColumns.value,
      //     by,
      //   },
      // })
      const mocData = {
        total: 5815,
        rows: [
          {
            name: 'Махшулов Шервган Хурсандович',
            direction_id: 1,
            personal_id: 58819,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 10842,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Рауткин Вячеслав Вячеславович',
            direction_id: 1,
            personal_id: 56587,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 10843,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Сархан Шахд Мустафа Ибрахим',
            direction_id: 1,
            personal_id: 58256,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 10844,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Сулиман Шамселдин Сулиман Ахмед',
            direction_id: 1,
            personal_id: 58266,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 10845,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Сухарев Виталий Вадимович',
            direction_id: 1,
            personal_id: 55925,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 10846,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Максимов Вадим Алексеевич',
            direction_id: 1,
            personal_id: 58992,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 10847,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Адам Ибрахим Хиссейн',
            direction_id: 1,
            personal_id: 55943,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7387,
                day: '01',
                total: '1128541.00',
                hour: '10.5',
              },
            ],
          },
          {
            name: 'Муравлев Сергей Николаевич',
            direction_id: 1,
            personal_id: 55960,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7388,
                day: '01',
                total: '1128541.00',
                hour: '10.5',
              },
            ],
          },
          {
            name: 'Юзбоев Илёс Жамолович',
            direction_id: 1,
            personal_id: 55971,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7390,
                day: '01',
                total: '11284541.00',
                hour: '10.5',
              },
            ],
          },
          {
            name: 'Тиллабоев Хаётжон Акрамонович',
            direction_id: 1,
            personal_id: 55968,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7391,
                day: '01',
                total: null,
                hour: '10.5',
              },
            ],
          },
          {
            name: 'Джумабеков Алоуддин Джураевич',
            direction_id: 1,
            personal_id: 55951,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7392,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Томин Сергей Александрович',
            direction_id: 1,
            personal_id: 15082,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7393,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Каримов Анварджон Ахмаджонович',
            direction_id: 1,
            personal_id: 56100,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7394,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Каримов Наимджон Анварджонович',
            direction_id: 1,
            personal_id: 56101,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7395,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Васюнькова Оксана Александровна',
            direction_id: 1,
            personal_id: 55949,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7396,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Корнеев Александр Васильевич',
            direction_id: 1,
            personal_id: 9122,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7397,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Бердиев Аскар Исматуллавич',
            direction_id: 1,
            personal_id: 56114,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7444,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Саидзода Манучехри Гайбулло',
            direction_id: 1,
            personal_id: 56621,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7445,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Бердиев Зулфикор Абдумурод Угли',
            direction_id: 1,
            personal_id: 57271,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7446,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Михлиев Аброр Баходир Угли',
            direction_id: 1,
            personal_id: 56620,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7447,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Нилов Бахриддин Файзиддинович',
            direction_id: 1,
            personal_id: 56251,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7457,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Савчук Андрей Викторович',
            direction_id: 1,
            personal_id: 14977,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7458,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Чирков Евгений Вячеславович',
            direction_id: 1,
            personal_id: 56250,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7459,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Федотов Андрей Анатольевич',
            direction_id: 1,
            personal_id: 3716,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7460,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Марат Уулу Марлен',
            direction_id: 1,
            personal_id: 51623,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7461,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Мелис Уулу Бексултан',
            direction_id: 1,
            personal_id: 58104,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7462,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Антонов Антон Викторович',
            direction_id: 1,
            personal_id: 54042,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7463,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Кропчев Владимир Сергеевич',
            direction_id: 1,
            personal_id: 12200,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7464,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Паляев Алексей Павлович',
            direction_id: 1,
            personal_id: 56075,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7465,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
          {
            name: 'Маркеев Алексей Михайлович',
            direction_id: 1,
            personal_id: 54121,
            date: [
              {
                date: '2023-05-01',
                status: 3,
                id: 7468,
                day: '01',
                total: null,
                hour: null,
              },
            ],
          },
        ],
        page: '1',
        totalPage: 194,
        count: '30',
      }
      props.options.data.rows = mocData.rows
      //props.options.data.rows = data
      if (props.options.data.rows?.length && props.options.data.rows) {
        props.options.data.totalPages = mocData.totalPage
        props.options.data.totalRows = mocData.total
        const structuredArray = []
        props.options.data.rows.forEach((row) => {
          if (props.options.options.selecting) {
            Vue.set(row, 'selected', false)
          }
          row?.date?.forEach((item) => {
            Vue.set(row, `day_${Number(item.day)}`, item.total)
          })
          structuredArray.push({
            row,
            child: {
              isShow: true,
              data: row,
            },
          })
        })
        props.options.data.rows = structuredArray
        // console.log('zxc', props.options.data)
      }
      loading.value = false
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
          alias: el.alias,
          type: el.type,
          subtype: el.subtype,
        }
        filtersColumns.value.push(obj)
      })
      getItems()
    }
    const openRow = ($event, row) => {
      if (props.options.detail.type === 'popup') {
        //router.push({
        //  path: `${route.}./1`
        //})
        router.push(
          {
            name: `${route.name}/:id`,
            params: {
              id: row.row.id
            }
        })
        popupForm.value.isShow = true
      }
    }
    const closePopupForm = () => {
      router.back()
      popupForm.value.isShow = false
    }
    const addItem = () => {
      console.log('add item')
      if (props.options.detail.type === 'popup') {
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
      const { type } = button
      if (type === 'addItem') {
        addItem()
      } else if (type === 'importFile') {
        console.log('import', dropzone.value.$children[0])
        dropzone.value.$children[0].$el.click()
        // importFile()
        // dropzone.value.$refs.hiddenFileInput.click()
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
          cellItems.value.forEach(element => {
            element.children[index].style.left = `${left}px`
          })
          left += Number(getComputedStyle(item).width.replace('px', ''))
        }
      })

      for (let index = props?.options?.head.length - 1; index >= 0; index--) {
        if (props?.options?.head[index]?.fixed?.position === 'right') {
          const item = cells.value.find(x => x.innerText === props?.options?.head[index]?.title)
          item.style.right = `${right}px`
          cellItems.value.forEach(element => {
            element.children[index].style.right = `${right}px`
          })
          right += Number(getComputedStyle(item).width.replace('px', ''))
        }
      }
      mainTable.value.style.width = `${all}px`
    }
    const addDayOfMonth = () => {
      props.options.head = props.options.head.filter((item) => !item.added)
      const date = new Date(currentDate.value.year, currentDate.value.month, 1)
      const dateNow = new Date()
      let lastLeftIndex = props.options.head.findLastIndex((x) => x.fixed.position === 'left')
      while (date.getMonth() === currentDate.value.month) {
        props.options.head.splice(lastLeftIndex + 1, 0, {
          id: uuidv4(),
          title: `${new Date(date).getDate()}`,
          align: 'center',
          type: 'default',
          isShow: true, 
          width: '50',  
          added: true,
          alias: 'p.total',
          value: `day_${new Date(date).getDate()}`,
          currentDate: dateNow.getDate() === date.getDate() && dateNow.getMonth() === date.getMonth() && dateNow.getFullYear() === date.getFullYear(),
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
      // setTimeout(() => {
      //   countingDistances()
      // }, 0)
      addDayOfMonth()
      await getItems()
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

      addDayOfMonth()
      initHeadParams()
      await getItems()
      
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
        setTimeout(() => {
          //console.log(headerEl.previousElementSibling.offsetWidth)
          // acumWidth = headerEl.previousElementSibling.offsetWidth + acumWidth
          countingDistances()
        }, 0)
      })
      //wrapingRow()
      window.addEventListener('resize', () => watchScroll())
      watchScroll()
      pagination.value = {
        ...props.options.data,
      }
      if (props.options.detail && props.options.detail.type === 'popup' && (route.params.id || route.meta.mode === 'add')) {
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
      isMobile,
      cells,
      cellItems,
      mainTable,
      currentDate,
      dropzone,
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
      addDayOfMonth,
      changeMonth,
      // COMPUTED PROPERTIES
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
    }
  },
}

export default table
// Vue.component('message', message)
