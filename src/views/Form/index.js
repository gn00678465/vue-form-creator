import FormCreator from '../../components/FormCreator/index.vue'
import { options, rule } from './constructor'

export default {
  name: 'From',
  data () {
    return {
      fApi: {},
      value: {
        name: ''
      },
      options: {},
      rule: []
    }
  },
  created () {
    this.rule = rule
    this.options = options
  },
  render (h) {
    return h(FormCreator, {
      props: {
        rule: this.rule,
        value: this.value,
        option: this.options
      },
      on: {
        input: (val) => { this.fApi = val },
        'update:value': (value) => { this.value = value }
      }
    })
  }
}
