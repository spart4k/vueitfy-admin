import { ref } from 'vue'

export default {
  name: 'dataNavbar',
  setup() {
    const dataNavbar = ref({
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    })
    return {
      dataNavbar,
    }
  },
}
