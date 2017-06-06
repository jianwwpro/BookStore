<template>
  <div class="bought">
    <mt-header fixed title="已购图书">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click='back'></mt-button>
      </router-link>
    </mt-header>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="book_list" v-for='book in bookList.rows'>
        <li>
          <img src="../assets/book_face.png" alt="">
          <ul class="details">
            <li class="book_name"><b>《{{book.bookName}}》</b></li>
            <li class="book_author"><span>{{book.caiBook.author}}</span>/<span>{{book.pressName}}</span>/<span>{{book.caiBook.publishYear}}</span></li>
            <li class="book_pricing">定价：<span>{{book.singleFixprice}}</span>元</li>
            <li class="book_number">ISBN：<span>{{book.isbn}}</span></li>
            <li class="book_store">书店：<span>{{book.bookstoreName}}</span></li>
            <li class="book_number">购买时间：<span>{{book.updateDate}}</span></li>
            <!-- li class="book_number">归还日期：<span>2017-05-25</span></li> -->
          </ul>
        </li>
      </ul>
    </mt-loadmore>

  </div>
</template>
<script>
import { Header,Toast,Loadmore,Indicator } from 'mint-ui' 
import api from '../api/Api'

export default {
  name: 'bought',
  mounted(){
    //页面加载时:
    this.hasBoughtBooks(this.page,this.rows);
    
   /* api.bookList().then(res=>{
      Toast(JSON.stringify(res))
    },error=>{
      Toast(JSON.stringify(error))
    })*/

  },
  data () {
    return {
      msg: '购物车',
      bookList:{
        total:0,
        rows:[],
        pages:0
      },
      allLoaded:false,
      page: 1,
      rows: 10,
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
    /* 拿数据:获取已购图书 */
    hasBoughtBooks(page,rows){
      Indicator.open({
        text: '请稍后...',
        spinnerType: 'fading-circle'
      });
      api.book.hasBoughtBooks(page,rows).then(res => {
        Indicator.close();//关闭页面提示圈
        if(res.success === true){
          // console.log(res.rows);
          //分页
          if(page==1){
              this.bookList = res;// 第一次加载时直接赋值,之后就是添加了
          }else{
            for(let i=0 ; i < res.rows.length ; i++){
              this.bookList.rows.push(res.rows[i])
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
    /* 分页之刷新 */
    loadTop() {
      
      this.$refs.loadmore.onTopLoaded();
    },
    /* 分页下拉加载事件 */
    loadBottom() {
        if(this.page>=this.bookList.pages){
            this.allLoaded = true;// 当前页大于等于最大页数时,不再下拉刷新
        } else {
            this.hasBoughtBooks(++this.page,this.rows);
        } 
      this.$refs.loadmore.onBottomLoaded();
    }
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
