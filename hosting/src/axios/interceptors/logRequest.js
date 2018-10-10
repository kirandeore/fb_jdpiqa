/**
 * @version 0.1
 * @author  Kiran Deore, http://quinstreet.com
 */

/* eslint-disable no-console */

export default () => request => {
  const { method, url, data } = request
  const methodStyle =
    `background:yellow; padding: 1px;
    border-radius: 3px 0 0 3px; color: #fff;
    font-size:12px; color: black; border: solid 1px black`
  const urlStyle =
    'background:#35495e; padding: 1px; border-radius: 0 0 0 0px; color: #fff; font-size:12px'
  const paramStyle =
    method.toLowerCase() === 'post' ?
      'background:#28a5d4; padding: 1px; border-radius: 0 3px 3px 0; color: #fff; font-size:12px'
      : ''

  console.log(
    `%c REQUEST %c ${method.toUpperCase()} %c ${url} %c ${data ? JSON.stringify(data) : ''} %c`,
    'background:transparent',
    methodStyle,
    urlStyle,
    paramStyle,
    'background:transparent'
  )

  return request
}

