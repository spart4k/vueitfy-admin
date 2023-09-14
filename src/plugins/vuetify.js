import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import CustomIcons from '@/components/icons/index'

Vue.use(Vuetify)
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
        background: '#FFFFFF',
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
        background: '#000000',
      },
      blue: {
        primary: '#07e0f8',
        secondary: '#0bf4de',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        topbar: '#334D6E',
        text: '#FFFFFF',
        navbar: '#30b7cf',
        background: '#39c6c5',
      },
      green: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        topbar: '#FFFFFF',
        text: '#00FF00',
        navbar: '#00FF00',
        background: '#00FF00',
      },
    },
  },
  icons: {
    values: {
      ...CustomIcons,
    },
  },
})
