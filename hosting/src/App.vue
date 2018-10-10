<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">About</router-link>
    </div>
    <login v-if="!idToken" /><signout v-if="idToken" @onLogout="onLogout" />
    <router-view v-if="idToken" />
  </div>
</template>

<script>
import uiMixin from '@/mixins/uiMixin'
import Login from './views/Login.vue'
import Signout from './views/Signout.vue'

export default {
  mixins: [uiMixin],
  components: {
    Login,
    Signout
  },
  data() {
    return {
      idToken: null
    }
  },
  methods: {
    onLogout() {
      this.idToken = null
    }
  },
  created() {
    this.firebase.auth().onAuthStateChanged(async user => {
      // console.log('auth state chnges', user)

      if (!user) {
        this.setSessionDataInVuex({ sessionData: null })
        return
      }

      const idToken = await user.getIdToken()
      // console.log('venom-', idToken, user.uid)

      const credentials = { 
        idToken,
        uid: user.uid
      }

      const hasPageRefreshed = this.sessionDataInCache && !this.sessionData
      // const firstTimeLogin = !this.sessionDataInCache && !this.sessionData

      // console.log(this.sessionDataInCache)

      let sessionData

      if (hasPageRefreshed) {
        sessionData = this.sessionDataInCache
        Object.assign(sessionData, credentials) 
      } else {
        sessionData = credentials
      }

      this.setSessionDataInVuex({ sessionData })

      this.idToken = idToken
      // console.log('about to leave auth change')
      this.$router.push({ path: '/apps/jdpiqa' })      
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
