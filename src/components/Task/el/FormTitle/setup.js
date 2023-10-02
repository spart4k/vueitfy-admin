import { defineComponent } from 'vue'

const FileReader = defineComponent({
  name: 'FileReader',
  props: {},
  setup() {
    return {}
  },
  props: [],
  data() {
    return {}
  },
  methods: {
    previevImage() {},
  },
  computed: {
    calcString: {
      get() {
        return 'awdadwwa'
      },
      set(newVal) {
        return newVal + '====='
      },
    },
  },
})
export default FileReader
