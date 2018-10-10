const getInitialState = () => ({
    sessionData: null  
})
  
export default ({ _, SessionStorageManager, storageKey = 'vueApp' }) => ({
    namespaced: true,
    state: getInitialState(),
    getters: {
        getSessionDataFromVuex: _state => _.cloneDeep(_state.sessionData),
        getSessionDataFromCache: _state => {
            const isAuthenticated = SessionStorageManager.length === 1
                && SessionStorageManager.getKeys()[0] === storageKey

            if (isAuthenticated) {
                // const storageKey = SessionStorageManager.getKeys()[0]
                const sessionData = JSON.parse(SessionStorageManager.getItem(storageKey))

                return sessionData
            }

            return null
        }
    },
    mutations: {
        RESET_STATE(_state) {
            Object.assign(_state, getInitialState())
        },
        setSessionDataInVuex: (_state, { sessionData = null }) => {
            Object.assign(_state, {
                sessionData
            })
            
            SessionStorageManager.clear()

            if (!sessionData) {
                return
            }

            const isJson = sessionData.constructor === {}.constructor

            if (!isJson) {
                throw new Error('Session data should be in JSON format')
            }

            // const storageKey = _.get(sessionData, 'userConfig.firstName', null)

            // if (!storageKey) {
            //     throw new Error('Storage key cannot be generated')
            // }

            SessionStorageManager.setItem(storageKey, JSON.stringify(sessionData))
        }
    }
})
