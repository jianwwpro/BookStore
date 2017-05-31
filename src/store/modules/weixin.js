import * as types from '../mutation-types'
import api from '../../api/Api'
//STATE
const state = {
  config:null
}

//getters
const getters = {
  config: state => state.config
}

//actions
const actions = {
  //清空微信配置
  clear ({commit,state}){
    commit(types.WX_CONFIG_CLEAR)
  },
  //保存配置
  save ({commit,state}) {
    
    return new Promise((resolve,reject)=>{
      api.wx.wxconfig().then(res=>{
        let that = res.data
        let config =
        {
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: that.appId, // 必填，公众号的唯一标识
          timestamp: that.timestamp, // 必填，生成签名的时间戳
          nonceStr: that.noncestr, // 必填，生成签名的随机串
          signature: that.signature,// 必填，签名，见附录1
          jsApiList: [   
          'scanQRCode', 
            'checkJsApi',    
          'onMenuShareTimeline',    
          'onMenuShareAppMessage',    
          'onMenuShareQQ',    
          'onMenuShareWeibo',    
          'hideMenuItems',    
          'showMenuItems',    
          'hideAllNonBaseMenuItem',    
          'showAllNonBaseMenuItem',    
          'translateVoice',    
          'startRecord',    
          'stopRecord',    
          'onRecordEnd',    
          'playVoice',    
          'pauseVoice',    
          'stopVoice',    
          'uploadVoice',    
          'downloadVoice',    
          'chooseImage',    
          'previewImage',    
          'uploadImage',    
          'downloadImage',    
          'getNetworkType',    
          'openLocation',    
          'getLocation',    
          'hideOptionMenu',    
          'showOptionMenu',    
          'closeWindow',    
          'chooseWXPay',    
          'openProductSpecificView',    
          'addCard',    
          'chooseCard',    
          'openCard'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }
        commit(types.WX_CONFIG_SAVE, { config })
        resolve(res)
      },err=>{
        console.log(err)
      })
    })
   
    //commit(types.WX_CONFIG_SAVE, { config })
  }
}


//mutations
const mutations = {
  //清除配置
  [types.WX_CONFIG_CLEAR] (state) {
    state.config=null
  },
  //保存配置
  [types.WX_CONFIG_SAVE] (state,{ config }){
    console.log('mutation:保存配置')
    console.log(config)
    state.config=config
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}