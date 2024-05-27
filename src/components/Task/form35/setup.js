import Vue, {
  defineComponent,
  ref,
  onMounted,
  computed,
  watch,
  reactive,
} from 'vue'
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
import {
  stringField,
  selectField,
  dropZoneField,
  autocompleteField,
  checkboxField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

const Form7 = defineComponent({
  name: 'Form35',
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
    const dataRojd = moment(
      props.data.data.personal.data_rojd,
      'YYYY-MM-DD'
    ).format('DD.MM.YYYY')
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    let spr = {
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
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.task.from_fio,
      },
      document: {
        key: 'Продлеваемый документ',
        value: spr[JSON.parse(props.data.task.dop_data).doc_id]
          ? spr[JSON.parse(props.data.task.dop_data).doc_id]
          : spr[JSON.parse(props.data.task.dop_data).doc_id],
      },
      // obj: {
      //   key: 'Объект',
      //   value: props.data.entity.object_name,
      // },
    }
    const osnConfirmed = ref(null)
    const fieldsConfig = ref([
      selectField({
        label: 'Объект',
        name: 'object_id',
        // alias: 'type_pay',
        placeholder: '',
        class: [''],
        value: JSON.parse(props.data.task.dop_data).object_id,
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: props.data.data.objects,
        position: {
          cols: 12,
          sm: 12,
        },
        readonly: true,
        validations: { required },
        bootstrapClass: [''],
      }),
      selectField({
        label: 'Сотрудник',
        name: 'account_id',
        // alias: 'type_pay',
        placeholder: '',
        class: [''],
        value: '',
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: props.data.data.accounts,
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
        dependence: [
          {
            type: 'default',
            fillField: [
              {
                formKey: 'account_id',
                compareKey: 'id',
                objectKey: 'id',
                targetKey: 'personal_account_zr',
              },
              {
                type: 'default',
                fillField: ['is_migr'],
              },
            ],
          },
        ],
      }),
      autocompleteField({
        label: 'Регион',
        name: 'regions_id',
        alias: 'regions_id',
        subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        page: 1,
        search: '',
        url: 'get/pagination_list/regions_id',
        position: {
          cols: 12,
          sm: 6,
        },
        value: props.data.entity.region_id,
        validations: { required },
        bootstrapClass: [''],
        updateList: [
          {
            alias: 'city_id',
            filter: [
              {
                field: 'regions_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
        ],
      }),
      selectField({
        label: 'Город',
        name: 'city_id',
        //alias: 'city_id',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        value: props.data.entity.city_id,
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        requiredFields: ['regions_id'],
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
        items: props.data.data.docs,
        prescription: 'items',
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
        position: {
          cols: 12,
          sm: 2,
        },
        value: 1,
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Стоимость',
        name: 'price',
        placeholder: '',
        class: [''],
        prescription: 'items',
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
        updateList: [
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'vector_id',
                value: [1],
              },
              {
                key: 'type_pay',
                value: [1],
              },
            ],
            filter: [
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
            emptyWarning: {
              text: 'Все доступные направления добавлены',
            },
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'vector_id',
                funcCondition: (context) => context.formData.vector_id === 1,
              },
              {
                key: 'type_pay',
                // value: [2, 3],
                funcCondition: (context) =>
                  [2, 3].includes(context.formData.type_pay),
              },
            ],
            filter: [
              {
                field: 'personal_account_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
        ],
        validations: { required },
        bootstrapClass: [''],
        requiredFields: ['account_id'],
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
      checkboxField({
        name: 'is_migr',
        value: false,
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        disabled: true,
        isShow: {
          value: true,
        },
        bootstrapClass: [''],
      }),
      checkboxField({
        name: 'vds',
        value: true,
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        disabled: true,
        isShow: {
          value: true,
        },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'vector_id',
        name: 'vector_id',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        value: 1,
        bootstrapClass: [''],
      }),
      stringField({
        label: 'personal_zr',
        name: 'personal_zr',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        value: props.data.data.personal.id,
        bootstrapClass: [''],
      }),
      stringField({
        label: 'direction_id',
        name: 'direction_id',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        isShow: {
          value: true,
        },
        value: props.data.entity.direction_id,
        bootstrapClass: [''],
      }),
      stringField({
        label: 'category_id',
        name: 'category_id',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        isShow: {
          value: true,
        },
        value: props.data.entity.rashod_category_id,
        bootstrapClass: [''],
      }),
      stringField({
        label: 'note',
        name: 'note',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        isShow: {
          value: true,
        },
        value: '',
        bootstrapClass: [''],
      }),
      stringField({
        label: 'personal_account_zr',
        name: 'personal_account_zr',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        value: '',
        bootstrapClass: [''],
      }),
      stringField({
        label: 'rek1',
        name: 'rek1',
        placeholder: '',
        class: [''],
        disabled: true,
        isShow: {
          value: true,
        },
        position: {
          cols: 12,
          sm: 12,
        },
        // validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'rek2',
        name: 'rek2',
        placeholder: '',
        class: [''],
        disabled: true,
        isShow: {
          value: true,
        },
        position: {
          cols: 12,
          sm: 12,
        },
        // validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'bank_id',
        name: 'bank_id',
        requestType: 'number',
        placeholder: '',
        class: [''],
        disabled: true,
        isShow: {
          value: true,
        },
        position: {
          cols: 12,
          sm: 12,
        },
        // validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'bank_id',
        name: 'bank_id',
        requestType: 'number',
        placeholder: '',
        class: [''],
        disabled: true,
        isShow: {
          value: true,
        },
        position: {
          cols: 12,
          sm: 12,
        },
        // validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'status',
        name: 'status',
        requestType: 'number',
        placeholder: '',
        class: [''],
        disabled: true,
        isShow: {
          value: true,
        },
        value: 2,
        position: {
          cols: 12,
          sm: 12,
        },
        // validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'unfinished',
        name: 'unfinished',
        requestType: 'number',
        placeholder: '',
        class: [''],
        disabled: true,
        isShow: {
          value: true,
        },
        value: 0,
        position: {
          cols: 12,
          sm: 12,
        },
        // validations: { required },
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
      })
      return object
      // return fieldsConfig.value
    })
    const tab = {
      path: 'add',
      id: 0,
      name: 'Заявка на расход',
      detail: false,
      lists: [
        { alias: 'type_pay', filter: [] },
        {
          alias: 'city_id',
          filter: [
            {
              field: 'regions_id',
              value: '',
              source: 'formData',
              type: 'num',
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
      successMessage: 'Сохранено',
      request: () => {
        const task = props.data.task

        let data = {}
        data = {
          process_id: task.process_id,
          task_id: task.id,
          parent_action: task.id,
          doc_id: JSON.parse(props.data.task.dop_data).doc_id,
          account_id: formData.account_id,
          personal_id: props.data.data.personal.id,
        }
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data,
        })
      },
    })
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
      changeForm,
      mode: 'add',
      createForm,
    })
    const sendZayavka = async () => {
      return await clickHandler({
        action: stringAction({
          text: 'Сохранить',
          type: 'submit',
          color: 'primary',
          module: 'form/putForm',
          url: `update/zayavka/${props.data.entity.id}`,
          name: 'saveFormStore',
          action: 'saveFormStore',
          // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
        }),
      })
    }
    const sendData = async () => {
      vForm.value.$touch()
      validate(true)
      if (vForm.value.$invalid) return
      const resultZayavka = await sendZayavka()
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
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
      fieldsConfig,
      formData,
      fieldsTemplate,
      showField,
      formErrors,
      readonlyField,
      changeAutocomplete,
      tab,
      disabledField,
      addFiles,
      sendZayavka,
      vForm,
    }
  },
})
export default Form7
