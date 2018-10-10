export default ({ axiosInstances, requestCanceller }) => {
    const service = {
        getQnA() {
            return axiosInstances.jdpiqa1.get('/getJdpiqaData/',
                Object.assign({
                //   headers: {
                //     userKey,
                //   }
                },
                requestCanceller
                  .createTokenForMethodName(this.getQnA.name)
              )
            )
        },
        generateCustomTokenUsingEmailID({ username, password }) {
            return axiosInstances.jdpiqa1
                .post('/getJdpiqaData/generateCustomTokenUsingEmailID/', { username, password },
                    Object.assign({
                    //   headers: {
                    //     userKey,
                    //   }
                    },
                    requestCanceller
                        .createTokenForMethodName(this.generateCustomTokenUsingEmailID.name)
                )
            )
        },
        saveqna(qnas) {
            return axiosInstances.jdpiqa1
                .post('/getJdpiqaData/saveqna/', qnas,
                    Object.assign({
                    //   headers: {
                    //     userKey,
                    //   }
                    },
                    requestCanceller
                        .createTokenForMethodName(this.saveqna.name)
                )
            )
        },
        deleteqna(qnas) {
            return axiosInstances.jdpiqa1
            .post('/getJdpiqaData/deleteqna/', qnas,
                Object.assign({
                //   headers: {
                //     userKey,
                //   }
                },
                requestCanceller
                    .createTokenForMethodName(this.deleteqna.name)
            ))
        }
    }

    return requestCanceller.apply(service)
}