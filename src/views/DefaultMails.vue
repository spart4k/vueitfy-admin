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
      filters: {
        colors: [
          {
            color: '#4CAF50',
            id: 1,
          },
          {
            color: '#FF5252',
            id: 2,
          },
          {
            color: '#4CAF50',
            id: 3,
          },
          {
            color: '#FF5252',
            id: 4,
          },
          {
            color: '#4CAF50',
            id: 5,
          },
          {
            color: '#FF5252',
            id: 6,
          },
          {
            color: '#4CAF50',
            id: 7,
          },
        ],
        pageCases: [
          {
            label: 'Входящие',
            url: '$IconMailActive',
            number: 21,
            query: 'vhod',
          },
          {
            label: 'Главное',
            url: '$IconStarMail',
            number: 21,
            query: 'main',
          },
          {
            label: 'С вложениями',
            url: '$IconAttachMail',
            number: 21,
            query: 'svloj',
          },
          {
            label: 'Отправленные',
            url: '$IconSendMail',
            number: 0,
            query: 'sended',
          },
          {
            label: 'Удаленные',
            url: '$IconDelete',
            number: 0,
            query: 'deleted',
          },
          {
            label: 'Черновики',
            url: '$IconDocument',
            number: 0,
            query: 'drafts',
          },
        ],
        unreadeanle: 16,
        folders: [
          {
            color: '#4CAF50',
            id: 1,
            name: 'М-лоск',
          },
        ],
        cases: [
          {
            color: '#FF5252',
            id: 2,
            name: 'F-лоск',
          },
        ],
      },
      mails: [
        {
          company: {
            name: 'R-лоск',
            color: '#007BFF',
          },
          mail: [
            {
              id: 0,
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
          ],
        },
        {
          company: {
            name: 'R-лоск',
            color: '#007BFF',
          },
          mail: [
            {
              id: 2,
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
          ],
        },
        {
          company: {
            name: 'R-лоск',
            color: '#007BFF',
          },
          mail: [
            {
              id: 3,
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
            {
              from: {
                username: 'Isagi Yoichu',
                email: 'yoichu@gmail.com',
              },
              content: {
                theme: 'CPM-100',
                content: 'gfdfdgfdggfdgf',
                files: [
                  {
                    id: 1,
                    file: 'asdsad',
                  },
                ],
                date: '00zxzz055474-334:342qsfd',
              },
              tags: {
                bookmarked: false,
                favorite: false,
                colorTags: [
                  {
                    color: '#4c5678',
                    id: 1,
                  },
                ],
              },
            },
          ],
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
