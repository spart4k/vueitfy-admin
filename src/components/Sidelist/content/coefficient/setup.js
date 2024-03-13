import Vue, { onMounted, ref, computed, watch, toRef, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'
import _ from 'lodash'
import Autocomplete from '@/components/Autocomplete/default'

import SidelistHeader from '@/components/Sidelist/content/header/index.vue'
import SidelistSearch from '@/components/Sidelist/content/search/index.vue'

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
    const initLoading = ref(true)
    const search = ref('')
    const data = ref([])
    const panel = ref([])
    const deletedObject = ref({})
    const confirm = ref({
      isShow: false,
      type: null,
    })
    const permission = computed(() =>
      [3, 4, 8, 17].includes(store.state.user.permission_id)
    )

    const rules = {
      required: (value) => !!value || 'Required.',
    }

    const autocompleteConfig = {
      label: 'Линейщик',
      name: 'status_zr',
      items: [],
      solo: true,
      required: true,
      url: 'get/pagination_list/personal_coef',
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }

    const mask = (val) => {
      val = val?.toString()
      if (val && (val.length <= 1 || val[0] === '2')) return '$'
      else return '$.#'
    }

    let controller
    const getData = async () => {
      try {
        panel.value = []
        if (controller) controller.abort()
        controller = new AbortController()
        loading.value = true
        const requestData = {
          url: 'get/coefficient/objects',
          data: {
            period: props.date.date,
            search: search.value,
          },
          params: {
            signal: controller.signal,
          },
        }
        data.value = await store.dispatch('table/get', requestData)
        data.value.forEach((item) => {
          Vue.set(item, 'content', [])
          Vue.set(item, 'loaded', false)
          Vue.set(item, 'footer', false)
          Vue.set(item, 'method', null)
          Vue.set(item, 'methodLoading', false)
          Vue.set(item, 'coef', '')
        })
        loading.value = false
        initLoading.value = false
        controller = undefined
      } catch (e) {
        return e
      }
    }

    const getObjectPersonal = async (id) => {
      let object = data.value.find((x) => x.id === id)
      object.loaded = false
      const requestData = {
        url: 'get/coefficient/personals',
        data: {
          period: props.date.date,
          search: search.value,
          object_id: id,
        },
      }
      object.content = await store.dispatch('table/get', requestData)
      object.content?.forEach((item) => {
        Vue.set(item, 'edit', {})
        Vue.set(item.edit, 'isShow', false)
        Vue.set(item.edit, 'loading', false)
        Vue.set(item.edit, 'name_id')
        Vue.set(item.edit, 'coefficient')
        Vue.set(item.edit, 'filter', [])
        item.edit.filter.push(
          { alias: 'object_id', value: item.object_id },
          { alias: 'period', value: props.date.date }
        )
      })
      object.loaded = true
    }

    const addPerson = (object) => {
      object.content.unshift({
        object_id: object.id,
        added: true,
        edit: {
          isShow: true,
          name_id: null,
          coefficient: null,
          loading: false,
          filter: [
            { alias: 'object_id', value: object.id },
            { alias: 'period', value: props.date.date },
          ],
        },
      })
    }

    const editPerson = (person) => {
      person.edit.isShow = true
      person.edit.coefficient = Number(person.coefficient)
      person.edit.name_id = person.personal_id
    }

    const changeMethod = (object, method) => {
      if (object.method !== method) object.method = method
      else object.method = null
    }

    const confirmDelete = (val, type) => {
      deletedObject.value = val
      confirm.value.type = type
      confirm.value.isShow = true
    }

    const deleteHandler = () => {
      if (confirm.value.type === 'person')
        changePerson(deletedObject.value, 'delete')
      confirm.value.isShow = false
    }

    const changeObjectCoef = async (object) => {
      const modules = {
        add: 'form/update',
        edit: 'form/putForm',
        delete: 'form/delForm',
      }
      const requestData = {
        url: 'coefficient/object',
        body: {
          period: props.date.date,
          object_id: object.id,
          coefficient: object.method === 'delete' ? 1 : Number(object.coef),
        },
      }
      object.methodLoading = true
      const data = await store.dispatch(modules[object.method], requestData)
      object.methodLoading = false
      if (data.code === 1) getObjectPersonal(object.id)
    }

    const changePerson = async (person, method) => {
      if (
        (person.edit.name_id && person.edit.coefficient) ||
        method === 'delete'
      ) {
        const methods = {
          edit: {
            url: `coefficient/${person.id}`,
            module: 'form/putForm',
            personal_id: person.edit.name_id,
            coefficient: Number(person.edit.coefficient),
          },
          add: {
            url: 'coefficient',
            module: 'form/update',
            personal_id: person.edit.name_id,
            coefficient: Number(person.edit.coefficient),
          },
          delete: {
            url: `coefficient/${person.id}`,
            module: 'form/delForm',
            personal_id: person.personal_id,
            coefficient: 1,
          },
        }

        const requestData = {
          url: methods[method].url,
          body: {
            period: props.date.date,
            personal_id: methods[method].personal_id,
            coefficient: methods[method].coefficient,
            object_id: person.object_id,
          },
        }
        person.edit.loading = true
        const responseData = await store.dispatch(
          methods[method].module,
          requestData
        )
        person.edit.loading = false
        if (responseData.code !== 2) {
          getObjectPersonal(person.object_id)
        } else {
          store.commit('notifies/showMessage', {
            content: `Коэффециент на данного линейщика уже существует`,
            color: 'error',
            timeout: 2000,
          })
        }
      }
    }

    onMounted(() => {
      getData()
    })

    watch(
      () => search.value,
      () => {
        getData()
      }
    )

    watch(
      () => panel.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (!data.value[index]?.loaded && data.value[index]?.id)
          getObjectPersonal(data.value[index].id)
      },
      { deep: true }
    )
    return {
      loading,
      initLoading,
      data,
      search,
      confirm,
      panel,
      autocompleteConfig,
      rules,
      permission,

      mask,
      addPerson,
      editPerson,
      changePerson,
      confirmDelete,
      deleteHandler,
      changeMethod,
      changeObjectCoef,
    }
  },
}
