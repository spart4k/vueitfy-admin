import { ref, onMounted, onUnmounted, computed } from 'vue'

export default function useMobile() {
  const clientWidth = ref(null)

  const onResize = () => {
    console.log('resize')
    clientWidth.value = document.body.clientWidth
  }

  const isMobile = computed(() => (clientWidth.value <= 758 ? true : false))

  onMounted(() => {
    onResize()
    window.addEventListener('resize', onResize)
    console.log(onResize())
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    console.log(onResize())
  })
  return isMobile
}
