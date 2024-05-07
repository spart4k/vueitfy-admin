import { ref, reactive, watch } from 'vue'
import FormPopupPhoto from '@/components/Task/el/FormPopupPhoto/index.vue'
import { stringField, selectField, checkboxField } from '@/utils/fields.js'
import { required } from '@/utils/validation'
import Autocomplete from '@/components/Autocomplete/form'

const docsRequired = {
  name: 'ZayavkaItem',
  components: {
    FormPopupPhoto,
    Autocomplete,
  },
  props: {
    docs: {
      type: Object,
    },
    docName: {
      type: String,
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
    isShowRemove: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
    },
  },
  setup(props) {
    console.log(props.list)
    const fields = ref([
      selectField({
        label: 'Наименование',
        name: `rashod_vid_id`,
        notSend: true,
        placeholder: '',
        prescription: 'items',
        class: [''],
        // value: item,
        readonly: true,
        items: props.list,
        selectOption: {
          text: 'name',
          value: 'id',
        },
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Кол-во',
        name: `count`,
        notSend: true,
        placeholder: '',
        readonly: true,
        prescription: 'items',
        value: '1',
        class: [''],
        position: {
          cols: 12,
          sm: 2,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Стоимость',
        name: `price`,
        placeholder: '',
        readonly: undefined,
        class: [''],
        position: {
          cols: 12,
          sm: 2,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
      checkboxField({
        label: 'ВДС',
        name: `is_debit`,
        placeholder: '',
        readonly: true,
        class: [''],
        position: {
          cols: 12,
          sm: 2,
        },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'Точное наименование',
        name: `name`,
        placeholder: '',
        readonly: undefined,
        prescription: 'items',
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        bootstrapClass: [''],
      }),
      stringField({
        label: 'К принятию',
        name: `accept_sum`,
        placeholder: '',
        readonly: undefined,
        prescription: 'items',
        class: [''],
        position: {
          cols: 12,
          sm: 4,
        },
        validations: { required },
        bootstrapClass: [''],
      }),
    ])
    const errorTextShow = ref(false)
    const errorText = ref(['Обязательное поле'])
    const formData = reactive({ ...props.item })
    watch(
      () => formData.accept_sum,
      () => {
        errorTextShow.value = false
      }
    )
    return {
      fields,
      formData,
      errorText,
      errorTextShow,
    }
  },
}

export default docsRequired
