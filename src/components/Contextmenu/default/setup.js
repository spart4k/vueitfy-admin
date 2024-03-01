//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { computed } from 'vue'
import store from '@/store'
import _ from 'lodash'

export default {
  name: 'v-contextmenu',
  components: {},
  props: {
    options: {
      type: Object,
      defualt: () => {},
    },
  },
  data() {
    return {}
  },
  methods: {
    handlerOutside(e) {
      const context = document.querySelector('.v-contextmenu')
      if (context.contains(e.target)) {
        // Clicked in box
        return
      } else {
        // Clicked outside the box
        this.options.isShow = false
      }
    },
  },
  computed: {},
  watch: {
    'options.isShow': function (newVal) {
      if (newVal) {
        document.addEventListener('click', this.handlerOutside)
      } else {
        document.removeEventListener('click', this.handlerOutside)
      }
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const permission = computed(() => store.state.user.permission_id)
    const is_personal_vertical = computed(
      () => store.state.user.is_personal_vertical
    )
    const directions = computed(() =>
      JSON.parse(store.state.user.direction_json)
    )
    const handlerClick = (action) => {
      //if (props.options.)
      //const event = action.type

      emit('handlerContext', { action, row: props.options.row })
    }
    const availableContext = computed(() => {
      const checkIncludesPermissions = (el) => {
        if (!el.permissions) return true

        return el.permissions.includes(permission.value)
      }
      return props.options.actions.actions.filter((action) => {
        if (!action.isShow) return action
        else {
          return action.isShow.condition.some((el) => {
            return checkIncludesPermissions(el) === el.type
          })
          // if ()
        }
      })
    })
    const isReadonly = (action) => {
      const checkIncludesData = (el) => {
        const source = eval(el.target)
        let result
        if (el.array) {
          result = _.isEqual(el.value, source[el.action])
        } else {
          result = el.value.includes(source[el.action])
        }
        return result
      }
      const checkIncludesPermissions = (el) => {
        return el.permission_id.includes(permission.value)
      }
      const checkIncludesVertical = (el) => {
        return el.is_personal_vertical.includes(is_personal_vertical.value)
      }
      if (typeof action.readonly === 'boolean') return action.readonly
      else if (typeof action.readonly === 'object') {
        if (action.readonly.condition?.length) {
          const condition = () =>
            action.readonly.condition.every((conditionEl) => {
              if (
                conditionEl.target === 'formData' &&
                !conditionEl.permissions
              ) {
                return checkIncludesData(conditionEl) && conditionEl.type
              } else if (
                conditionEl.permission_id?.length &&
                !conditionEl.target
              ) {
                return checkIncludesPermissions(conditionEl) && conditionEl.type
              } else if (
                conditionEl.is_personal_vertical?.length &&
                !conditionEl.target
              ) {
                return checkIncludesVertical(conditionEl) && conditionEl.type
              } else {
                return (
                  checkIncludesData(conditionEl) &&
                  checkIncludesPermissions(conditionEl) === conditionEl.type
                )
              }
            })

          action.readonly.value = condition()
          return action.readonly.value
        }
      }
    }

    const availablePanelBtn = computed(() => {
      const checkIncludesPermissions = (el) => {
        if (!el.permissions) return true

        return el.permissions.includes(permission.value)
      }
      const checkIncludesDirections = (el) => {
        //return el.direction_id.includes(directions.value)

        if (!el.direction_id) return true
        else {
          return !!_.intersection(el.direction_id, directions.value).length
        }
      }
      return props.options.actions.actions.filter((btn) => {
        if (!btn.isShow) return btn
        else {
          return btn.isShow.condition.some((el) => {
            return (
              checkIncludesPermissions(el) &&
              checkIncludesDirections(el) === el.type
            )
          })
          // if ()
        }
      })
    })
    return {
      handlerClick,
      availablePanelBtn,
      isReadonly,
      availableContext,
    }
  },
}

// Vue.component('message', message)
