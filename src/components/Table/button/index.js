const tableButton = {
  render: function (createElement) {
    return createElement(
      'button', // имя тега
      {
        attrs: {},
        class: {
          'v-table-button': true,
        },
        style: {
          //backgroundImage: this.option.urlIcon ? this.backgroundImage : '',
          color: 'red',
        },
        domProps: {
          innerHTML: this.backgroundImage
            ? `<img src='${this.backgroundImage}'></img>`
            : '',
        },
        on: {
          click: this.buttonClick,
        },
      }
    )
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    row: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    backgroundImage() {
      if (this.option.urlIcon) {
        return this.option.urlIcon
      }
    },
  },
  methods: {
    buttonClick() {
      event.stopPropagation()
      this.option.function(this.row)
    },
  },
  mounted() {},
}
export default tableButton
