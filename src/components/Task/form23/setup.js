import { defineComponent, ref, unref } from 'vue'
import FormTitle from '@/components/Task/el/FormTitle/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
const form23 = defineComponent({
  name: 'Form23',
  components: {
    FormTitle,
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
  setup(props, { emit }) {
    const context = {
      root: {
        store,
      },
    }
    const finalData = ref({})
    const isFormValid = ref(false)
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
      console.log(data, 11111111)
      confirmed.value.push(data)
      unConfirmed.value = unConfirmed.value.filter((x) => x.id !== data.id)
      console.log(confirmed)

      store.commit(
        'notifies/showMessage',
        {
          color: 'orange darken-2',
          content: 'Файл будет возвращен, необходимо указать комментарий!',
        },
        1000
      )
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
          if (dataFrom.success) {
            emit('closePopup')
            emit('getItems')
          }
          console.log(dataFrom)
        } else {
          commentError.value = true
        }
      } else {
        const dataFrom = await makeRequest()
        if (dataFrom.success) {
          emit('closePopup')
          emit('getItems')
        }
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
        fio: {
          validations: { required },
          default: props.data.entity.name,
        },
        birthday: {
          validations: { required },
          default: props.data.entity.data_rojd,
        },
        grazhdanstvo: {
          validations: { required },
          default: props.data.entity.grajdanstvo_id,
        },
      },
    })

    const prepareCaseAndPush = () => {
      emit('prepareCaseAndPush', { wdw: 1, wddd: 2 })
    }

    const changeDocs = (data) => {
      const docsId = props.data.data.docs_id.map((doc) => doc.doc_id)
      let isValid = isFormValid.value
      for (let i = 0; i < docsId.length; i++) {
        isValid = data.value[docsId[i]].validate()
        if (!isValid) {
          break
        }
      }
      isFormValid.value = isValid
      console.log(osnValidate())
      if (isFormValid.value) {
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
      isFormValid,
      finalData,
      sendData,
      formData,
      osnValidate,
    }
  },
})
export default form23
