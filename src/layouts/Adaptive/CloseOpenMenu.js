import { ref, onMounted } from 'vue'

export default function useMenuMobile() {
  let isOpenMenu = ref(false)

  onMounted(() => {
    isOpenMenu.value
  })
  // const StateMenuMob = () => {
  //   let menuMob = document.getElementById('mobileMenu')
  //   let bgMob = document.getElementById('bg__black')
  //   console.log('1111')
  //   console.log('до', stateMenuMobile)
  //   stateMenuMobile = !stateMenuMobile
  //   console.log('после', stateMenuMobile)
  //   if (stateMenuMobile) {
  //     console.log('хуй пизда')
  //     menuMob.classList.remove('mobile-menu__window--close')
  //     menuMob.classList.add('mobile-menu__window--open')
  //     bgMob.classList.add('bg__black--active')
  //     bgMob.classList.remove('bg__black')
  //     return stateMenuMobile
  //   } else {
  //     console.log('залупа лось')
  //     menuMob.classList.add('mobile-menu__window--close')
  //     menuMob.classList.remove('mobile-menu__window--open')
  //     bgMob.classList.remove('bg__black--active')
  //     bgMob.classList.add('bg__black')
  //     return stateMenuMobile
  //   }
  // }

  return isOpenMenu
}
