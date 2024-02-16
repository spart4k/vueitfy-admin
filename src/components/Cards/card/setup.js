import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import cards from './cards.js'

export default {
  name: 'Cards-Item',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const flipped = ref(false)
    const cardStyle = ref(cards[props.data.bank_id])

    return {
      flipped,
      cardStyle,
    }
  },
}
