<template>
  <div class="login">
    <mt-header fixed title="微信登录"> 
      <router-link to="/" slot="left">
      <mt-button icon="back" ></mt-button>
    </router-link>
    </mt-header>
  </div>
</template>

<script>
  import { Header,Indicator,Toast,Field } from 'mint-ui'
  import api from '../api/Api'
  
  export default {
    data () {
      return {

      }
    },
    mounted(){
      var code = this.getUrlParam("code");
      this.loginByWx(code);
    },
    methods:{
      getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        }
        return null;
      },
      loginByWx(code){
        Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        });
        api.user.loginByWx(code).then(res=>{
          Indicator.close();
          if(res.success===true){
            var user = res.user;
            if(res.phone == '0'){
              /*用户还未绑定手机号,去绑定*/
              this.$router.push({ 
                  name: 'BindPhone', 
                  params: { 
                    openId : user.openId
                  }
              });
            }else{
              //登录成功 去首页
              localStorage.setItem('sessionid', res.sessionid);
              this.$router.push({ 
                  name: 'Index', 
              });
            }

          }else{
            Indicator.close()
            Toast({
              message: res.message,
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