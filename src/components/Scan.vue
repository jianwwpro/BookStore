<template>
  <div class="scan">
     <div>返回首页</div>
     <div>在扫一本</div>
     <div>去购物车</div>
  </div>
</template>

<script>
import { Header,Indicator,Toast } from 'mint-ui' 
import wx from 'weixin-js-sdk'
import { mapGetters } from 'vuex'
import api from '../api/Api'

export default {
  name: 'index',
  computed:{//vuex的内容
    ...mapGetters({
      config:'config'
    })
  },
  mounted(){//生命周期中的mounted阶段
    let url = window.location.href
    if(url.indexOf('?')>0){
      window.location.href=window.location.href.split('?')[0]
    }

    // this.scanBook();
    this.addBookCart(9787030181558);
  },
  
  data () {//controller 数据request.setAttrbute('msg','彩云书店');request.setAttrbute('msg','彩云书店')
    return {
      appId:'',
      timestamp:'',
      nonceStr:'',
      signature:''
    }
  },
  route: {
    data ({ to : { params: { type }}}) {
        
    }
    
  },
  components: {
   
  },
  methods: {
    //添加图书至购物车
    addBookCart(isbn){
      api.cart.addBook(isbn).then(res => {
        if(res.success == true){
          alert("添加成功");
        } else{
          alert(res.msg);
        }
      },err => {
        console.log(err);
      })
    },

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
