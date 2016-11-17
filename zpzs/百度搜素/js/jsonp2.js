'use strict'
function json2url(json){
    var arr = [];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
};
function jsonP(json){
    json = json||{};
    if(!json.url)return;
    json.data = json.data||{};
    json.timeout = json.timeout||15000;
    json.cbName = json.cbName||'cb';
    //´¦Àí»º´æ
    json.data[json.cbName] = 'show'+Math.random();
    json.data[json.cbName] = json.data[json.cbName].replace('.','');

    json.timer = setTimeout(function(){
        window[json.data[json.cbName]] = function(){};
        oH.removeChild(oS);
        json.error&&json.error('Ç×£¬ÍøÂç³¬Ê±');
    },json.timeout);
    window[json.data[json.cbName]] = function(result){
        clearTimeout(json.timer);
        oH.removeChild(oS);
        json.success&&json.success(result);
    };
    var oH = document.getElementsByTagName('head')[0];
    var oS = document.createElement('script');
    oS.src = json.url+'?'+json2url(json.data);
    oH.appendChild(oS);
}