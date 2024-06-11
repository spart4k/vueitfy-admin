import Vue, { ref, onMounted, computed, toRef, watch, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/Autocomplete/form'
import Row from '../row/default/index.vue'
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
    const targets = ref([])
    provide('targets', targets.value)
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
    const params = props?.tab?.lists
    const data = params
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const rows = ref([])
    const changeForm = async ({ url, module }) => {
      rows.value.forEach((el, index) => {
        // validate = !el.validate()
        el.personalRef.forEach((pers) => {
          pers.validate(true)
        })
      })
      // let valid = false
      let valid = rows.value.every((el, index) => {
        // validate = !el.validate()
        return el.personalRef.every((pers) => {
          return pers.validate(true)
        })
      })
      if (!valid) return
      // rows.value.forEach((el) => el.validate(true))

      // const isValid = rows.value.every((el) => el.validate(true))

      // if (!isValid) return
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
      const accum = []
      const persons = []
      const persRefs = []
      rows.value.forEach((el, index) => {
        // validate = !el.validate()
        el.personalRef.forEach((pers, persIndex) => {
          persRefs.push(pers)
        })
      })
      targets.value.forEach((el, index) => {
        // validate = !el.validate()
        const person = { ...defaultData, ...persRefs[index].formData }
        person.tid = el.date + '_' + el.persId
        person.date_target = el.date
        person.personal_id = el.persId
        person.vid_vedomost_id =
          persRefs[index].formData.vid_vedomost_id_logistic
        person.vid_vedomost_id_logistic = undefined
        person.print_form_key = person.print_form_key
          ? person.print_form_key
          : undefined
        person.account_name = undefined
        if (persRefs[index].formData.print_form_key) {
          person.print_form_key = persRefs[index].formData.print_form_key
        }
        persons.push(person)
      })

      const { makeRequest } = useRequest({
        context,
        request: () =>
          store.dispatch(module, {
            url,
            body: { persons },
          }),
        successMessage: `Успешно создано ${
          rows.value.length * props?.tab?.formData.personal_id.length
        } назначений`,
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
      props?.tab?.formData.date_target.forEach((el) => {
        props?.tab?.formData.personal_id.forEach((pers) => {
          const replaced = el.replaceAll('-', '.')
          const dateFormating = replaced.split('.')
          const target = {
            date: el,
            error: '',
            id: el + '_' + pers,
            persId: pers,
            formatedDate:
              dateFormating[2] +
              '.' +
              dateFormating[1] +
              '.' +
              dateFormating[0] +
              '_' +
              pers,
          }
          targets.value.push(target)
        })
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
        if (activeTab.value === 1) targets.value = []
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
