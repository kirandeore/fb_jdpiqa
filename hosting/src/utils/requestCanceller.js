const methodTokenMap = new Map()

export default ({ _, axios }) => {
  const CancelToken = axios.CancelToken

  return {
    createTokenForMethodName(methodName) {
      return {
        cancelToken: new CancelToken((c) => {
          methodTokenMap.set(methodName, c)
        })
      }
    },
    createOboeTokenForMethodName(oboeInstance, methodName) {
      methodTokenMap.set(methodName, oboeInstance)

      return oboeInstance
    },
    apply(serviceInstance) {
      _.forEach(serviceInstance, (methodBody, methodName) => {
        /* create new method body by attaching 'cancel' logic at the beginning of body */

        this[methodName] = (...args) => {
          const cancel = methodTokenMap.get(methodName)

          if (_.isFunction(cancel)) {
            // axios
            cancel('CANCELREQUEST')
          } else if (_.isObject(cancel)
            && Object.prototype.hasOwnProperty.call(cancel, 'abort')) {
            // oboe
            cancel.abort()
          }

          return methodBody.apply(serviceInstance, args)
        }
      })

      return this
    }
  }
}

/**  for cancelling post request
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})
*/
