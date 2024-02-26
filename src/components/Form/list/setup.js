import Vue, { ref, onMounted, computed, toRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/Autocomplete'
import Row from './row/index.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Form-Rows',
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Autocomplete,
    Row,
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        ctx,
        store,
        route,
        router,
      },
    }
    const { emit } = ctx
    const loading = ref(false)
    // const fields = () => {
    //   const fields = {}
    //   props.tab.formData.date_target.forEach((date) => {
    //     props.tab.fields.forEach((el) => {
    //       const { validations } = el
    //       if (!el.isShow) return
    //       const fieldName = date + '/' + el.name
    //       Vue.set(fields, fieldName, {})
    //       Vue.set(fields[fieldName], 'validations', validations)
    //
    //       Vue.set(fields[fieldName], 'default', props.tab.formData[el.name])
    //       if (el.type === 'autocomplete' && el.alias) {
    //         Vue.set(fields[fieldName], 'default', props.tab.formData[el.alias])
    //       }
    //     })
    //   })
    //
    //   return fields
    // }
    const prevTab = ref({})
    const params = props.tab.lists
    const data = params
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const rows = ref([])
    const targets = ref([])
    const changeForm = async ({ url, module }) => {
      rows.value.forEach((el) => el.validate(true))

      const isValid = rows.value.every((el) => el.validate(true))

      if (!isValid) return
      const {
        object_id,
        personal_id,
        doljnost_id,
        date_target,
        status,
        type_shift,
        with_nutrition,
        direction_id,
        sum_nutrition,
        vid_vedomost_id_logistic,
        manager_id,
      } = props.tab.formData
      const defaultData = {
        object_id,
        personal_id,
        account_id: store.state.user.id, // ?
        doljnost_id,
        //date_target: date_target[0],
        status,
        direction_id,
        comment: null,
        manager: manager_id, // ? миша отправит с объектом
        avatar_with_user_key_id: null,
        vid_vedomost_id: vid_vedomost_id_logistic,
        type_shift,
        with_nutrition,
        sum_nutrition,
      }
      let validate = null
      const persons = rows.value.map((el, index) => {
        // validate = !el.validate()
        const person = { ...defaultData }
        person.avatar_with_user_key_id = el.formData.avatar_with_user_key_id
        person.tid = targets.value[index].id

        person.date_target = targets.value[index].date
        if (el.formData.print_form_key) {
          person.print_form_key = el.formData.print_form_key
        }

        return person
      })
      const { makeRequest } = useRequest({
        context,
        request: () =>
          store.dispatch(module, {
            url,
            body: { persons },
          }),
        successMessage: `Успешно создано ${rows.value.length} назначений`,
      })

      const result = await makeRequest()

      if (result?.data?.length) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Некорректные назначения:',
          timeout: 1000,
        })
        result.data.forEach((el) => {
          const findedIndex = targets.value.findIndex(
            (target) => target.id === el.tid
          )

          const objectItems = props.tabs[0].fields.find(
            (field) => field.name === 'object_id'
          ).items
          const { name } = objectItems.find(
            (object) => object.id === props.tab.formData.object_id
          )
          const date = el.tid.split('_')[0]
          const dateFormated =
            date.split('-')[2] +
            '.' +
            date.split('-')[1] +
            '.' +
            date.split('-')[0]
          if (el.code === 1) {
            targets.value[
              findedIndex
            ].error = `На объект ${name} на дату ${dateFormated} выбранная учётная запись уже назначена`
          }
          if (el.code === 2) {
            targets.value[
              findedIndex
            ].error = `На объект ${name} на выбранную смену  ${dateFormated} числа выбранный сотрудник уже назначен`
          }
          emit('getItems')
        })
      } else {
        emit('getItems')
        emit('closePopup')
      }
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
    } = useForm({
      form: props.tab,
      // fields: fields(),
      context,
      loading,
      makeRequestList,
      changeForm,
    })
    // const getDataFromPrevTav = () => {
    //
    //   prevTab.value = props.tabs[props.activeTab - 1]
    //   if (props.tab.fromLastTab) {
    //     //const field = prevTab.value.find((el) => el.name === )
    //     const fields = props.tab.fromLastTab.map((el) => {
    //       const findEl = prevTab.value.fields.find((tabField) => {
    //         return tabField[el.alias] === el.name
    //       })
    //       if (el.type === 'list') {
    //         for (let key in formData) {
    //           const splited = key.split('/')
    //
    //           if (splited[1] === el.nameInTab) {
    //
    //             formData[key] = findEl.items.find(
    //               (elItem) => elItem.id === props.tab.formData[el.name]
    //             ).name
    //
    //           }
    //         }
    //       }
    //     })
    //   }
    // }
    const buildTargets = () => {
      props.tab.formData.date_target.forEach((el) => {
        const target = {
          date: el,
          error: '',
          id: el + '_' + props.tab.formData.personal_id,
        }
        targets.value.push(target)
      })
    }
    onMounted(async () => {
      // if (props.tabs && props.activeTab) getDataFromPrevTav()
      //await getData()
      buildTargets()
    })
    const activeTab = toRef(props, 'activeTab')
    watch(
      () => activeTab.value,
      () => {
        targets.value = []
        buildTargets()
      }
    )
    return {
      clickHandler,
      loading,
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      changeAutocomplete,
      getData,
      changeSelect,
      prevTab,
      rows,
      targets,
      activeTab,
    }
  },
}
