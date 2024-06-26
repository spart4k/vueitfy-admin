//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router/composables'
// import { tableApi } from '@/api'
import MailsLetter from '../letter/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'
const container = {
  name: 'Container',
  components: {
    MailsLetter,
    MailsLetterExpanded,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    selectedMails: {
      type: Array,
      default: () => [],
    },
    filterData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const { emit } = context
    const activeMail = ref(null)

    const lowerItems = ref(null)
    const upperItems = ref(null)
    const container = ref(null)
    const containerBox = ref(null)

    const trigger = ref({
      left: false,
      right: false,
    })

    const triggerCheck = () => {
      let item = container
      if (route?.query?.mail) item = containerBox
      if (item?.value?.scrollLeft) {
        trigger.value.left = true
      } else {
        trigger.value.left = false
      }
      if (
        Math.ceil(item?.value?.offsetWidth + item?.value?.scrollLeft) >=
        item?.value?.scrollWidth
      ) {
        trigger.value.right = false
      } else {
        trigger.value.right = true
      }
    }

    const scrollContainer = (val) => {
      let item = container
      if (route?.query?.mail) item = containerBox
      item.value.scrollLeft = item.value.scrollLeft + val
    }

    const setActiveMail = async (val, upIndex, lowIndex) => {
      if (val.id !== Number(route?.query?.mail)) {
        emit('setActiveMail', val)
        nextTick(() => {
          lowerItems.value[
            lowerItems.value.findIndex((e) => e.data.id === val.id)
          ].$el.scrollIntoView({
            behavior: 'smooth',
          })
        })
        triggerCheck()
        let responseData
        // if (route?.query?.filter === 'sent')
        //   responseData = await store.dispatch('mail/getSendedMessage', val.id)
        // else responseData = await store.dispatch('mail/getMail', val.id)
        activeMail.value = val
        // activeMail.value = responseData.data[0]
        // Vue.set(activeMail.value, 'text', responseData.textfile)
        if (
          !val.is_read &&
          route?.query?.filter !== 'sent' &&
          route?.query?.filter !== 'trash'
        ) {
          const request = {
            content: {
              is_read: true,
            },
            id: val.id,
          }
          await store.dispatch('mail/changeMail', request)
          val.is_read = true
          emit('decreaseUnreadMailsCount')
        }
      }
    }
    const getPagination = (val) => {
      let rowItem = props.data.find(
        (x) => x.id === val[0].target.__vue__.data.box_id
      )
      if (route?.query?.filter === 'folder') rowItem = props.data[0]
      const mailIndex = rowItem?.mails?.rows.findIndex(
        (x) => x.id === val[0].target.__vue__.data.id
      )
      if (rowItem?.mails?.rows?.length === mailIndex + 1) {
        if (
          route?.query?.filter === 'folder' ||
          route?.query?.filter === 'box' ||
          route?.query?.filter === 'trans'
        )
          rowItem = props.data[0]
        if (val[0].isIntersecting) {
          emit('getPagination', rowItem)
        }
      }
    }

    watch(
      [
        () => container?.value?.scrollLeft,
        () => containerBox?.value?.offsetWidth,
      ],
      () => {
        triggerCheck()
      }
    )

    watch(
      () => route?.query?.compose,
      () => {
        if (route?.query?.compose === 'new') activeMail.value = null
      }
    )

    onMounted(() => {
      window.addEventListener('resize', triggerCheck)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', triggerCheck)
    })

    // watch(
    //   () =>
    //     props.data[
    //       props.data.findIndex((x) => x.id === Number(route?.query?.box))
    //     ]?.mails?.rows,
    //   async () => {
    //     if (route?.query?.mail) {
    //       // const responseData = await store.dispatch(
    //       //   'mail/getMail',
    //       //   Number(route?.query?.mail)
    //       // )
    //       // const mail = props.data
    //       //   .find((x) => x.id === Number(route?.query?.box))
    //       //   .mails?.rows?.find((x) => x.id === Number(route?.query?.mail))
    //       // if (mail) {
    //       //   activeMail.value = mail
    //       // } else {
    //       //   activeMail.value = responseData.data[0]
    //       // }
    //       // Vue.set(activeMail.value, 'text', responseData.textfile)
    //       // nextTick(() => {
    //       //   if (
    //       //     lowerItems.value.findIndex(
    //       //       (e) => e.data.id === Number(route?.query?.mail)
    //       //     ) !== -1
    //       //   ) {
    //       //     lowerItems?.value[
    //       //       lowerItems.value.findIndex(
    //       //         (e) => e.data.id === Number(route?.query?.mail)
    //       //       )
    //       //     ]?.$el?.scrollIntoView({
    //       //       behavior: 'smooth',
    //       //     })
    //       //   } else {
    //       //     const upIndex = props.data.findIndex(
    //       //       (e) => e.id === Number(route?.query?.box)
    //       //     )
    //       //     upperItems.value[upIndex].scrollIntoView({
    //       //       behavior: 'smooth',
    //       //     })
    //       //   }
    //       // })
    //     }
    //   }
    // )
    return {
      activeMail,

      lowerItems,
      upperItems,
      container,
      containerBox,
      trigger,

      triggerCheck,
      setActiveMail,
      getPagination,
      scrollContainer,
    }
  },
}
export default container
