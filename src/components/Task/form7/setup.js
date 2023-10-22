import { defineComponent, ref } from 'vue'
import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
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
  setup(props, ctx) {
    const dataRojd = moment(props.data.entity.data_rojd).format('DD.MM.YYYY')
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
    const isHasOsnDoc = props.data.data.docs_id.filter(
      (doc) => doc.doc_id === 0
    ).length
    const finalData = ref({})
    const isFormValid = ref(false)
    const bankCardId = ref(0)

    const { formData, validate: osnValidate } = useForm({
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

    const changeDocs = (data) => {
      console.log(data)
      finalData.value = data.correctedDocs
      bankCardId.value = data.bank_card_id
      const docsIdArr = [
        ...new Set(props.data.data.docs_id.map((doc) => doc.doc_id)),
      ]
      if (isHasOsnDoc) {
        isFormValid.value =
          docsIdArr.length === Object.values(data.correctedDocs).length &&
          osnValidate()
      } else {
        isFormValid.value =
          docsIdArr.length === Object.values(data.correctedDocs).length
      }
    }

    const { makeRequest: setPersonalData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPersonalData', {
          data: {
            id: props.data.entity.id,
            name: formData.name,
            data_rojd: formData.data_rojd,
            grajdanstvo_id: formData.grajdanstvo_id,
          },
        })
      },
    })

    const { makeRequest: setPersonalDocData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPersonalDocData', {
          data: {
            ...finalData.value,
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
        return store.dispatch('taskModule/setPartTask', {
          data: {
            status: taskDeadline > 0 ? 2 : 3,
            data: {
              process_id: task.process_id,
              task_id: task.id,
              parent_action: task.id,
              docs_id: props.data.data.docs_id.map((doc) => doc.id),
              account_id: task.to_account_id,
              personal_id: props.data.entity.id,
              okk_id: props.data.task.entity.id,
              bank_card_id: bankCardId.value ?? null,
            },
          },
        })
      },
    })

    const sendData = async () => {
      if (isHasOsnDoc) {
        console.log(setPersonalData)
        await setPersonalData()
      }
      console.log(setPersonalDocData)
      await setPersonalDocData()
      console.log(setSaveDocs)
      await setSaveDocs()
      console.log(changeStatusTask)
      await changeStatusTask()
      console.log(finalData.value)
    }

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
      formData,
      osnValidate,
      textInfo,
    }
  },
})
export default Form7
