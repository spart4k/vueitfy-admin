import { defineComponent, ref, toRef, computed, watch, reactive } from 'vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import Autocomplete from '@/components/Autocomplete/default'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

const Form7 = defineComponent({
  name: 'Form34',
  components: {
    TextInfo,
    FormComment,
    DocForm,
    Autocomplete,
    PersTitle,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      datePickerOpen: false,
    }
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const dataRojd = moment(props.data.entity.data_rojd, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
      },
      // obj: {
      //   key: 'Объект',
      //   value: props.data.entity.object_name,
      // },
    }
    const osnConfirmed = ref(null)

    const isValid = computed(() => {
      if (status.value === 'Работает' && object.value) {
        return true
      } else if (status.value === 'Уволен') {
        return true
      } else {
        return false
      }
    })
    const docFormRef = ref(null)

    const { makeRequest: createZayavka } = useRequest({
      context,
      request: () => {
        const data = {
          object_id: object.value,
          personal_id: props.data.entity.id,
          direction_id: JSON.parse(props.data.entity.direction_json).includes(1)
            ? 1
            : 6,
        }
        return store.dispatch('taskModule/createZayavka', {
          data,
        })
      },
    })

    const dopData = ref(
      Object.assign({}, toRef(props.data.task, 'dop_data')).value
    )

    const formatedDopData = JSON.parse(dopData.value)

    const autocompleteConfig = {
      label: 'Объект',
      name: 'object',
      items: props.data.data.objects,
      solo: false,
      required: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }
    const object = ref('')
    const status = ref('')
    const isFire = () => {
      osnConfirmed.value = false
      status.value = 'Уволен'
    }
    const isWork = () => {
      osnConfirmed.value = true
      status.value = 'Работает'
    }
    const start_process_other_doc = computed(() => {
      return !formatedDopData.was_process &&
        status.value === 'Работает' &&
        formatedDopData.doc_id !== 5
        ? true
        : false
    })
    const start_process_patent = computed(() => {
      return !formatedDopData.was_process &&
        status.value === 'Работает' &&
        formatedDopData.doc_id === 5
        ? true
        : false
    })
    const was_process = computed(() => {
      return formatedDopData.was_process
        ? formatedDopData.was_process
        : !formatedDopData.was_process && status.value === 'Работает'
        ? true
        : false
    })
    // if (props.data.data.status_data.next_account) {
    //   testObject.manager_id = props.data.data.status_data.next_account_id
    // } else {
    //   testObject.account_id = props.data.data.status_data.next_account_id
    // }

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: (rashod_id) => {
        const testObject = reactive({
          next_account: props.data.data.status_data.next_account,
          start_process_other_doc: start_process_other_doc.value,
          start_process_patent: start_process_patent.value,
          was_process: was_process.value,
          manager_id: props.data.data.status_data.next_account
            ? props.data.data.status_data.next_account_id
            : undefined,
          account_id: !props.data.data.status_data.next_account
            ? props.data.data.status_data.next_account_id
            : undefined,
        })
        const data = {
          process_id: props.data.task.process_id,
          task_id: props.data.task.id,
          parent_action: props.data.task.id,
          doc_id: JSON.parse(props.data.task.dop_data).doc_id,
          personal_id: props.data.entity.id,
          object_id: status.value === 'Работает' ? object.value : undefined,
          rashod_id,
          ...testObject,
          // is_work:
          //   status.value === 'Работает' &&
          //   JSON.parse(props.data.task.dop_data).doc_id !== 5
          //     ? true
          //     : false,
          // is_fired: status.value === 'Уволен' ? true : false,
          // is_patent:
          //   JSON.parse(props.data.task.dop_data).doc_id === 5 &&
          //   status.value === 'Работает',
        }
        console.log(data)
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data,
        })
      },
    })

    const sendData = async () => {
      console.log(
        !formatedDopData.was_process &&
          status.value === 'Работает' &&
          formatedDopData.doc_id !== 5
          ? true
          : false
      )
      console.log(
        !formatedDopData.was_process &&
          status.value === 'Работает' &&
          formatedDopData.doc_id !== 5
      )
      console.log(
        !formatedDopData.was_process,
        status.value === 'Работает',
        formatedDopData.doc_id !== 5
      )
      const rashod_id = await createZayavka()
      console.log(rashod_id)
      const { success } = await changeStatusTask(rashod_id.id)
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

    return {
      dataRojd,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      entity: props.data.entity,
      sendData,
      textInfo,
      osnConfirmed,
      isValid,
      autocompleteConfig,
      object,
      isFire,
      isWork,
      status,
      formatedDopData,
      start_process_other_doc,
      start_process_patent,
      was_process,
    }
  },
})
export default Form7
