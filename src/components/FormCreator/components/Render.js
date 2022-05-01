import WrapRadio from './WrapRadio'
import { computeOr, confirmObj, isDisplay, dropHidden, isObject } from '../utils/utils'
import { isRow, isGroup, isSpan } from '../utils/type'

const map = {
  Radio (h, config) {
    const props = computeOr({}, 'props')(config)
    const field = config.field
    return h(WrapRadio, {
      props: { ...props, formInject: config, value: this.formData[field] },
      on: { 'on-change': (val) => { this.formData[field] = val } }
    })
  },
  span: (h, config) => renderSpan(config)(h),
  default (h, config) { return renderInput.call(this, config)(h) }
}

const LabelWrap = (config) => {
  return {
    name: 'LabelWrap',
    render (h) {
      return h('Tooltip', {
        props: {
          disabled: !config.info,
          content: config.info,
          theme: 'light',
          placement: 'top'
        }
      }, [
        config.info && h('Icon', {
          props: {
            type: 'md-information-circle',
            size: 18
          }
        }),
        config.title
      ])
    }
  }
}

function renderRow (config) {
  const children = computeOr([], 'children')(config)
  const rowProp = computeOr({}, 'props')(config)
  const rowStyle = { display: (!isDisplay(config) && 'none') || '' }
  return (h) => h('Row', { props: rowProp, style: { ...rowStyle } }, dropHidden(children).map((child) => {
    const colProp = computeOr({}, 'props')(child)
    const [c] = computeOr([], 'children')(child)
    return h('Col', { props: colProp }, [c && renderFormItem.call(this, c)(h)])
  }))
}

function renderFormItem (config) {
  // eslint-disable-next-line no-unused-vars
  const props = computeOr({}, 'props')(config)
  const validate = computeOr([], 'validate')(config)
  const col = computeOr(null, 'col')(config)
  const colProp = col && ((isObject(col) && col) || (typeof col === 'number' && { span: Number(col) }))
  const Type = config.type
  const itemStyle = { display: (!isDisplay(config) && 'none') || '' }
  return (h) => (col && h('Col', { props: colProp, style: { ...itemStyle } }, [
    h('FormItem', { props: { prop: config.field, rules: validate } }, [
      h('template', { slot: 'label' }, [h(LabelWrap(config))]),
      map[Type] ? map[Type].call(this, h, config) : map.default.call(this, h, config)
    ])
  ])) ||
  h('FormItem', { props: { prop: config.field, rules: validate }, style: { ...itemStyle } }, [
    h('template', { slot: 'label' }, [h(LabelWrap(config))]),
    map[Type] ? map[Type].call(this, h, config) : map.default.call(this, h, config)
  ])
}

function renderInput (config) {
  const Type = config.type
  const field = config.field
  const props = computeOr({}, 'props')(config)
  return (h) => h(Type, {
    props: {
      ...props,
      value: this.formData[field]
    },
    on: {
      input: (val) => {
        if (typeof val === 'string') this.formData[field] = val.trim()
        this.formData[field] = val
      }
    }
  })
}

function renderSpan (config) {
  const Type = config.type
  const children = computeOr([], 'children')(config)
  return (h) => h(Type, [
    (children.length && children[0]) || ''
  ])
}

function renderContent (rules) {
  return (h) => dropHidden(rules).map((rule) => {
    return isRow(rule)
      ? renderRow.call(this, rule)(h)
      : isGroup(rule)
        ? null
        : isSpan(rule)
          ? renderSpan(rule)(h)
          : renderFormItem.call(this, rule)(h)
  })
}

function renderFormBtn (options) {
  const submitBtnOpt = 'submitBtn' in options && options.submitBtn
  const resetBtnOpt = 'resetBtn' in options && options.resetBtn
  const onSubmit = 'onSubmit' in options && options.onSubmit

  return (h) => ((confirmObj(submitBtnOpt) || confirmObj(resetBtnOpt)) && h('Col', {}, [
    h('FormItem', { class: 'space-x-1' }, [
      confirmObj(resetBtnOpt) && h('Button', {
        props: {
          icon: 'ios-refresh',
          ...resetBtnOpt
        },
        on: {
          click: this.resetFields
        }
      }, '重置'),
      confirmObj(submitBtnOpt) && h('Button', {
        props: {
          type: 'primary',
          ...submitBtnOpt
        },
        on: {
          click: () => { this.validate(onSubmit) }
        }
      }, '送出')
    ])
  ]))
}

export { renderContent, renderFormBtn }
