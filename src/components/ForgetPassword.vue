<template>
  <div class="login">
    <mt-header fixed title="彩云书店找回密码"> 
      <router-link to="/" slot="left">
      <mt-button icon="back" ></mt-button>
    </router-link>
    </mt-header>
<!--<mt-field label="用户名" placeholder="请输入您的手机号码" type="tel" v-bind:state='userstate'  v-model="username" ref="username"></mt-field><div>{{userMsg}}</div>
<mt-field label="密码" placeholder="请输入6-10位的密码" type="password" v-bind:state='passstate' v-model="password" ref="password"></mt-field>{{passMsg}}-->
<mt-field label="手机号" placeholder="请输入您的手机号码" type="number"   v-model="username" ref="username"></mt-field>
<mt-field label="验证码" v-model="usercode" placeholder="请输入验证码">
  <mt-button type="default" v-bind:disabled="disabled"  @click='getCode'>{{codeMsg}}</mt-button>
</mt-field>
<mt-field label="新密码" placeholder="请输入6-10位的密码" type="password"  v-model="password" ref="password"></mt-field>
    <mt-button type="primary" size="large" @click='resetPassword'>重置密码</mt-button>
  </div>
  
</template>


<script>
  import { Header,Indicator,Toast,Field } from 'mint-ui'
  import api from '../api/Api'
  
  export default {
    data () {
    return {
      username:'',
      password:'',
      userstate:'error',
      passstate:'error',
      userMsg:'',
      passMsg:'',
      codeMsg:'点击获取验证码',
      disabled:false,
      countdown:60,
      smscode:'',
      usercode:''
      }
    },
    watch:{
        'username':{
            handler:function(val){
                //console.log('username'+val)
                api.user.findUsername(this.username).then(res=>{
                    var partten = /^1[3,5,7,8]\d{9}$/;
                   // console.log('--------------------'+res.readerExit)
                    if(res.readerExit==false&&partten.test(this.username)){
                     this.userstate='success'
                     this.userMsg=''
                    }
                    else{
                     this.userstate='error'
                     this.userMsg='手机号不正确或存在相同的用户名'
                    }
                },err=>{

                })
            },
        deep:true
        },
        'password':{
            handler:function(val){
                //console.log(val.length)
                if (val.length>=6&&val.length<10) {
                    this.passstate='success'
                    this.passMsg=''
                }else{
                    this.passstate='error'
                    this.passMsg='密码格式不正确'
                }
            },
        deep:true
        }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      getCode(){
          var partten = /^1[3,5,7,8]\d{9}$/;

          if(!partten.test(this.username)){
            Toast({
                message: '请输入正确的手机号',
            });
          }else{
                api.user.getCode(this.username,'a!2').then(res=>{
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
      resetPassword(){
          var usernamepartten = /^1[3,5,7,8]\d{9}$/;
          var passpartten = /^[0-9A-Za-z]{6,10}$/;
          if(usernamepartten.test(this.username)){
            
            if (passpartten.test(this.password)) {
                
                if (this.usercode==this.smscode) {
                   
                    api.user.resetPassword(this.username,this.password,this.smscode).then(res=>{
                   
                    if(res.oper_code=='1'){
                        //注册成功  跳转到绑卡页面
                        Toast({
                            message: res.message,
                        });
                        this.$router.push({ 
                            name: 'Login', 
                        });
                    }else{
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
                    message: '密码格式不正确',
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