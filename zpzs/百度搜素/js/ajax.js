'use strict'
//将ajax中的json对象转换成url数据
function json2url(json){
    var arr = [];
    for(var name in json){
        arr.push(name+'='+encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

function ajax(json){
    //json 共包括 url type  data timeout loading fnSuc fnFaild
    //给参数初始值
    json = json||{};
    if(!json.url) return;
    json.type = json.type||'get';
    json.data = json.data||{};
    //处理缓存
    json.data.t = Math.random();
    json.timeout = json.timeout||15000;


    //判断浏览器兼容  创建ajax对象
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //判断交互方式 同时进行打开和发送操作
    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            oAjax.send(json2url(json.data));
            break;
        default:
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;

    }

    //交互等待
    json.loading&&json.loading();

    //网络超时
    json.timer = setTimeout(function(){
        //网络超时的时候，需要把ajax的接收干掉
        oAjax.onreadystatechange = null;
        json.error&&json.error('亲，网络超时，呵呵哒');
    },json.timeout);

    //接收响应
    oAjax.onreadystatechange = function(){
        //判断ajax状态是否成功
        if(oAjax.readyState==4){
            //清除网络超时定时器
            clearTimeout(json.timer);
            //判断http状态码是否成功
            if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
                json.success&&json.success(oAjax.responseText);
            }else{
                json.error&&json.error(oAjax.status)
            }
        }
    };

};














