import { defineComponent } from 'vue'
import FormPopupPhoto from '@/components/Task/el/FormPopupPhoto/index.vue'

const docsRequired = defineComponent({
  name: 'DocsRequired',
  components: {
    FormPopupPhoto,
  },
  props: {
    docs: {
      type: Object,
    },
    name: {
      type: String,
    },
  },
  data: function () {
    return {
      isImgPopupOpen: false,
    }
  },
})
export default docsRequired
