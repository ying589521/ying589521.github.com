'use strict'
function json2url(json){
    var arr = [];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}

function ajax(json){
    json = json||{};
    if(!json.url)return;
    json.data = json.data||{};
    json.type = json.type||'get';
    json.timeout = json.timeout||15000;
    json.data.t = Math.random();

    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest()
    }else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            break;
        default:
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
    }

    json.loading&&json.loading();
    json.timer = setTimeout(function(){
        oAjax.onreadystatechange = null;
        oAjax.error&&json.error('�ף����糬ʱ��������');
    },json.timeout);

    oAjax.onreadystatechange = function(){
        if(oAjax.readyState==4){
            clearTimeout(json.timer);
            if(oAjax.atatus>=200&&oAjax.status<300||oAjax.status==304){
                json.success&&json.success(oAjax.responseText);
            }else{
                json.error&&json.error(oAjax.status);
            }
        }
    };
}