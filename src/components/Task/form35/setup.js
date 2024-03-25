import { defineComponent, ref, computed, watch } from 'vue'
import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import Autocomplete from '@/components/Autocomplete/default'

const Form7 = defineComponent({
  name: 'Form7',
  components: {
    TextInfo,
    FormComment,
    DocFormCorrect,
    DocForm,
    Autocomplete,
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

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        const task = props.data.task
        const taskDeadline =
          Date.parse(props.data.task.date_create) +
          props.data.task.time_execution * 1000 -
          Date.now()

        let data = {}
        data = {
          process_id: task.process_id,
          task_id: task.id,
          parent_action: task.id,
          docs_id: JSON.parse(props.data.task.dop_data).docs_id,
          account_id: task.to_account_id,
          personal_id: props.data.entity.id,
          okk_id: props.data.task.from_account_id,
        }
        return store.dispatch('taskModule/setPartTask', {
          status: taskDeadline > 0 ? 2 : 3,
          data,
        })
      },
    })

    const autocompleteConfig = {
      label: 'Объект',
      name: 'object',
      items: [],
      solo: true,
      required: true,
      url: 'get/pagination_list/object',
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
    const sendData = async () => {
      const { success } = await changeStatusTask()
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
    }
  },
})
export default Form7
