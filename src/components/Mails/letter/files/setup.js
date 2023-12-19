//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { computed, ref } from 'vue'
// import _ from 'lodash'
// import { tableApi } from '@/api'
// import MailsLetterUser from './user/index.vue'
// import MailsLetterDate from './date/index.vue'
const files = {
  name: 'Files',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    expand: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const acceptableFormats = ['.doc', '.pdf', '.xls']
    const files = computed(() => {
      const array = []
      JSON.parse(props?.data?.attachment_filename)?.forEach((item, index) => {
        const obj = {
          path: item,
          name: item.split('/').at(-1),
        }
        acceptableFormats.forEach((item) => {
          if (item === obj.name.substr(obj.name.length - item.length))
            obj.format = item.replace('.', '')
        })
        array.push(obj)
      })
      return array
    })
    const downloadURI = (uri, name) => {
      const link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      // delete link
    }
    return {
      files,
      downloadURI,
    }
  },
}
export default files
