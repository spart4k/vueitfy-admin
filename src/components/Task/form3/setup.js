import { defineComponent, ref, computed } from 'vue'
import Dropzone from '@/components/dropzone/default'
// import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
// import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
// import moment from 'moment'

const Form3 = defineComponent({
  name: 'Form3',
  components: {
    Dropzone,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
    const context = {
      root: {
        store,
      },
    }
    let options = {
      withoutSave: false,
      folder: 'tmp',
    }
    let selectName = ref('')
    let price = ref('')
    let nameComp = JSON.parse(data.entity.items)[0].name

    let landPhone = computed(() =>
      data.data.account.landline_phone
        ? data.data.account.landline_phone
        : 'Не указан'
    )
    let mobilePhone = computed(() =>
      data.data.account.mobile_phone
        ? data.data.account.mobile_phone
        : 'Не указан'
    )
    let file = ref('')
    let addFiles = (e) => {
      file.value = e[0]
    }

    const sendData = async () => {
      console.log(selectName.value, file.value)
      let fileExt = file.value.type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', file.value)
      const { makeRequest } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/loadImage', {
            id: 1,
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })
      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            id: 1,
            path_doc: `/personal_doc/${fileName}`,
          }),
      })

      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              task_id: data.task.id,
              parent_action: data.task.id,
              transfer: true,
              manager_id: JSON.parse(data.entity.data_subvision)['leader'],
              personal_id: data.entity.personal_id,
              next: JSON.parse(data.task.dop_data).after_return
                ? JSON.parse(data.task.dop_data).after_return
                : true,
            },
          }),
      })
      const { makeRequest: pushSomeShit } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setBid', {
            data: {
              id: data.entity.id,
              items: {
                rashod_vid_id: selectName.value.id,
                count: 1,
                price: price.value,
                name: '',
                is_debit: 1,
              },
            },
          }),
      })
      await makeRequest()
      await updateFileData()
      await pushSomeShit()
      const { success } = await changeStatus()
      success && ctx.emit('closePopup')
    }
    return {
      options,
      file,
      selectName,
      price,
      nameComp,
      landPhone,
      mobilePhone,
      addFiles,
      sendData,
    }
  },
})
export default Form3
