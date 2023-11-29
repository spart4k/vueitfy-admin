//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
import { onMounted, watch, ref } from 'vue'
import MailsLetterFiles from '../files/index.vue'
const text = {
  name: 'Mail-text',
  components: {
    MailsLetterFiles,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const iframe = ref(null)
    // table:first-child{table-layout: auto; width: 100%}
    const style =
      '<style>html{ box-sizing: border-box; padding: 0; margin: 0; font-family: "Helvetica Neue","Segoe UI",helvetica,verdana,sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; &::-webkit-scrollbar {border-radius : 10px; height: 6px; width: 6px;} &::-webkit-scrollbar-thumb {background: #727272; border-radius : 10px;} &::-webkit-scrollbar-track {border-radius : 10px;}} html{padding: 0 23px}</style>'
    onMounted(() => {
      iframe.value.srcdoc = props?.data?.message_text + style
    })
    watch(
      () => props?.data?.message_text,
      () => {
        iframe.value.srcdoc = props?.data?.message_text + style
      }
    )
    return {
      iframe,
    }
  },
}
export default text
