<template>
  <div class="login">
    <input type="text" name='username'>
    <input type="password">
    <mt-button type="primary" @click='login'>登录</mt-button>
    <div class="div1">
      <input type="text">
    </div>

    <div class="div2">
      <input type="text">
    </div>
  </div>

</template>

<script>
  import api from '../api/Api'
  export default {
    
    methods:{
      login(){
        api.user.login().then(res=>{
          console.log('ee')
          if(res.success==true){
            console.log('ee')
            //localStorage.setItem('sessionid', res.sessionId)
            this.$router.go(-1)

          }
        }, err=>{

        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  

</style>