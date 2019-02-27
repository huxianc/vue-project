# vue-cmsdemo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 用(传统方式)命令行把修改过后的代码上传到码云？
1. git add .
2. git commit -m "提交信息"
3. git push 


## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tarbar 区域，使用的是 MUI的 Tarbar.html
 + 在制作扩展图标的 css 样式，拷贝到项目中
 + 拷贝扩展字体库 ttf 文件到项目中
 + 为购物车小图标添加样式 "mui-icon-extra mui-icon-extra-cart"
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tarbar 为 router-link

## 设置路由高亮

## 点击 tarbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据
1. 获取数据(vue-resource)
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面制作
1. 绘制界面，使用 mui 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link 同时在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现 新闻详情 的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
 + `import comment from './comment.vue`
3. 在父组件中，使用`components`属性，将刚才导入 comment 组件，注册为自己的子组件 
4. 将注册子组件时候的 注册名称 以 标签形式 在页面中引用即可

## 获取所有的评论数据显示到界面中
1. getComments

## 实现点击 加载更多 评论的功能
1. 为 加载更多 按钮绑定点击事件，在事件中请求下一页数据
2. 点击 加载更多 ，让 pageIndex++ ，然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击 加载更多 的时候，每当获取都新数据，应该让老数据调用数组的 concat 方法，拼接上新数组

## 发表评论 功能
1. 把文本框做双向数据绑定
2. 为 发表评论 按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则 Toast 提示用户，评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
 + 换一种思路：当评论成功后，在客户端收到那个拼接出一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论，追加到 data 中 comments 的开头，这样就能完美 实现刷新评论列表的需求

 ## 改造 图片分析 按钮为路由的链接并显示对应的组件页面

 ## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
### 制作顶部滑动条的坑：
1. 需要借助于 MUI 中的tab-top-webview-main.html
2. 需哟把 slide 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现JS组件需要被初始化
 + 导入mui.js
 + 调用官方提供的方式初始化
 ```
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
 ```
4. 我们在初始化滑动条的时候，导入mui.js，但是控制台报错：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
 + 推测mui.js中用到了 'caller', 'callee', and 'arguments' 东西，但是webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以这两者冲突了
 + 解决方案:1. 把mui.js 中的非严格模式的代码改掉，但是不现实；2.把webpack 打包时候的严格模式禁用
 + 最终选择了第二种方案：移除严格模式 babel-plugin-transform-remove-strict-mode
5. 刚进入 图片分析 页面的时候，滑动条无法正工作，分析发现如果要初始化滑动条，必须要等 DOM 元素加载完毕，所有我们要把初始化滑动条的代码，搬到 mounted 生命周期函数中
6. 当滑动条调试好后，发现tarbar 无法正常工作了，这时候需要把每个 tarbar 按钮的样式中 `mui-tab-item` 重新改一下名字
7. 获取所有分类，并渲染分类列表


### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用Mint-Ui提供的现成的组件`lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据


### 实现了 图片列表 的 懒加载改造 和 样式美化

## 实现了 点击图片 跳转到 图片详情页
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情 中缩略图的功能
1. 使用插件 vue2-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. 注意：每个 图片数据对象中，必须有 w 和 h 属性

## 绘制 商品列表 页面基本结构美化

## 尝试在手机上去进行项目的预览和测试
1. 保证手机和 开发项目的电脑处于同一局域网
2. 打开自己的项目中 packge.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前电脑的wifi ip 地址，设置为 --host 的指令值
 + 查看自己电脑ip cmd中运行 `ipconfig`