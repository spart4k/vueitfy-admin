import { ref, onMounted, watch, toRef } from 'vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'

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
    name: {
      type: String,
      default: () => '',
    },
    field: {
      type: Object,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
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
      hiddenInputContainer: props.name ? `.${props.name}` : 'body',
      maxFilesize: 9999,
      maxFiles: 9999,
      addRemoveLinks: props?.options?.removeble ? true : false,
      dictDefaultMessage:
        props?.options?.placeholder ?? 'Переместите или выберите файл',
      acceptedFiles: props.options?.acceptedFiles,
      clickable: props.readonly ? false : true,
      //dictRemoveFile: 'delete',
      //clickable: true,
      //previewsContainer: false,
      // headers: { "My-Awesome-Header": "header value" }
    })
    const proxyVal = toRef(props, 'value')
    const sendingFile = async (files) => {
      let arr = []
      if (Array.isArray(files)) arr = files
      else arr = Object.values(files)

      if (props.options.withoutSave) {
        await loadFile(files)
        if (props.options.callbacks) {
          props.options.callbacks()
        }
      } else {
        if (proxyVal.value === undefined) {
          proxyVal.value = []
        }
        proxyVal.value.push(...arr)
        emit('addFiles', { ...arr, ...props.paramsForEmit }, props.options)
        fileValidation()
      }
    }

    const fileValidation = () => {
      for (let i = proxyVal.value.length - 1; i > -1; i--) {
        const file = proxyVal.value[i]
        if (
          props.options.maxSize &&
          file.size / 1000000 > props.options.maxSize
        ) {
          dropzone.value.removeFile(file)
          store.commit('notifies/showMessage', {
            color: 'error',
            content: `Файл ${file.name} превышает допустимый вес (${props.options.maxSize}мб)`,
            timeout: 3000,
          })
        }
        if (
          props.options.countFiles &&
          proxyVal.value.length > props.options.countFiles
        ) {
          dropzone.value.removeFile(file)
          store.commit('notifies/showMessage', {
            color: 'error',
            content: `Превышено кол-во файлов (${props.options.countFiles})`,
            timeout: 3000,
          })
        }
        if (
          props.options.type &&
          !props.options.type.includes(file.name.split('.').at(-1))
        ) {
          dropzone.value.removeFile(file)
          store.commit('notifies/showMessage', {
            color: 'error',
            content: `Допустимые форматы: ${props.options.type.toString()}`,
            timeout: 3000,
          })
        }
      }
    }

    let clearDropzone = () => {
      dropzone.value.removeAllFiles()
    }

    const removed = (file) => {
      if (!props.options.withoutSave) {
        const index = proxyVal.value?.findIndex(
          (x) => x.upload.uuid === file.upload.uuid
        )
        proxyVal.value?.splice(index, 1)
      }
      emit('removeFile')
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
        url = process.env.VUE_APP_STORE + url

        const type = getUrlExtension(url)
        const filename = url.split('/').pop()

        const file = { name: filename, size: 12322, type: 'image/' + type }
        dropzone.value.manuallyAddFile(file, url)
      }
    }

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
      if (proxyVal.value) fillPreview()
    })
    return {
      dropzoneOptions,
      sendingFile,
      dropzone,
      removed,
      proxyVal,
      fillPreview,
      getUrlExtension,
      loadFile,
      clearDropzone,
    }
  },
}
