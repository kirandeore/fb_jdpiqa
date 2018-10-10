/**
 * @version 0.1
 * @author  Kiran Deore, http://quinstreet.com
 */

/* eslint-disable no-console */

export default () => response => {
  const { status } = response
  const {
    method, url, baseURL, data
  } = response.config
  const urlWithoutBaseUrl = url.replace(baseURL, '')
  const statusColor = status === 200 ? 'green' : 'red'

  // ed3c39
  const methodStyle =
  `background:${statusColor}; padding: 1px; border-radius: 3px 0 0 3px; color: #fff; font-size:12px; border: solid 1px black;`

  const urlStyle =
    'background:#35495e; padding: 1px; border-radius: 0 0 0 0px; color: #fff; font-size:12px'

  const paramStyle =
    method.toLowerCase() === 'post' ? 'background:#28a5d4; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-size:12px' : ''

  // console.group if you want expanded, groupCollapsed is you want minimized
  console.groupCollapsed(
    `%c RESPONSE %c ${method.toUpperCase()} %c ${urlWithoutBaseUrl} %c ${data || ''} %c`,
    `background:transparent;color:${statusColor}`,
    methodStyle,
    urlStyle,
    paramStyle,
    'background:transparent'
  )
  console.log(response.data)
  console.groupEnd()

  return response
}

