## MSUI 无限滚动demo
国际惯例，先上 [demo (内网)](http://192.168.1.96:2001/ehospital/views/0sui_learn/demo2/demo2.html)

[demo2 github地址](https://github.com/CNCrazyMoon/TimeKey/tree/master/MSUI/demo2)

1.先完成基本页面
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>demo2</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="http://g.alicdn.com/msui/sm/0.6.2/css/sm.min.css">
    <link rel="stylesheet" href="http://g.alicdn.com/msui/sm/0.6.2/css/sm-extend.min.css">

  </head>
  <body>
    <div class="page-group">
    <div id="demo2" class="page">
      <header class="bar bar-nav">
        <a class="button button-link button-nav pull-left back" href="#">
          <span class="icon icon-left"></span>
          返回
        </a>
        <h1 class="title">底部无限滚动demo</h1>
      </header>
      <div class="content">
       <!-- 正文区-->
      </div>
    </div>
    </div>
    <script type='text/javascript' src='http://g.alicdn.com/sj/lib/zepto/zepto.min.js' charset='utf-8'></script>
    <script type='text/javascript' src='http://g.alicdn.com/msui/sm/0.6.2/js/sm.min.js' charset='utf-8'></script>
    <script type='text/javascript' src='http://g.alicdn.com/msui/sm/0.6.2/js/sm-extend.min.js' charset='utf-8'></script>
    <script type='text/javascript' src="common.js"></script>
    <script type='text/javascript' src="demo2.js"></script>
  </body>
</html>
       
```
 
2.加入无限滚动组件，将div.content中添加如下代码
   * div class="content infinite-scroll" -是我们无限滚动的容器
   * data-distance - 属性用来配置页面滚动到离底部多远时触发无限滚动事件，默认是50 (px)
   * 为便于区分是顶部无限滚动还是底部无限滚动，建议添加 .infinite-scroll-bottom (不添加默认为底部无限滚动)
   * 加载提示符不能少
```html
  <div class="content infinite-scroll infinite-scroll-bottom" data-distance="60">
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
    <!-- 加载提示符 -->
    <div class="infinite-scroll-preloader">
      <div class="preloader"></div>
    </div>
  </div>
```

3.编写业务逻辑
```javascript
//demo2
$(function() {  
    //补充一个简单转换日期格式的方法
    Date.prototype.formatDate = function() {
        return  [this.getFullYear(),this.getMonth()+1,this.getDate()].join("-")+
                " "+[this.getHours(),this.getMinutes(),this.getSeconds()].join(":");
     };   
  
    // 底部滚动加载 item列表方法
    var scrollDemo =  function  (typeId,isNew) {
        var createTime = $('#demo2 .list-container').find('li');
            createTime = createTime[createTime.length-1];
        var createTimeStr = $(createTime).attr('activeTime');
        var $createTimeStr = createTimeStr ? createTimeStr: new Date().formatDate();
        CommonAjax("/ehospital/mobile/article/listByConditions.do",{
           actionType:'UP',
           typeId: typeId,
           createTimeStr: $createTimeStr,
           count:10
        }, function(result){
            // console.log(result); 
            if(result.success){
                var rows = result.rows;
                var len = rows.length;
                var html = '';
                if (10 > len) { // 加载完成(限定每次返回10条数据，小于10则认为已经加载完成)
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    return;
                 }
                for(var i = 0;i<len; i++){
                    html +='<li class="item-content" activeTime="'+ rows[i].activeTime +'">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">' + rows[i].title +'</div>' +
                            '</div>' +
                        '</li>';
                }
                if(isNew){
                 $('.list-container').html(html);
                }else{
                 $('.list-container').append(html);
                }
            }
        });  
    };
    
  //委托: 无限滚动
  $(document).on("pageInit", "#demo2", function(e, id, page) {
    var loading = false;
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        scrollDemo("0"); //执行上拉加载方法
        $.refreshScroller(); 
      }, 1000);
    });
  });
  $.init();
  scrollDemo('0','new'); //进入页面时先加载一次
});

```

4.业务逻辑编写完成之后依照需求移除不需要的页面元素, div.content 修改如下
```html
  <div class="content infinite-scroll infinite-scroll-bottom" data-distance="60">
    <div class="list-block">
      <ul class="list-container"></ul>
    </div>
    <!-- 加载提示符 -->
    <div class="infinite-scroll-preloader">
      <div class="preloader"></div>
    </div>
  </div>
```

5.为加载提示符添加 CSS
```css
  .infinite-scroll-preloader {
    margin-top:-20px;
  }
```
至此，我们很简单的完成了一个提供无限滚动的页面。
