import Vue from 'vue'
const  API_URL= 'http://i.brainhunt.cn/caiyunboss-interface/'

export default {
  wxconfig: ()=>{
    console.log('获取微信配置')
    return Vue.http.jsonp(API_URL+"js/config?url="+location.href.split('#')[0])
  }

}