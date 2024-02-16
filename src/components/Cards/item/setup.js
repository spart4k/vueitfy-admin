import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
// import MailsLetterExpanded from '../letter/expanded/index.vue'
import Card from '../card/index.vue'

export default {
  name: 'Cards-Item',
  components: {
    Card,
  },
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

    const cardInfo = {
      vidana: 'Выдана',
      block: 'Блокировка',
      bik: 'БИК',
      lico: 'Юр. лицо',
    }

    return {
      cardInfo,
    }
  },
}
