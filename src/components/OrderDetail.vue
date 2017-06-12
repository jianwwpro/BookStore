<template>
  <div class="cart">
    <mt-header fixed title="订单结算">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <canvas id="barcode"></canvas>
    <canvas id="qrCode"></canvas>
    <div> ------已选择({{bookList.length}})本----------------------</div> 

    <li v-for='book in bookList'>
      <ul>
        <li>{{book.bookName}}</li>
        <a>{{book.caiBook.author}}</a><a>/{{book.pressName}}</a><a>/{{book.caiBook.publishYear}}</a>
        <div>定价{{book.singleFixprice}}元</div>
        <div>ISBN{{book.isbn}}</div>
      </ul>
    </li>

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
.cart
  width 100%
  float left
  margin-top 1em
  .mint-header
     -webkit-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -moz-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -o-linear-gradient(right,#00774e 0,#00d994 100%);
     background: linear-gradient(to right,#00774e 0,#00d994 100%); 
  .book_list
    float left
    width 100%
    li
      position relative
      height 5em
      padding 1em 0
      background-color #eee
      margin-bottom 1em
      input
        position absolute
        top 40%
      img
        margin-left 2em
        height 100%
        max-width 5em
    .details
      width 70%
      display inline-block
      float right
      list-style none
      li
        height 1.1em
        margin-bottom 0.3em
        font-size 0.2em
        border-bottom none
        padding 0
      .book_name
        font-size 1em
      .delete
        position absolute
        color red
        right 1em
        top 40%
  .button
    position fixed
    bottom  0
    left 0
    text-align center
    width 100%
    border-top 1px solid #ddd
    .mint-button
      background-color red
      color #fff
      width 100%
</style>
