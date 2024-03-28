import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUpdated,
  reactive,
} from 'vue'
import FormTitle from '@/components/Task/el/FormTitle/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
// import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
// import useForm from '@/compositions/useForm'
import Popup from '@/components/Popup/index.vue'
import IconDelete from '@/components/Icons/delete/delete.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { required } from '@/utils/validation'
import { stringField, selectField, checkboxField } from '@/utils/fields.js'
import { addFields, editFields } from '@/pages/zayavka/index.js'
import _ from 'lodash'

import config from '@/components/Task/form8/form.js'

const form10 = defineComponent({
  name: 'Form10',
  components: {
    IconDelete,
    FormTitle,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    // Variables
    const proxyConfig = ref(_.cloneDeep(config))
    const account_id = computed(() => store.state.user.account_id)
    const chied_id = computed(() => store.state.user.chied_id)
    let listDocuments = ref([])
    let sum = ref(0)
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
    let errors = ref({
      isActive: false,
      message: 'Ошибка',
    })
    const popupForm = ref({
      isShow: false,
    })
    // Моковые данные
    let files = ref([
      {
        id: 0,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'fsdfsdf.png',
      },
      {
        id: 423,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: '2rrr.jpeg',
      },
      {
        id: 5345,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'gdfgfdggerf3.png',
      },
      {
        id: 24,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'fff12dzx.png',
      },
      {
        id: 52,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'iujk.png',
      },
    ])

    // Удаление файла
    const removeFile = (fileID) => {
      // TODO: доделать
      files.value = files.value.filter((file, id) => fileID !== id)
    }
    let confirmed = ref([])
    let unConfirmed = ref([])
    const addConfirmed = (data) => {
      confirmed.value.push(data)
      unConfirmed.value = unConfirmed.value.filter((x) => x.id !== data.id)
      checkAllowDisable()
    }
    const addUnconfirmed = (data) => {
      unConfirmed.value.push(data)
      confirmed.value = confirmed.value.filter((x) => x.id !== data.id)

      checkAllowDisable()
    }
    let isActiveBtnFirst = ref(false)
    let checkAllowDisable = () => {
      if (
        props.data.data.docs_id.length ==
        unConfirmed.value.length + confirmed.value.length
      ) {
        isActiveBtnFirst.value = true
      }
    }
    const getDocName = (id) => {
      return props.data.data.docs_spr[id]
    }
    // Изменение суммы в поле
    const changeSum = (e) => (sum.value = e)
    const setZayavkaEdit = () => {
      const editFieldsProxy = _.cloneDeep(editFields)
      const editConfig = proxyConfig.value.detail.tabs[1]
      editConfig.fields = editFieldsProxy
    }

    const setZayavkaItems = () => {
      const addFieldsProxy = _.cloneDeep(addFields)
      const addConfig = proxyConfig.value.detail.tabs[0]
      addConfig.fields = addFieldsProxy

      const category = addConfig.fields.find((x) => x.name === 'category_zr')
      category.value = 8
      category.readonly = true

      const direction = addConfig.fields.find((x) => x.name === 'direction_id')
      direction.value = JSON.parse(props.data.entity.direction_json)[0]
      direction.readonly = true

      const vector = addConfig.fields.find((x) => x.name === 'vector_id')
      vector.readonly = true

      const personal = addConfig.fields.find((x) => x.name === 'personal_zr')
      personal.readonly = true
      personal.value = props.data.entity.id

      const yourself = addConfig.fields.find((x) => x.name === 'on_yourself')
      yourself.readonly = true

      // const name = addConfig.fields.find((x) => x.name === 'name')
      // name.value = props.data.entity.name

      const is_migr = addConfig.fields.find((x) => x.name === 'is_migr')
      is_migr.value = true

      const docsSpr = { 7: 51, 8: 52, 11: 55, 16: 54, 18: 43, 19: 50, 23: 44 }

      const arr = listDocuments.value.filter((x) => x.inProcess)
      const filterArray = arr.reduce((acc, item) => {
        if (docsSpr[item.doc_id]) acc.push(docsSpr[item.doc_id])
        return acc
      }, [])

      const btnIndex = addConfig.fields.findIndex(
        (x) => x.id === 'btn-decrease'
      )

      filterArray?.forEach((item, index) => {
        if (!index) {
          const rashod_vid = addConfig.fields.find(
            (x) => x.name === 'rashod_vid'
          )
          const count = addConfig.fields.find((x) => x.name === 'count')
          const vds = addConfig.fields.find((x) => x.name === 'vds')
          const btnDecrease = addConfig.fields.find(
            (x) => x.name === 'btn-decrease'
          )
          const btnIncrease = addConfig.fields.find(
            (x) => x.name === 'btn-increase'
          )
          btnDecrease.readonly = true
          btnIncrease.readonly = true
          rashod_vid.value = item
          rashod_vid.readonly = true
          count.value = '1'
          count.readonly = true
          vds.value = true
          vds.readonly = true
        } else {
          const insertItems = [
            selectField({
              label: 'Наименование',
              name: `rashod_vid%${index}`,
              notSend: true,
              placeholder: '',
              prescription: 'items',
              class: [''],
              value: item,
              readonly: true,
              items: [],
              selectOption: {
                text: 'name',
                value: 'id',
              },
              position: {
                cols: 12,
                sm: 5,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Кол-во',
              name: `count%${index}`,
              notSend: true,
              placeholder: '',
              readonly: true,
              prescription: 'items',
              value: '1',
              class: [''],
              position: {
                cols: 12,
                sm: 2,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Стоимость',
              name: `price%${index}`,
              notSend: true,
              placeholder: '',
              readonly: undefined,
              prescription: 'items',
              class: [''],
              position: {
                cols: 12,
                sm: 3,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            checkboxField({
              label: 'ВДС',
              name: `vds%${index}`,
              notSend: true,
              value: true,
              prescription: 'items',
              placeholder: '',
              readonly: true,
              class: [''],
              position: {
                cols: 12,
                sm: 2,
              },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Точное наименование',
              name: `exact_name%${index}`,
              notSend: true,
              placeholder: '',
              readonly: undefined,
              prescription: 'items',
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
            }),
          ]
          addConfig.fields.splice(btnIndex + 5 * (index - 1), 0, ...insertItems)
        }
      })
    }

    const pushToZayavka = () => {
      if (props.data.data?.zayavka?.id) {
        router.push({
          name: 'main/:id/:form_id',
          params: {
            id: route.params.id,
            form_id: props.data.data?.zayavka?.id,
          },
        })
        setZayavkaEdit()
      } else {
        router.push({
          name: 'main/:id/add',
        })
        setZayavkaItems()
      }
      popupForm.value.isShow = true
    }

    let sendTaskFinish = async () => {
      let keyOfObjectSend = {}
      listDocuments.value.forEach((elem, index) => {
        for (const key in elem) {
          keyOfObjectSend[elem.doc_id] = !elem.inProcess
        }
      })

      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: props.data.task.process_id,
              manager_id: account_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              personal_id: props.data.entity.id,
              docs_id: keyOfObjectSend,
              account_id: props.data.task.from_account_id,
            },
          }),
      })
      // sendDocuments()
      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

    return {
      files,
      sum,
      // Методы
      changeSum,
      removeFile,
      docs: props.data.data.docs_id,
      sendTaskFinish,
      getDocName,
      addConfirmed,
      addUnconfirmed,
      pushToZayavka,
    }
  },
})

export default form10
