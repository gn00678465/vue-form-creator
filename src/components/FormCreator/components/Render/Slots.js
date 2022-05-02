import { isArray, isObject, renderType } from '../../utils/type'
import { computeOr, useComponent } from '../../utils/utils'

function hasSlot (status) {
  return (arr) => arr.filter((item) => (isObject(item) && ('slot' in item) === status) || item)
}

function namedSlots (config) {
  return h => {
    const Type = renderType.getType(config.type)
    const { props, slot, className } = useComponent(config)
    return h('template', { slot }, [h(Type, { props, class: className })])
  }
}

function defaultSlots (config) {
  return h => {
    const Type = renderType.getType(config.type) || 'span'
    if (isObject(config)) {
      const { props, className } = useComponent(config)
      return h('template', { slot: 'default' }, [h(Type, { props, class: className })])
    }
    return h('template', { slot: 'default' }, [h(Type), config])
  }
}

export const renderSlots = (config) => {
  const children = computeOr([], 'children')(config)
  const namedSlot = (isArray(children) && hasSlot(true)(children)) || []
  const defaultSlot = (isArray(children) && hasSlot(false)(children)) || []
  return (h) => namedSlot.map((item) => namedSlots(item)(h))
    .concat(defaultSlot.map((item) => defaultSlots(item)(h)))
}
