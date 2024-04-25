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

const Form7 = defineComponent({
  name: 'Form7',
  components: {
    TextInfo,
    FormComment,
    DocForm,
    Autocomplete,
    DropZone,
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
    const fieldsConfig = ref([
      selectField({
        label: 'Имя',
        name: 'account',
        // alias: 'type_pay',
        placeholder: '',
        class: [''],
        value: '',
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      selectField({
        label: 'Тип оплаты',
        name: 'type_pay',
        alias: 'type_pay',
        placeholder: '',
        class: [''],
        value: '',
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      selectField({
        label: 'Наименование',
        name: 'rashod_vid',
        placeholder: '',
        class: [''],
        value: '',
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        prescription: 'items',
        notSend: true,
        position: {
          cols: 12,
          sm: 5,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Кол-во',
        name: 'count',
        placeholder: '',
        class: [''],
        prescription: 'items',
        notSend: true,
        position: {
          cols: 12,
          sm: 2,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Стоимость',
        name: 'price',
        placeholder: '',
        class: [''],
        prescription: 'items',
        notSend: true,
        position: {
          cols: 12,
          sm: 3,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Точное наименование',
        name: 'exact_name',
        placeholder: '',
        class: [''],
        prescription: 'items',
        notSend: true,
        position: {
          cols: 12,
          sm: 12,
        },
        bootstrapClass: [''],
      }),
      selectField({
        label: 'Тип оплаты',
        name: 'type_pay',
        alias: 'type_pay',
        placeholder: '',
        class: [''],
        value: '',
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      selectField({
        label: 'Реквизит для оплаты',
        name: 'req_zr_id',
        requestKey: 'rek_id',
        subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        // brigadirs
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
        dependence: [
          {
            type: 'default',
            fillField: ['rek1', 'rek2', 'bank_id'],
          },
        ],
        isShow: {
          value: true,
          conditions: [{ field: 'type_pay', value: [1, 2, 3] }],
        },
      }),
      dropZoneField({
        label: 'Скан-копия/фото',
        name: 'check_docs',
        notPut: true,
        placeholder: '',
        grouping: 'multiple',
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        bootstrapClass: [''],
        validations: { required },
        options: {
          removeble: true,
          withoutSave: false,
          folder: 'schet',
          name: '`zayavka_schet`',
          paramsForEmit: this,
          countFiles: 10,
        },
        isShow: {
          value: false,
          conditions: [{ field: 'type_pay', value: [4] }],
        },
        value: [],
      }),
    ])
    const fieldsTemplate = () => {
      return fieldsConfig.value.reduce((acc, el) => {
        acc[el.name] = el
        return acc
      }, {})
    }
    const tab = {
      path: 'add',
      id: 0,
      name: 'Заявка на расход',
      detail: false,
      lists: [
        { alias: 'status_zr', filter: [] },
        { alias: 'direction_id', filter: [] },
        { alias: 'category_zr', filter: [] },
        { alias: 'me', filter: [] },
        { alias: 'type_objects', filter: [] },
        { alias: 'type_pay', filter: [] },
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
    const { makeRequest: changeForm, loading } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        let routeParam
        if (params.action.useRouteParam) {
          routeParam = params.action.useRouteParam
        } else {
          routeParam = 'id'
        }
        return store.dispatch(params.module, {
          url: params.url,
          body: { data: { id: +route.params[routeParam], ...params.formData } },
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

        let data = {}
        data = {
          process_id: task.process_id,
          task_id: task.id,
          parent_action: task.id,
          docs_id: JSON.parse(props.data.task.dop_data).docs_id,
          account_id: task.to_account_id,
          personal_id: props.data.entity.id,
          okk_id: props.data.task.from_account_id,
        }
        return store.dispatch('taskModule/setPartTask', {
          status: taskDeadline > 0 ? 2 : 3,
          data,
        })
      },
    })

    const autocompleteConfig = {
      label: 'Объект',
      name: 'object',
      items: [],
      solo: true,
      required: true,
      url: 'get/pagination_list/object',
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const sendData = async () => {
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

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
      changeForm,
      mode: 'add',
    })
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
      fieldsConfig,
      formData,
      fieldsTemplate: fieldsTemplate(),
      showField,
      formErrors,
      readonlyField,
    }
  },
})
export default Form7
