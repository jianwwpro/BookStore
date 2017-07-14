<template>
  <div class="index">
    <mt-header fixed title="扫码购书">
      <router-link to="/" slot="left">
        <mt-button icon="back" ></mt-button>
      </router-link>
    </mt-header>
     <ul>
       <li>
          <router-link class="link" to="/Index">
            <img src="../assets/patener.png" alt="">
            返回首页
          </router-link>
        </li>
       <li @click="scanAddBook()">
          <img src="../assets/QRcode.png" alt="">
          <a>在扫一本</a>
       </li>
       <li>
         <router-link class="link" to="/Cart">
            <img src="../assets/buied.png" alt="">
            去购物车
         </router-link>
       </li>
     </ul>

  </div>
</template>

<script>
import { Header,Indicator,Toast,MessageBox  } from 'mint-ui' 
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
      window.location.href=window.location.href.split('?')[0]+"#"+window.location.href.split("#")[1]
    }
    else {
      this.scanAddBook();//扫码并添加购物车
    }

    this.messageBox();

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
    
    back(){
      this.$router.go(-1)
    },
    //扫码并添加购物车
    scanAddBook(){
      this.scanBook().then(res=>{
        this.addBookCart(res.split(',')[1]);
      });
    },

    //添加图书至购物车
    addBookCart(isbn){
      //页面提示圈
      Indicator.open({
        text: '请稍后...',
        spinnerType: 'fading-circle'
      });
      api.cart.addBook(isbn).then(res => {
        Indicator.close();//关闭页面提示圈
        if(res.success == true){
          this.messageBox();//提示是否继续扫码
        } else{
          alert(res.msg);
        }
      },err => {
        Indicator.close();//关闭页面提示圈
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
              success: function(res){
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
       return new Promise((resolve,reject)=>{
        if(this.config==null){
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$store.dispatch('save').then(res=>{
              Indicator.close()
              this.openBarcode().then(isbn=>{
                resolve(isbn)
              },error=>{
                reject(error)
              })
            },err=>{
              reject(err)
              console.log(err)
            })
       }else {
        
            this.openBarcode().then(res=>{
                resolve(res)
              },error=>{
                reject(error)
              })
        }
       })
      },
      //添加成功后的提示
      messageBox(){
        MessageBox({
          title: '添加成功',
          message: '是否继续扫码?',
          showCancelButton: true,//显示取消按钮
          confirmButtonText:"在扫一本",
          cancelButtonText:"去购物车"
        }).then(action =>{
          if (action == "confirm") {
            this.scanAddBook();//继续扫码并添加购物车
          } else if (action == "cancel") {
            this.$router.push({ 
              name: 'Cart', 
            });
          }
        });
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
