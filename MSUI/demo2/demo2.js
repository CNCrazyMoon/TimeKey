
//demo2
$(function() {  
    //补充一个简单转换日期格式的方法
    Date.prototype.formatDate = function() {
        return  [this.getFullYear(),this.getMonth()+1,this.getDate()].join("-")+
                " "+[this.getHours(),this.getMinutes(),this.getSeconds()].join(":");
     };   
  
    // 滚动加载 item列表方法
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
 