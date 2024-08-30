import { computed, defineComponent, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment/moment'

const PersonalReport = defineComponent({
  name: 'Отчет А/В',
  path: 'report',
  id: uuidv4(),
  components: {},
  props: {},
  setup(props, ctx) {
    const menu = ref(false)
    const date = ref(moment(new Date()).format('YYYY-MM'))
    const monthArray = [
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
    ]
    const getYear = (val) => {
      return moment(val, 'YYYY-MM').year()
    }
    const getMonth = (val, x) => {
      let monthIndex = moment(val, 'YYYY-MM').month()
      if (x) {
        monthIndex += x
        if (monthIndex === -1) monthIndex = 11
        if (monthIndex === 12) monthIndex = 0
      }
      return monthArray[monthIndex]
    }
    return {
      menu,
      date,
      monthArray,

      getYear,
      getMonth,
    }
  },
})
export default PersonalReport
