<template>
  <div class="login">
    <mt-header fixed title="关联手机号"> 
      <router-link to="/" slot="left">
      <mt-button icon="back" ></mt-button>
    </router-link>
    </mt-header>

    <mt-field label="手机号" placeholder="请输入您的手机号码" v-model="phone" type="number" ref="phone"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" v-model="phoneCode">
        <mt-button type="default" v-bind:disabled="disabled"  @click='getCode'>{{codeMsg}}</mt-button>
    </mt-field>

    <mt-button type="primary" size="large" @click='bindPhone'>确认</mt-button>

  </div>
</template>


<script>
  import { Header,Indicator,Toast,Field } from 'mint-ui'
  import api from '../api/Api'
  
  export default {
    data () {
    return {
    //   openId:'o6NEjwujaXeaHANYNRhVTKTZ8z2s',
      openId:this.$route.params.openId,
      phone:'',
      phoneCode:'',
      smscode:'',
      codeMsg:'点击获取验证码',
      disabled:false,
      countdown:60
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      getCode(){
          var partten = /^1[3,5,7,8]\d{9}$/;

          if(!partten.test(this.phone)){
            Toast({
                message: '请输入正确的手机号',
            });
          }else{
            api.user.getCode(this.phone,'a!3').then(res=>{
            console.log(res.smscode)
            if(res.oper_code=='1'){
                this.smscode = res.smscode
                Toast({
                    message: '验证码已发送',
                });
                    var that = this
                    this.settime()
            }else{
                Toast({
                    message: res.message,
                });
            }  
            
            },err=>{

            })
          }
      },
      settime(){
        if (this.countdown == 0) { 
            this.disabled=false 
            this.codeMsg="免费获取验证码"; 
            this.countdown = 60; 
        } else { 
            this.disabled=true 
            this.codeMsg="重新发送(" + this.countdown + ")"; 
            this.countdown--; 
            var that = this
            setTimeout(function() { 
                that.settime() 
            },1000)
        }
      },
      bindPhone(){
          var phone = /^1[3,5,7,8]\d{9}$/;
          var phoneCode = /^[0-9A-Za-z]{6,10}$/;
          if(phone.test(this.phone)){
            
            if (this.phoneCode==this.smscode) {
                   
                api.user.bindPhone(this.phone,this.phoneCode,this.openId).then(res=>{
                    if(res.success===true){
                        Toast(res.message);// 弹框提示
                        let that = this
                        if(res.success === true){
                            setTimeout(function(){},1000);
                            //绑定成功 去首页
                            localStorage.setItem('sessionid', res.sessionid);
                            this.$router.push({ 
                                name: 'Index', 
                            });
                        }

                    } else{
                        Toast({
                            message: res.message,
                        });
                    } 
                },err=>{
                    Toast({
                        message: '注册失败,请检查您的网络',
                    });
                })

            }else{
                    Toast({
                    message: '验证码输入错误',
                });
            }
          }else{
              Toast({
                message: '请输入正确的手机号',
            });
          }
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