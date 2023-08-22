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
        console.log('close')
        this.options.isShow = false
      }
    },
  },
  computed: {},
  watch: {
    'options.isShow': function (newVal) {
      console.log(newVal)
      if (newVal) {
        document.addEventListener('click', this.handlerOutside)
      } else {
        document.removeEventListener('click', this.handlerOutside)
      }
    },
  },
  mounted() {
    console.log(this.$el)
    console.log('this')
  },
}

// Vue.component('message', message)
