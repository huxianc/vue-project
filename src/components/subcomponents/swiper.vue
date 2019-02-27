<template>
    <div>
       <mt-swipe :auto="4000">
           <!-- 谁用轮播图，谁传递 lunbotuList（父组件向子组件传值） -->
            <mt-swipe-item v-for="item in lunbotuList " :key="item.id">
                <img :src="item.img" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
      text-align: center;
    
    img {
    //   width: 100%;
      height: 100%;
    }
  }
}

.full{
    width: 100%;
}
</style>

