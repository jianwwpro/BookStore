<template>
  <div class="near">
    <mt-header fixed title="附近书店">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
 <ul class="bookStoreList">
      
      <li v-for='store in storeList.rows'>
        <img src='' alt="">
        <ul>
          <li class="store_name">{{store.name}}<span class="allow_buy">(可以购书)</span></li>
          <li class="store_place">{{store.address}}</li>
          <li class="open_time">营业时间：<span>{{store.begTimeStr}}~{{store.endTimeStr}}</span></li>
          <li class="go_there"><a href="">到这去</a></li>
          <li class="distance"><span>3.8</span>km</li>
        </ul>
      </li>
     
    </ul>
</mt-loadmore>

    
  </div>
</template>
<script>


import { Header,Loadmore,Indicator  } from 'mint-ui' 
// 引入vue-amap

//如何在页面加载的时候执行method中的查询书店方法,假如查询成功  返回的result 如何在页面中调用  如何在页面加载的时候加载高德地图  进行使用者的定位
import api from '../api/Api'
import wx from 'weixin-js-sdk'
import { mapGetters } from 'vuex'

export default {
 
  name: 'near',
  computed:{//vuex的内容
    ...mapGetters({
      config:'config'
    })
  },
  data () {
    return {
      msg: '购物车',
      storeList:{
        total:0,
        rows:[],
        pages:0
      },
      allLoaded:false,
      page: 1,
      rows: 1,
      

    }
  },
  route: {
    data ({ to : { params: { type }}}) {
        console.log('router')
    } 
  },
  components: {
   
  },
  methods: 
  {
    openLocation(){

      console.log(';xx')
      wx.ready(()=>{
        console.log('ready')
      });


      wx.checkJsApi({
          jsApiList: [
              'getLocation'
          ],
          success: function (res) {
            console.log('rrr')
              // alert(JSON.stringify(res));
              // alert(JSON.stringify(res.checkResult.getLocation));
              if (res.checkResult.getLocation == false) {
                  alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                  return;
              }
          }
      });
    },
    getLocation(){

        console.log(this.config)
        if(this.config==null){
          console.log('wx config is null')
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$store.dispatch('save').then(res=>{
              Indicator.close()
              console.log('xxx')

              
              this.openLocation();
            
            },err=>{
              console.log(err)
            })
      }else {
        console.log('wx config is not null')
          this.openLocation()
        }

     
      
    },
    getList(page,rows){
      
      api.book.bookStoreList(page,rows).then(res=>{
        if(page==1){
          this.storeList=res;
        }else
          for(let i=0;i<res.rows.length;i++){
            this.storeList.rows.push(res.rows[i])
          }
        
      
      },error=>{

      })
    },
    loadTop() {
      
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
        if(this.page>=this.storeList.pages)
            this.allLoaded = true;// if all data are loaded
        else 
       // console.log('当前页'+this.page++)
            this.getList(++this.page,this.rows);
          //this.storeList.rows.push({id:1,name:new Date().getTime()})
      this.$refs.loadmore.onBottomLoaded();
      console.log(this.storeList)
    }
  },
  mounted(){
    this.getLocation();
    this.getList(this.page,this.rows);
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
