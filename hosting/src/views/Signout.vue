<template>
  <Button type="text" @click="onLogout">Sign out</Button>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.firebaseApp.auth().signOut()
      .then(res => {
        console.log('signout', res)
        this.$emit('onLogout')
        // this.$router.push({ path: '/' })  
      })
      
    }
  }
}
</script>

