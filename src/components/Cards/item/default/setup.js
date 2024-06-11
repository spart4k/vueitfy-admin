import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
// import MailsLetterExpanded from '../letter/expanded/index.vue'
import moment from 'moment'
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
    addPermission: {
      type: Boolean,
      default: false,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const editPermission = computed(
      () =>
        props.addPermission &&
        store.state.user.id === props.data.from_account_id
    )

    const accounting = computed(() =>
      [12, 22].includes(store.state.user.permission_id)
    )

    const convertData = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    return {
      convertData,
      editPermission,
      accounting,
    }
  },
}
