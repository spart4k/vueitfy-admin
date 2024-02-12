//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { ref } from 'vue'
// import { tableApi } from '@/api'
const date = {
  name: 'Date',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const month = [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек',
    ]
    return {
      month,
    }
  },
}
export default date
