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
    const objects = ref([])
    const panel = ref([])
    const deletedObject = ref({})
    const confirm = ref({
      isShow: false,
      type: null,
    })
    const permission = computed(() =>
      [3, 4, 8, 17].includes(store.state.user.permission_id)
    )

    const disabled = computed(() =>
      [3].includes(store.state.user.permission_id)
    )

    const autocompleteConfig = {
      label: 'Линейщик',
      name: 'status_zr',
      items: [],
      solo: true,
      required: true,
      url: 'get/pagination_list/personal_coef',
      hideDetails: true,
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
    const getObjects = async () => {
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
        objects.value = await store.dispatch('table/get', requestData)
        objects.value.forEach((item, index) => {
          Vue.set(objects.value, index, {
            content: null,
            loading: false,
            footer: false,
            method: null,
            methodLoading: false,
            coef: '',
            objectPanel: [],
            ...item,
          })
        })
        loading.value = false
        initLoading.value = false
        controller = undefined
      } catch (e) {
        return e
      }
    }

    const getServices = async (index, refresh = false) => {
      const object = objects.value[index]
      if (!refresh) {
        if (object.content) return
        panel.value = _.without(panel.value, index)
        if (object.loading) return
      }
      const requestData = {
        url: 'get/coefficient/services',
        data: {
          period: props.date.date,
          search: search.value,
          object_id: object.id,
        },
      }
      object.loading = true
      object.content = await store.dispatch('table/get', requestData)
      object.loading = false
      object.content?.forEach((service, index) => {
        Vue.set(object.content, index, {
          content: null,
          loading: false,
          footer: false,
          method: null,
          methodLoading: false,
          object_id: object.id,
          coef: '',
          ...service,
        })
      })
      if (!refresh) {
        panel.value.push(index)

        watch(
          () => object.objectPanel,
          (newVal, oldVal) => {
            let index
            if (newVal.length > oldVal.length)
              index = _.difference(newVal, oldVal)[0]
            else index = _.difference(oldVal, newVal)[0]
            if (object.content[index]?.id) getPersonal(index, object.id)
          },
          { deep: true }
        )
      }
    }

    const getPersonal = async (index, object_id, refresh = false) => {
      const object = objects.value.find((x) => x.id === object_id)
      const service = object.content[index]
      if (!refresh) {
        if (service.content) return
        object.objectPanel = _.without(object.objectPanel, index)
        if (service.loading) return
      }
      const requestData = {
        url: 'get/coefficient/personals',
        data: {
          period: props.date.date,
          search: search.value,
          object_id: object.id,
          service_id: service.id,
        },
      }
      service.loading = true
      service.content = await store.dispatch('table/get', requestData)
      service.loading = false
      service.content?.forEach((item) => {
        Vue.set(item, 'edit', {})
        Vue.set(item, 'service_id', service.id)
        Vue.set(item.edit, 'isShow', false)
        Vue.set(item.edit, 'loading', false)
        Vue.set(item.edit, 'name_id')
        Vue.set(item.edit, 'coefficient')
        Vue.set(item.edit, 'filter', [
          { alias: 'service_id', value: service.id },
          { alias: 'object_id', value: object.id },
          { alias: 'period', value: props.date.date },
        ])
      })
      if (!refresh) object.objectPanel.push(index)
    }

    const addPerson = (service, object) => {
      service.content.unshift({
        service_id: service.id,
        object_id: object.id,
        added: true,
        edit: {
          isShow: true,
          name_id: null,
          coefficient: null,
          loading: false,
          filter: [
            { alias: 'service_id', value: service.id },
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

    const changeObjectCoef = async (object, service = false) => {
      const modules = {
        add: 'form/update',
        edit: 'form/putForm',
        delete: 'form/delForm',
      }
      const requestData = {
        url: 'coefficient/object',
        body: {
          period: props.date.date,
          object_id: service ? object.object_id : object.id,
          service_id: service ? object.id : undefined,
          coefficient: object.method === 'delete' ? 1 : Number(object.coef),
        },
      }
      object.methodLoading = true
      const data = await store.dispatch(modules[object.method], requestData)
      object.methodLoading = false
      if (data.code === 1) {
        if (service) {
          const obj = objects.value.find((x) => x.id === object.object_id)
          const serviceIndex = obj.content.findIndex((x) => x.id === object.id)
          getPersonal(serviceIndex, object.object_id, true)
        } else {
          const objIndex = objects.value.findIndex((x) => x.id === object.id)
          await getServices(objIndex, true)
          object.objectPanel.forEach((item) => {
            getPersonal(item, object.id, true)
          })
        }
      }
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
            service_id: person.service_id,
          },
        }
        person.edit.loading = true
        const responseData = await store.dispatch(
          methods[method].module,
          requestData
        )
        person.edit.loading = false
        if (responseData.code !== 2) {
          const object = objects.value.find((x) => x.id === person.object_id)
          const serviceIndex = object.content.findIndex(
            (x) => x.id === person.service_id
          )
          getPersonal(serviceIndex, person.object_id, true)
        } else {
          store.commit('notifies/showMessage', {
            content: `Коэффециент на данного линейщика уже существует`,
            color: 'error',
            timeout: 2000,
          })
        }
      }
    }

    watch(
      () => search.value,
      () => {
        getObjects()
      },
      { deep: true, immediate: true }
    )

    watch(
      () => panel.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (objects.value[index]?.id) getServices(index)
      },
      { deep: true }
    )

    return {
      loading,
      initLoading,
      objects,
      search,
      confirm,
      panel,
      autocompleteConfig,
      permission,
      disabled,

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
