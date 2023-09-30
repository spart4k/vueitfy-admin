import { defineComponent } from 'vue'

const textInfo = defineComponent({
  name: 'TextInfo',
  props: {},
  setup() {
    const data = {
      creator: {
        key: 'Создатель',
        value: 'Сафонов Евгений',
      },
      type: {
        key: 'Создатель',
        value: 'Сафонов Евгений',
      },
      employee: {
        key: 'Создатель',
        value: 'Сафонов Евгений',
      },
      object: {
        key: 'Создатель',
        value: 'Сафонов Евгений',
      },
    }
    return {
      data,
    }
  },
})
export default textInfo
