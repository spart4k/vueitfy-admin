import { defineComponent, ref, computed } from 'vue'
import Dropzone from '@/components/Dropzone/default'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
// import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
// import moment from 'moment'
import Autocomplete from '@/components/Autocomplete/default'

const Form3 = defineComponent({
  name: 'Form3',
  components: {
    Dropzone,
    Autocomplete,
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
    const loading = ref(false)
    let selectName = ref('')
    let price = ref('')
    let nameComp = data.data.items[0].name

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
    const autocompleteConfig = {
      label: 'Наименование',
      name: 'status_zr',
      items: data.data.rashod_vid_id,
      solo: false,
      required: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }
    const sendData = async () => {
      loading.value = true
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
          store.dispatch('taskModule/updateFileDataNew', {
            data: {
              id: data.entity.personal_id,
              ticket: `/personal_doc/${fileName}`,
            },
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
              manager_id: JSON.parse(data.entity.data_subvision)[
                'personal_account_zr'
              ],
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
          store.dispatch('taskModule/zayavkaItems', {
            data: {
              // body: {data['items']['id'], rashod_vid_id, price}
              id: data.data.items[0].id,

              rashod_vid_id: selectName.value,
              // count: 1,
              price: Number(price.value),
              // name: '',
              // is_debit: 1,
            },
          }),
      })
      await makeRequest()
      await updateFileData()
      await pushSomeShit()
      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      loading.value = false
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
      autocompleteConfig,
      loading,
    }
  },
})
export default Form3
