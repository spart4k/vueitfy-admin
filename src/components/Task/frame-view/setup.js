import { defineComponent, ref } from 'vue'
import FirstPopupView from '../first-popup-view/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'

const taskTypeName = {
  1: 'Подтверждение назначения',
}

const taskStatusName = {
  1: {
    name: 'В работе',
    class: 'blue',
  },
}

const mockData = {
  task_type_id: 1,
  task: {
    id: 1,
    process: 10,
    process_id: 1,
    to_account_id: 10,
    from_account_id: 11,
    task_type_id: 2,
    entity: 7,
    entity_id: 3,
    date_create: '2023-10-02 2:45:34',
    time_execution: 3298746,
    date_status: '2023-10-02 2:45:34',
    del: 0,
    status: 1,
    note: 'Comment',
    type_parent_action: 123,
    parent_action: 111,
    from_fio: 'Иванов Иван Иванович',
    to_fio: 'Петров Петр Петрович',
  },
  entity: {},
  data: {},
}

const task = defineComponent({
  name: 'Task',
  components: {
    FirstPopupView,
    SecondPopupView,
  },
  props: {},
  setup() {
    const typeName = taskTypeName
    const statusName = taskStatusName
    let data = ref(mockData)

    // const formatDate = (date) => {
    //   const newDate = new Date(date)
    //   const resDate = newDate.
    // }

    return { data, typeName, statusName }
  },
})
export default task
