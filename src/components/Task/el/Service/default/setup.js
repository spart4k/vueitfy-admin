import { computed, defineComponent, onMounted, ref, watch } from 'vue'
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
  },
  setup(props, ctx) {
    const serviceRows = ref([])
    const rejectedPrices = computed(() => {
      return serviceRows.value.reduce((acc, el) => {
        // console.log(el.rejectedPrice)
        if (el.rejectedPrice) {
          acc.push(el.rejectedPrice)
          return acc
          // console.log(acc)
        } else {
          return acc
        }
      }, [])
    })
    const services = ref([{}])
    const addGroup = () => {
      services.value.push({})
    }
    const removeGroup = (index) => {
      console.log(index)
      if (index !== undefined) {
        services.value.splice(index, 1)
      } else {
        services.value.splice(services.value.length - 1, 1)
      }
    }
    const changeRejectedPrice = (reject) => {
      // rejectedPrice.value = reject
    }
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
