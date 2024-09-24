import Vue, { onMounted, computed, toRef, ref, watch } from 'vue'
import store from '@/store'
import _ from 'lodash'
import moment from 'moment'
import Datepicker from '@/components/Date/Default/index.vue'
import DropZone from '@/components/Dropzone/default/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
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
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

export default {
  name: 'Version-Dialog',
  props: {
    version: {
      type: Object,
      default: () => {},
    },
    pact: {
      type: Object,
      default: () => {},
    },
    territory: {
      type: Object,
      default: () => {},
    },
  },
  components: { Datepicker, DropZone },
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
    const loading = ref(true)

    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: async (params) => {
        console.log(params.formData)
        const response = await store.dispatch(params.module, {
          url: params.url,
          body: {
            data: {
              ...params.formData,
              version_agreement_id: props.version.id,
              version: Number(
                `${props.version.version}.${props.version.items.length + 1}`
              ),
            },
          },
        })
        if (response.code === 1) {
          emit('close')
          emit('refreshItem')
        }
        if (formData.prolongation_tarif) {
          emit('openParser', {
            territory: props.territory,
            contract: props.pact,
            version: Number(
              `${props.version.version}.${props.version.items.length + 1}`
            ),
            contract_id: response.id,
            contract_type: 2,
          })
        }
      },
    })

    const { formData, fields, clickHandler } = useForm({
      form: {
        detail: true,
        lists: [],
        fields: [
          stringField({
            label: 'name',
            name: 'name',
            placeholder: '',
            value: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          dateField({
            label: 'date_from',
            name: 'date_from',
            type: 'date',
            value: '',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          dateField({
            label: 'date_to',
            name: 'date_to',
            type: 'date',
            value: '',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'with_prolongation',
            name: 'with_prolongation',
            value: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'prolongation_price',
            name: 'prolongation_price',
            value: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'prolongation_tarif',
            name: 'prolongation_tarif',
            value: false,
            notSend: true,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: '',
            name: 'file',
            notPut: true,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            options: {
              removeble: true,
              withoutSave: false,
              maxSize: 500,
              valueId: 'agreement',
              folder: 'agreement',
              name: '`agreement`',
              paramsForEmit: this,
              countFiles: 1,
            },
            value: [],
          }),
        ],
      },
      context,
      loading,
      createForm,
    })

    watch(
      () => formData,
      () => {
        if (formData.with_prolongation) {
          formData.prolongation_tarif = false
        } else {
          formData.prolongation_price = false
          formData.with_prolongation = false
        }
      },
      { deep: true }
    )

    return {
      formData,
      clickHandler,
      fields,
    }
  },
}
