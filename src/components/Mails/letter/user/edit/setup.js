//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, nextTick } from 'vue'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    filterData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VueEditor,
  },
  setup(props, ctx) {
    console.log('$props.filterData', props.filterData.boxData)
    const user = ref({
      name: 'Азаров Михаил',
      email: 'azarov@gmail.com',
      avatar: 'https://cdn.vuetifyjs.com/images/john.png',
      id: 0,
    })
    // const content = ref([])
    const userArray = ref([
      {
        name: 'Азаров Михаил1',
        email: 'azarov@gmail.com',
        avatar: 'https://cdn.vuetifyjs.com/images/john.png',
        id: 1,
      },
      {
        name: 'Азаров Михаил12',
        email: 'azarov@gmail.1com',
        avatar: 'https://cdn.vuetifyjs.com/images/john.png',
        id: 2,
      },
      {
        name: 'Азаров Михаил123',
        email: 'azarov@gmail.1com',
        avatar: 'https://cdn.vuetifyjs.com/images/john.png',
        id: 3,
      },
      {
        name: 'Азаров Михаил1',
        email: 'azarov@gmail.com',
        avatar: 'https://cdn.vuetifyjs.com/images/john.png',
        id: 4,
      },
    ])
    return {
      // content,
      userArray,
      user,
    }
  },
}
export default edit
