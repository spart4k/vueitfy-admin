import { ref, onMounted } from 'vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'DropZone',
  components: {
    vueDropzone: vue2Dropzone,
  },
  setup() {
    const dropzone = ref(null)
    const dropzoneOptions = ref({
      //url: 'https://httpbin.org/post',
      autoProcessQueue: false,
      // url
      url: 'http://localhost',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      addRemoveLinks: true,
      clickable: true,
      // headers: { "My-Awesome-Header": "header value" }
    })
    const sendingFile = (file) => {
      console.log(file)
      console.log(dropzone.value)
      dropzone.value.processQueue()
    }
    const showSuccess = () => {
      dropzone.value.processQueue()
    }
    onMounted(() => {
      console.log(dropzone.value)
    })
    return {
      dropzoneOptions,
      sendingFile,
      dropzone,
      showSuccess,
    }
  },
}
