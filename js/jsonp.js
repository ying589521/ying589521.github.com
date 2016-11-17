'use strict'
function json2url(json){
    var arr = [];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
/*
 ** @jsonp 				jsonp���򽻻�
 ** @params
 ** 						[object]
 */
function jsonp(json){
    //������ʼֵ
    json = json||{};
    if(!json.url)return;
    //�ص�����
    json.cbName = json.cbName||'cb';
    //��ʱʱ��(ms)
    json.timeout =json.timeout||15000;
    //�ύ����
    json.data = json.data||{};
    //�ص�����������(����˻�������)
    json.data[json.cbName] = 'show'+Math.random();
    //�ѻص����������е�.ȥ����
    json.data[json.cbName] = json.data[json.cbName].replace('.','');
    //���糬ʱ
    json.timer = setTimeout(function(){
        window[json.data[json.cbName]] = function(){
            oHead.removeChild(oS);
            json.error&&json.error('�ף����粻����');
        };
    },json.timeout);
    //����ص�����(ȫ�ֵ�)
    window[json.data[json.cbName]] = function(result){
        //�����糬ʱ�ɵ�
        clearTimeout(json.timer);
        //��Ҫ��scriptɾ��
        oHead.removeChild(oS);
        //ִ�гɹ��ص�����
        json.success&&json.success(result);
    };
    //��ȡhead��ǩ��
    var oHead = document.getElementsByTagName('head')[0];
    //��̬����script
    var oS = document.createElement('script');
    //��script��src
    oS.src = json.url+'?'+json2url(json.data);
    //��script���뵽head��ǩ��
    oHead.appendChild(oS);
}