/* eslint-disable */

export default {
    install(Vue, options) {
      if (!options) {
        return
      }
  
      if (options.prototypeCollection) {
        Object.keys(options.prototypeCollection).forEach((key) => {
          Vue.prototype[key] = options.prototypeCollection[key]
        })
      }
    }
  }
  