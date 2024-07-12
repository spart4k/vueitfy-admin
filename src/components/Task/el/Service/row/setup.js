import { computed, onMounted, ref, watch } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import useForm from '@/compositions/useForm'
import useRequest from '@/compositions/useRequest'
import { useRoute } from 'vue-router/composables'
import { useRouter } from 'vue-router/composables'
import form from '@/store/modules/form'
import { required } from '@/utils/validation'
import moment from 'moment/moment'
import Popup from '@/components/Popup/index.vue'
import _ from 'lodash'
import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  textBlock,
} from '@/utils/fields.js'

import config from '@/components/Task/form15/form.js'
import Autocomplete from '@/components/Autocomplete/default'
export default {
  name: 'Service-Row',
  computed: {
    form() {
      return form
    },
  },
  components: {
    TextInfo,
    FormError,
    FormComment,
    Popup,
    Autocomplete,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    serviceDetail: {
      type: Array,
      default: () => [],
    },
    task: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const { emit } = ctx
    const context = {
      root: {
        store,
        ctx,
        router,
      },
    }
    const fields = ref([
      selectField({
        label: '',
        name: 'name',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: '',
        name: 'qty',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: '',
        name: 'price',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: '',
        name: 'sum',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
    ])
    const autocompleteConfig = {
      label: 'Наименование',
      name: 'name',
      items: props.serviceDetail,
      solo: false,
      required: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }
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
      fields: fields.value,
      formData: {},
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
      loading: ref(false),
      mode: 'add',
    })
    const rejectedPrice = ref('')
    const getServiceInfo = async (idService) => {
      const { makeRequest, loading } = useRequest({
        context,
        request: () => {
          return store.dispatch(
            'taskModule/getServicePrice',
            `object_id=${props.task.entity.object_id}&service_id=${idService}&date_target=${props.task.entity.date_target}`
          )
        },
      })
      return await makeRequest()
    }
    const changeSum = (i) => {
      if (formData.price && formData.qty) {
        const sum = formData.price * formData.qty
        formData.sum = Math.round(sum * 100) / 100
      } else {
        formData.sum = null
      }
    }
    const changeServiceDetail = async (i, idService) => {
      rejectedPrice.value = ''
      // emit('changeRejectedPrice', rejectedPrice)
      emit('changeIsReject', false)

      const data = await getServiceInfo(idService)

      if (!data.length) {
        rejectedPrice.value = props.serviceDetail.find(
          (item) => item.id == idService
        ).name
        // emit('changeRejectedPrice', rejectedPrice)
        rejectedPrice
          ? emit('changeIsReject', true)
          : emit('changeIsReject', false)
        formData.price = 0
        return false
      } else {
        formData.price = data[0]?.price ?? ''
      }

      changeSum(i)
    }
    const removeRow = () => {
      emit('removeRow')
    }
    return {
      fields,
      formData,
      autocompleteConfig,
      tab,
      changeServiceDetail,
      changeSum,
      removeRow,
      rejectedPrice,
      vForm,
      validate,
      formErrors,
    }
  },
}
