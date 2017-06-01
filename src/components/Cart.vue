<template>
  <div class="cart">
    <mt-header fixed title="购物车">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <input type="checkbox" v-model="checkAll">全选

    <ul class="book_list">
       <li v-for='book in bookList'>
         <input type="checkbox" v-bind:value="book.caiBook.id" v-model="book.checked">
         <img src="../assets/book_face.png" alt="">
         <ul class="details">
          <li class="book_name"><b>《{{book.caiBook.name}}》</b></li>
          <li class="book_author"><span>{{book.caiBook.author}}</span>/<span>{{book.caiBook.press}}</span>/<span>{{book.caiBook.publishYear}}</span></li>
          <li class="book_pricing">定价：<span>{{book.caiBook.price}}</span>元</li>
          <li class="book_number">ISBN：<span>{{book.caiBook.isbn}}</span></li>
          <li class="delete" @click="delCartBook(book.id)">删除</li>
         </ul>
       </li>
      
    </ul>
    <div class="button">
      <mt-button type="default" @click="submitCart">提交订单</mt-button>
    </div>
  </div>
</template>
<script>
import { Header } from 'mint-ui' 
import api from '../api/Api'

export default {
  name: 'cart',
  mounted(){
    // console.log("页面加载时加载")
    api.cart.queryBook().then(res => {
      if(res.success === true){
        console.log(res.bookList);
        this.bookList = res.bookList;
      } else{
        alert(res.msg);
      }
    }, err => {
      console.log(err);
    })

  },
  data () {
    return {
      checkAll: false,
      msg: '购物车',
      bookList:[]
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
    // 购物车提交订单
    submitCart(){
      //获取购物车里勾选的图书
      var selectedBookList = [];
      this.bookList.map(({ booksId, checked }) => {
        if(checked != null && checked){
          selectedBookList.push(booksId);
        }
      })

      // 提交图书
      api.cart.submitCart(selectedBookList).then(res => {
        if(res.success === true){
          // console.log(res.orderNum);
          // console.log(res.orderDetail);
          this.$router.push({ 
            name: 'OrderDetail', 
            params: { 
              orderNum : res.orderNum 
            }
          })
        } else{
          alert(res.msg);
        }
      }, err => {
         console.log(err);
      })
    },

    // 删除购物车内容
    delCartBook(cartId){
      api.cart.delCartBook(cartId).then(res => {
        // 删除购物车时,删除页面上相应的内容
        if(res.success === true){
          let index = -1;
          for(let i=0;i<this.bookList.length;i++){
            if(this.bookList[i].id===cartId){
              index=i;
            }
          }
          if(index>-1){
            this.bookList.splice(index,1)
          }
          
        } else{
          alert(res.msg);
        }
      }, err => {
         console.log(err);
      })
    }

  },
  // 监听事件
  watch: {
    'checkAll': { //全选事件
      handler: function (val) { // val新值
        for( var i = 0 ; i < this.bookList.length ; i++ ){
          var book = this.bookList[i];
          book.checked = val;
        }
      }
    }
  },


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
