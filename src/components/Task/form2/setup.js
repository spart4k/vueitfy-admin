import { defineComponent, ref } from 'vue'
import DocFormWithConfirm from '@/components/Task/el/DocFormWithConfirm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
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
    const route = useRoute()
    const router = useRouter()
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
    const finalData = ref({})
    const isFormValid = ref(false)
    const dataRojd = moment(props.data.entity.data_rojd).format('DD.MM.YYYY')
    const isHasOsnDoc = ref(
      JSON.parse(props.data.task.dop_data).docs_id.includes(0)
    )
    const isOsnDocConfirmed = ref(false)
    const isOsnDocTouched = ref(isHasOsnDoc.value ? false : true)
    const commentErr = ref('')
    const comment = ref('')
    const newStatus = ref(0)
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
      const doscId = JSON.parse(props.data.task.dop_data).docs_id
      isOsnDocTouched.value = true
      isOsnDocConfirmed.value = true
      if (doscId.length === 1 && doscId[0] === 0) {
        isFormValid.value = true
      }
    }
    const rejectOsnData = () => {
      const doscId = JSON.parse(props.data.task.dop_data).docs_id
      isOsnDocTouched.value = true
      isOsnDocConfirmed.value = false
      if (doscId.length === 1 && doscId[0] === 0) {
        isFormValid.value = true
      }
    }

    const { makeRequest: setPersonalData } = useRequest({
      context,
      request: () => {
        // if (
        //   props.data.entity.grajdanstvo_id === 1 &&
        //   props.data.entity.unfinished === 1 &&
        //   !finalData.value.rejected.length
        // ) {
        return store.dispatch('taskModule/setPersonalDataWithoutTarget', {
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
            manager_id: props.data.entity.account_id,
          },
        })
      },
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        if (!finalData.value.rejected) {
          finalData.value.rejected = []
        }
        newStatus.value =
          finalData.value.rejected.length ||
          (isHasOsnDoc.value && !isOsnDocConfirmed.value)
            ? 6
            : 2
        // let status
        // if ()
        return store.dispatch('taskModule/setPartTask', {
          status: newStatus.value,
          data: {
            process_id: props.data.task.process_id,
            personal_id: props.data.entity.id,
            task_id: props.data.task.id,
            parent_action: props.data.task.id,
            docs_id:
              isHasOsnDoc && isOsnDocConfirmed.value
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
        (finalData.value.rejected &&
          finalData.value.rejected.length &&
          !comment.value) ||
        (isHasOsnDoc.value && !isOsnDocConfirmed.value && !comment.value)
      ) {
        commentErr.value = 'Заполните комментарий'
      } else {
        console.log(setPersonalData)

        const { success } = await changeStatusTask()
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
        console.log(changeStatusTask)
        if (
          props.data.entity.grajdanstvo_id === 1 &&
          newStatus.value === 2 &&
          props.data.entity.unfinished === 1
        ) {
          // await setStartStep()
          await setPersonalData()
          console.log(setStartStep)
        }
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
