import VueRouter from 'vue-router'

import HomeContainer from './components/tarbar/HomeContainer'
import MemberContainer from './components/tarbar/MemberContainer'
import ShopcarContainer from './components/tarbar/ShopcarContainer'
import SearchContainer from './components/tarbar/SearchContainer'
import NewsList from './components/news/newsList'
import NewsInfo from './components/news/newsInfo'
import PhotoList from './components/photos/PhotoList'
import PhotoInfo from './components/photos/PhotoInfo'
import GoodsList from './components//goods/GoodsList'
import GoodsInfo from './components/goods/goodsinfo'
import GoodsDesc from './components/goods/GoodsDesc'
import GoodsComment from './components/goods/GoodsComment'

var router = new VueRouter({
    routes:[
        { path:'/',redirect:'/home'},
        { path:'/home',component:HomeContainer },
        { path:'/member',component:MemberContainer },
        { path:'/shopcar',component:ShopcarContainer },
        { path:'/search',component:SearchContainer },
        { path:'/home/newslist',component:NewsList },
        { path:'/home/newsinfo/:id',component:NewsInfo},
        { path:'/home/photolist',component:PhotoList},
        { path:'/home/photoinfo/:id',component:PhotoInfo},
        { path:'/home/goodslist',component:GoodsList},
        { path:'/home/goodsinfo/:id',component:GoodsInfo},
        { path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        { path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮类(router-link-active)
})


export default router