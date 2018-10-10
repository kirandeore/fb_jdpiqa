export default {
    apps: {
        jdpiqa: {
            axios: {
                instance1: {
                    baseURL: 'http://localhost:5000/jdpiqa/us-central1/',
                    timeout: 100000
                }
            }
        }
    },
    enableLogging: true,
    env: 'dev'
}