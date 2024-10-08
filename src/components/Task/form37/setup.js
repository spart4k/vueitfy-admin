import Vue, { defineComponent, ref, onMounted, computed, watch } from 'vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import Autocomplete from '@/components/Autocomplete/form'
import useForm from '@/compositions/useForm.js'
import { required } from '@/utils/validation.js'
import DropZone from '@/components/Dropzone/default/index.vue'
import { stringField, selectField, dropZoneField } from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

export default {
  name: 'Form37',
  components: {
    TextInfo,
    FormComment,
    DocForm,
    Autocomplete,
    DropZone,
    PersTitle,
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
    const dataRojd = moment(props.data.entity.data_rojd, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const comment = ref('')
    const docFormRef = ref(null)
    const doc = JSON.parse(props.data.task.dop_data).doc_id
    const docs = props.data.data.docs
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
      },
      // obj: {
      //   key: 'Объект',
      //   value: props.data.entity.object_name,
      // },
    }
    const osnConfirmed = ref(null)
    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        const task = props.data.task
        let data = {}
        data = {
          process_id: task.process_id,
          task_id: task.id,
          parent_action: task.id,
          docs_id: JSON.parse(props.data.task.dop_data).docs_id,
          doc_id: JSON.parse(props.data.task.dop_data).doc_id,
          object_id: JSON.parse(props.data.entity.object_id),
          personal_id: props.data.entity.id,
        }
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data,
        })
      },
    })
    const { makeRequest: changeStatusTaskReject } = useRequest({
      context,
      request: () => {
        const task = props.data.task
        let data = {}
        data = {
          process_id: task.process_id,
          task_id: task.id,
          parent_action: task.id,
          doc_id: JSON.parse(props.data.task.dop_data).doc_id,
          object_id: JSON.parse(props.data.entity.object_id),
          docs_id: JSON.parse(props.data.task.dop_data).docs_id,
          personal_id: props.data.entity.id,
          comment: comment.value,
          account_id: props.data.task.from_account_id,
        }
        return store.dispatch('taskModule/setPartTask', {
          status: 6,
          data,
        })
      },
    })
    const objectResult = {
      docId: [],
    }
    const showCommentError = () => {
      errorComment.value.push('Введите комментарий')
    }
    const errorComment = ref([])
    const rejectTask = async () => {
      if (!comment.value) {
        showCommentError()
        return
      }
      const { success } = await changeStatusTaskReject()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }
    const sendData = async () => {
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }
    watch(
      () => comment.value,
      () => {
        if (!comment.value) {
          showCommentError()
        } else {
          errorComment.value = []
        }
      }
    )
    onMounted(async () => {})
    return {
      dataRojd,
      docsData: props.data.data.personal_doc_data,
      listNames: {
        1: 'Паспорт',
        2: 'СНИЛС',
        3: 'Реквизиты карты',
        4: 'Регистрация',
        5: 'Патент',
        6: 'Паспорт стр.2',
        7: 'Перевод',
        8: 'Мед. книжка',
        9: 'Вид на жительство',
        10: 'Миграционная карта',
        11: 'ДМС',
        12: 'Рабочая виза',
        13: 'Чек-патент первичный',
        14: 'Регистрация стр. 2',
        15: 'Патент стр. 2',
        16: 'Фото',
        17: 'ИНН',
        18: 'Экзамен РФ',
        19: 'Чек-патент текущий',
        20: 'Дактилоскопия',
        21: 'Дактилоскопия стр. 2',
        22: 'Вид на жительство стр. 2',
        23: 'Медосмотр',
        24: 'ID карта',
        25: 'Ученический договор',
      },
      entity: props.data.entity,
      sendData,
      textInfo,
      osnConfirmed,
      docs,
      docFormRef,
      comment,
      rejectTask,
      errorComment,
    }
  },
}
