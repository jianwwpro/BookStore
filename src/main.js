// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import {currency} from './filter/currency'
import { Toast } from 'mint-ui' 
import store from './store'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(router)
Vue.filter('currency', currency)
Vue.http.get.options = { withCredentials: true }
/* eslint-disable no-new */



Vue.http.interceptors.push(function(request, next) {
  const sessionId = localStorage.getItem('sessionid');
  if(sessionId&& !request.params['sessionId']){
      request.params['sessionId']=sessionId;
  }
 
  next(response=>{
    console.log(response)
    var str = response.bodyText;
    console.log(str)
    var obj = eval('(' + str + ')');
    console.log(obj)
    if(obj.interface && obj.interface==1){
    console.log('eeeeeeeeee')
      let newSession = obj.sessionid;
      console.log(newSession)
      console.log(obj.code)
      if(obj.code==403){
        console.log(403)
        //重新登录,系统异常 跳转到登录页面
            router.push({ 
              name: 'Login', 
            });
      
      }
      else if(obj.code==100){
        console.log(100)
        console.log(obj.redirect)
        localStorage.setItem('sessionid',newSession);
        window.location.reload();
        
        
      }else if(obj.code==500){
                console.log(500)
        
            router.push({ 
              name: 'Login', 
            });
          
      }
    }
   console.log('aaa')
   
    /*console.log(response)
    if (!response.ok) {
      console.log(response.ok)
    }*/
  });
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },

})

