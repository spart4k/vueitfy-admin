//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { computed, ref } from 'vue'
// import { tableApi } from '@/api'
const controls = {
  name: 'Controls',
  props: {
    selectedAllMails: {
      type: Boolean,
      default: false,
    },
    filterData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
}

export default controls
