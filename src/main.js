// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state:{//this.$store.state.***
    car: car 
    //购物车中的商品的数据用一个数组存储起来，在car数组中，存储一些商品的对象，将这个商品对象设计成
    //{ id:商品的id, count:要购买的数量, price: 商品的单价,selected:true}
  },
  mutations:{//this.$store.commit('方法名','按需传递唯一的参数')
    addToCar(state,goodsinfo){
       //点击加入购物车，把商品信息保存到 store 中的 car 上
      //1.如果购物车中之前已有该商品，则count更新即可
      //2.如果没有，则直接把商品数据 push 到 car 中

      //假设在购物车中没有找到对应的商品
      var flag = false

      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      //如果最终循环完毕得到的flag还是false，则把商品数据push到购物车中
      if(!flag) {
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组存储到本地的localstorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      state.car.some(item => {
        if(item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFromCar(state,id){
      state.car.some((item,i) => {
        if(item.id == id) {
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item => {
        if(item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{//this.$store.getters.***
    getAllCount(state){
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAmount(state){
      var o ={
        count:0,//勾选的数量
        amount:0 //勾选的总价
      }
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})


import moment from 'moment'

import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入vue2-preview（图片预览插件）
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

//设置请求的主路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
