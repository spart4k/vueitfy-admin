import { ref, onMounted } from 'vue'
import FormPopupPhoto from '@/components/Task/el/FormPopupPhoto/index.vue'

export default {
  name: 'DocsAccepting',
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
    hideActions: {
      type: Boolean,
      default: false,
    },
    isShowRemove: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const isShowAdd = ref(true)
    const isShowCansel = ref(true)
    const clickAdd = () => {
      isShowAdd.value = false
      isShowCansel.value = true
      emit('confirmed', { id: props.docs.id })
    }
    const clickDel = () => {
      isShowAdd.value = true
      isShowCansel.value = false
      emit('unconfirmed', { id: props.docs.id })
    }
    const clickRemove = () => {
      emit('remove', { id: props.docs.id })
    }
    onMounted(() => {
      if (props.docs.valid === 1) {
        isShowAdd.value = true
        isShowCansel.value = false
      } else if (props.docs.valid === 2) {
        isShowAdd.value = false
        isShowCansel.value = true
      }
    })
    return {
      isShowAdd,
      isShowCansel,
      clickAdd,
      clickDel,
      clickRemove,
    }
  },
}
