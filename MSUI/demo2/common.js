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
