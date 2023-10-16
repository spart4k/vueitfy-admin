import { ref, onMounted, onUnmounted, computed } from 'vue'

export default function useMobile() {
  const clientWidth = ref(null)

  const onResize = () => {
    clientWidth.value = document.body.clientWidth
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const isMobile = computed(() => (clientWidth.value <= 758 ? true : false))

  onMounted(() => {
    onResize()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
  return isMobile
}
