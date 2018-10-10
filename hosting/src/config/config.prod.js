export default {
    apps: {
        jdpiqa: {
            axios: {
                instance1: {
                    baseURL: 'https://us-central1-jdpiqa.cloudfunctions.net/',
                    timeout: 100000
                }
            }
        }
    },
    enableLogging: false,
    env: 'prod'
}