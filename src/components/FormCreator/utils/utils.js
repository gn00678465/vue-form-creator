import { isObject, isFunction, isArray } from './type'

function computeOr (orVal, key) {
  return (obj) => {
    return (isObject(obj) && key in obj && obj[key]) || orVal
  }
}

function confirmObj (obj) { return obj && isObject(obj) }

function isDisplay (item) {
  if (isObject(item)) {
    return 'display' in item ? item.display : true
  }
  return true
}

function dropHidden (array) {
  return array.filter((item) => !('hidden' in item && item.hidden))
}

function randomStr (num) {
  return Math.random().toString(36).substring(2, num + 2)
}

function useComponent (config) {
  const props = computeOr({}, 'props')(config)
  const slot = computeOr(null, 'slot')(config)
  const className = computeOr('', 'class')(config)
  const style = {
    ...computeOr({}, 'style')(config),
    display: (!isDisplay(config) && 'none') || ''
  }
  return { props, slot, className, style }
}

const findField = (arr, fn) => {
  let result
  function iter (a) {
    if (fn(a)) {
      result = a
      return true
    }
    return isArray(a.children) && a.children.some(iter)
  };
  arr.some(iter)
  return result
}

const initFormData = (rule, fn) => {
  function iter (arr) {
    arr.forEach((a) => {
      if ('field' in a) {
        fn(a)
        return true
      }
      return isArray(a.children) && iter(a.children)
    })
  }
  iter(rule)
}

const serialize = (obj) => JSON.stringify(obj)

export {
  computeOr,
  confirmObj,
  isDisplay,
  dropHidden,
  isObject,
  isFunction,
  findField,
  randomStr,
  initFormData,
  serialize,
  useComponent
}
