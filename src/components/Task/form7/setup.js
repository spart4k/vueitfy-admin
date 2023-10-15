import { defineComponent, ref } from 'vue'
import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const Form7 = defineComponent({
  name: 'Form7',
  components: {
    FormComment,
    DocFormCorrect,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const context = {
      root: {
        store,
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
    })

    const changeDocs = (data) => {
      console.log(data)
      finalData.value = data.correctedDocs
      bankCardId.value = data.bank_card_id
      if (isHasOsnDoc) {
        isFormValid.value =
          props.data.data.docs_id.length === Object.values(data).length &&
          osnValidate()
      } else {
        isFormValid.value =
          props.data.data.docs_id.length === Object.values(data).length
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
          status: taskDeadline > 0 ? 2 : 3,
          data: {
            process_id: task.process_id,
            task_id: task.id,
            parent_action: task.id,
            docs_id: props.data.docs_id.map((doc) => doc.id),
            account_id: task.to_account_id,
            personal_id: props.data.entity.id,
            okk_id: props.data.task.entity.id,
            bank_card_id: bankCardId.value ?? null,
          },
        })
      },
    })

    const sendData = () => {
      if (isHasOsnDoc) {
        console.log(setPersonalData)
      }
      console.log(setPersonalDocData)
      console.log(setSaveDocs)
      console.log(changeStatusTask)
      console.log(finalData.value)
    }

    return {
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
    }
  },
})
export default Form7
