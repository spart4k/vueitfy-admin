import { defineComponent, ref, computed, onMounted } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import { useRouter, useRoute } from 'vue-router/composables'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import Dropzone from '@/components/Dropzone/default'
import moment from 'moment'
import Popup from '@/components/Popup/index.vue'
import _ from 'lodash'

import config from '@/components/Task/form17/form.js'
import Autocomplete from '@/components/Autocomplete/default'

const Form17 = defineComponent({
  name: 'Form17',
  components: {
    FormError,
    FormComment,
    Dropzone,
    TextInfo,
    Popup,
    Autocomplete,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
    const route = useRoute()
    const router = useRouter()
    const proxyConfig = ref(_.cloneDeep(config))
    const popupForm = ref({
      isShow: false,
    })
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }

    const dateTarget = moment(data.entity.date_target, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )

    let selectName = ref('')
    let qty = ref(10.5)
    let tariff = ref()
    let changeQTY = computed(() => {
      if (qty.value) {
        return true
      }
      return false
    })
    const infoObj = {
      employee: {
        key: 'Сотрудник',
        value: data.entity.personal_name,
      },
      avatar: {
        key: 'Аватар',
        value: data.entity.avatar_name,
      },
      position: {
        key: 'Должность',
        value: data.entity.doljnost_name,
      },
      personal_key: {
        key: 'Личный ключ',
        value: data.entity.print_form_key,
      },
      object: {
        key: 'Объект',
        value: data.entity.object_name,
      },
    }
    const account_id = computed(() => store.state.user.id)
    let sum = computed(() => {
      if (tariff.value) {
        return Number(tariff.value) * Number(qty.value)
      } else {
        return 0
      }
    })
    let updateFileData
    let loadImage
    let changeStatusTask
    let isSetTask = ref(false)
    const rejectedTarif = ref('')
    const autocompleteConfig = {
      label: 'Наименование',
      name: 'name',
      items: data.data.services,
      solo: false,
      required: true,
      readonly: data.entity.direction_id != 7,
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }
    const dopData = JSON.stringify(data.task.dop_data)
    const addFiles = (e) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `workout_25_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])
      isSetTask.value = true
      console.log('load')
      // updateFileData = useRequest({
      //   context,
      //   request: () =>
      //     store.dispatch('taskModule/updateFileData', {
      //       personal_id: data.entity.id,
      //       doc_id: e.item,
      //       path_doc: `/workout/${fileName}`,
      //       from_task: true,
      //     }),
      // })
      console.log(loadImage)
      loadImage = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/loadImage', {
            id: 1,
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })
      console.log(loadImage)
      changeStatusTask = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              manager_id: data.task.from_account_id,
              task_id: data.task.id,
              parent_action: data.task.id,
              personal_target_id: data.entity.id,
              file_output: fileName,
              have_price: data.entity.direction_id !== 7,
              constructed: data.entity.direction_id === 7,
              object_id: data.entity.object_id,
              date_target: data.entity.date_target,
            },
          })
        },
      })
    }
    // const {
    //   formData: keyForm,
    //   validate: keyFormValidate,
    //   formErrors: keyFormErrors,
    // } = useForm({
    //   fields: {
    //     key: {
    //       validations: { required },
    //       default: '',
    //     },
    //     name: {
    //       validations: { required },
    //       default: '',
    //     },
    //     trainee: {
    //       default: false,
    //     },
    //     comment: {
    //       validations: { required },
    //       default: '',
    //     },
    //   },
    //   context,
    // })

    // const { makeRequest: changeStatusTask } = useRequest({
    //   context,
    //   request: () => {
    //     return store.dispatch('taskModule/setPartTask', {
    //       data: {
    //         status: 2,
    //         data: {
    //           process_id: props.data.entity.process_id,
    //           task_id: props.data.entity.id,
    //           parent_action: props.data.entity.id,
    //           user_key: props.data.entity.id,
    //           photo_path: dopData.photo_path ?? '',
    //           obd_id: props.data.entity.id,
    //           comment: keyForm.comment,
    //           okk_id: props.data.task.from_account_id,
    //         },
    //       },
    //     })
    //   },
    // })

    // const { makeRequest: setUserKey } = useRequest({
    //   context,
    //   request: () => {
    //     return store.dispatch('taskModule/setUserKey', {
    //       data: {
    //         id: props.data.entity.id,
    //         user_key: keyForm.key,
    //         fio: keyForm.name,
    //       },
    //     })
    //   },
    // })
    // let services_spr = [
    //   { 24: 61 },
    //   { 25: 62 },
    //   { 26: 63 },
    //   { 27: 64 },
    //   { 49: 70 },
    //   { 50: 77 },
    //   { 51: 78 },
    // ]
    const changeServiceDetail = async (obj) => {
      tariff.value = null
      rejectedTarif.value = ''
      const { makeRequest } = useRequest({
        context,
        request: () => {
          return store.dispatch(
            'taskModule/getServicePrice',
            `object_id=${data.entity.object_id}&service_id=${obj.value}&date_target=${data.entity.date_target}`
          )
        },
      })
      // const data = await makeRequest()
      const response = await makeRequest()
      if (response?.length) {
        tariff.value = response[0].price
      } else {
        rejectedTarif.value = obj.item.name
      }
    }
    let services_spr = {
      24: 61,
      25: 62,
      26: 63,
      27: 64,
      49: 70,
      50: 77,
      51: 78,
    }
    const loading = ref(false)
    const completeTask = async () => {
      loading.value = true
      // await setUserKey()
      // const { success } = await changeStatusTask()
      let result
      if (
        data.entity.doljnost_id == 5 ||
        data.entity.doljnost_id === 6 ||
        data.entity.doljnost_id == 7 ||
        data.entity.doljnost_id === 8 ||
        data.entity.doljnost_id === 32 ||
        data.entity.doljnost_id === 33
      ) {
        // updateFileData.makeRequest()
        console.log(loadImage)
        await loadImage.makeRequest()
        result = await changeStatusTask.makeRequest()
      } else if (data.entity.direction_id == 6) {
        const { makeRequest: setPersonalTarget } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setPersonalData', {
              data: {
                id: data.entity.id,
                services: JSON.stringify({
                  3: [
                    {
                      service: [
                        {
                          service_id: services_spr[data.entity.doljnost_id],
                          qty: qty.value,
                          price: '',
                          sum: 0,
                        },
                      ],
                      payment_id: false,
                      is_pay: false,
                      sum: 0,
                    },
                  ],
                }),
                // payment_id: paymentData.result,
              },
            })
          },
        })
        const { makeRequest: changeStatus } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setPartTask', {
              status: 2,
              successMessage: 'Задача завершена',
              data: {
                process_id: data.task.process_id,
                manager_id: data.task.from_account_id,
                task_id: data.task.id,
                parent_action: data.task.id,
                personal_target_id: data.entity.id,
                have_price: 1,
                object_id: data.entity.object_id,
                service_id: services_spr[data.entity.doljnost_id],
                date_target: data.entity.date_target,
                doljnost_id: JSON.parse(data.task.dop_data).doljnost_id
                  ? JSON.parse(data.task.dop_data).doljnost_id
                  : data.entity.doljnost_id,
              },
            })
          },
        })
        await setPersonalTarget()
        result = await changeStatus()
      } else if (data.entity.direction_id == 7) {
        const { makeRequest: setDataPayment } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setDataPayment', {
              data: {
                account_id: data.entity.manager,
                personal_bank_id: data.data.rek.id,
                status_id: 2,
                status_account_id: account_id.value,
                personal_id: data.entity.personal_id,
                vid_vedomost_id: 1,
                direction_id: data.entity.direction_id,
                object_id: data.entity.object_id,
                bank_id: data.data.rek.bank_id,
                invoice: data.data.rek.invoice,
                total: sum.value,
                fio: data.data.rek.fio,
                doljnost_id: data.entity.doljnost_id,
                date_target: data.entity.date_target,
                personal_target_id: data.entity.id,
                date_add: moment(
                  new Date().toLocaleString('en-US', {
                    timeZone: 'Europe/Moscow',
                  })
                ).format('YYYY-MM-DD'),
                date_status: moment(
                  new Date().toLocaleString('en-US', {
                    timeZone: 'Europe/Moscow',
                  })
                ).format('YYYY-MM-DD HH:mm:ss'),
              },
            })
          },
        })
        const paymentResponse = await setDataPayment()
        const { makeRequest: setPersonalTarget } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setPersonalData', {
              data: {
                id: data.entity.id,
                services: JSON.stringify({
                  4: [
                    {
                      service: [
                        {
                          service_id: selectName.value,
                          qty: qty.value,
                          price: tariff.value,
                          sum: sum.value,
                        },
                      ],
                      payment_id: paymentResponse.result,
                      is_pay: false,
                      sum: sum.value,
                      is_hold: false,
                      deduction_hold: 0,
                      deduction_debit: 0,
                      hold_sum: 0,
                      hold_id: 0,
                    },
                  ],
                }),
                // payment_id: paymentData.result,
              },
            })
          },
        })
        const { makeRequest: changeStatus } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setPartTask', {
              status: 2,
              successMessage: 'Задача завершена',
              data: {
                process_id: data.task.process_id,
                manager_id: data.task.from_account_id,
                task_id: data.task.id,
                parent_action: data.task.id,
                personal_target_id: data.entity.id,
                object_id: data.entity.object_id,
                service_id: services_spr[data.entity.doljnost_id],
                date_target: data.entity.date_target,
                have_price: data.entity.direction_id !== 7,
                constructed: data.entity.direction_id === 7,
                doljnost_id: JSON.parse(data.task.dop_data).doljnost_id
                  ? JSON.parse(data.task.dop_data).doljnost_id
                  : data.entity.doljnost_id,
              },
            })
          },
        })
        await setPersonalTarget()
        result = await changeStatus()
      }

      // let { status } = result
      // if (status) {
      ctx.emit('closePopup')
      ctx.emit('getItems')
      // }
      // else {
      //   store.commit('notifies/showMessage', {
      //     color: 'error',
      //     content: 'Ошибка',
      //     timeout: 1000,
      //   })
      // }
      loading.value = false
    }

    const pushToForm = (val) => {
      router.push({
        name: 'main/:id/:form_id',
        params: {
          id: route.params.id,
          form_id: val,
        },
      })
      popupForm.value.isShow = true
    }

    const closePopupForm = (route) => {
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
    }

    onMounted(() => {
      if (
        proxyConfig.value.detail &&
        proxyConfig.value.detail.type === 'popup' &&
        route.meta?.mode?.length > 1
      ) {
        popupForm.value.isShow = true
      }
    })

    return {
      // keyForm,
      // keyFormErrors,
      // keyFormValidate,
      completeTask,
      dopData,
      entity: data.entity,
      addFiles,
      qty,
      sum,
      isSetTask,
      selectName,
      changeQTY,
      dateTarget,
      infoObj,
      tariff,

      pushToForm,
      popupForm,
      proxyConfig,
      closePopupForm,
      Popup,
      autocompleteConfig,
      changeServiceDetail,
      rejectedTarif,
      loading,
    }
  },
})
export default Form17
