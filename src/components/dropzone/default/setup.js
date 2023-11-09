import { ref, onMounted, watch } from 'vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import store from '@/store'
import { Callbacks } from 'jquery'
//import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'DropZone',
  components: {
    vueDropzone: vue2Dropzone,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Array],
    },
    formData: {
      type: Object,
      default: () => {},
    },
    paramsForEmit: {
      type: Object,
      default: () => {},
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const dropzone = ref(null)
    const dropzoneOptions = ref({
      //url: 'https://httpbin.org/post',
      //url: '/save/:folder/:file',
      url: 'http://10.63.1.132:5000/file/save/act/TESTFILE.jpg',
      autoProcessQueue: false,
      // url
      //url: 'http://localhost:3031',
      autoDiscover: false,
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      maxFiles: props.options.countFiles ? props.options.countFiles : 1,
      addRemoveLinks:
        props.options.removeble == true && props.options.removeble
          ? true
          : false,
      dictDefaultMessage: 'Переместите или выберите файл',
      acceptedFiles: props.options?.acceptedFiles,
      //dictRemoveFile: 'delete',
      //clickable: true,
      //previewsContainer: false,
      // headers: { "My-Awesome-Header": "header value" }
    })
    //const value = ref([]
    const proxyVal = ref(props.value)
    const sendingFile = async (files) => {
      if (props.options.withoutSave) {
        await loadFile(files)
        if (props.options.callbacks) {
          props.options.callbacks()
        }
        //dropzone.value.processQueue()
      } else {
        proxyVal.value = [...files]
        emit('addFiles', { ...files, ...props.paramsForEmit }, props.options)
      }
      //console.log(dropzone.value)
      ////const progress = document.querySelector('.dz-progress')
      ////progress.style.opacity = 0
      //setTimeout(() => {
      //  console.log(files)
      //  //dropzone.value.processQueue()
      //}, 1000)
      //console.log(dropzone.value)
      //console.log(dropzone.value.processQueue())
      //console.log(dropzone.value.getAcceptedFiles())
      //dropzone.value.processQueue()
      //value.value.push(files)
      // console.log(dropzone.value)
    }
    let clearDropzone = () => {
      dropzone.value.removeAllFiles()
      // console.log('wdadwwadwadwa')
    }
    const showSuccess = () => {
      //console.log(file)
      //dropzone.value.processQueue()
    }
    const removed = (file) => {
      if (!props.options.withoutSave) {
        emit('removeFile', file)
      }
      //console.log(value)
      //const { uuid } = file.upload
      //console.log(uuid)
      //const index = value.value.indexOf(file)
      //value.value.splice(0, index)
    }
    watch(
      () => proxyVal.value,
      () => emit('input', proxyVal.value)
    )
    const getUrlExtension = (url) =>
      url.split(/[#?]/)[0].split('.').pop().trim()
    const fillPreview = () => {
      if (typeof proxyVal.value === 'string') {
        let url = proxyVal.value
        //url = 'https://personal-crm.ru' + url
        url = 'http://10.63.1.132:5000' + '/file/get' + url
        const type = getUrlExtension(url)
        const filename = url.split('/').pop()

        const file = { name: filename, size: 12322, type: 'image/' + type }
        dropzone.value.manuallyAddFile(file, url)
      }
      //proxyVal.value.forEach((el) => (el = 'https://api.personal-crm.ru' + el))
    }
    //const nameFile = () => {

    //}
    const loadFile = async (files) => {
      const formData = new FormData()
      const fileType =
        files[0].name.split('.')[files[0].name.split('.').length - 1]
      if (!props.options.formats || props.options.formats.includes(fileType)) {
        const name = `${
          props.options.folder
        }_25_${new Date().getTime()}.${fileType}`
        const folder = props.options.folder + '/' + name
        formData.append('name', files[0].name)
        formData.append('file', ...files)
        const params = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        const data = await store.dispatch('file/create', {
          data: formData,
          folder,
          params,
        })
        emit('fileUpload', folder)
      }
    }
    onMounted(() => {
      if (proxyVal.value) {
        fillPreview()
      }
      //value.value = dropzone.value.dropzone.files
      //const file = { size: 123, name: 'Icon', type: 'image/png' }
      //const url =
      //  'https://upload.wikimedia.org/wikipedia/commons/5/50/1_%D0%9A%D0%B0%D1%81%D1%82%D0%B0_photo_%40katya_mozina_001.jpg'
      //dropzone.value.manuallyAddFile(file, url)
      //dropzone.value.emit(
      //  'addedfile',
      //  'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
      //)
    })
    return {
      dropzoneOptions,
      sendingFile,
      dropzone,
      showSuccess,
      removed,
      proxyVal,
      fillPreview,
      getUrlExtension,
      loadFile,
      clearDropzone,
    }
  },
}
