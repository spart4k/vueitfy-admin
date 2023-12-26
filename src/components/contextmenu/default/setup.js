//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)

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
    const handlerClick = (action) => {
      //if (props.options.)
      //const event = action.type
      console.log(action)
      emit('handlerContext', { action, row: props.options.row })
      console.log('handlerClick')
    }
    return {
      handlerClick,
    }
  },
}

// Vue.component('message', message)
