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
const firstPopupView = defineComponent({
  name: 'FirstPopupView',
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
    }
  },
  setup(props, { emit }) {
    const context = {
      root: {
        store,
      },
    }
    const finalData = ref({})
    const endBtnDisabled = ref(true)
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
          id: 1,
          data: {
            comment: comment.value,
            cancel_close: Object.values(unConfirmed.value),
            docs_id: {},
          },
        }),
    })

    const clickCheckBtn = async () => {
      if (unConfirmed.value.length) {
        if (comment.value.trim()) {
          console.log([...confirmed.value, ...unConfirmed.value])
          isShow.value = false
          commentError.value = false
          const dataFrom = await makeRequest()
          console.log(dataFrom)
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
          disabled: false,
          divider: true,
          header: citizen.name,
        }
      }
    )

    const { formData, validate } = useForm({
      fields: {
        fio: {
          validations: { required },
        },
        birthday: {
          validations: { required },
        },
        grazhdanstvo: {
          validations: { required },
        },
      },
    })

    const prepareCaseAndPush = () => {
      emit('prepareCaseAndPush', { wdw: 1, wddd: 2 })
    }

    const changeDocs = (data) => {
      const docsId = props.data.data.docs_id.map((doc) => doc.doc_id)
      let isDisabled = endBtnDisabled.value
      for (let i = 0; i < docsId.length; i++) {
        isDisabled = data.value[docsId[i]].validate()
        if (!isDisabled) {
          break
        }
      }
      endBtnDisabled.value = !isDisabled
      if (!endBtnDisabled.value) {
        docsId.forEach((item) => {
          finalData.value = { ...finalData.value, ...data.value[item].formData }
        })
      }
    }

    const sendData = () => {
      console.log(finalData.value)
    }

    return {
      textInfo,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      loading,
      clickCheckBtn,
      addConfirmed,
      addUnconfirmed,
      getDocName,
      citizenItems,
      formSubmit,
      prepareCaseAndPush,
      comment,
      isShow,
      commentError,
      changeDocs,
      endBtnDisabled,
      finalData,
      sendData,
      formData,
      validate,
    }
  },
})
export default firstPopupView
