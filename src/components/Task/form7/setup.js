import { defineComponent, toRef, ref, reactive, computed, watch } from 'vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocMain from '../el/DocMain/index.vue'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

const Form7 = defineComponent({
  name: 'Form7',
  components: {
    TextInfo,
    FormComment,
    DocMain,
    DocForm,
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
    const loading = ref(false)
    const dataRojd = moment(props.data.entity.data_rojd, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
    const dopData = ref(
      Object.assign({}, toRef(props.data.task, 'dop_data')).value
    )
    const bankCompleted = ref(JSON.parse(dopData.value).bank_card_id)
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
    const isHasOsnDoc = JSON.parse(props.data.task.dop_data).docs_id.includes(0)
    const isHasCard = props.data.data.docs_id.filter(
      (el) => el.doc_id === 3
    ).length
    const isHasOnlyCard =
      JSON.parse(props.data.task.dop_data).docs_id.length === 1 && isHasCard

    const finalData = ref({})
    const isFormValid = ref(false)
    const bankCardId = ref(props.data.data?.bank_card?.id)
    const osnConfirmed = ref(false)
    const isOsnDocValid = ref(true)

    const citizenItems = Object.values(props.data.data.grajdanstvo).map(
      (citizen) => {
        return {
          text: citizen.name,
          value: citizen.id,
        }
      }
    )
    const docMainData = reactive({
      name: props.data.entity.name,
      data_rojd: props.data.entity.data_rojd,
      grajdanstvo_id: props.data.entity.grajdanstvo_id,
    })
    // const formObj = ref()
    // useForm({
    //   fields: {
    //     name: {
    //       validations: { required },
    //       default: props.data.entity.name,
    //     },
    //     data_rojd: {
    //       validations: { required },
    //       default: props.data.entity.data_rojd,
    //     },
    //     grajdanstvo_id: {
    //       validations: { required },
    //       default: props.data.entity.grajdanstvo_id,
    //     },
    //   },
    //   context,
    // })
    const docMainRef = ref(null)
    const docMainValid = computed(() => {
      if (isHasOsnDoc) {
        return (
          !docMainRef.value?.vForm.$invalid && docMainRef.value?.osnConfirmed
        )
      } else {
        return true
      }
    })
    const allDocsValid = computed(() => {
      return docFormRef.value?.docRows?.every(
        (el) => !el.vForm.$invalid && el.isCorrect
      )
    })
    const isValid = computed(() => {
      if (isHasOnlyCard.value && bankCardId.value) {
        return true
      } else if (
        allDocsValid.value &&
        (isHasCard ? bankCardId.value : true) &&
        (isHasOsnDoc ? docMainValid.value : true)
      ) {
        return true
      } else if (
        !props.data.data.docs_id.length &&
        isHasOsnDoc &&
        docMainValid.value
      ) {
        return true
      } else {
        return false
      }
    })
    const rejectedComment = JSON.parse(props.data.task.dop_data).comment
    const docFormRef = ref(null)
    const changeDocs = (data) => {
      finalData.value = isHasOsnDoc
        ? { 0: docMainRef.value.formData, ...data.correctedDocs }
        : data.correctedDocs
      // bankCardId.value = data.bank_card_id
      const docsIdArr = [
        ...new Set(props.data.data.docs_id.map((doc) => doc.doc_id)),
      ]
      if (isHasOsnDoc) {
        isFormValid.value =
          docsIdArr.length === Object.values(data.correctedDocs).length &&
          isOsnDocValid.value
      } else {
        isFormValid.value =
          docsIdArr.length === Object.values(data.correctedDocs).length
      }
    }

    const confirmOsnDoc = () => {
      const aidDocs = JSON.parse(props.data.task.dop_data).docs_id
      if (aidDocs.length === 1 && aidDocs[0] === 0) isFormValid.value = true
      finalData.value = { ...finalData.value, 0: docMainRef.value.formData }
      osnConfirmed.value = true
    }

    const { makeRequest: setPersonalData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPersonalDataWithoutTarget', {
          data: {
            id: props.data.entity.id,
            ...docMainRef.value.formData,
          },
        })
      },
    })

    const { makeRequest: setPersonalDocData } = useRequest({
      context,
      request: () => {
        let bodyData = {}
        docFormRef?.value?.docRows.forEach((el) => {
          if (el.document.doc_id !== 3) {
            bodyData = {
              ...bodyData,
              ...el.formData,
            }
          }
        })

        return store.dispatch('taskModule/setPersonalDocData', {
          data: {
            ...bodyData,
            id: props.data.data.personal_doc_data.id,
          },
        })
      },
    })

    const { makeRequest: setSaveDocs } = useRequest({
      context,
      request: () => {
        const ids = props.data.data.docs_id.map((doc) => doc.id)
        return store.dispatch('taskModule/setSaveDocs', {
          data: {
            ids: ids,
          },
        })
      },
    })

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
          bank_card_id: bankCardId.value ? bankCardId.value : undefined,
        }
        return store.dispatch('taskModule/setPartTask', {
          status: taskDeadline > 0 ? 2 : 3,
          data,
        })
      },
    })

    const sendData = async () => {
      loading.value = true
      if (isHasOsnDoc) {
        await setPersonalData()
      }

      // if ()
      if (!isHasOnlyCard) {
        await setPersonalDocData()
      }

      await setSaveDocs()

      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      loading.value = false
    }

    // watch(
    //   formObj,
    //   () => {
    //     isOsnDocValid.value = Object.values(formObj.value.formData).every(
    //       Boolean
    //     )
    //   },
    //   { deep: true }
    // )

    return {
      dataRojd,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      entity: props.data.entity,
      changeDocs,
      sendData,
      isFormValid,
      finalData,
      isHasOsnDoc,
      // formObj,
      textInfo,
      citizenItems,
      osnConfirmed,
      isOsnDocValid,
      confirmOsnDoc,
      bankData: props.data.data.bank_card,
      isHasCard,
      isHasOnlyCard,
      docFormRef,
      isValid,
      bankCardId,
      docMainData,
      docMainRef,
      rejectedComment,
      allDocsValid,
      docMainValid,
      bankCompleted,
      loading,
    }
  },
})
export default Form7
