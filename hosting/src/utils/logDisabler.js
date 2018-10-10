export default () => {
    // const log = console.log
    // const error = console.error
    // const warning = console.warning
    // const info = console.info
  
    // eslint-disable-next-line
    console.error = (errMessage) => {
      // log errMessage
      // error.apply(console, arguments)
    }
  
    console.log = () => {}
    console.warn = () => {}
    console.info = () => {}
    console.groupCollapsed = () => {}
    console.group = () => {}
    console.debug = () => {}
  }
  