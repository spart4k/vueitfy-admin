import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import CustomIcons from '@/components/icons/index'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        topbar: '#FFFFFF',
        text: '#334D6E',
        navbar: '#FFFFFF',
      },
      dark: {
        topbar: '#252525',
        text: '#FFFFFF',
        navbar: '#252525',
      },
    },
  },
  icons: {
    values: {
      ...CustomIcons,
    },
  },
})
