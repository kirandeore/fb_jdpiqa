export default ({ config, axios }) => {
    const instance = axios.create(config.apps.jdpiqa.axios.instance1)

    return instance
}