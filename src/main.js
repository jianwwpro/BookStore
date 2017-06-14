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


/** 拦截器:拦截所有request */
Vue.http.interceptors.push(function(request, next) {
  /* 在所有的请求url上添加上sessionId */
  const sessionId = localStorage.getItem('sessionid');
  if(sessionId&& !request.params['sessionId']){
      request.params['sessionId']=sessionId;
  }
  /* 返回 */
  next(response=>{
    var str = response.bodyText;// 返回值,
    var obj = eval('(' + str + ')');// 返回值转json
    if(obj.interface && obj.interface==1){
      let newSession = obj.sessionid;
      if(obj.code==403){
        console.log(403)
        // 重新登录,系统异常 跳转到登录页面
        router.push({ 
          name: 'Login', 
        });
      }
      else if(obj.code==100){
        // 欢迎再次使用
        localStorage.setItem('sessionid',newSession);
        // 是否绑卡?
        if (!obj.cardNo && obj.cardNo === false) {
          // 去绑卡
          router.push({ 
            name: 'TiedCard', 
          });
          return;
        }
        window.location.reload();
        
      }else if(obj.code==500){
        // 系统出现异常
        router.push({ 
          name: 'Login', 
        });
      }
    }

    // 是否绑卡?
    if (!obj.cardNo && obj.cardNo === false) {
      // 去绑卡
      router.push({ 
        name: 'TiedCard', 
      });
    }
   
  });
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },

})

