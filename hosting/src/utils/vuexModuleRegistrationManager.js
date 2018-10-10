export default ({ store, vuexModules = {} }) => ({
    registerVuexModules(modulesToRegister) {
      const availableModules = Object.keys(vuexModules)
      // constants.MODULES.OWNERDRAWER
      modulesToRegister.forEach((moduleName) => {
        if (availableModules.includes(moduleName)) {
          // eslint-disable-next-line
          const isModuleRegistered = store._modules.root._children[moduleName]
  
          if (!isModuleRegistered) {
            store.registerModule(moduleName, vuexModules[moduleName])
          }
        }
      })
    },
    unregisterVuexModules(modulesToUnregister) {
      // constants.MODULES.OWNERDRAWER
      modulesToUnregister.forEach((moduleName) => {
        // eslint-disable-next-line
        const isModuleRegistered = store._modules.root._children[moduleName]
  
        if (isModuleRegistered) {
          // eslint-disable-next-line
          const moduleHasResetStateMethod = `${moduleName}/RESET_STATE` in store._mutations
  
          if (moduleHasResetStateMethod) {
            store.commit(`${moduleName}/RESET_STATE`)
          }
  
          store.unregisterModule(moduleName)
        }
      })
    }
  })
  