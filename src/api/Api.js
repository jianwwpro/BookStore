import Vue from 'vue'

const  API_URL= 'http://i.brainhunt.cn/caiyunboss-interface/'
// const  API_URL= 'http://localhost:8081/caiyunboss-interface/'
//const  API_URL= 'http://54qn.51mypc.cn/caiyunboss-interface/'

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

    bookStoreList(page,rows,loc){
      return new Promise((resolve,reject)=>{
        //console.log('eeee')
        /*resolve([{id:1,name:'xxx',logo:''},{id:2,name:'xxx',logo:''},{id:3,name:'xxx',logo:''},{id:4,name:'xxx',logo:''}])*/
        let library_id  = 6
        let lng_lat = loc.longitude+","+loc.latitude
        
        Vue.http.get(API_URL+'/bookStore/store/bookStoreList?lng_lat='+lng_lat+'&page='+page+'&rows='+rows,{
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
    findUsername(username){
      return new Promise((resolve,reject)=>{
          Vue.http.post(
            API_URL+'/bookStore/findUsername',
          {
            username
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
    getCode(username,type){
      return new Promise((resolve,reject)=>{
          Vue.http.post(
            API_URL+'/bookStore/getCode',
          {
            username,type
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
    loginByWx(code){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"weixin/openidByVue",
          {
            code
          },
          {
            credentials: true
          }
        ).then( res =>{
          resolve(res.body);
        }, error =>{
          reject(error);
        })
       })
    },
    regist(username,password,smscode){
       
      return new Promise((resolve,reject)=>{
          Vue.http.post(
            API_URL+'/bookStore/regist',
          {
            username,password,smscode
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
    resetPassword(username,password,smscode){
       
      return new Promise((resolve,reject)=>{
          Vue.http.post(
            API_URL+'/bookStore/resetPassword',
          {
            username,password,smscode
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
    logout(){
          //console.log("执行api中logout方法")
      return new Promise((resolve,reject)=>{
        Vue.http.post(
            API_URL+'/bookStore/logOut',{},
          {
            credentials: true
          }
          ).then(res=>{
           // console.log("执行logout成功")
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
    },
    // 绑卡
    bindCard(librayId, cardNum, passWord){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"card/bindCardByStore",
          {
            librayId : librayId,
            cardNum : cardNum,
            passWord : passWord
          },
          {
            credentials: true
          }
        ).then( res =>{
          resolve(res.body);
        }, error =>{
          reject(error);
        })
      })
    },
    // 绑定手机号
    bindPhone(phone, phoneCode, openId){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/bindPhone",
          {
            phone,
            phoneCode,
            openId
          },
          {
            credentials: true
          }
        ).then( res =>{
          resolve(res.body);
        }, error =>{
          reject(error);
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
    },
    // 用户订单
    myOrder(page,rows){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"bookStore/order/myOrder",
          {
            page:page,
            rows:rows
          },
          {
            credentials: true
          }
        ).then( res =>{
          resolve(res.body);
        }, error =>{
          reject(error);
        })
      })
    }

  },
  library:{
    // 获取图书馆集合
    libraryListByStore(){
      return new Promise((resolve,reject) => {
        Vue.http.post(
          API_URL+"library/libraryListByStore",
          {
          },
          {
            credentials: true
          }
        ).then( res =>{
          resolve(res.body);
        }, error =>{
          reject(error);
        })
      })
    }

  },
  


}