const getInitialState = () => {
    
}

export default ({ services }) => ({
    namespaced: true,
    state: {},
    mutations: {
        RESET_STATE(_state) {
            Object.assign(_state, getInitialState())
        }
    },
    actions: {
        getQnA: async (context, { actionParams = {} }) => {
            try {
                const response = await services.qnaService.getQnA()

                if (!response) {
                    // if a second request is made, we are sending null as result for the first request
                    return null
                }

                return response
            } catch(error) {
                throw error
            }
        }
    }
})
