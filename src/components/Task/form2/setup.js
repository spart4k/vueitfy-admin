import { defineComponent, ref } from 'vue'
import DocFormWithConfirm from '@/components/Task/el/DocFormWithConfirm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment/moment'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'

const Form2 = defineComponent({
  name: 'Form2',
  components: {
    TextInfo,
    DocFormWithConfirm,
    FormComment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
      },
      obj: {
        key: 'Объект',
        value: props.data.entity.object_name,
      },
    }
    const finalData = ref({})
    const isFormValid = ref(false)
    const dataRojd = moment(props.data.entity.data_rojd).format('DD.MM.YYYY')
    const isHasOsnDoc = JSON.parse(props.data.task.dop_data).docs_id.includes(0)
    const isOsnDocConfirmed = ref(false)
    const isOsnDocTouched = ref(false)
    const commentErr = ref('')
    const comment = ref('')
    const changeDocs = (data) => {
      finalData.value = data
      console.log(data)
      isFormValid.value =
        data.confirmed.length + data.rejected.length === data.confirmDocsLength
    }

    const citizenItems = Object.values(props.data.data.grajdanstvo).map(
      (citizen) => {
        return {
          text: citizen.name,
          value: citizen.id,
        }
      }
    )

    const formData = {
      name: props.data.entity.name,
      data_rojd: props.data.entity.data_rojd,
      grajdanstvo_id: props.data.entity.grajdanstvo_id,
    }

    const confirmOsnData = () => {
      isOsnDocTouched.value = true
      isOsnDocConfirmed.value = true
    }
    const rejectOsnData = () => {
      isOsnDocTouched.value = true
      isOsnDocConfirmed.value = false
    }

    const { makeRequest: setPersonalData } = useRequest({
      context,
      request: () => {
        // if (
        //   props.data.entity.grajdanstvo_id === 1 &&
        //   props.data.entity.unfinished === 1 &&
        //   !finalData.value.rejected.length
        // ) {
        return store.dispatch('taskModule/setPersonalData', {
          data: {
            id: props.data.entity.id,
            unfinished: 0,
            status: 5,
            is_passive: 0,
          },
        })
        // }
      },
    })

    const { makeRequest: setStartStep } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setStartStep', {
          data: {
            process: 9,
            process_id: props.data.task.process_id,
            step_id: 13,
            personal_id: props.data.entity.id,
            manager_id: props.data.entity.manager_id,
          },
        })
      },
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        const taskDeadline =
          Date.parse(props.data.task.date_create) +
          props.data.task.time_execution * 1000 -
          Date.now()
        console.log('ДАГДЕЖБЛЯТЬ', finalData)
        return store.dispatch('taskModule/setPartTask', {
          status:
            finalData.value.rejected.length || !isOsnDocConfirmed.value
              ? 6
              : taskDeadline > 0
              ? 2
              : 3,
          data: {
            process_id: props.data.task.process_id,
            personal_id: props.data.entity.id,
            task: props.data.task.id,
            parent_action: props.data.task.id,
            docs_id:
              isHasOsnDoc && !isOsnDocConfirmed
                ? [0, ...finalData.value.rejected]
                : finalData.value.rejected,
            account_id: props.data.task.to_account_id,
            obd_id: props.data.task.from_account_id,
            comment: 'comment',
            bank_card_id:
              props.data.data.dop_data && props.data.data.dop_data.bank_card_id
                ? props.data.data.dop_data.bank_card_id
                : null,
          },
        })
      },
    })

    const sendData = async () => {
      if (
        (finalData.value.rejected.length && !comment.value) ||
        (!isOsnDocConfirmed.value && !comment.value)
      ) {
        commentErr.value = 'Заполните комментарий'
      } else {
        await setPersonalData()
        console.log(setPersonalData)
        await setStartStep()
        console.log(setStartStep)
        const { success } = await changeStatusTask()
        success && ctx.emit('closePopup')
        console.log(changeStatusTask)
        console.log(finalData.value)
      }
    }

    return {
      dataRojd,
      entity: props.data.entity,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      changeDocs,
      sendData,
      isFormValid,
      finalData,
      textInfo,
      isHasOsnDoc,
      formData,
      citizenItems,
      confirmOsnData,
      rejectOsnData,
      isOsnDocConfirmed,
      isOsnDocTouched,
      commentErr,
      comment,
    }
  },
})
export default Form2
