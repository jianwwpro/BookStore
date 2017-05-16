<template>
  <div class="bought">
    <mt-header fixed title="已购图书">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="book_list">
       <li>
         <img src="../assets/book_face.png" alt="">
         <ul class="details">
          <li class="book_name"><b>《我的美丽我做主》</b></li>
          <li class="book_author"><span>王晓梅</span>/<span>江苏凤凰出版社</span>/<span>2017</span></li>
          <li class="book_pricing">定价：<span>20.00</span>元</li>
          <li class="book_number">ISBN：<span>97828288838881</span></li>
          <li class="book_store">书店：<span>海淀图书大厦</span></li>
          <li class="book_number">购买时间：<span>2017-04-25 09:08:00</span></li>
          <li class="book_number">归还日期：<span>2017-05-25</span></li>
         </ul>
       </li>
       <li>
         <img src="../assets/book_face.png" alt="">
         <ul class="details">
          <li class="book_name"><b>《我的美丽我做主》</b></li>
          <li class="book_author"><span>王晓梅</span>/<span>江苏凤凰出版社</span>/<span>2017</span></li>
          <li class="book_pricing">定价：<span>20.00</span>元</li>
          <li class="book_number">ISBN：<span>97828288838881</span></li>
          <li class="book_store">书店：<span>海淀图书大厦</span></li>
          <li class="book_number">购买时间：<span>2017-04-25 09:08:00</span></li>
          <li class="book_number">归还日期：<span>2017-05-25</span></li>
         </ul>
       </li>
    </ul>
  </div>
</template>
<script>
import { Header } from 'mint-ui' 
export default {
  name: 'bought',
  mounted(){
  },
  data () {
    return {
      msg: '购物车'
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
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
.bought
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
      height 8em
      padding 1em 0
      margin-bottom 1em
      img
        margin-left 1em
        height 100%
        max-width 8em
    .details
      width 60%
      display inline-block
      float right
      height 8em
      list-style none
      border-bottom 1px solid #ddd
      padding-bottom 1em
      li
        height 1.1em
        margin-bottom 0.3em
        font-size 0.2em
        border-bottom none
        padding 0
      .book_name
        font-size 1em
</style>
