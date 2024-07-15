import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment/moment'
import Popup from '@/components/Popup/index.vue'
import _ from 'lodash'

import config from '@/components/Task/form15/form.js'

const Form15 = defineComponent({
  name: 'Form15',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
    Popup,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const proxyConfig = ref(_.cloneDeep(config))
    const loading = ref(false)
    const context = {
      root: {
        store,
      },
    }
    const popupForm = ref({
      isShow: false,
    })
    const dateTarget = moment(
      props.data.entity.date_target,
      'YYYY-MM-DD'
    ).format('DD.MM.YYYY')
    const isFormConfirmed = ref(null)
    let confirmData = null
    const infoObj = {
      creator: {
        key: 'Создатель',
        value: props.data.entity.account_name,
      },
      ved_type: {
        key: 'Вид ведомости',
        value: props.data.entity.vedomost_name,
      },
      employee: {
        key: 'Сотрудник',
        value: props.data.entity.personal_name,
      },
      avatar: {
        key: 'Аватар',
        value: props.data.entity.avatar_name,
      },
      position: {
        key: 'Должность',
        value: props.data.entity.doljnost_name,
      },
      personal_key: {
        key: 'Личный ключ',
        value: props.data.entity.print_key,
      },
      object: {
        key: 'Объект',
        value: props.data.entity.object_name,
      },
      meals: {
        key: 'Питание',
        value: props.data.entity.sum_nutrition,
      },
    }

    const { makeRequest: setPersonalTarget } = useRequest({
      context,
      request: () => {
        const data = props.data
        const finalData = {
          process_id: data.task.process_id,
          manager_id: JSON.parse(data.task.dop_data).manager_id,
          task_id: data.task.id,
          parent_action: data.task.id,
          personal_target_id: data.entity.id,
          doljnost_id: JSON.parse(data.task.dop_data).doljnost_id
            ? JSON.parse(data.task.dop_data).doljnost_id
            : data.entity.doljnost_id,
          auto:
            data.entity.vid_vedomost_id === 3 ||
            data.entity.vid_vedomost_id === 5
              ? 1
              : 0,
          x5:
            data.entity.subtype_object === 9 && data.entity.direction_id === 1
              ? 0
              : 0,
          ozon: data.entity === 2 ? 1 : 0,
          postponed:
            props.data.entity.vid_vedomost_id === 1
              ? props.data.data.postponed
              : undefined,
          need_input:
            data.entity.direction_id === 6 ||
            data.entity.direction_id === 7 ||
            data.entity.doljnost_id === 5 ||
            data.entity.doljnost_id === 7 ||
            // data.entity.doljnost_id === 6 ||
            data.entity.doljnost_id === 8 ||
            data.entity.doljnost_id === 23 ||
            data.entity.doljnost_id === 33
              ? 1
              : 0,
          need_parse:
            data.entity.direction_id === 1 &&
            data.entity.doljnost_id !== 5 &&
            data.entity.doljnost_id !== 7 &&
            // data.entity.doljnost_id !== 6 &&
            data.entity.doljnost_id !== 8 &&
            data.entity.doljnost_id !== 23 &&
            data.entity.doljnost_id !== 33
              ? 1
              : 0,
        }
        if (finalData.auto === 1 || finalData.ozon === 1) {
          finalData.need_input = 0
          finalData.need_parse = 0
        }
        confirmData = finalData
        return store.dispatch('taskModule/setPersonalTarget', {
          data: {
            id: data.entity.id,
            status: isFormConfirmed.value ? 3 : 2,
          },
        })
      },
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: isFormConfirmed.value ? 2 : 6,
          data: isFormConfirmed.value
            ? confirmData
            : {
                process_id: props.data.task.process_id,
                manager_id: JSON.parse(props.data.task.dop_data).manager_id,
                parent_action: props.data.task.id,
                task_id: props.data.task.id,
              },
        })
      },
    })

    const confirm = async () => {
      loading.value = true
      isFormConfirmed.value = true
      await setPersonalTarget()
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      loading.value = false
    }
    const reject = async () => {
      loading.value = true
      isFormConfirmed.value = false

      await setPersonalTarget()
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
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
      infoObj,
      confirm,
      reject,
      entity: props.data.entity,
      dateTarget,

      pushToForm,
      popupForm,
      proxyConfig,
      closePopupForm,
      Popup,
      loading,
    }
  },
})
export default Form15
