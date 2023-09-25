//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { defineComponent, ref } from 'vue'
// import { tableApi } from '@/api'
const user = {
  name: 'User',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
}
export default user
