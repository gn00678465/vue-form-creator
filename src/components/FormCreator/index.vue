<script>
import { computeOr, isFunction, findField, serialize } from './utils/utils'
import { mergeDeepRight } from './utils/mergeDeep'
import { renderContent, renderFormBtn } from './components/Render'

export default {
  name: 'CreateForm',
  provide () {
    return {
      $f: () => this.fApi
    }
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    rule: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Object,
      default: () => ({})
    },
    fApi: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      formData: {},
      renderRule: this.rule,
      updateValue: ''
    }
  },
  watch: {
    formData: {
      deep: true,
      handler (newValue) {
        this.updateValue = serialize(newValue)
        this.onEmitFormData(newValue)
      }
    }
  },
  created () {},
  mounted () {
    this.onEmitAPI()
  },
  methods: {
    // form
    validate (cb) {
      if (isFunction(cb)) {
        this.$refs.form.validate((validate) => {
          if (validate) {
            cb(this.formData)
          }
        })
      }
      // else {
      //   throw new TypeError(`${cb} is not a function`);
      // }
    },
    resetFields () {
      this.$refs.form.resetFields()
    },
    onEmitFormData (data) {
      this.$emit('update:value', data)
    },
    // api
    getValue (form) {
      return (filed) => (filed in form && form[filed]) || null
    },
    mergeRules (name, mergeObj) {
      const res = findField(this.renderRule, (a) => a.filed === name)
      res && mergeDeepRight(res, mergeObj)
    },
    onEmitAPI () {
      const result = { ...this.fApi }
      result.validate = this.validate
      result.resetFields = this.resetFields
      result.getValue = this.getValue(this.formData)
      result.mergeRules = this.mergeRules
      this.$emit('input', result)
    }
  },
  render (createElement) {
    const formProps = computeOr({}, 'form')(this.option)

    return createElement('Form', {
      props: {
        model: this.formData,
        autocomplete: 'off',
        ...formProps
      },
      nativeOn: {
        submit (event) { event.preventDefault() }
      },
      ref: 'form'
    }, [
      createElement('Row', {
        props: {
          'class-name': 'block'
        }
      }, [
        renderContent.call(this, this.renderRule)(createElement),
        renderFormBtn.call(this, this.option)(createElement)
      ])
    ])
  }
}
</script>

<style scoped lang="less">
.block {
  display: block;
}

.mb-0 {
  margin-bottom: 0;
}

.space-x {
  &-1 {
    .ivu-form-item-content > *:not(last-child) {
      margin-right: 0.25rem;
    }
  }
}
</style>
