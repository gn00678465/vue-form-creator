import { isObject } from './type'
import { $set } from './modify'

function keys (obj) {
  return Object.keys(obj)
}

const mergeDeepRight = (lObj, rObj) => {
  function iter (arr, init, opt) {
    arr.forEach((key) => {
      if (!isObject(opt[key])) {
        $set(init, key, opt[key])
        return true
      }
      return isObject(opt[key]) && iter(keys(opt[key]), init[key], opt[key])
    })
  }
  isObject(rObj) && iter(keys(rObj), lObj, rObj)
}

export { mergeDeepRight }
