/**
 * @version 0.1
 * @author  Kiran Deore, http://quinstreet.com
 */

// https://javascript.info/dispatch-events

export default ({ moment, eventDispatch }) => request => {
  eventDispatch('lastRequestMadeAt', {
    latestTimeStamp: moment().valueOf()
  })
  return request
}
