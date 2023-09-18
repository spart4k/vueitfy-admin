//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, watch, defineComponent } from 'vue'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = defineComponent({
  name: 'Edit',
  props: {},
  components: {
    VueEditor,
  },
  setup() {
    const user = ref({
      name: 'Азаров Михаил',
      email: 'azarov@gmail.com',
      avatar: 'https://cdn.vuetifyjs.com/images/john.png',
      id: 0,
    })
    const content = ref([
      {
        name: 'Азаров Михаил1',
        email: 'azarov@gmail.com',
        avatar: 'https://cdn.vuetifyjs.com/images/john.png',
        id: 1,
      },
    ])
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
    const deleteItem = (index) => {
      content.value.splice(index, 1)
    }
    watch(
      () => content.value.length,
      (newCount, oldCount) => {
        if (newCount > oldCount) {
          if (!content.value[content.value.length - 1].id) {
            content.value[content.value.length - 1] = {
              name: content.value[content.value.length - 1],
              email: content.value[content.value.length - 1],
              avatar: null,
            }
          }
        }
      }
    )
    return {
      content,
      userArray,
      user,
      deleteItem,
    }
  },
})
export default edit
