<template>
  <div class="index">
      <mt-header fixed title="彩云书店">
        <router-link to="/" slot="left">
          <mt-button icon="back"  ></mt-button>
        </router-link>
        <router-link class="buycar" to="/Cart" slot="right">
        </router-link>
      </mt-header>
     <ul>
       <li @click='go("Scan")'>
         
            <img src="../assets/QRcode.png" alt="">
            扫码购书
         
       </li>
       <li @click='go("Near")'>
            <img src="../assets/patener.png" alt="">
            合作书店
        </li>
       <li @click='go("Bought")'>
            <img src="../assets/buied.png" alt="">
            已购图书
       </li>
     </ul>
     <div class="text_content">
      <div class="book_content"><b>购书简介</b></div>
       <p>1、“你阅读，我买单”是XXX图书馆推出想一项惠民服务，旨在。。</p>
       <p>2、需要您持有XXX图书馆的读者卡，并完成注册绑定。</p>
       <p>3、到达指定书店后，请打开本页面，点击“扫码购书”扫描图书本面的条形码。</p>
       <p>4、选购完成后，点击结算，将结算页面展示给店员，配合店员完成扫码确认工作。</p>
       <p>5、待店员确认完成后，界面出现结算完成标识，这时您就可以将图书带走了。</p>
       <p>6、请不要忘记在图书到期前归还到图书馆。</p>
      </div>
    <!--  <router-link to="/MyOrder">
        <mt-button type="primary" size="large">我的订单</mt-button>
      </router-link>
      <router-link to="/TiedCard">
        <mt-button type="primary" size="large">绑卡页面</mt-button>
      </router-link>
      <mt-button type="primary" size="large" v-if="success" @click='logout'>退出登录</mt-button>-->
  </div>
</template>

<script>
import { Header,Indicator,Toast } from 'mint-ui' 
import wx from 'weixin-js-sdk'
import { mapGetters } from 'vuex'
import api from '../api/Api'
import main from '../main'
export default {
  name: 'index',
  
  
  data () {//controller 数据request.setAttrbute('msg','彩云书店');request.setAttrbute('msg','彩云书店')
    return {
     msg:'',
     success:true,
     sessionid:''
    }
  },
  route: {
    data ({ to : { params: { type }}}) {
        console.log('router')
    }
    
  },
  components: {
   
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    go(name){
      this.$router.push({
                      name: name
                    })
    },
    logout(){
         Indicator.open({
          text: '退出登录...',
          spinnerType: 'fading-circle'
          });
        api.user.logout().then(res=>{
          
          Indicator.close()
          let redirect = this.$route.query.redirect || '/'
            //console.log("qyert="+redirect)
          if (res.success==true) {
           localStorage.removeItem('sessionid');
          }
          this.$router.push({ 
            name: 'Login', 
          });
          Toast({
              message: '退出登录成功..请重新登录',
            });
        }, err=>{
              Indicator.close()
              Toast({
              message: '退出失败...请检查您的网络',
            });
        })
      }
  },
  mounted(){
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
.index
  width 100%
  .text_content
    width 92%
    border none
    border-top 1.375em solid #fcf7eb
    float left
    padding 1em
    margin-top 1em
    .book_content
      border-left 0.5em solid #ffb310
      padding-left 1em
      text-align left
      font-size 1.2em
    p
      float left
      text-align left
      font-size 1em
      padding 0.2em 0
  ul
    list-style none
    margin 0 auto
    width 100%
    margin-left 8%
    li
      float left
      list-style none
      width 25%
      margin-right 1em
      text-align center
      color #707070
      img
        width 100%
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
