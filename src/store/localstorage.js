const ls = localStorage

export function getItem(key) {
  return ls.getItem(key)
}

export function setItem(key, value) {
  return ls.setItem(key, value)
}

export function removeItem(key) {
  return ls.removeItem(key)
}

export function clear(key) {
  return ls.clear()
}
