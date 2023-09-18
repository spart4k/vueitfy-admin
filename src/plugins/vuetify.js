import Vue from 'vue'
import Vuetify from 'vuetify'
import listDark from '../layouts/Theme/ChangeTheme'
import 'vuetify/dist/vuetify.min.css'

import CustomIcons from '@/components/icons/index'

Vue.use(Vuetify)
console.log('listDark+++++', listDark)
console.log('listDark+++++', listDark)
export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
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
        background: '#ffffff',
        pageBackground: '#F5F6F8',
        disabled: '#C2CFE0',
      },
      dark: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        topbar: '#252525',
        text: '#FFFFFF',
        navbar: '#252525',
        background: '#252525',
      },
    },
  },
  icons: {
    values: {
      ...CustomIcons,
    },
  },
})
