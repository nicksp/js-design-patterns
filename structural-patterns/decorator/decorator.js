'use strict'

/**
 * Higher order function
 */
function compose(a, b) {
  return function (c) {
    return a(b(c))
  }
}

/**
 * Function decorators (subset of higher-order functions)
 * examples:
 *   once
 *   debounce
 *   memoize
 *   fluent
 *   etc.
 */
function fluent(fn) {
  return function (...args) {
    fn.apply(this, args)
    return this
  }
}

// ES6
function decorate(target, name, descriptor) {
  const fn = descriptor.value

  descriptor.value = function (...args) {
    fn.apply(target, args)
    return target
  }
}

// ES6
function decorateWith(decorator) {
  return (target, name, descriptor) => {
    descriptor.value = decorator.call(target, descriptor.value)
  }
}
