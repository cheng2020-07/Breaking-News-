// 4.入口函数
$(function () {
    // 1.点击按钮，切换登陆和注册部分页面
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })

// 5  2.定义 layui 表单校验规则;
var form = layui.form;
// 利用form这个对象，创建规则
form.verify({
    // 属性的值可以是数组，也可以是函数；
    //   密码校验规则
    pwd: [/^\S{6,12}$/, "密码为6-12位，不能包含空格！"],
    //   确定密码校验规则
    repwd: function (value) {
        if ($("#reg-pwd").val() !== value) {
            return "两次密码输入不一致！"
        }
    }
});

//  6.监听注册表单的提交事件
// 3.注册功能
 var layer = layui.layer;

    $("#form_reg").on("submit", function (e) {
     // 阻止表单默认提交
     e.preventDefault();
     // console.log($("#form_reg").serialize());
     //6.1 ajax发送异步提交
     $.ajax({
         type: 'post',
         url: '/api/reguser',
         // data: $("#form_reg").serialize(),
         data: {
             username: $("#form_reg [name=username]").val(),
             password: $("#form_reg [name=password]").val()
         },
         success: function (res) {
             // 注册失败校验
             if (res.status != 0) {
                 return layer.msg(res.message);
             }
             // 6.2注册成功，提示
             layer.msg(res.message);
             // 触动切换到登陆的a连接的点击行为
             $("#link_login").click();
             // 清空表单
             $("#form_reg")[0].reset();
         }
     })
 });

 // 7.登陆
 $("#form_login").on("submit", function (e) {
    // 阻止表单默认提交
    e.preventDefault();
    // ajax发送异步提交
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            // 注册失败校验
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            // 注册成功，提示
            layer.msg(res.message);
            // 保存token
            localStorage.setItem("token", res.token);
            // 页面跳转
            location.href = "/index.html";
        }
    })
});







})