import { defineComponent } from 'vue'

const docsRequired = defineComponent({
  name: 'DocsRequired',
  props: {
    docs: {
      type: Object,
    },
    listNames: {
      type: Object,
    },
  },
  data() {
    return {
      isShowAdd: true,
      isShowCansel: true,
    }
  },

  methods: {
    clickAdd() {
      this.isShowAdd = false
      this.isShowCansel = true
      this.$emit('confirmed', { docs_id: this.docs.contributed })
    },
    clickDel() {
      this.isShowCansel = false
      this.isShowAdd = true
      this.$emit('unconfirmed', { docs_id: this.docs.contributed })
    },
  },
  // setup(props) {

  // },
})
export default docsRequired
