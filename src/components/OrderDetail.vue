<template>
  <div class="cart">
    订单提交成功
  </div>
</template>
<script>
import { Header } from 'mint-ui' 
import api from '../api/Api'

export default {
  name: 'cart',
  mounted(){
    console.log("页面加载时加载")
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
