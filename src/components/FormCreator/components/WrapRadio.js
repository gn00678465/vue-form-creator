import { RadioGroup, Radio } from 'view-design'

export default {
  name: 'WrapRadio',
  inheritAttrs: false,
  props: {
    ...RadioGroup.props,
    ...Radio.props,
    formInject: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  watch: {
    'formInject.options': {
      handler () {
        this.update()
      },
      deep: true
    },
    value: {
      immediate: true,
      handler () {
        this.update()
      }
    }
  },
  data () {
    return {
      radioValue: ''
    }
  },
  methods: {
    options () {
      const opt = this.formInject.options
      return Array.isArray(opt) ? opt : []
    },
    onChange (n) {
      this.$emit('on-change', this.options().filter((opt) => opt.label === n).reduce((initial, opt) => opt.value, ''))
    },
    update () {
      this.radioValue = this.options().filter((opt) => opt.value === this.value).reduce((initial, opt) => opt.label, '')
    }
  },
  render (h) {
    return (
      <RadioGroup {...{
        props: {
          ...this.$props,
          value: this.radioValue
        },
        attrs: this.$attrs,
        on: {
          'on-change': this.onChange
        }
      }}>
        {this.options().map((option, index) => (
          <Radio {...{
            props: {
              ...this.$props,
              label: option.label,
              value: option.value
            },
            key: '' + index + option.value,
            attrs: this.$attrs,
            on: this.$listeners
          }}>{ option.label }</Radio>
        ))}
      </RadioGroup>
    )
  }
}
