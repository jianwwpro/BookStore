<template>
  <div class="cart">
    <mt-header fixed title="我的订单">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click='back'></mt-button>
      </router-link>
    </mt-header>

    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="book_list">
        <li v-for='order in orderList.rows'>
          <!-- <input type="checkbox" v-bind:value="book.caiBook.id" v-model="book.checked"> -->
          <!-- <img src="../assets/book_face.png" alt=""> -->
          <ul class="details" @click="orderDetail(order.orderNumStr)">
            <li class="book_name" v-if="order.status == 1"><b>《{{order.bookstoreName}}》</b></li>
            <li class="book_author">书本数: <span>{{order.qty}}</span></li>
            <li class="book_pricing">总码洋：<span>{{order.fixPrice}}</span>元</li>
            <li class="book_pricing">结算折扣：<span>{{order.discountStr}}</span></li>
            <li class="book_number">总结算价：<span>{{order.dealPrice}}</span>元</li>
            <li class="delete" v-if="order.status == 1">{{order.statusStr}}</li>
            <li class="deletColor" v-else>{{order.statusStr}}</li>
          </ul>
        </li>
      </ul>
    </mt-loadmore>

  </div>
</template>
<script>
import { Header, Loadmore, Indicator } from 'mint-ui' 
import api from '../api/Api'

export default {
  name: 'MyOrder',
  data () {
    return {
      msg: '我的订单',
      orderList:{
        total:0,
        rows:[],
        pages:0
      },
      allLoaded:false,
      page: 1,
      rows: 10,
    }
  },
  // 钩子函数,data加载过后加载
  mounted(){
    this.myOrder(this.page,this.rows);
  },
  components: {

  },
  // 方法
  methods: {
    back(){
      this.$router.go(-1)
    },
    // 去订单详情
    orderDetail(orderNum){
      console.log(orderNum);
      this.$router.push({ 
        name: 'OrderDetail', 
        params: { 
          orderNum : orderNum
        }
      })
    },

    // 获取订单集合
    myOrder(page,rows){
      //页面提示圈
      Indicator.open({
        text: '请稍后...',
        spinnerType: 'fading-circle'
      });
      api.order.myOrder(page,rows).then(res => {
        Indicator.close();//关闭页面提示圈
        if(res.success === true){
          console.log(res);
          //分页处理
          if(page==1){
              this.orderList = res;// 第一次加载时直接赋值,之后就是添加了
          }else{
            for(let i=0 ; i < res.rows.length ; i++){
              this.orderList.rows.push(res.rows[i])
            }
          }
        } else{
          alert(res.msg);
        }
      }, err => {
        Indicator.close();//关闭页面提示圈
        console.log(err);
      })
    },

    // 下拉加载事件
    loadBottom() {
        if(this.page>=this.orderList.pages){
            this.allLoaded = true;// 当前页大于等于最大页数时,不再下拉刷新
        } else {
            this.myOrder(++this.page,this.rows);
        } 
      this.$refs.loadmore.onBottomLoaded();
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
      .deletColor
        position absolute
        color:#666
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
