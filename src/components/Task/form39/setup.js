import Vue, {
  defineComponent,
  ref,
  toRef,
  computed,
  watch,
  reactive,
  onMounted,
} from 'vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import Autocomplete from '@/components/Autocomplete/default'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'
import { selectField, autocompleteField } from '@/utils/fields.js'
import { required } from '@/utils/validation.js'
import { stringAction } from '@/utils/actions'
import useForm from '@/compositions/useForm.js'
const Form7 = defineComponent({
  name: 'Form39',
  components: {
    TextInfo,
    FormComment,
    DocForm,
    Autocomplete,
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
    const loading = ref(false)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
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
    const docFormRef = ref(null)
    const isWire = ref(false)
    const fieldsConfig = ref([
      selectField({
        label: 'Направления',
        subtype: 'multiple',
        name: 'direction_id',
        alias: 'direction_id_logistic',
        requestKey: 'direction_json',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        value: JSON.parse(props.data.entity.direction_json),
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
        dependence: [
          {
            type: 'api',
            module: 'selects/getListUpdate',
            field: 'object_id',
            url: 'get/pagination_list/object_logistic',
            alias: 'object_id',
          },
        ],
        updateList: [
          {
            alias: 'brigadirs',
            filter: [
              {
                field: 'object_id',
                value: '',
                source: 'formData',
                type: 'array',
              },
              {
                field: 'direction_id',
                //alias: 'direction_json',
                value: '',
                source: 'formData',
                type: 'array',
              },
            ],
          },
        ],
      }),
      autocompleteField({
        label: 'Объект',
        subtype: 'multiple',
        name: 'object_id',
        alias: 'object_json',
        requestKey: 'object_json',
        //subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        page: 1,
        search: '',
        url: 'get/pagination_list/object_logistic',
        // object
        position: {
          cols: 12,
          sm: 12,
        },
        value: JSON.parse(props.data.entity.object_id),
        validations: { required },
        bootstrapClass: [''],
        filter: [
          {
            field: 'direction_id',
            value: '',
          },
        ],
        updateList: [
          {
            alias: 'brigadirs',
            filter: [
              {
                field: 'object_id',
                value: '',
                source: 'formData',
                type: 'array',
              },
              {
                field: 'direction_id',
                //alias: 'direction_json',
                value: '',
                source: 'formData',
                type: 'array',
              },
            ],
          },
        ],
      }),
      selectField({
        label: 'Доступ',
        name: 'account_json',
        alias: 'brigadirs',
        subtype: 'multiple',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        value: JSON.parse(props.data.entity.account_json),
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
    ])
    const fieldsTemplate = computed(() => {
      // return fieldsConfig.value.reduce((acc, el) => {
      //   acc[el.name] = el
      //   // Vue.set(acc, [el.name], el)
      //   return acc
      // }, {})
      const object = {}
      fieldsConfig.value.forEach((el, index) => {
        object[el.name] = el
        object[el.name].items = el.items
        // Vue.set(object, [el.name], el)
        if (el?.items && el.name === 'type_pay') {
          console.log(index)
          console.log(1, JSON.stringify(fieldsConfig.value[4].items))
          console.log(2, JSON.stringify(fieldsConfig.value[index].items))
          console.log(el.name, JSON.stringify(el?.items))
        }
      })
      // console.log(JSON.stringify(object.type_pay))
      console.log('asdasd')
      return object
      // return fieldsConfig.value
    })
    const tab = {
      path: 'add',
      id: 0,
      name: 'Заявка на расход',
      detail: false,
      lists: [
        { alias: 'direction_id_logistic', filter: [] },
        {
          alias: 'brigadirs',
          filter: [
            {
              field: 'object_id',
              value: '',
              source: 'formData',
              type: 'array',
            },
            {
              field: 'direction_id',
              //alias: 'direction_json',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
      ],
      alias: 'zayavka',
      active: false,
      fields: fieldsConfig.value,
      actions: [
        stringAction({
          text: 'Закрыть',
          type: 'submit',
          color: 'disabled',
          name: 'closePopup',
          action: 'closePopup',
          skipValidation: true,
        }),
        stringAction({
          text: 'Сохранить',
          type: 'submit',
          color: 'primary',
          module: 'form/create',
          url: 'create/zayavka',
          name: 'saveFormStore',
          action: 'saveFormStore',
          // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
        }),
      ],
      formData: {},
    }
    const fields = () => {
      const fields = {}
      fieldsConfig.value.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          //
          Vue.set(fields, el.name, {})
        } else {
          return
        }
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: createForm } = useRequest({
      context,
      // successMessage: 'Сохранено',
      request: (params) => {
        return store.dispatch(params.module, {
          url: params.url,
          body: {
            data: params.formData ? params.formData : formData,
          },
        })
      },
    })

    const {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      clickHandler,
      getData,
      changeAutocomplete,
      changeSelect,
      showField,
      openMenu,
      disabledField,
      hideField,
      addFiles,
      changeCheckbox,
      readonlyField,
      refreshTable,
      isHideBtn,
      colsField,
      appendFieldHandler,
      popupForm,
      appendActionShow,
    } = useForm({
      form: tab,
      context,
      // detail: props.detail,
      loading,
      fields: fields(),
      setFields: fields,
      makeRequestList,
      mode: 'edit',
      createForm,
    })

    const { makeRequest: updatePersonalAccess } = useRequest({
      context,
      request: () => {
        const data = {
          status_id: isWire.value ? 9 : 5,
          direction_json: formData.direction_id,
          account_json: formData.account_json,
          object_json: formData.object_id,
          personal_id: props.data.entity.id,
        }
        return store.dispatch('taskModule/updatePersonalAccess', {
          data,
        })
      },
    })

    const dopData = ref(
      Object.assign({}, toRef(props.data.task, 'dop_data')).value
    )

    const formatedDopData = JSON.parse(dopData.value)

    const autocompleteConfig = {
      label: 'Объект',
      name: 'object',
      items: props.data.data.objects,
      solo: false,
      required: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }
    const object = ref('')
    const status = ref('')
    const isFire = () => {
      osnConfirmed.value = false
      status.value = 'Уволен'
    }
    const isWork = () => {
      osnConfirmed.value = true
      status.value = 'Работает'
    }
    const start_process_other_doc = computed(() => {
      return !formatedDopData.was_process &&
        status.value === 'Работает' &&
        formatedDopData.doc_id !== 5
        ? true
        : false
    })
    const start_process_patent = computed(() => {
      return !formatedDopData.was_process &&
        status.value === 'Работает' &&
        formatedDopData.doc_id === 5
        ? true
        : false
    })
    const was_process = computed(() => {
      return formatedDopData.was_process
        ? formatedDopData.was_process
        : !formatedDopData.was_process && status.value === 'Работает'
        ? true
        : false
    })
    // if (props.data.data.status_data.next_account) {
    //   testObject.manager_id = props.data.data.status_data.next_account_id
    // } else {
    //   testObject.account_id = props.data.data.status_data.next_account_id
    // }

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        const data = {
          process_id: props.data.task.process_id,
          task_id: props.data.task.id,
          parent_action: props.data.task.id,
          // is_work:
          //   status.value === 'Работает' &&
          //   JSON.parse(props.data.task.dop_data).doc_id !== 5
          //     ? true
          //     : false,
          // is_fired: status.value === 'Уволен' ? true : false,
          // is_patent:
          //   JSON.parse(props.data.task.dop_data).doc_id === 5 &&
          //   status.value === 'Работает',
        }
        console.log(data)
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data,
        })
      },
    })

    const sendData = async () => {
      const { code } = await updatePersonalAccess()
      console.log(code)
      if (code === 1) {
        const { success } = await changeStatusTask()
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      } else {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Ошибка, code ' + code,
          timeout: 1000,
        })
      }
    }
    onMounted(async () => {
      await getData()
    })

    return {
      dataRojd,
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      entity: props.data.entity,
      sendData,
      textInfo,
      osnConfirmed,
      autocompleteConfig,
      object,
      isFire,
      isWork,
      status,
      formatedDopData,
      start_process_other_doc,
      start_process_patent,
      was_process,
      fieldsTemplate,
      formData,
      changeAutocomplete,
      isWire,
    }
  },
})
export default Form7
