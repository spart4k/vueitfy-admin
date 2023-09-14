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
          url: '$IconMailActive',
          number: 21,
        },
        {
          label: 'Главное',
          url: '$IconStarMail',
          number: 21,
        },
        {
          label: 'С вложениями',
          url: '$IconAttachMail',
          number: 21,
        },
        {
          label: 'Отправленные',
          url: '$IconSendMail',
          number: 0,
        },
        {
          label: 'Удаленные',
          url: '$IconDelete',
          number: 0,
        },
        {
          label: 'Черновики',
          url: '$IconDocument',
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
