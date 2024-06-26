//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, onMounted } from 'vue'
import DropZone from '@/components/Dropzone/default/index.vue'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VueEditor,
    DropZone,
  },
  setup() {
    const toolbar = ref([
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ])
    const editorContainer = ref(null)
    const editorSettings = ref({
      modules: {
        imageDrop: true,
        imageResize: {},
      },
    })
    onMounted(() => {
      editorContainer.value.scrollIntoView({
        behavior: 'smooth',
      })
    })
    return {
      editorContainer,
      editorSettings,
      toolbar,
    }
  },
}
export default edit
