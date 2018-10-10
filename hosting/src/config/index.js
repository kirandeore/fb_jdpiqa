let config

switch (process.env.VUE_APP_SERVER_ENVIRONMENT) {
    case 'PROD_SERVER':
    default: {
        config = require('./config.prod').default
        break
    }
    case 'DEV_SERVER': {
        config = require('./config.dev').default
        break
    }
}

export default config
