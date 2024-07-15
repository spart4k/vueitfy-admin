import { computed, defineComponent, onMounted, ref, watch, nextTick } from 'vue'
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
import ServiceRow from '../row/index.vue'
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
  name: 'Service',
  components: {
    TextInfo,
    FormError,
    FormComment,
    Popup,
    Autocomplete,
    ServiceRow,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    formGroup: {
      type: Array,
      default: () => [],
    },
    serviceDetail: {
      type: Array,
      default: () => [],
    },
    task: {
      type: Object,
      default: () => {},
    },
    comment: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const serviceRows = ref([])
    const rejectedPrices = computed(() => {
      return serviceRows.value.reduce((acc, el) => {
        if (el.rejectedPrice) {
          acc.push(el.rejectedPrice)
          return acc
        } else {
          return acc
        }
      }, [])
    })
    const services = ref([])
    const addGroup = () => {
      services.value.push({})
    }
    const removeGroup = (index) => {
      if (index !== undefined) {
        services.value.splice(index, 1)
      } else {
        services.value.splice(services.value.length - 1, 1)
      }
    }
    const changeRejectedPrice = (reject) => {
      // rejectedPrice.value = reject
    }
    onMounted(() => {
      if (props.formGroup.length) {
        props.formGroup.forEach((item, index) => {
          addGroup()
          nextTick(() => {
            const formData = serviceRows.value[0].formData
            formData.name = item.service_id
            formData.price = item.price
            formData.qty = item.qty
            formData.sum = item.sum
          })
        })
      } else {
        addGroup()
      }
    })
    return {
      services,
      addGroup,
      removeGroup,
      changeRejectedPrice,
      rejectedPrices,
      serviceRows,
    }
  },
}
