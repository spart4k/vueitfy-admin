import Vue, {
  defineComponent,
  ref,
  toRef,
  computed,
  watch,
  reactive,
  onMounted,
} from 'vue'
// import DocForm from '@/components/Task/el/DocForm/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
// import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import Autocomplete from '@/components/Autocomplete/default'
import Service from '@/components/Task/el/Service/default/index.vue'
// import PersTitle from '@/components/Task/el/PersTitle/index.vue'
// import { selectField, autocompleteField } from '@/utils/fields.js'
// import { required } from '@/utils/validation.js'
// import { stringAction } from '@/utils/actions'
// import useForm from '@/compositions/useForm.js'
const Form40 = defineComponent({
  name: 'Form40',
  components: {
    // TextInfo,
    // FormComment,
    // DocForm,
    Autocomplete,
    Service,
    // PersTitle,
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
    // const dataRojd = moment(props.data.entity.data_rojd, 'YYYY-MM-DD').format(
    //   'DD.MM.YYYY'
    // )
    const currentQty = computed(() => {
      return service?.value?.reduce((acc, item, index) => {
        if (targets.value[index].active) {
          const rowQty = item.serviceRows.reduce((rowAcc, qty) => {
            rowAcc += Number(qty.formData.qty)
            return rowAcc
          }, 0)
          acc += rowQty
        }
        return acc
      }, 0)
    })
    const isFormValid = computed(() => {
      return service?.value?.every((item, index) => {
        if (targets.value[index].active) {
          return item.serviceRows?.every((el) => !el.vForm.$invalid)
        } else {
          return true
        }
      })
    })
    const loading = ref(false)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }

    const service = ref(null)

    const targets = ref(
      props.data.data.targets.reduce((acc, item) => {
        acc.push({
          id: item.id,
          date_target: moment(item.date_target, 'YYYY-MM-DD').format(
            'DD.MM.YYYY'
          ),
          personal_name: item.personal_name,
          services: item.services?.service,
          active: true,
          vid_vedomost_id: item.vid_vedomost_id,
          task: {
            entity: {
              object_id: item.object_id,
              date_target: item.date_target,
            },
          },
        })
        return acc
      }, [])
    )

    const confirmTask = async () => {
      const services = targets.value.reduce((acc, item, index) => {
        const ser = service.value[index].serviceRows.reduce((acc, item) => {
          acc.push({
            service_id: item.formData.name,
            price: Number(item.formData.price),
            qty: Number(item.formData.qty),
            sum: Number(item.formData.sum),
            sum_without_coefficient: Number(item.formData.sum),
            coefficient: 1,
          })
          return acc
        }, [])
        if (ser.length && item.active) {
          const sum = ser.reduce((acc, item) => {
            acc += item.sum
            return acc
          }, 0)
          const obj = {
            target_id: item.id,
            type: 5,
            service: JSON.stringify({
              service: ser,
              payment_id: 0,
              is_pay: false,
              is_hold: false,
              sum,
              deduction_hold: 0,
              deduction_debit: 0,
              hold_sum: 0,
              hold_id: 0,
            }),
          }
          acc.push(obj)
        }
        return acc
      }, [])
      const requestData = {
        data: {
          is_bin: true,
          services,
        },
      }
      loading.value = true
      const { success } = await finishTask(requestData)
      if (success) {
        const status = await changeStatus()
        if (status.success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      }
      loading.value = false
    }

    const { makeRequest: finishTask } = useRequest({
      context,
      request: (params) => {
        return store.dispatch('taskModule/addTargetService', params)
      },
    })

    const { makeRequest: changeStatus } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            process_id: props.data.task.process_id,
            task_id: props.data.task.id,
            parent_action: props.data.task.id,
          },
        }),
    })

    // const { makeRequest: makeRequestList } = useRequest({
    //   context,
    //   request: (data) => store.dispatch('list/get', data),
    // })
    // const { makeRequest: createForm } = useRequest({
    //   context,
    //   // successMessage: 'Сохранено',
    //   request: (params) => {
    //     return store.dispatch(params.module, {
    //       url: params.url,
    //       body: {
    //         data: params.formData ? params.formData : formData,
    //       },
    //     })
    //   },
    // })

    // const {
    //   formData,
    //   validate,
    //   formErrors,
    //   vForm,
    //   touchedForm,
    //   clickHandler,
    //   getData,
    //   changeAutocomplete,
    //   changeSelect,
    //   showField,
    //   openMenu,
    //   disabledField,
    //   hideField,
    //   addFiles,
    //   changeCheckbox,
    //   readonlyField,
    //   refreshTable,
    //   isHideBtn,
    //   colsField,
    //   appendFieldHandler,
    //   popupForm,
    //   appendActionShow,
    // } = useForm({
    //   form: tab,
    //   context,
    //   // detail: props.detail,
    //   loading,
    //   fields: fields(),
    //   setFields: fields,
    //   makeRequestList,
    //   mode: 'edit',
    //   createForm,
    // })

    // const { makeRequest: updatePersonalAccess } = useRequest({
    //   context,
    //   request: () => {
    //     const data = {
    //       status_id: isWire.value ? 9 : 5,
    //       direction_json: formData.direction_id,
    //       account_json: formData.account_json,
    //       object_json: formData.object_id,
    //       personal_id: props.data.entity.id,
    //     }
    //     return store.dispatch('taskModule/updatePersonalAccess', {
    //       data,
    //     })
    //   },
    // })

    // const dopData = ref(
    //   Object.assign({}, toRef(props.data.task, 'dop_data')).value
    // )

    // const formatedDopData = JSON.parse(dopData.value)

    // const autocompleteConfig = {
    //   label: 'Объект',
    //   name: 'object',
    //   items: props.data.data.objects,
    //   solo: false,
    //   required: true,
    //   selectOption: {
    //     text: 'name',
    //     value: 'id',
    //   },
    // }
    // const object = ref('')
    // const status = ref('')
    // const isFire = () => {
    //   osnConfirmed.value = false
    //   status.value = 'Уволен'
    // }
    // const isWork = () => {
    //   osnConfirmed.value = true
    //   status.value = 'Работает'
    // }
    // const start_process_other_doc = computed(() => {
    //   return !formatedDopData.was_process &&
    //     status.value === 'Работает' &&
    //     formatedDopData.doc_id !== 5
    //     ? true
    //     : false
    // })
    // const start_process_patent = computed(() => {
    //   return !formatedDopData.was_process &&
    //     status.value === 'Работает' &&
    //     formatedDopData.doc_id === 5
    //     ? true
    //     : false
    // })
    // const was_process = computed(() => {
    //   return formatedDopData.was_process
    //     ? formatedDopData.was_process
    //     : !formatedDopData.was_process && status.value === 'Работает'
    //     ? true
    //     : false
    // })
    // // if (props.data.data.status_data.next_account) {
    // //   testObject.manager_id = props.data.data.status_data.next_account_id
    // // } else {
    // //   testObject.account_id = props.data.data.status_data.next_account_id
    // // }

    // const { makeRequest: changeStatusTask } = useRequest({
    //   context,
    //   request: () => {
    //     const data = {
    //       process_id: props.data.task.process_id,
    //       task_id: props.data.task.id,
    //       parent_action: props.data.task.id,
    //       // is_work:
    //       //   status.value === 'Работает' &&
    //       //   JSON.parse(props.data.task.dop_data).doc_id !== 5
    //       //     ? true
    //       //     : false,
    //       // is_fired: status.value === 'Уволен' ? true : false,
    //       // is_patent:
    //       //   JSON.parse(props.data.task.dop_data).doc_id === 5 &&
    //       //   status.value === 'Работает',
    //     }
    //     return store.dispatch('taskModule/setPartTask', {
    //       status: 2,
    //       data,
    //     })
    //   },
    // })

    // const { makeRequest: removeTmp } = useRequest({
    //   context,
    //   request: () => {
    //     const data = {
    //       personal_id: props.data.entity.id,
    //       doc_id: formatedDopData.doc_id,
    //       // is_work:
    //       //   status.value === 'Работает' &&
    //       //   JSON.parse(props.data.task.dop_data).doc_id !== 5
    //       //     ? true
    //       //     : false,
    //       // is_fired: status.value === 'Уволен' ? true : false,
    //       // is_patent:
    //       //   JSON.parse(props.data.task.dop_data).doc_id === 5 &&
    //       //   status.value === 'Работает',
    //     }
    //     return store.dispatch('taskModule/removeTmp', {
    //       status: 2,
    //       data,
    //     })
    //   },
    // })
    // const showError = () => {
    //   store.commit('notifies/showMessage', {
    //     color: 'error',
    //     content: 'Ошибка',
    //     timeout: 1000,
    //   })
    // }

    // const { makeRequest: queryDoc } = useRequest({
    //   context,
    //   request: () =>
    //     store.dispatch('taskModule/queryDoc', {
    //       data: {
    //         personal_id: props.data.entity.id,
    //       },
    //     }),
    //   successMessage: 'Файл успешно загружен',
    // })

    // const sendData = async () => {
    //   if (
    //     props.data.task.process === 5 &&
    //     JSON.parse(props.data.task.dop_data).was_process
    //   ) {
    //     await queryDoc()
    //   }
    //   const { code: codeRemove } = await removeTmp()
    //   if (codeRemove) {
    //     const { code } = await updatePersonalAccess()
    //     if (code === 1) {
    //       const { success } = await changeStatusTask()
    //       if (success) {
    //         ctx.emit('closePopup')
    //         ctx.emit('getItems')
    //       } else {
    //         showError()
    //       }
    //     } else {
    //       showError()
    //     }
    //   } else {
    //     showError()
    //   }
    // }
    onMounted(async () => {
      // await getData()
    })

    return {
      // dataRojd,
      // docsData: props.data.data.personal_doc_data,
      // docs: props.data.data.docs_id,
      // listNames: props.data.data.docs_spr,
      // entity: props.data.entity,
      // sendData,
      // textInfo,
      // osnConfirmed,
      // autocompleteConfig,
      // object,
      // isFire,
      // isWork,
      // status,
      // formatedDopData,
      // start_process_other_doc,
      // start_process_patent,
      // was_process,
      // fieldsTemplate,
      // formData,
      // changeAutocomplete,
      // isWire,
      // formGroup,
      targets,
      confirmTask,
      service,
      currentQty,
      isFormValid,
    }
  },
})
export default Form40
