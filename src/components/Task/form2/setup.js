import { defineComponent, computed, ref } from 'vue'
import DocFormWithConfirm from '@/components/Task/el/DocFormWithConfirm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment/moment'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import DocMain from '../el/DocMain/index.vue'
import docForm from '../el/DocForm/setup'

const Form2 = defineComponent({
  name: 'Form2',
  components: {
    TextInfo,
    DocFormWithConfirm,
    FormComment,
    DocForm,
    DocMain,
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
    const dataRojd = moment(props.data.entity.data_rojd, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
    const isHasOsnDoc = JSON.parse(props.data.task.dop_data).docs_id.includes(0)
    const isHasCard = props.data.data.docs_id.filter(
      (el) => el.doc_id === 3
    ).length
    const isHasOnlyCard =
      JSON.parse(props.data.task.dop_data).docs_id.length === 1 && isHasCard
    const isOsnDocConfirmed = ref(null)
    const bankCardId = ref(0)
    // const isOsnDocTouched = ref(isHasOsnDoc.value ? false : true)
    const commentErr = ref('')
    const comment = ref('')
    const newStatus = ref(0)
    const changeDocs = (data) => {
      finalData.value = data
      console.log(data)
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
    const docMainRef = ref(null)
    const docMainValid = computed(() => {
      if (isHasOsnDoc) {
        return !docMainRef.value.isOsnDocConfirmed !== null
      } else {
        return true
      }
    })
    const confirmOsnData = () => {
      const doscId = JSON.parse(props.data.task.dop_data).docs_id
      // isOsnDocTouched.value = true
      isOsnDocConfirmed.value = true
    }
    const rejectOsnData = () => {
      console.log('reject')
      isOsnDocConfirmed.value = false
    }
    const docFormRef = ref(null)
    const allDocsTouched = computed(() => {
      return docFormRef.value?.docRows?.every(
        (el) => el.isCorrect || el.isRejected
      )
    })
    const isValid = computed(() => {
      return allDocsTouched.value && docMainValid.value
    })
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
    const rejectedDocs = computed(() => {
      let rejectedRows = docFormRef.value?.docRows?.flatMap((el) => {
        if (el.isRejected) {
          return el.document.id
        } else {
          return []
        }
      })
      if (docMainRef.value.isOsnDocConfirmed === false) {
        rejectedRows.push(0)
      }
      return rejectedRows
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
        newStatus.value = rejectedDocs.value.length ? 6 : 2
        // let status
        // if ()
        let data = {
          process_id: props.data.task.process_id,
          personal_id: props.data.entity.id,
          task_id: props.data.task.id,
          parent_action: props.data.task.id,
          docs_id: rejectedDocs.value,
          account_id: props.data.task.to_account_id,
          obd_id: props.data.task.from_account_id,
          comment: comment.value,
        }
        //
        const dopData = JSON.parse(props.data.task.dop_data)
        if (dopData.bank_card_id) {
          data.bank_card_id = dopData.bank_card_id
        }
        return store.dispatch('taskModule/setPartTask', {
          status: newStatus.value,
          data,
        })
      },
    })

    const sendData = async () => {
      if (rejectedDocs.value.length && !comment.value) {
        commentErr.value = ['Заполните комментарий']
      } else {
        const { success } = await changeStatusTask()
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }

        if (
          props.data.entity.grajdanstvo_id === 1 &&
          newStatus.value === 2 &&
          props.data.entity.unfinished === 1
        ) {
          // await setStartStep()
          await setPersonalData()
        }
      }
    }

    return {
      dataRojd,
      entity: props.data.entity,
      bankData: props.data.data.bank_card,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      changeDocs,
      sendData,
      finalData,
      textInfo,
      isHasOsnDoc,
      formData,
      citizenItems,
      confirmOsnData,
      rejectOsnData,
      isOsnDocConfirmed,
      // isOsnDocTouched,
      commentErr,
      comment,
      // isValid,
      allDocsTouched,
      docFormRef,
      isValid,
      rejectedDocs,
      docMainValid,
      docMainRef,
    }
  },
})
export default Form2
