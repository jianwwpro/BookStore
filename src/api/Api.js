import Vue from 'vue'
const  API_URL= 'http://localhost:8080/caiyunboss-interface/'

export default {
  wxconfig(){
    console.log('获取微信配置')
    let ur = location.href.split('#')[0]
    return Vue.http.jsonp(API_URL+"js/config?url="+ur)
  },
  bookList(){
   return new Promise((resolve,reject)=>{
      Vue.http.get(API_URL+"bookStore/index",{
        credentials: true
      }).then(res=>{
        resolve(res.body)
      },er=>{
        reject(er)
      })
    })
  },
  login(){
    return new Promise((resolve,reject)=>{
      Vue.http.post(API_URL+'auth',{},{
        credentials: true
      }).then(res=>{
        //console.log(res)
        //delCookie("JSESSIONID")
        //document.cookie="JSESSIONID="+res.body.sessionId
        localStorage.setItem('sessionid',res.body.sessionId)
        resolve(res.body)
      },error=>{
        reject(error)
      })
    })
  }
}