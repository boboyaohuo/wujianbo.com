/**
 * Adapted from dominus v6.0.1
 * https://github.com/bevacqua/dominus/blob/master/src/classes.js
 */

const trim = /^\s+|\s+$/g
const whitespace = /\s+/g

function interpret(input: string) {
  return typeof input === 'string' ? input.replace(trim, '').split(whitespace) : input
}

function classes(el: any) {
  if (isElement(el)) {
    return (el.getAttribute('class') || '').replace(trim, '').split(whitespace)
  }

  return []
}

function set(el: any, input: any) {
  if (isElement(el)) {
    el.setAttribute('class', interpret(input).join(' '))
  }
}

function add(el: any, input: any) {
  const current = remove(el, input)
  const values = interpret(input)

  current.push.apply(current, values)
  set(el, current)

  return current
}

function remove(el: any, input: any) {
  const current = classes(el)
  const values = interpret(input)

  values.forEach(value => {
    const i = current.indexOf(value)
    if (i !== -1) {
      current.splice(i, 1)
    }
  })

  set(el, current)

  return current
}

function contains(el: any, input: any) {
  const current = classes(el)
  const values = interpret(input)

  return values.every(value => {
    return current.indexOf(value) !== -1
  })
}

function isElement(o: any) {
  const elementObjects = typeof HTMLElement === 'object'
  return elementObjects ? o instanceof HTMLElement : isElementObject(o)
}

function isElementObject(o: any) {
  return o && typeof o === 'object' && typeof o.nodeName === 'string' && o.nodeType === 1
}

export default {
  add,
  remove,
  contains,
  has: contains,
  set,
  get: classes
}
