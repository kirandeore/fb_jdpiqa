/**
 * @version 0.1
 * @author  Kiran Deore, http://quinstreet.com
 */


// https://javascript.info/dispatch-events

export default ({ moment, eventDispatch }) => ((error) => {
  // subscribe this event to logout a user if the resposne is 401
  eventDispatch('last401ResponseReceivedAt', {
    latestTimeStamp: moment().valueOf()
  })

  return Promise.reject(error)
})

