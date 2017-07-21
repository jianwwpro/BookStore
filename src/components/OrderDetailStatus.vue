<template>
  <div class="cart">
    <mt-header fixed title="订单结算">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    
  
    <span class='p1'>支付成功</span> 
    
  </div>
</template>
<script>
import { Header } from 'mint-ui' 
import api from '../api/Api'
import QRCode from 'qrcode' // 二维码需要的引入的
import JsBarcode from 'jsbarcode' // 条形需要的引入的

export default {
  name: 'cart',
  data () {
    return {
      msg: '购物车',
    }
  },
  // 钩子函数,data加载过后加载
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}

.cart
  width 100%
  float left
  margin-top 1em
  .mint-header
     -webkit-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -moz-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -o-linear-gradient(right,#00774e 0,#00d994 100%);
     background: linear-gradient(to right,#00774e 0,#00d994 100%); 
  .barcode
    margin 0 auto
    display block
  .qrCode
    margin 0 auto
    display block

  hr
    height 20px
    border 0 
    background-color #fcf7eb
  .title
    font-color #666666
    margin-top 30px
    .p1
      width 10px
      height 20px
      background #ffb310
      display block
      float left
      margin-top 2px
    .p2
      margin-left 10px
  ol
    li
      margin-top 17px
      margin-left 20px
      .bookName
        p
          color #666666
          float left
          font-weight bold
        a
          color red
          display block
          float right
          margin-right 10px
      .bookInfo
        margin-top 5px
        color #7a7a7a
        p
          float left
      .price
        margin-top 5px
        color #7a7a7a
      .isbn
        margin-top 5px
        color #7a7a7a

</style>
