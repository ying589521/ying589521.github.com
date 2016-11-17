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
    //��ʱʱ��
    json.timeout = json.timeout||15000;
    json.cbName = json.cbName||'cb';

    //�ص����������ּ���һ�������  ����������
    json.data[json.cbName] = 'show'+Math.random();
    //�ѻص������е�.ȥ��
    json.data[json.cbName] = json.data[json.cbName].replace('.','');

    //���糬ʱ
    json.timer = setTimeout(function(){
        window[json.data[json.cbName]] = function(){};
        oHead.removeChild(oS);
        json.error&&json.error('�ף����糬ʱ');
    },json.timeout);

    //����ص�������ȫ�ֵģ�
    window[json.data[json.cbName]] = function(result){
        //�����糬ʱ���
        clearTimeout(json.timer);
        //��Ҫ��scriptɾ��
        oHead.appendChild(oS);
        //ִ�гɹ��Ļص�����
        json.success&&json.success(result);
    };

    //��ȡhead��ǩ
    var oHead = document.getElementsByTagName('head')[0];
    //��̬����script��ǩ
    var oS = document.createElement('script');
    oS.src = json.url+'?'+json2url(json.data);
    oHead.appendChild(oS);
}