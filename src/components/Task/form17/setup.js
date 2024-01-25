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

const Form17 = defineComponent({
  name: 'Form17',
  components: {
    FormError,
    FormComment,
    Dropzone,
    TextInfo,
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
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }

    const dateTarget = moment(data.entity.date_target).format('DD.MM.YYYY')

    const getServiceInfo = async (idService) => {
      const { makeRequest } = useRequest({
        context,
        request: () => {
          return store.dispatch(
            'taskModule/getServicePrice',
            `object_id=${data.entity.object_id}&service_id=${idService}&date_target=${data.entity.date_target}`
          )
        },
      })
      return await makeRequest()
    }
    let selectName = ref('')
    let qty = ref(10.5)
    let tariff
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
    onMounted(() => {
      tariff = getServiceInfo(data.entity.doljnost_id)
    })
    let sum = computed(() => {
      if (tariff) {
        return (tariff / 10.5) * qty
      } else {
        return 0
      }
    })
    let updateFileData
    let loadImage
    let changeStatusTask
    let isSetTask = ref(false)
    const dopData = JSON.stringify(data.task.dop_data)
    const addFiles = (e) => {
      console.log(e)
      let fileExt = e[0].type.split('/')[1]
      let fileName = `workout_25_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])
      isSetTask.value = true
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
              have_price: 1,
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
    let services_spr = [
      { 24: 61 },
      { 25: 62 },
      { 26: 63 },
      { 27: 64 },
      { 49: 70 },
      { 50: 77 },
      { 51: 78 },
    ]
    const completeTask = async () => {
      // await setUserKey()
      // const { success } = await changeStatusTask()
      let result
      if (
        data.entity.doljnost_id == 5 ||
        data.entity.doljnost_id == 7 ||
        data.entity.doljnost_id == 32
      ) {
        // updateFileData.makeRequest()
        await loadImage.makeRequest()
        result = await changeStatusTask.makeRequest()
      } else if (data.entity.direction_id == 6) {
        const { makeRequest: setPersonalTarget } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setPersonalData', {
              data: {
                id: data.entity.id,
                services: {
                  3: {
                    services: [
                      {
                        service_id: services_spr.find(
                          (x) => x === data.entity.doljnost_id
                        ),
                        qty: qty.value,
                        price: '',
                        sum: 0,
                      },
                    ],
                    payment_id: false,
                    is_pay: false,
                    sum: 0,
                  },
                },
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
              data: {
                process_id: data.task.process_id,
                manager_id: data.task.from_account_id,
                task_id: data.task.id,
                parent_action: data.task.id,
                personal_target_id: data.entity.id,
                have_price: 0,
                object_id: data.entity.object_id,
                service_id: services_spr.find(
                  (x) => data.entity.doljnost_id
                )[0],
                date_target: data.entity.date_target,
              },
            })
          },
        })
        await setPersonalTarget()
        result = await changeStatus()
        //   $.ajax('/common/save/personal_target', {
        //     method: "POST",
        // //     data: {id: <?php echo $entity['id']; ?>, services: `{"3": {"services": [{"service_id": <?php echo $services_spr[$entity['doljnost_id']]; ?>,
        // "qty": ${$('#form_personal_target_qty').val()}, "price": ${$('#form_personal_target_price').val()}, "sum": ${$('#form_personal_target_sum').val()}"}]"],
        // "payment_id": false, "is_pay": false, "sum": ${$('#form_personal_target_sum').val()}}}` },
        //     success: function() {
        //         $.ajax('/task/change_status_task', {
        //             method: "POST",
        //             data: {status: 2, data: {
        //                 process_id: <?php echo $task['process_id']; ?>,
        //                 manager_id: <?php echo $task['from_account_id']; ?>,
        //                 task_id: <?php echo $task['id']; ?>,
        //                 parent_action: <?php echo $task['id']; ?>,
        //                 personal_target_id: <?php echo $entity['id']; ?>,
        //                 have_price: <?php echo isset($service_price[0]) ? 1 : 0; ?>,
        //                 object_id: <?php echo $entity['object_id']; ?>,
        //                 service_id: <?php echo $services_spr[$entity['doljnost_id']]; ?>,
        //                 date_target: '<?php echo $entity['date_target']; ?>'
        //             }},
        //             success: function (data) {
        //                 slidePopup('Задача выполнена!', 'success');
        //                 typeof dataTable['task'] != "undefined" ? dataTable['task'].ajax.reload() : dataTable[document.taskTable].ajax.reload();
        //                 hideModal();
        //             }
        //         })
        //     }
        // })
      }
      let { status } = result
      if (status) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      } else {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Ошибка',
          timeout: 1000,
        })
      }
    }

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
    }
  },
})
export default Form17
