import Vue, { onMounted, ref, computed, watch, toRef, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'
import _ from 'lodash'
import { autocompleteField } from '@/utils/fields.js'
import Autocomplete from '@/components/Autocomplete'

import SidelistHeader from '@/components/Sidelist/content/header/index.vue'
import SidelistSearch from '@/components/Sidelist/content/search/index.vue'

console.log('Autocomplete', Autocomplete)

export default {
  name: 'CheckList',
  components: {
    SidelistHeader,
    SidelistSearch,
    Autocomplete,
  },
  props: {
    date: {
      type: String,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const loading = ref(false)
    const search = ref('')
    const data = ref([])
    const panel = ref([])

    const edit = ref({
      name: '',
      coefficient: '',
      items: [],
      solo: true,
    })

    const mask = (val) => {
      if (val && (val.length <= 1 || val[0] === '2')) return '$'
      return '$.#'
    }

    const getData = async () => {
      loading.value = true
      const requestData = {
        url: 'get/coefficient/objects',
        data: {
          period: props.date.date,
          search: search.value,
        },
      }
      data.value = await store.dispatch('table/get', requestData)
      data.value.forEach((item) => {
        Vue.set(item, 'content', [])
        Vue.set(item, 'loaded', false)
      })
      loading.value = false
    }

    const getObjectPersonal = async (id, index) => {
      const requestData = {
        url: 'get/coefficient/personals',
        data: {
          period: props.date.date,
          search: search.value,
          object_id: id,
        },
      }
      const responseData = await store.dispatch('table/get', requestData)
      data.value[index].content = responseData
      data.value[index].content.forEach((item) => {
        Vue.set(item, 'edit', {})
        Vue.set(item.edit, 'isShow', false)
        Vue.set(item.edit, 'name_id')
        Vue.set(item.edit, 'coefficient')
      })
      data.value[index].loaded = true
    }

    const editPerson = (person) => {
      person.edit.isShow = true
      person.edit.coefficient = person.coefficient
      person.edit.name_id = person.personal_id

      // const item = autocompleteField({
      //   name: 'name_id',
      //   subtype: 'single',
      //   placeholder: '',
      //   class: [''],
      //   selectOption: {
      //     text: 'name',
      //     value: 'id',
      //   },
      //   items: [],
      //   page: 1,
      //   search: '',
      //   url: 'get/pagination_list/personal_coef',
      //   position: {
      //     cols: 12,
      //     sm: 3,
      //   },
      //   bootstrapClass: [''],
      // })
      // console.log('item', item)
    }

    onMounted(() => {
      getData()
    })

    watch(
      () => panel.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (!data.value[index].content.length)
          getObjectPersonal(data.value[index].id, index)
      },
      { deep: true }
    )
    return {
      loading,
      data,
      search,
      panel,
      edit,

      mask,
      editPerson,
    }
  },
}
