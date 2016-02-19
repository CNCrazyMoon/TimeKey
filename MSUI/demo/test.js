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

$(function() {
    // item列表操作方法
    var itemDemo =  function  (id) {
        $.showIndicator();
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
            setTimeout(function(){
                $.hideIndicator();
            },2000);
        });  
    };
    
    // 进行事件委托
    $(document).on("pageInit", "#page1", function(e, id, page) {
        $(page).on('click','.item-title',function (e) {
          var articleId = "4f429394-5c47-4bf0-801f-daf910877f6f";
            itemDemo(articleId);
             // e.stopPropagation();
            e.stopImmediatePropagation();
        });

        var itemIndex = 0;
        $(page).on('click','.item-inner',function (e) {
           $(e.target).find('.item-title').text('第'+itemIndex+'次点击');
           itemIndex ++;
           console.log("检测冒泡");
           console.log(itemIndex);
        });
    });
  $.init();
});
