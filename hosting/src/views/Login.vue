<template>
  <div class="login-page">
    <Input
      v-model="username"
      placeholder="Enter username" style="width: 300px" />
    <Input
      v-model="password" 
      type="password"
      placeholder="Enter password" style="width: 300px" />
    <Button type="primary" @click="onClickSignIn">Sign In</Button>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import uiMixin from '@/mixins/uiMixin'

export default {
  mixins: [uiMixin],
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    async onClickSignIn() {
      const { username, password } = this
      
      try {
        const tokenUsingEmailID = await this.services
          .qnaService
          .generateCustomTokenUsingEmailID({
            username,
            password
          })

        const result = await this.firebaseApp
          .auth()
          .signInWithCustomToken(tokenUsingEmailID.data)
        
        // console.log('about to leave login', result)
        
        // const idToken = await result.user.getIdToken()

        // const sessionData = {
        //   idToken,
        //   uid: result.user.uid
        // }

        // this.setSessionDataInVuex({ sessionData })
        // console.log('session data is set')
        // console.log('result.user', result.user)
        // console.log('result.user.uid', result.user.uid)
        //console.log('firebase.auth().user', firebase.auth().currentUser.getIdToken())
      }
      catch(error) {
        this.$Message.error(error.code + '-' + error.message)
      }

      

      // firebaseApp.auth().signInWithEmailAndPassword('cashmoneysai@gmail.com', 'Shiv1984')
      // .then((result) => {
      //   console.log(result)
      // })
      // .catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // ...
      // })
    }




    // onSuccessfulSignIn(googleUser) {
    //   // console.log('Signed in', googleUser)
    //   const token = googleUser.getAuthResponse().id_token

    //   console.log('', googleUser.getBasicProfile().getName())

    //   this.$router.push({ path: '/apps/jdpiqa' })
    // },
    // onUnSuccessfulSignIn(error) {
    //   console.log('Errow', error)
    // }
  }
}
</script>
