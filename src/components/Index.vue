<template>
  <div class="index">
      <mt-header fixed title="彩云书店">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <router-link to="/Cart" slot="right">
          <img class="buycar" src="../assets/buycar.png" alt="">
        </router-link>
       
      </mt-header>
     <ul>
       <li>
         <router-link class="link" to="/Community">
            <img src="../assets/QRcode.png" alt="">
            扫码购书
         </router-link>
       </li>
       <li>
          <router-link class="link" to="/Near">
            <img src="../assets/patener.png" alt="">
            合作书店
         </router-link>
        </li>
       <li>
         <router-link class="link" to="/Community">
            <img src="../assets/buied.png" alt="">
            已购图书
         </router-link>
       </li>
     </ul>
     <div class="text_content">
       <div class="book_content"><b>购书简介</b></div>
       <p>1、“你阅读，我买单”是XXX图书馆推出想一项惠民服务，旨在。。。。</p>
       <p>2、需要您持有XXX图书馆的读者卡，并完成注册绑定。</p>
       <p>3、到达指定书店后，请打开本页面，点击“扫码购书”扫描图书本面的条形码。</p>
       <p>4、选购完成后，点击结算，将结算页面展示给店员，配合店员完成扫码确认工作。</p>
       <p>5、待店员确认完成后，界面出现结算完成标识，这时您就可以将图书带走了。</p>
       <p>6、请不要忘记在图书到期前归还到图书馆。</p>
     </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui' 
export default {
  name: 'index',
  mounted(){
  },
  data () {
    return {
      msg: '彩云书店'
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
      width 2em
</style>
