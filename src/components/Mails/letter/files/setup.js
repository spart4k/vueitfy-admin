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
    const acceptableFormats = ref(['doc', 'pdf', 'xls'])
    const files = computed(() => {
      const array = []
      JSON.parse(props?.data?.attachment_filename)?.forEach((item, index) => {
        array.push({
          name: item,
          format: item.split('.')[item.split('.').length - 1],
        })
        if (acceptableFormats.value.includes(array[index].format))
          array[index].acceptableFormats = true
      })
      return array
    })
    return {
      acceptableFormats,
      files,
    }
  },
}
export default files
