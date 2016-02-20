# MSUI 框架入门
在学习MSUI之前，我们先来了解一下以下几个概念

* [JS 委托模式](http://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html) 
* [JS 事件冒泡机制](http://www.cnblogs.com/yexiaochai/p/3477715.html) 
* [rem](http://www.zhihu.com/question/21504656)
* [web app 变革之rem](http://link.zhihu.com/?target=http%3A//isux.tencent.com/web-app-rem.html)
* 如果是 sublime 编辑器，则推荐使用 [cssrem](https://github.com/flashlizi/cssrem)

## MSUI简介
[github 地址](https://github.com/sdc-alibaba/SUI-Mobile)

官方介绍:

1. SUI Mobile 是一套基于Framework7开发的UI库。它非常轻量、精美，只需要引入我们的CDN文件就可以使用，并且能兼容到 iOS 6.0+ 和 Android 4.0+，非常适合开发跨平台Web App。

2. 炫酷的iOS风格
我们的组件都是按照iOS风格设计的，所有有很多组件都是iOS独有的炫酷设计。

3. 功能强大的组件
我们实现了下拉刷新、日历、省市区选择器等功能非常强大的组件，并且他们在安卓上也是同样好的体验。

>实际上因Framework7 在android上存在较严重的兼容性问题，SUI 是基于Framework7 基础上二次开发的一个版本，MSUI尚处于开发阶段，在实际开发中可以同时吸取Framework7的一些组件

### MSUI 页面基本结构

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>MSUI demo</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="http://g.alicdn.com/msui/sm/0.6.2/css/sm.min.css">
    <link rel="stylesheet" href="http://g.alicdn.com/msui/sm/0.6.2/css/sm-extend.min.css">

  </head>
  <body>
    <div class="page-group">
        <div class="page page-current">
        <!-- 你的html代码 -->
        </div>
    </div>

    <script type='text/javascript' src='http://g.alicdn.com/sj/lib/zepto/zepto.min.js' charset='utf-8'></script>
    <script type='text/javascript' src='http://g.alicdn.com/msui/sm/0.6.2/js/sm.min.js' charset='utf-8'></script>
    <script type='text/javascript' src='http://g.alicdn.com/msui/sm/0.6.2/js/sm-extend.min.js' charset='utf-8'></script>
  </body>
</html>
```
>不建议在学习阶段直接使用CDN及压缩版本，建议直接前往[github](https://github.com/sdc-alibaba/SUI-Mobile)下载源码进行学习

### 快速入门，使用 MSUI 完成第一个页面
 
 * 在一个html中，所有页面都应该放在 'page-group'中
 * class="page-current" 用于标记 第一次进入该页面时应该显示的页面
 * 每一个page容器的id值用于标识页面跳转使用到的hash值，因此务必使id全局唯一
 * 通过a标签内编写"#pageId" 的形式可以实现内联页面的转场

先建立了页面的基本结构，在 "page-group" 中添加如下代码：

```html
<div class="page page-current">this is Page 1<a href="#page2">点击前往Page2</a></div>
<div class="page">this is Page 2<a href="#page1">点击前往Page1</a></div>
```
>直接使用浏览器打开会发现不能跳转。在MSUI中是通过路由来对页面切换进行管理的，而该路由直接在浏览器中打开会报错，不能继续向下执行。因此要使用路由功能必须进行将该页面文件上传web服务器。
> 或者可以通过改变page-current来实现对单个page的调试

以上就实现了一个带两个内联页面的页面文件。

### 为页面增加头部
在.page 中 增加头部
```html
<header class="bar bar-nav">
  <a class="icon icon-me pull-left"></a>
  <a class="icon icon-star pull-right"></a>
  <h1 class="title">标题</h1>
</header>
```

### 为页面增加工具栏 
* 工具栏中 .active 用于标识该按钮被选中
* .badge 标识角标

在 #page1、#page2 中增加 如下代码
```html
<nav class="bar bar-tab">
  <a class="tab-item external active" href="#page1">
    <span class="icon icon-home"></span>
    <span class="tab-label">文案</span>
  </a>
  <a class="tab-item external" href="#page2">
    <span class="icon icon-me"></span>
    <span class="tab-label">文案</span>
    <span class="badge">2</span>
  </a>
  <a class="tab-item external" href="#">
    <span class="icon icon-star"></span>
    <span class="tab-label">文案</span>
  </a>
  <a class="tab-item external" href="#">
    <span class="icon icon-cart"></span>
    <span class="tab-label">文案</span>
  </a>
</nav>
```

### 内容区的概念
*  每一个page的正文内容都应该存放在 div.content 中
示例：
```
<div class="content">
  <div class="content-block">This is Page 1</div>
</div>
```   

### 在内容区填充内容
这里以官方样式为例
```html
<div class="list-block">
  <ul class="list-container">
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
    <li class="item-content"><div class="item-inner"><div class="item-title">条目</div></div></li>
  </ul>
</div>
```

#### MSUI JS编写要点
*  $.init(); 不能缺少，且应放在业务代码的最后面
*  建议采用委托模式
示例
```javascript
$(function() {
  $(document).on("pageInit", function() {
    $("#show-toast").click(function() {
      $.toast("操作成功");
    });
  });
  $.init();
});
```

#### a 标签要点
*   如果有 class="external", 标识该链接走原生跳转，而不是通过路由管理
*   href= "#{pageId}" ，路由管理内联页面
*   href="./B.html#{pageId}", 路由跳转外部页面的子页面 
*   如果希望使用js实现页面的跳转，使用$.router.load()

#### 医行css代码编写注意要点
1. 除font-size外所有大小单位采用rem。
2. 在当前项目中规定 1rem = 20px 作为换算比例
3. 1px 单位保持不变。
4. font-size 采用自带点阵px(如16px,24px)，不应出现类似11px,13px等单位。


#### 医行公用ajax类

```javascript
var userId = {
    userId: 1 
};
/**
 * 公用接口
 * @param {[String]} url    [接口url]
 * @param {[object]} prams  [参数]
 * @param {[fn]} func   [success回调方法]
 * @param {[String]} method [post/get]
 */
function CommonAjax(url, prams, func,method) {
    $.ajax({
        url:  url,
        type: method === undefined ? "POST" : 'get',
        data: prams ? $.extend(prams,userId) : userId,
        cache: false,
        async: false,
        dataType: "json",
        success: function(feedback, status, ajaxObj) {
            func(feedback);
        },
        error: function(e, t, w) {
            //如果加载器存在, 移除。。。
            if ($('.preloader-indicator-modal')[0])  $.hideIndicator();
            console.log('status:' + e.status + '\n' + 'statusText:' + e.statusText);
        },
        beforeSend: function() {},
        complete: function() {}
    });
}
```

调用示例：
```javascript
    /* === 添加阅读记录 === */
    var id = "4f429394-5c47-4bf0-801f-daf910877f6f";
    CommonAjax("/ehospital/mobile/article/readArcitle.do",{articleId: id}, function(result){
        console.log(result); 
        if(result.success){
            console.log("添加阅读记录成功...");
        }else{
           console.log(result.title+result.msg); 
      }
    });
```
> console.log方便调试，但在调试完成之后注意删除 console.log 信息。

>有时需要改成get形式的接口,只需要再传入第四个参数即可,为代码统一,通常约定为100
 ```
 CommonAjax(url, prams, func,100);
 ```

### 渲染页面
在ajax调用接口之后我们常需要对获得的接口数据进行处理。比如数据获取成功之后进行页面渲染
在result.success后添加成功返回的逻辑处理

页面渲染采用拼接字符串的形式
```javascript
var html = '';
for(i in result){
    html +='<li class="item-content">' +
            '<div class="item-inner">' +
                '<div class="item-title">' + result[i] +'</div>' +
            '</div>' +
        '</li>';
}
$('.list-container').append(html);
```

####  通过事件委托实现点击更新页面

1.MSUI JS 结构
``` javascript
$(function() {
  // 编写的代码放在这里
  $.init();
});
```

2.编写点击方法
```javascript
var itemDemo =  function  (id) {
    CommonAjax("/ehospital/mobile/article/readArcitle.do",{articleId: id}, function(result){
        console.log(result); 
        var html = '';
        for(var i in result){
            html +='<li class="item-content">' +
                    '<div class="item-inner">' +
                        '<div class="item-title">' + result[i] +'</div>' +
                    '</div>' +
                '</li>';
        }
        $('.list-container').append(html);
    });  
};
```
> 该方法也可以放在匿名函数之外。

3.委托事件
```javascript 
$(function() {
    var itemDemo=...(略)
    // 进行事件委托
    $(document).on("pageInit", "#page1", function(e, id, page) {
        $(page).on('click','.item-title',function (e) {
          var articleId = "4f429394-5c47-4bf0-801f-daf910877f6f";
            itemDemo(articleId);
        });
    });
  $.init();
});
```
> pageInit 在MSUI 中指示的是当进入该页面就会执行后续方法
> append() 方法表示在该元素的末尾添加字符串;
> 相对应的还有prepend()方法，表示在该元素顶部添加字符串

4.阻止事件冒泡
大多数现代库使用冒泡监听，而在捕获阶段处理。浏览器包含一个方法来管理事件冒泡。事件处理程序可以调用stopPropagation告诉DOM事件停止冒泡，第二个方式是调用stopImmediatePropagation，它不仅停止冒泡，也会阻止这个元素上其它监听当前事件的处理程序触发。然而,停止传播事件时要小心,因为你不知道是否有其它上层的DOM元素可能需要知道当前事件。

[demo演示 (内网)](http://192.168.1.96:2001/ehospital/views/0sui_learn/demo1/demo.html)

[demo github地址](https://github.com/CNCrazyMoon/blog/tree/master/MSUI/demo)

