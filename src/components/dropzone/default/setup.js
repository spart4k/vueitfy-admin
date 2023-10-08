import { ref } from 'vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'DropZone',
  components: {
    vueDropzone: vue2Dropzone,
  },
  setup() {
    const dropzoneOptions = ref({
      url: 'https://httpbin.org/post',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      addRemoveLinks: true,
      clickable: true,
      // headers: { "My-Awesome-Header": "header value" }
    })
    return {
      dropzoneOptions,
    }
  },
}
