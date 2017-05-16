<template>
  <div class="near">
    <mt-header fixed title="附近书店">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="bookStoreList">
      <li>
        <img src="../assets/ting3.png" alt="">
        <ul>
          <li class="store_name">海淀图书大厦<span class="allow_buy">(可以购书)</span></li>
          <li class="store_place">海淀区中关村12号</li>
          <li class="open_time">营业时间：<span>10:00~23:00</span></li>
          <li class="go_there"><a href="">到这去</a></li>
          <li class="distance"><span>3.8</span>km</li>
        </ul>
      </li>
      <li>
        <img src="../assets/ting3.png" alt="">
        <ul>
          <li class="store_name">海淀图书大厦<span class="allow_buy">(可以购书)</span></li>
          <li class="store_place">海淀区中关村12号</li>
          <li class="open_time">营业时间：<span>10:00~23:00</span></li>
          <li class="go_there"><a href="">到这去</a></li>
          <li class="distance"><span>3.8</span>km</li>
        </ul>
      </li>
      <li>
        <img src="../assets/ting3.png" alt="">
        <ul>
          <li class="store_name">海淀图书大厦<span class="refuse_buy">(可以购书)</span></li>
          <li class="store_place">海淀区中关村12号</li>
          <li class="open_time">营业时间：<span>10:00~23:00</span></li>
          <li class="go_there"><a href="">到这去</a></li>
          <li class="distance"><span>3.8</span>km</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { Header } from 'mint-ui' 
export default {
  name: 'near',
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
.near
  width 100%
  float left
  margin-top 1em
  .mint-header
     -webkit-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -moz-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -o-linear-gradient(right,#00774e 0,#00d994 100%);
     background: linear-gradient(to right,#00774e 0,#00d994 100%); 
  .bookStoreList
    width 100%
    li
      height 5em
      padding 1em 0
      border-bottom 1px solid #ddd
      img
        height 100%
        max-width 5em
      ul
        width 70%
        float right
        text-align left
        position relative
        li
          width 100%
          display inline-block
          float right
          font-size 0.2em
          height 2em
          line-height 2em
          padding 0
          border none
        .store_name
          font-size 1em
          margin-bottom 0.5em
          margin-top: -0.4em;
          .allow_buy
            color #68dd00
          .refuse_buy
            color #ff0000
        .go_there,.distance
          position absolute
          right 1em
          text-align right
        .go_there
          top 25%
          a
            color #fff
            background-color #27b5ff
            padding 0.3em 0.5em
            border-radius 5px
        .distance
          top 60%
          padding-right 0.5em
    
</style>
