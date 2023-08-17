const button = {
  render: function (createElement) {
    return createElement(
      'button', // имя тега
      {
        attrs: {
          class: 'v-button'
        },
        class: ['v-button', ...this.option.class],
        style: {
          //backgroundImage: this.option.urlIcon ? this.backgroundImage : '',
          color: '',
          backgroundColor: this.option.backgroundColor
        },
        domProps: {
          innerHTML: this.backgroundImage ?
          `
            <img src='${this.backgroundImage}'></img>
            <p>${this.option.label}</p>
          ` : `<p>${this.option.label}</p>`
        },
        on: {
          click: this.buttonClick
        },

      },
    )
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    backgroundImage() {
      if (this.option.urlIcon) {
        return this.option.urlIcon
      }

    }
  },
  methods: {
    buttonClick() {
      event.stopPropagation()
      this.option.function()
    }
  },
  mounted() {

  }
}
export default button