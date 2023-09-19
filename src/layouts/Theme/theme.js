export default {
  data() {
    return {
      themeOptions: [
        {
          text: 'blue',
          value: 'blue',
        },
        {
          text: 'green',
          value: 'green',
        },
        {
          text: 'dark',
          value: 'dark',
        },
        {
          text: 'light',
          value: 'light',
        },
      ],
      contrastOptions: [],
    }
  },
  computed: {
    // Open/close this whole drawer menu
    open: {
      get() {
        return this.$store.state.preferencesDrawer
      },
      set(value) {
        this.$store.commit('setPreferencesDrawer', value)
      },
    },
    theme: {
      get() {
        return this.$store.state.preferences.theme
      },
      set(theme) {
        this.$store.commit('setTheme', theme)
      },
    },
    contrast: {
      get() {
        return this.$store.state.preferences.contrast
      },
      set(contrast) {
        this.$store.commit('setContrast', contrast)
      },
    },
  },
}
