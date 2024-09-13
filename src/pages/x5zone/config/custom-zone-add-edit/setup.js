import Vue, {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
  onMounted,
} from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter, useRoute } from 'vue-router/composables'
import { getList } from '@/api/selects'
import Autocomplete from '@/components/Autocomplete/form'
import useRequest from '@/compositions/useRequest'
import moment from 'moment/moment'
import store from '@/store'
import _ from 'lodash'
import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  carouselField,
  docListField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import useForm from '@/compositions/useForm.js'

const ZoneAddEdit = defineComponent({
  name: 'Зона',
  path: 'add',
  id: uuidv4(),
  components: { Autocomplete },
  props: {},
  setup(props, ctx) {
    const { emit } = ctx
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
    const dialog = ref(false)
    const isEdit = computed(() => {
      return route.params.id ? 'edit' : 'add'
    })
    const alias = 'x5_zone'

    const zoneCities = computed(() => {
      const citiesZone = proxyFields.value.city_id.items.filter((x) => {
        return formData.city_id?.includes(x.id)
      })
      return citiesZone.filter((x) => x.zone_id)
    })

    const { makeRequest } = useRequest({
      context,
      request: async () => {
        const data = await store.dispatch(
          'form/get',
          `get/form/${alias}/${route.params.id}`
        )
        return data
      },
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        let routeParam
        if (params.action?.useRouteParam) {
          routeParam = params.action.useRouteParam
        } else {
          routeParam = 'id'
        }
        const originalId = originalData.value.cities.reduce((acc, item) => {
          acc.push(item.id)
          return acc
        }, [])
        const currentId = formData.cities.reduce((acc, item) => {
          acc.push(item.id)
          return acc
        }, [])
        const newCities = currentId.reduce((acc, item) => {
          if (!originalId.includes(item)) acc.push(item)
          return acc
        }, [])
        const oldCities = originalId.reduce((acc, item) => {
          if (!currentId.includes(item)) acc.push(item)
          return acc
        }, [])

        params.formData = {
          ...params.formData,
          new_cities: newCities,
          del_cities: oldCities,
        }
        return store.dispatch(params.module, {
          url: params.url,
          body: { data: { id: +route.params[routeParam], ...params.formData } },
        })
      },
    })
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        return store.dispatch(params.module, {
          url: params.url,
          body: {
            data: params.formData ? params.formData : formData,
          },
        })
      },
    })
    const loading = ref(true)
    const actions = [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        color: 'primary',
        module: 'form/create',
        url: 'create/x5/zone',
        name: 'createForm',
        action: 'createForm',
        handlingResponse: {
          1: {
            text: 'Успешно',
            color: 'success',
          },
          2: {
            text: 'Ошибка на стороне сервера',
            color: 'error',
          },
          3: {
            text: 'Доступ запрещен',
            color: 'error',
          },
          4: {
            text: 'Территория с таким названием уже существует',
            color: 'error',
          },
          5: {
            text: 'Неверный формат входных параметров',
            color: 'error',
          },
          6: {
            text: 'Отсутствуют необходимые данные',
            color: 'error',
          },
        },
        isHide: {
          value: false,
          type: 'every',
          condition: [
            {
              field: 'mode',
              target: 'environment',
              value: ['edit'],
              type: true,
            },
          ],
        },
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: 'form/putForm',
        url: 'update/x5/zone',
        name: 'saveForm',
        useRouteParam: 'id',
        action: 'saveForm',
        color: 'primary',
        handlingResponse: {
          1: {
            text: 'Успешно',
            color: 'success',
          },
          2: {
            text: 'Ошибка на стороне сервера',
            color: 'error',
          },
          3: {
            text: 'Доступ запрещен',
            color: 'error',
          },
          4: {
            text: 'Территория с таким названием уже существует',
            color: 'error',
          },
          5: {
            text: 'Неверный формат входных параметров',
            color: 'error',
          },
          6: {
            text: 'Отсутствуют необходимые данные',
            color: 'error',
          },
        },
        isHide: {
          value: false,
          type: 'every',
          condition: [
            {
              field: 'mode',
              target: 'environment',
              value: ['add'],
              type: true,
            },
          ],
        },
      }),
    ]
    const {
      formData,
      // validate,
      formErrors,
      // vForm,
      // touchedForm,
      clickHandler,
      getData,
      changeAutocomplete,
      // changeSelect,
      // changeValue,
      // showField,
      // refreshSelectItems,
      // refreshForm,
      // openMenu,
      // disabledField,
      // hideField,
      // changeCheckbox,
      // readonlyField,
      // refreshTable,
      isHideBtn,
      // colsField,
      // appendFieldHandler,
      // popupForm,
      // appendActionShow,
      // isRequired,
      fields,
      // emitFormData,
      // environment,
      // addFiles,
      originalData,
      // entityData,
    } = useForm({
      form: {
        alias,
        detail: true,
        lists: [
          {
            alias: 'x5_territories',
            filter: [],
          },
        ],
        fields: [
          stringField({
            label: 'Название',
            name: 'name',
            placeholder: '',
            value: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Территория',
            name: 'territories_id',
            alias: 'x5_territories',
            subtype: 'single',
            placeholder: '',
            class: [''],
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
            name: 'cities',
            subtype: 'multiple',
            placeholder: '',
            class: [''],
            notSend: true,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          autocompleteField({
            label: 'Регион',
            name: 'regions_id',
            subtype: 'single',
            placeholder: '',
            notSend: true,
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
              sm: 12,
            },
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'city_id',
                url: 'get/pagination_list/city_zone_x5',
              },
            ],
            bootstrapClass: [''],
          }),
          autocompleteField({
            label: 'Город',
            name: 'city_id',
            notSend: true,
            subtype: 'multiple',
            autoselectNew: true,
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/city_zone_x5',
            position: {
              cols: 12,
              sm: 12,
            },
            filter: [
              {
                field: 'regions_id',
                alias: 'regions_id',
                value: '',
              },
            ],
            bootstrapClass: [''],
          }),
        ],
      },
      context,
      loading,
      mode: isEdit.value,
      makeRequest,
      makeRequestList,
      changeForm,
      createForm,
    })

    const proxyFields = ref(fields)

    const setCities = () => {
      const newCities = proxyFields.value.city_id.items.filter((x) => {
        return formData.city_id?.includes(x.id)
      })
      formData.cities = _.unionBy(formData.cities, newCities, 'id')
      closeDialog()
    }

    const closeDialog = () => {
      dialog.value = false
      Vue.set(formData, 'regions_id', null)
      changeAutocomplete({
        value: formData.regions_id,
        field: proxyFields.value.regions_id,
      })
    }

    onMounted(async () => {
      await getData()
    })
    return {
      actions,
      isHideBtn,
      loading,
      formErrors,

      formData,
      clickHandler,
      fields,
      changeAutocomplete,
      dialog,
      isEdit,
      setCities,
      closeDialog,

      proxyFields,
      zoneCities,
    }
  },
})
export default ZoneAddEdit
