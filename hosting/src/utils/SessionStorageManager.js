const sessionStorage = require('sessionstorage')

export default {
  clear() {
    sessionStorage.clear()
  },
  setItem(key, value) {
    sessionStorage.setItem(key, value)
  },
  getItem(key) {
    return sessionStorage.getItem(key)
  },
  getKeys() {
    return Object.keys(sessionStorage)
  },
  length: sessionStorage.length
}