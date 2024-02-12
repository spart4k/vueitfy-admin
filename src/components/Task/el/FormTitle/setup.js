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
    docName: {
      type: String,
    },
  },
  data() {
    return {
      isShowAdd: true,
      isShowCansel: true,
      isImgPopupOpen: false,
    }
  },

  methods: {
    clickAdd() {
      this.isShowAdd = false
      this.isShowCansel = true
      this.$emit('confirmed', { id: this.docs.id })
    },
    clickDel() {
      this.isShowCansel = false
      this.isShowAdd = true
      this.$emit('unconfirmed', { id: this.docs.id })
    },
  },
})
export default docsRequired
