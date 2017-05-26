<template>
  <div class="index">
      <mt-header fixed title="彩云书店">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <router-link class="buycar" to="/Cart" slot="right">
        </router-link>
      </mt-header>
     <ul>
       <li>
         <a class="link" @click='scanBook'>
            <img src="../assets/QRcode.png" alt="">
            真扫码购书
         </a>
       </li>
       <li>
          <router-link class="link" to="/Near">
            <img src="../assets/patener.png" alt="">
            合作书店
         </router-link>
        </li>
       <li>
         <router-link class="link" to="/Bought">
            <img src="../assets/buied.png" alt="">
            已购图书
         </router-link>
       </li>
     </ul>
     <div class="text_content">
       <div class="book_content"><b>购书简介</b></div>
       <p>1、“你阅读，我买单”是XXX图书馆推出想一项惠民服务，旨在。。呀儿呦</p>
       <p>2、需要您持有XXX图书馆的读者卡，并完成注册绑定。</p>
       <p>3、到达指定书店后，请打开本页面，点击“扫码购书”扫描图书本面的条形码。</p>
       <p>4、选购完成后，点击结算，将结算页面展示给店员，配合店员完成扫码确认工作。</p>
       <p>5、待店员确认完成后，界面出现结算完成标识，这时您就可以将图书带走了。</p>
       <p>6、请不要忘记在图书到期前归还到图书馆。</p>
     </div>
  </div>
</template>

<script>
import { Header,Indicator,Toast } from 'mint-ui' 
import wx from 'weixin-js-sdk'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  computed:{//vuex的内容
    ...mapGetters({
      config:'config'
    })
  },
  mounted(){//生命周期中的mounted阶段
    let url = window.location.href
    console.log(url)
    if(url.indexOf('?')>0){
      window.location.href=window.location.href.split('?')[0]
    }
  },
  
  data () {//controller 数据request.setAttrbute('msg','彩云书店');request.setAttrbute('msg','彩云书店')
    return {
      msg: '彩云书店',
      appId:'',
      timestamp:'',
      nonceStr:'',
      signature:''
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
  //打开二维码
    openBarcode(){
      

        return new Promise((resolve,reject)=>{
          wx.config(this.config)
          wx.ready(()=>{
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: res=>{
                var msg = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                resolve(msg)
              }
            })      
          });
          wx.error(er=>{
            Toast(er)
            reject(er)
          });
          
        })
        
      },
      //扫码购书
      scanBook(){
        // let sessionid = localStorage.getItem('sessionid')
        //  if(sessionid==null||sessionid==''){
        //    this.$router.push('Login')
        //    return
        // }
        console.log(this.config)
        if(this.config==null){
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          console.log('xxx1')
          this.$store.dispatch('save').then(res=>{
              Indicator.close()
              console.log('xxx')
              this.openBarcode().then(isbn=>{
                Toast("微信不存在"+"\t处理ISBN："+isbn)
              },er=>{
                Toast(er)
              })
            },err=>{
              console.log(err)
            })
      }else {
          this.openBarcode().then(isbn=>{
            Toast("微信存在:"+this.config.appId+"\t处理ISBN："+isbn)
          },er=>{
            Toast(er)
          })
        }

      }
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
