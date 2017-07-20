<template>
  <div class="cart">
    <mt-header fixed title="订单结算">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    
  
    <canvas class='barcode' id="barcode"></canvas>
    <canvas class="qrCode" id="qrCode"></canvas>
    <hr>
    <div class='title'>
      <span class='p1'></span> 
      <span class='p2'>已选择({{bookList.length}})</span>
    </div> 
    
    <ol>
      <li v-for='book in bookList' class='clearfix'>
          <div class='clearfix'></div>
          <div class='bookName clearfix'>
            <p>《{{book.bookName}}》</p>
            <!-- <a >删除</a> -->
          </div>
          <div class='bookInfo clearfix'>
            <p class='author'>{{book.caiBook.author}}</p>
            <p class='press'>/{{book.pressName}}</p>
            <p class='pub'>/{{book.caiBook.publishYear}}</p>
          </div>
          <p class='price'>定价：{{book.singleFixprice}}元</p>
          <p class='isbn'>ISBN：{{book.isbn}}</p>
      </li>
    </ol>
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
      orderNum: this.$route.params.orderNum,//传过来的订单编号
      bookList: []
    }
  },
  // 钩子函数,data加载过后加载
  mounted(){
    //二维码生成
    QRCode.toCanvas(
      document.getElementById('qrCode'),
      this.orderNum, // 二维码内容:及订单编号
      {
         toSJISFunc: QRCode.toSJIS,
         version:5 // 二维码大小
      }, 
      function (error) {
        if (error) {
          console.error(error)
        }
      }
    ),
    //条形码
    JsBarcode(
      "#barcode", 
      this.orderNum,
      {
        height: 50,
        width: 2
      }
    ),
    //查询订单详情
    this.orderDetail(this.orderNum)
    // console.log(this.orderNum);
  },
  components: {

  },
  // 方法
  methods: {
    back(){
      this.$router.go(-1)
    },
    // 取订单详情
    orderDetail(orderNum){
      api.order.orderDetail(orderNum).then(res => {
        if(res.success === true){
          this.bookList = res.bookList;
          console.log(res.bookList);
        } else{
          alert(res.msg);
        }
      }, err => {
          console.log(err);
      })
    }

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
