import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
// import MailsLetterExpanded from '../letter/expanded/index.vue'
import Card from '../../card/index.vue'

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

    const card = {
      info: {
        vidana: 'Выдана',
        block: 'Блокировка',
        bik: 'БИК',
        lico: 'Юр. лицо',
      },
      status: {
        1: {
          name: 'Не выдана',
          color: 'disabled',
        },
        2: {
          name: 'Выдана',
          color: 'success',
        },
        3: {
          name: 'Открыта',
          color: 'primary',
        },
        4: {
          name: 'Закрыта',
          color: 'error',
        },
      },
    }

    return {
      card,
    }
  },
}
