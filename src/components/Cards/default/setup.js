import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import CardsItem from '../item/index.vue'

export default {
  name: 'Cards',
  components: {
    CardsItem,
  },
  props: {},
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // console.log('cards', cards)

    const cards = ref([
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 1,
        id: 1,
      },
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 2,
        id: 2,
      },
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 1,
        id: 3,
      },
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 2,
        id: 4,
      },
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 2,
        id: 5,
      },
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 1,
        id: 6,
      },
      {
        vidana: '20.01.2023',
        block: '20.01.2024',
        bik: '888 888 888',
        lico: 'Координатор',
        validity: '10/23',
        cvv: '265',
        name: 'Сафонов Евгений',
        number: '1234 5678 9123 4567',
        bank_id: 2,
        id: 7,
      },
    ])

    return {
      cards,
    }
  },
}
