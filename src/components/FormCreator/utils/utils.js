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

const findField = (arr, name) => {
  let result
  function iter (a) {
    if (a.field === name) {
      result = a
      return true
    }
    return isArray(a.children) && a.children.some(iter)
  };

  arr.some(iter)
  return result
}

export {
  computeOr,
  confirmObj,
  isDisplay,
  dropHidden,
  isObject,
  isFunction,
  findField
}
