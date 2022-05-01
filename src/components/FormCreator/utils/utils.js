import { isObject, isFunction, isArray } from './type'

function computeOr (orVal, key) {
  return (obj) => {
    return (Object.keys(obj).length !== 0 && key in obj && obj[key]) || orVal
  }
}

function confirmObj (obj) {
  return obj && isObject(obj)
}

function isDisplay (item) { return item.display }

function dropHidden (array) {
  return array.filter((item) => !item.hidden)
}

function randomStr (num) {
  return Math.random().toString(36).substring(2, num + 2)
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
  serialize
}
