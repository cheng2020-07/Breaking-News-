// 设置路径(测试)
var baseURL = 'http://ajax.frontend.itheima.net';
// 设置路径(生产)
// var baseURL = 'http://www.itcast.cn';

// 1. 拦截/过滤 每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function (options) {
    // console.log(options)
    options.url = baseURL + options.url;
    // console.log(options)

    // 2. 判断，请求路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    // 3.所有的请求完成后都要进行身份认证判断:
    options.complete = function (res) {
        var data = res.responseJSON;
        // console.log(data)
        if (data.status == 1 && data.message == '身份认证失败！') {
            // 1.删除token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = '/login.html';
        }
    }

});




