// Assertions
function typeOf (assertions) {
  return (x) => {
    const type = Object.prototype.toString.call(x)
    return assertions.includes(type)
  }
}

/**
 * 判斷是否為 function
 * @param {*} x
 * @returns {Boolean}
 */
export function isFunction (x) {
  return typeOf(['[object Function]', '[object AsyncFunction]', '[object GeneratorFunction]', '[object AsyncGeneratorFunction]'])(x)
}

/**
 * 判斷是否為 Object
 * @param {*} x
 * @returns {Boolean}
 */
export function isObject (x) {
  return typeOf(['[object Object]'])(x)
}

/**
 * 判斷是否為 Array
 * @param {*} x
 * @returns {Boolean}
 */
export function isArray (x) {
  return typeOf(['[object Array]'])(x)
}

/**
 * 判斷是否為 Promise
 * @param {*} promise
 * @returns {Boolean}
 */
export function assertPromise (promise) {
  return isFunction(promise.then)
}

function is (type) {
  return (item) => {
    return isObject(item) && 'type' in item && item.type === type
  }
}

const isRow = is('Row')
const isCol = is('Col')
const isGroup = is('Group')
const isSpan = is('Span')

export { is, isRow, isCol, isGroup, isSpan }
