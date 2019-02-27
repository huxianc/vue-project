<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_name | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域  -->
       
            <vue-preview
                :list="list"
                :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
                :tapToClose="true"
            />
      
        

        <div class="content" v-html="photoinfo.content"></div>

        <cmt-box :id="id"></cmt-box>
    </div>  
</template>

<script>
import comment from '../subcomponents/comment'
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoinfo: {},
            list:[]  //缩略图的数组
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    components:{
        'cmt-box':comment
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }
            })
        },
        getThumbs(){ // 获取缩略图
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if(result.body.status === 0) {
                    result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                    })
                    this.list = result.body.message
                }
            })
        }
    }
}
</script>

 <style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }

}

</style>



