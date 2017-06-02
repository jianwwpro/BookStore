import Vue from 'vue'

// const  API_URL= 'http://i.brainhunt.cn/caiyunboss-interface/'
const  API_URL= 'http://localhost:8081/caiyunboss-interface/'

export default {
  wx:{
    wxconfig(){
      console.log('获取微信配置')
      let ur = location.href.split('#')[0]
      return Vue.http.jsonp(API_URL+"js/config?url="+ur)
    }
  },
  //书的操作
  book:{
    bookList(){
      return new Promise((resolve,reject)=>{
          Vue.http.post(API_URL+"bookStore/index",{
            url:'xxx',
            xx:'yy'
          },{
            credentials: true
          }).then(res=>{
            resolve(res.body)
          },er=>{
            reject(er)
          })
        })
    },

    //已购图书
     hasBoughtBooks(page,rows){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/order/hasBoughtBooks",
          {
            page:page,
            rows:rows
          },
          {
            credentials: true
          }
        ).then( res => {
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    },

    bookStoreList(page,rows){
      return new Promise((resolve,reject)=>{
        //console.log('eeee')
        /*resolve([{id:1,name:'xxx',logo:''},{id:2,name:'xxx',logo:''},{id:3,name:'xxx',logo:''},{id:4,name:'xxx',logo:''}])*/
        let library_id  = 6
        let lng_lat = "116.5995,39.9067"
        Vue.http.get(API_URL+'/bookStore/store/bookStoreList?library_id='+library_id+'&lng_lat='+lng_lat+'&page='+page+'&rows='+rows,{
          credentials:true
        }).then(res=>{
          resolve(res.body)
          
        },error=>{
          console.log('eeee')
          reject(error)
        })
      })
      
      
    }
  },
  user:{
    login(username,password){
       
      return new Promise((resolve,reject)=>{
          Vue.http.post(
            API_URL+'/bookStore/auth',
          {
            username,password
          },
          {
            credentials: true
          }
          ).then(res=>{
            /*localStorage.setItem('sessionid',res.body.sessionId)*/
            resolve(res.body)
          },error=>{
            reject(error)
          })
      })
    },
    userInfo(){
      return new Promise((resolve,reject)=>{
        Vue.http.get('url?a=xx&b=x',{credentials: true}).then(res=>{
            resolve(res.body)
          },err=>{
            reject(err)
          })
      })
    }

  },

  
  cart:{
    // 查询购物车内容
    queryBook(page,rows){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/cart/queryBook",
          {
            page:page,
            rows:rows
          },
          {
            credentials: true
          }
        ).then( res => {
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    },




    // 扫码添加购物车
    addBook(isbn){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/cart/addBook",
          {
            isbn
          },
          {
            credentials: true
          }
        ).then( res => {
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    },
    // 删除购物车里的图书
    delCartBook(cartId){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/cart/delBook",
          {
            cartId
          },
          {
            credentials: true
          }
        ).then( res => {
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    },
    // 用户购物车提交书单
    submitCart(selectedList){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/order/submitCart",
          {
            selectedList
          },
          {
            credentials: true
          }
        ).then( res => {
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    }
    
  },
  order:{
    // 查询订单详情
    orderDetail(orderNum){
      return new Promise((resolve,reject) =>{
        Vue.http.post(
          API_URL+"bookStore/order/orderDetail",
          {
            orderNum
          },
          {
            credentials: true
          }
        ).then( res =>{
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    }

  }



    

}