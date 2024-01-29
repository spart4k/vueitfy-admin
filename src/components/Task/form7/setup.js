import { defineComponent, ref, watch } from 'vue'
import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'

const Form7 = defineComponent({
  name: 'Form7',
  components: {
    TextInfo,
    FormComment,
    DocFormCorrect,
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
    const dataRojd = moment(props.data.entity.data_rojd).format('DD.MM.YYYY')
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
    const isHasCard = JSON.parse(props.data.task.dop_data).docs_id.includes(3)
    const isHasOnlyCard =
      JSON.parse(props.data.task.dop_data).docs_id.length === 1 && isHasCard
    console.log(JSON.parse(props.data.task.dop_data))
    const finalData = ref({})
    const isFormValid = ref(false)
    const bankCardId = ref(0)
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

    const formObj = ref(
      useForm({
        fields: {
          name: {
            validations: { required },
            default: props.data.entity.name,
          },
          data_rojd: {
            validations: { required },
            default: props.data.entity.data_rojd,
          },
          grajdanstvo_id: {
            validations: { required },
            default: props.data.entity.grajdanstvo_id,
          },
        },
        context,
      })
    )

    const changeDocs = (data) => {
      console.log(data)
      finalData.value = isHasOsnDoc
        ? { 0: formObj.value.formData, ...data.correctedDocs }
        : data.correctedDocs
      bankCardId.value = data.bank_card_id
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
      finalData.value = { ...finalData.value, 0: formObj.value.formData }
      osnConfirmed.value = true
    }

    const { makeRequest: setPersonalData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPersonalData', {
          data: {
            id: props.data.entity.id,
            name: formObj.value.formData.name,
            data_rojd: formObj.value.formData.data_rojd,
            grajdanstvo_id: formObj.value.formData.grajdanstvo_id,
          },
        })
      },
    })

    const { makeRequest: setPersonalDocData } = useRequest({
      context,
      request: () => {
        const data = Object.values(finalData.value).reduce((acc, value) => {
          if (value.hasOwnProperty('bank_id')) {
            return
          }
          acc = { ...acc, ...value }
          return acc
        }, {})
        console.log(data)
        return store.dispatch('taskModule/setPersonalDocData', {
          data: {
            ...data,
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
        console.log()
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
        if (bankCardId.value) {
          data.bank_card_id = bankCardId.value
        }
        return store.dispatch('taskModule/setPartTask', {
          status: taskDeadline > 0 ? 2 : 3,
          data,
        })
      },
    })

    const sendData = async () => {
      if (isHasOsnDoc) {
        console.log(setPersonalData)
        await setPersonalData()
      }
      console.log(setPersonalDocData)
      // if ()
      if (isHasOnlyCard) {
        await setPersonalDocData()
      }
      console.log(setSaveDocs)
      await setSaveDocs()
      console.log(changeStatusTask)
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      console.log(finalData.value)
    }

    watch(
      formObj,
      () => {
        isOsnDocValid.value = Object.values(formObj.value.formData).every(
          Boolean
        )
      },
      { deep: true }
    )

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
      formObj,
      textInfo,
      citizenItems,
      osnConfirmed,
      isOsnDocValid,
      confirmOsnDoc,
      bankData: props.data.data.bank_card,
      isHasCard,
    }
  },
})
export default Form7
