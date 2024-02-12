<template>
  <LoginLayout class="">
    <Logim />
  </LoginLayout>
</template>

<script>
import LoginLayout from '@/layouts/login'
import Logim from '@/components/Login'
export default {
  name: 'LoginView',
  components: {
    LoginLayout,
    Logim,
  },
}
</script>

<style scoped>
.login {
  /*display: flex;*/
}
</style>
