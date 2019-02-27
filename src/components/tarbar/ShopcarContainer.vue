<template>
    <div class="shopcar-container">

        <!-- 商品列表项目区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]" 
                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox> 
                                <!-- 从购物车中获取商品的数量 -->
                                <!-- 创建一个空对象，循环购物车中所有商品的数据，把当前循环商品的ID作为对象的属性名，count的值作为对象的属性值 -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAmount.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsCountAmount.amount }}</span></p>
                        </div>
                <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>


        <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>

<script>
// import Vue from 'vue'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
import numbox from '../subcomponents/shopcar_numberbox'
export default {
    data() {
        return {
            goodslist:[]
        }
    },
    components:{
        numbox
    },
    methods:{
        getGoodsList(){
            //1.获取到 store 中所有商品的id，然后拼接出一个用逗号分隔的字符串
            var idArr = [];
            // console.log(idArr)
            console.log(this.$store.state.car)
            this.$store.state.car.forEach(item => idArr.push(item.id));
            // console.log(idArr)
            //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0){
                return;
            }
            this.$http
            .get("api/goods/getshopcarlist/" + idArr.join(","))
            .then(result => {
                // debugger
                if(result.body.status === 0) {
                    // console(result)
                    this.goodslist = result.body.message
                }
            })
            // console.log(this.$store.state.car)
        },
        remove(id,index){
            this.goodslist.splice(index,1)
            this.$store.commit("removeFromCar",id)
        },
        selectedChanged(id,val){
            this.$store.commit("updateGoodsSelected",{id,selected:val})
        }
    },
    created(){
        this.getGoodsList()
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width:60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>


