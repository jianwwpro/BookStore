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
    }
  },
  user:{
    login(){
      return new Promise((resolve,reject)=>{
          Vue.http.post(API_URL+'auth',{},{
            credentials: true
          }).then(res=>{
            localStorage.setItem('sessionid',res.body.sessionId)
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