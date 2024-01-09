import Vue, { ref, onMounted, computed } from 'vue'
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
    const context = {
      root: {
        ctx,
        store,
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
    //       console.log(props.tab.formData[el.name])
    //       Vue.set(fields[fieldName], 'default', props.tab.formData[el.name])
    //       if (el.type === 'autocomplete' && el.alias) {
    //         Vue.set(fields[fieldName], 'default', props.tab.formData[el.alias])
    //       }
    //     })
    //   })
    //   console.log(fields)
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
      console.log(rows.value)
      const isValid = rows.value.every((el) => el.validate(true))
      console.log(isValid, 'isValid')
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
        manager: 25, // ? миша отправит с объектом
        avatar_with_user_key_id: null,
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
        console.log(props.tab.formData.date_target[index], 'root')
        person.date_target = targets.value[index].date
        if (el.formData.print_form_key) {
          person.print_form_key = el.formData.print_form_key
        }
        console.log(person, 'person')
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
      console.log(isValid)
      const result = await makeRequest()
      console.log(result, 'RESULT')
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
          console.log(findedIndex)
          if (el.code === 2) {
            targets.value[findedIndex].error =
              'На данную дату уже создано назначение'
          }
        })
      }
      emit('getItems')
      //emit('closePopup')
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
    //   console.log('getPrev')
    //   prevTab.value = props.tabs[props.activeTab - 1]
    //   if (props.tab.fromLastTab) {
    //     //const field = prevTab.value.find((el) => el.name === )
    //     const fields = props.tab.fromLastTab.map((el) => {
    //       const findEl = prevTab.value.fields.find((tabField) => {
    //         //console.log(tabField[el.alias], el.alias)
    //         return tabField[el.alias] === el.name
    //       })
    //       console.log(findEl)
    //       if (el.type === 'list') {
    //         console.log(findEl.items)
    //         console.log(formData)
    //         for (let key in formData) {
    //           const splited = key.split('/')
    //           console.log(splited)
    //           if (splited[1] === el.nameInTab) {
    //             console.log(splited)
    //             formData[key] = findEl.items.find(
    //               (elItem) => elItem.id === props.tab.formData[el.name]
    //             ).name
    //             console.log(formData[key])
    //           }
    //         }
    //       }
    //     })
    //   }
    // }
    onMounted(async () => {
      // if (props.tabs && props.activeTab) getDataFromPrevTav()
      //await getData()
      props.tab.formData.date_target.forEach((el) => {
        const target = {
          date: el,
          error: '',
          id: el + '_' + props.tab.formData.personal_id,
        }
        targets.value.push(target)
      })
    })
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
    }
  },
}
