import Vue from 'vue'

//const  API_URL= 'http://i.brainhunt.cn/caiyunboss-interface/'
const  API_URL= 'http://localhost:8080/caiyunboss-interface/'

// const  API_URL= 'http://i.brainhunt.cn/caiyunboss-interface/'
//const  API_URL= 'http://localhost:8083/caiyunboss-interface/'

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
    bookStoreList(page,rows){
      return new Promise((resolve,reject)=>{
        //console.log('eeee')
        /*resolve([{id:1,name:'xxx',logo:''},{id:2,name:'xxx',logo:''},{id:3,name:'xxx',logo:''},{id:4,name:'xxx',logo:''}])*/
        let library_id  = 6
        let lng_lat = "116.418361,39.916499"
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
          {credentials: true}
        ).then( res => {
          alert(1);
          resolve(res.body);
        }, error => {
          reject(error);
        })
      })
    }
  }

}