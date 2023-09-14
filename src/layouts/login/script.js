// import Alert from '@/components/Alert'
import { ref } from 'vue'
// import { useRoute } from 'vue-router'

export default {
  name: 'login',
  components: {},
  setup() {
    // const route = useRoute()
    const name = 'login'
    const valid = ref(false)
    const firstname = ref('')
    const password = ref('')
    const nameRules = [(v) => !!v || 'Name is required']
    const passwordRules = [(v) => !!v || 'Password is required']
    // console.log('route', route)
    console.log('name', name)
    console.log('firstname', firstname.value)
    return {
      valid,
      firstname,
      password,
      nameRules,
      passwordRules,
      // route,
      name,
    }
  },
}
