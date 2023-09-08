<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <MailsDefault :data="mocData" />
  </div>
  <!--</Layout>-->
</template>

<script>
// import Vue from 'vue'
import MailsDefault from '@/components/Mails/default/index.vue'

export default {
  name: 'Mails-View',
  components: {
    MailsDefault,
  },
  data() {
    const mocData = {
      pageCases: [
        {
          label: 'Входящие',
          url: '$IconEdit',
          number: 21,
        },
        {
          label: 'Главное',
          url: '$IconEdit',
          number: 21,
        },
        {
          label: 'С вложениями',
          url: '$IconEdit',
          number: 21,
        },
        {
          label: 'Отправленные',
          url: '$IconEdit',
          number: 0,
        },
      ],
    }
    return {
      mocData,
    }
  },
  methods: {},
}
</script>
