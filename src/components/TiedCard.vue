<template>
  <div class="login">
    <mt-header fixed title="用户绑卡"> 
      <router-link to="/" slot="left">
       <mt-button icon="back" @click='back'></mt-button>
      </router-link>
    </mt-header>
   
    <mt-actionsheet :actions="libraryList" v-model="sheetVisible">
    </mt-actionsheet>
    <mt-cell title="图书馆" is-link><mt-button @click='showLibrary'>{{libraryName}}</mt-button></mt-cell>
    <mt-field label="读者卡号:" placeholder="请输入卡号" v-model="cardNum"></mt-field>
    <mt-field label="密码   :" placeholder="密码" type="password" v-model="passWord"></mt-field>
    <span>{{message}}</span>
    <mt-button type="primary" size="large" @click='bindCard'>绑定</mt-button>
  </div>
</template>

<script>
  import { Header, Indicator, Toast, Field, Actionsheet, Cell } from 'mint-ui'
  import api from '../api/Api'
  
  
  export default {
    data () {
      var that = this;// 为了下面的method调用
      return {
        cardNum:'',
        passWord:'',
        libraryName:'请选择',
        libraryId:'',
        message:'',
        default:localStorage.getItem('defaultLibrary'),// 默认选择图书馆
        // default:'6',// 用户默认图书馆
        sheetVisible:false,// 控制选择框显示和隐藏
        libraryList:[]
        }
    },
    mounted(){
      // 提示绑卡
      Toast("未绑卡用户,请先绑卡 ");

      // 加载所有图书馆
      this.libraryListByStore().then(res => {
        this.selectDefault();// 回调选择用户默认图书馆
      });

    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      // 显示选择框
      showLibrary(){
        this.sheetVisible = true;
      },
      // 选择用户默认图书馆
      selectDefault(){
        this.libraryList.map(({name, id, message}) => {
        // 拿到用户默认图书馆信息,拼好帮用户选择
        if(id == this.default){
          var library = {
            id : id,
            name : name,
            message : message
          };
          this.selectLibrary(library);
        }
      })
      },
      // 获取所有图书馆
      libraryListByStore(){
        return new Promise((resolve,reject) => {

          api.library.libraryListByStore().then(res =>{
            if(res.success === true){
              var libraryList = res.libraryList;
              // 向data里libraryList添加数据
              for(var i=0 ;i<res.libraryList.length ;i++ ){
                var library = res.libraryList[i];
                // 拼装data里的值
                var libraryData = {
                  name:library.librayName,
                  id:library.librayId,
                  message:library.librayMessage,
                  method:this.selectLibrary //绑定的方法,默认传入当前data的this
                }
                // console.log(libraryData);
                this.libraryList.push(libraryData);
              }
              
              resolve(res);// 返回成功信息
            } else{
              alert(res.msg);
            }
          }, err =>{
            console.log(err);
          })

        })
      },
      // 选择图书馆
      selectLibrary(library){
        this.libraryName = library.name;
        this.libraryId = library.id;
        this.message = library.message;
      },
      // 绑定读者卡
      bindCard(){
        var libraryId = this.libraryId;
        var cardNum = this.cardNum;
        var passWord = this.passWord;
        if(!libraryId || !cardNum || !passWord){
          Toast("检查参数是否填写完整");// 弹框提示
          return false;
        }

        api.user.bindCard(libraryId, cardNum, passWord).then(res => {

          Toast(res.msg);// 弹框提示
          let that = this
          if(res.success === true){
            setTimeout(function(){ 
                that.$router.go(-1);
              },1000);
          }

        }, err => {
          console.log(err);
        })
      }

    }
  }
</script>

<style scoped lang="stylus">
   .mint-header
     -webkit-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -moz-linear-gradient(right,#00774e 0,#00d994 100%);
     background: -o-linear-gradient(right,#00774e 0,#00d994 100%);
     background: linear-gradient(to right,#00774e 0,#00d994 100%);
    .buycar
      background url(../assets/buycar.png) no-repeat 
      background-size 1.5em
      background-position 0.5em 0.8em
      height 3em
      display block
      float right
      width 2em

</style>