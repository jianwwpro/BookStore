<template>
  <div class="login">
    <mt-header fixed title="彩云书店"> </mt-header>
    <mt-field label="用户名:" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码   :" placeholder="密码" type="password" v-model="password"></mt-field>
    <mt-button type="primary" size="large" @click='login'>登录</mt-button>
    <!--<div class="div1">
      <input type="text">
    </div>

    <div class="div2">
      <input type="text">
    </div>-->
  </div>

</template>

<script>
  import { Header,Indicator,Toast,Field } from 'mint-ui'
  import api from '../api/Api'
  
  export default {
    data () {
    return {
      username:'',
      password:''
      }
    },
    methods:{
      login(){
         Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
          });
        api.user.login(this.username,this.password).then(res=>{
         
          Indicator.close()
          if(res.success==true){
            console.log('登录成功1')
            console.log(res.sessionId)
            localStorage.setItem('sessionid', res.sessionId)
            let redirect = this.$route.query.redirect || '/'
            console.log("qyert="+redirect)
           
            this.$router.push(redirect);


          }else{
            Indicator.close()
            Toast({
              message: '登录失败',
              iconClass: 'icon icon-success'
            });
          }
        }, err=>{
              Indicator.close()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
   .mint-header
     -webkit-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -moz-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -o-linear-gradient(right,#00774e 0,#00d994 100%);
     background: linear-gradient(to right,#00774e 0,#00d994 100%);
    .buycar
      background url(../assets/buycar.png) no-repeat 
      background-size 1.5em
      background-position 0.5em 0.8em
      height 3em
      display block
      float right
      width 2em

</style>