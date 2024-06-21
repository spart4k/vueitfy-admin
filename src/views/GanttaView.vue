<template>
  <div class="wrap">
    <div class="toolbox">
      <!-- <button @click="updateFirstRow">Update first row</button> -->
      <!-- <button @click="changeZoomLevel">Change zoom level</button> -->
    </div>
    <div class="gstc-wrapper" ref="gstc"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
const poeples = ref([
  {
    name: 'Додонова Дарья',
    job: 'Тестировщик',
    total: '28',
    used: '14',
    start: '2024-07-15',
    end: '2024-07-29',
    background: '#FF6C38',
  },
  {
    name: 'Тихонравов Алексей',
    job: 'Frontend',
    total: '28',
    used: '14',
    start: '2024-08-15',
    end: '2024-08-29',
    background: '#41B883',
  },
  {
    name: 'Нефедов Александр',
    job: 'Frontend',
    total: '28',
    used: '14',
    start: '2024-08-01',
    end: '2024-08-15',
    background: '#41B883',
  },
  {
    name: 'Фокина Ксения',
    job: 'Backend',
    total: '28',
    used: '14',
    start: '2024-07-15',
    end: '2024-07-29',
    background: '#74CEDD',
  },
  {
    name: 'Василий Кадышев',
    job: 'Backend',
    total: '0',
    used: '0',
    start: '',
    end: '',
    background: '#74CEDD',
  },
  {
    name: 'Ушаков Роман',
    job: 'Дизайнер',
    total: '0',
    used: '0',
    start: '',
    end: '',
    background: '#727FF3',
  },
  {
    name: 'Елагин Евгений',
    job: 'Devops',
    total: '56',
    used: '28',
    start: '2024-06-26',
    end: '2024-07-11',
    background: '#E1E1E1',
  },
  {
    name: 'Азаров Михаил',
    job: 'Папа',
    total: '56',
    used: '7',
    start: '',
    end: '',
    background: '#A600A6',
  },
])
console.log(poeples.value)
import GSTC from 'gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js'
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
import { Plugin as Bookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js'
import 'gantt-schedule-timeline-calendar/dist/style.css'

let gstc, state

// helper functions

function generateRows() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {}
  for (let i = 0; i < poeples.value.length; i++) {
    // const id = GSTC.api.GSTCID(i.toString())
    const id = `gstcid-${i}`
    rows[id] = {
      id,
      label: `Row ${i}`,
      job: poeples.value[i].job,
      name: poeples.value[i].name,
      total: poeples.value[i].total,
      used: poeples.value[i].used,
    }
  }
  return rows
}
function toTimestamp(strDate) {
  var datum = Date.parse(strDate)
  return datum
}
//  time: {
//     start: toTimestamp(poeples.value[i].start),
//     end: toTimestamp(poeples.value[i].end),
//   },
function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {}
  let start = GSTC.api.date().startOf('day').subtract(6, 'day')
  for (let i = 0; i < poeples.value.length; i++) {
    // if (!poeples.value[i].start || !poeples.value[i].end) {
    //   return
    // }
    // const id = GSTC.api.GSTCID(i.toString())
    const id = `gstcid-${i}`
    // const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString())
    // console.log(rowId)
    start = start.add(1, 'day')
    // console.log(start.valueOf())
    items[id] = {
      id,
      // label: poeples.value[i].name,
      rowId: id,
      height: 50,
      label: `<div class="employ">
      <img class="employ-img" src="https://cdn-icons-png.flaticon.com/512/4208/4208103.png" />
      ${poeples.value[i].name}
      </div>`,
      isHTML: true,
      time: {
        start: toTimestamp(poeples.value[i].start),
        end: toTimestamp(poeples.value[i].end),
      },
      style: {
        background: poeples.value[i].background,
      },
    }
    console.log(items)
  }
  return items
}

console.log(generateItems())

// main component

