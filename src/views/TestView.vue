<template>
  <div class="testRed">
    {{ testRef }}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Test-View',
  setup() {
    const testRef = ref('testS')
    return {
      testRef,
    }
  },
}
</script>

<style lang="scss" scoped>
.testRed {
  font-size: $fontSizeTest;
}
</style>
