import { defineComponent, ref } from 'vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocScan from '@/components/Task/el/DocScan/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import FormTitle from '@/components/Task/el/FormTitle/index.vue'
import FormError from '@/components/Task/el/FormError/setup'
import DateTimePicker from '@/components/datetimepicker/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import moment from 'moment'
const Form1 = defineComponent({
  name: 'Form1',
  components: {
    FormError,
    FormComment,
    TextInfo,
    DocScan,
    FormTitle,
    DateTimePicker,
    DocForm,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data: () => {
    return {
      datePickerOpen: false,
      selectOpen: false,
    }
  },
  setup(props, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const finalData = ref({})
    const bankCardId = ref(0)
    const isFormValid = ref(false)
    const dataRojd = moment(props.data.entity.data_rojd).format('DD.MM.YYYY')
    const isHasOsnDoc = props.data.data.docs_id.filter(
      (doc) => doc.doc_id === 0
    ).length
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
    let confirmed = ref([])
    let unConfirmed = ref([])

    const addConfirmed = (data) => {
      console.log(data)
      confirmed.value.push(data)
      unConfirmed.value = unConfirmed.value.filter((x) => x.id !== data.id)
      console.log(confirmed)
    }
    const addUnconfirmed = (data) => {
      unConfirmed.value.push(data)
      confirmed.value = confirmed.value.filter((x) => x.id !== data.id)
      console.log(unConfirmed)
    }

    const { makeRequest, loading } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPartTask', {
          data: {
            status: 6,
            data: {
              process_id: props.data.task.process_id,
              task_id: props.data.task.id,
              personal_id: props.data.entity.id,
              parent_action: props.data.task.id,
              comment: comment.value,
              cancel_close: Object.values(unConfirmed.value).map((x) => x.id),
              manager_id: props.data.task.from_account_id,
              docs_id: JSON.parse(props.data.task.dop_data).docs_id,
            },
          },
        }),
    })

    const { makeRequest: sendPersonalData } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPersonalData', {
          data: {
            id: props.data.entity.id,
            name: formData.name,
            data_rojd: formData.data_rojd,
            grajdanstvo_id: formData.grajdanstvo_id,
          },
        }),
    })

    const { makeRequest: sendPersonalDoc } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPersonalDocData', {
          data: {
            ...finalData,
          },
        }),
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
            status: taskDeadline > 0 ? 2 : 6,
            data: {
              process_id: task.process_id,
              task_id: task.id,
              parent_action: task.id,
              docs_id: props.data.data.docs_id.map((doc) => doc.id),
              account_id: task.to_account_id,
              personal_id: props.data.entity.id,
              bank_card_id: bankCardId.value ?? null,
            },
          },
        })
      },
    })

    let showNextStep = ref(false)
    const clickCheckBtn = async () => {
      if (unConfirmed.value.length) {
        if (comment.value.trim()) {
          console.log([...confirmed.value, ...unConfirmed.value])
          isShow.value = false
          commentError.value = false
          const dataFrom = await makeRequest()
          console.log(dataFrom)
          showNextStep.value = true
        } else {
          commentError.value = true
        }
      } else {
        const dataFrom = await makeRequest()
        console.log(dataFrom)
      }
    }

    const formSubmit = (cb) => {
      if (cb) {
        cb()
      }
      console.log('submit')
    }

    const getDocName = (id) => {
      return props.data.data.docs_spr[id]
    }

    const comment = ref('')
    let isShow = ref(true)
    let commentError = ref(false)

    const citizenItems = Object.values(props.data.data.grajdanstvo).map(
      (citizen) => {
        return {
          text: citizen.name,
          value: citizen.id,
        }
      }
    )

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
      if (data.bank_card_id) {
        bankCardId.value = data.bank_card_id
      }
      const docsId = props.data.data.docs_id.map((doc) => doc.doc_id)
      let isValid = isFormValid.value
      for (let i = 0; i < docsId.length; i++) {
        if (data.formObj.value && data.formObj.value[docsId[i]]) {
          isValid = data.formObj.value[docsId[i]].validate()
          if (!isValid) {
            break
          }
        }
      }
      isFormValid.value = isValid
      if (isFormValid.value) {
        docsId.forEach((item) => {
          if (data.formObj.value[item] && item !== 3) {
            finalData.value = {
              ...finalData.value,
              ...data.formObj.value[item].formData,
            }
          }
        })
      }
    }

    const sendData = async () => {
      const requestArr = []
      if (isHasOsnDoc) {
        // requestArr.push(sendPersonalData())
        await sendPersonalData()
      }
      // requestArr.push(sendPersonalDoc())
      await sendPersonalDoc()
      // requestArr.push(setSaveDocs())
      await setSaveDocs()
      await Promise.all(requestArr)
      await changeStatusTask()
    }

    return {
      dataRojd,
      textInfo,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      entity: props.data.entity,
      loading,
      clickCheckBtn,
      addConfirmed,
      addUnconfirmed,
      getDocName,
      citizenItems,
      formSubmit,
      comment,
      isShow,
      commentError,
      changeDocs,
      isFormValid,
      finalData,
      sendData,
      formData,
      osnValidate,
      isHasOsnDoc,
    }
  },
})
export default Form1
