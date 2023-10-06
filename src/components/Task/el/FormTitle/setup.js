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
  // setup(props) {

  // },
})
export default docsRequired