export default {
  name: 'GSTC',
  mounted() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Config }
     */
    const config = {
      licenseKey:
        '====BEGIN LICENSE KEY====\nTGfvT7F/N3IZIs+Q9pkM6RRghSDMe95TGSx5O41f6W/ZpvPNettRBxL8pLyvTD9RsNmBIOdWgT6oqSeLPTAW7YX0YGu5Ly+3pF5Z9MKI021uK/h/K2eWYydhY6NmX58D/0vLY78i3KgYdgrMiDoA3OSv5dlCrRw+DsXZfXJlIx8rVFZ/h1J2ghxC1CSa3G1pJaM+nDsqSzTSaM61zdisFFN0VYiAG3weIBtxksWwN23ru2+9WnY1UxySWcsOWGKMG9HX6MIw61aQmNJg9DBtu7CiEN4nqV/m7TbNUSV4KrNnW6pXBYL/GMUm9H3ON1DDRs9rPWLek60pVpD7542SgQ==||U2FsdGVkX18pHDSS9cY23gxkytlLoLcPOJ+vSi+CVZZrZoTNQrUMiemwLLEfWcfiP+JwP0eHzIo2Ot3hjaJ5Prk7BQnkkdJLagsLNNbL08c=\nPaMJ6y+qx0YJkvulQ5Naii4hZqJvJuJ3lHcrQSqUAMebZm73nRcygmD8IYUBQiyfmYUhCj/D4JgYwXkdmhlUKChliMjpU1PgKmLhm57SFzuymTaDJNs6kDyi3OCj/rYpcwqt/jj4R7hrZNZTjNgTa2yGD4P4DfxkTWyXAeRfwpIzi6jP8KcLXJDjv+yNibjHRcYqN9aGBxdVSmAPW36a0QM1LDWeREgtUbIfM6naPRQAihfFkCHNyRbtjXuiRyMybHBldliM8FlGNaLHSwqhGJ2lTmUNSTQ4XXCJhw0Juccovfu0yCKS0DlR0h2jyIZ1UZsSCQ0R8EIGe6yeptljuA==\n====END LICENSE KEY====',
      plugins: [
        TimelinePointer(),
        Selection(),
        ItemResizing(),
        ItemMovement(),
        Bookmarks(),
      ],
      innerHeight: window.innerHeight - 250,
      scroll: {
        horizontal: {
          precise: true,
          byPixels: true,
        },
        vertical: {
          precise: true,
          byPixels: true,
        },
      },
      list: {
        columns: {
          data: {
            [GSTC.api.GSTCID('name')]: {
              id: GSTC.api.GSTCID('name'),
              width: 150,
              data: 'name',
              header: {
                content: 'ФИО',
              },
            },
            [GSTC.api.GSTCID('id')]: {
              id: GSTC.api.GSTCID('id'),
              width: 150,
              data: 'job',
              header: {
                content: 'Должность',
              },
            },
            [GSTC.api.GSTCID('total')]: {
              id: GSTC.api.GSTCID('total'),
              width: 60,
              data: 'total',
              header: {
                content: 'Всего',
              },
            },
            [GSTC.api.GSTCID('used')]: {
              id: GSTC.api.GSTCID('used'),
              width: 60,
              data: 'used',
              header: {
                content: 'Использовано',
              },
            },
          },
        },
        rows: generateRows(),
      },
      chart: {
        items: generateItems(),
      },
      locale: {
        name: 'ru',
        weekdays:
          'Воскресенья_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split(
            '_'
          ),
        weekdaysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        months:
          'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
            '_'
          ),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split(
          '_'
        ),
        weekStart: 1,
        relativeTime: {
          future: 'В %s',
          past: '%s назад',
          s: 'a few seconds',
          m: 'a minute',
          mm: '%d minutes',
          h: 'an hour',
          hh: '%d hours',
          d: 'a day',
          dd: '%d days',
          M: 'a month',
          MM: '%d months',
          y: 'a year',
          yy: '%d years',
        },
        formats: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'DD/MM/YYYY',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd, D MMMM YYYY HH:mm',
        },
        ordinal: (n) => {
          const s = ['th', 'st', 'nd', 'rd']
          const v = n % 100
          return `[${n}${s[(v - 20) % 10] || s[v] || s[0]}]`
        },
      },
    }

    state = GSTC.api.stateFromConfig(config)

    gstc = GSTC({
      element: this.$refs.gstc,
      state,
    })
    state.update('config.chart.time.zoom', 21)
  },

  beforeUnmount() {
    if (gstc) gstc.destroy()
  },

  methods: {
    updateFirstRow() {
      state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
        row.label = 'Changed dynamically'
        return row
      })
    },

    changeZoomLevel() {
      state.update('config.chart.time.zoom', 5)
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--v-background-base);
  padding: 5px;
}
.gstc-wrapper {
  flex: 1;
}
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
.employ {
  &-img {
    height: 40px;
  }
}
.gstc {
  height: 100%;
}
</style>
