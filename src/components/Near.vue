<template>
  <div class="near">
    <mt-header fixed title="附近书店">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click='back'></mt-button>
      </router-link>
    </mt-header>

<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
 <ul class="bookStoreList">
      
      <li v-for='store in storeList.rows'>
        <img src='../assets/王府井书店.png' alt="">
        <ul>
          <li class="store_name">{{store.name}}<span class="allow_buy" v-if="store.status==0">(可以购书)</span><span class="refuse_buy" v-if="store.status==1">(暂停采购)</span></li>
          <li class="store_place">{{store.address}}</li>
          <li class="open_time">营业时间：<span>{{store.begTimeStr}}~{{store.endTimeStr}}</span></li>
          <li class="go_there"><a href="">到这去</a></li>
          <li class="distance"><span>{{store.distence}}</span>km</li>
        </ul>
      </li>
     
    </ul>
</mt-loadmore>

    
  </div>
</template>
<script>


import { Header,Loadmore,Indicator  } from 'mint-ui' 
// 引入vue-amap


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
        pages:0,
        distence:[],
        

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
  methods: {
    back(){
      this.$router.go(-1)
    },
    getLocation(){
      return new Promise((resolve,reject)=>{
       wx.config(this.config)
        wx.ready(function(){
          wx.getLocation({
              success: function (res) {  
                resolve(res)
              },  
              cancel: function (res) {  
                reject(res)
              }
            });
        })
      })

    },
    openLocation(){
        if(this.config==null){
          //console.log('wx config is null')
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$store.dispatch('save').then(res=>{
              Indicator.close()
              return this.getLocation();
            },err=>{
              console.log(err)
            })
      }else {
        
          return this.getLocation()
        }
        //正式环境请注释
        return new Promise((resolve,reject)=>{})
     
      
    },
    getList(page,rows,loc){
      
      api.book.bookStoreList(page,rows,loc).then(res=>{
        if(page==1){
          this.storeList=res;
          
        }else
          for(let i=0;i<res.rows.length;i++){
            this.storeList.rows.push(res.rows[i])
          }
        

      console.log(this.storeList)
      },error=>{

      })
    },
    loadTop() {
      //this.getList(page,rows);
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
      //console.log(this.storeList)
    }
  },
  mounted(){
    
    this.openLocation().then(res=>{
      alert(JSON.stringfy(res))
      this.getList(this.page,this.rows,res);
      //console.log("经纬度信息"+res)
    },error=>{

    })
    
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
