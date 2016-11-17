'use strict'
function json2url(json){
    var arr = [];
    for(var name in json){
        arr.push(name+'='+json[name])
    }
    return arr.join('&');
}

function jsonP(json){
    json = json||{};
    if(!json.url) return;
    json.data = json.data||{};
    //超时时间
    json.timeout = json.timeout||15000;
    json.cbName = json.cbName||'cb';

    //回调函数的名字加了一个随机数  处理缓存问题
    json.data[json.cbName] = 'show'+Math.random();
    //把回调函数中的.去掉
    json.data[json.cbName] = json.data[json.cbName].replace('.','');

    //网络超时
    json.timer = setTimeout(function(){
        window[json.data[json.cbName]] = function(){};
        oHead.removeChild(oS);
        json.error&&json.error('亲，网络超时');
    },json.timeout);

    //定义回调函数（全局的）
    window[json.data[json.cbName]] = function(result){
        //把网络超时清掉
        clearTimeout(json.timer);
        //需要把script删除
        oHead.appendChild(oS);
        //执行成功的回调函数
        json.success&&json.success(result);
    };

    //获取head标签
    var oHead = document.getElementsByTagName('head')[0];
    //动态创建script标签
    var oS = document.createElement('script');
    oS.src = json.url+'?'+json2url(json.data);
    oHead.appendChild(oS);
}