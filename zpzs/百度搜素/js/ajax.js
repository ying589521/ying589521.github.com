'use strict'
//��ajax�е�json����ת����url����
function json2url(json){
    var arr = [];
    for(var name in json){
        arr.push(name+'='+encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

function ajax(json){
    //json ������ url type  data timeout loading fnSuc fnFaild
    //��������ʼֵ
    json = json||{};
    if(!json.url) return;
    json.type = json.type||'get';
    json.data = json.data||{};
    //������
    json.data.t = Math.random();
    json.timeout = json.timeout||15000;


    //�ж����������  ����ajax����
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //�жϽ�����ʽ ͬʱ���д򿪺ͷ��Ͳ���
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

    //�����ȴ�
    json.loading&&json.loading();

    //���糬ʱ
    json.timer = setTimeout(function(){
        //���糬ʱ��ʱ����Ҫ��ajax�Ľ��ոɵ�
        oAjax.onreadystatechange = null;
        json.error&&json.error('�ף����糬ʱ���Ǻ���');
    },json.timeout);

    //������Ӧ
    oAjax.onreadystatechange = function(){
        //�ж�ajax״̬�Ƿ�ɹ�
        if(oAjax.readyState==4){
            //������糬ʱ��ʱ��
            clearTimeout(json.timer);
            //�ж�http״̬���Ƿ�ɹ�
            if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
                json.success&&json.success(oAjax.responseText);
            }else{
                json.error&&json.error(oAjax.status)
            }
        }
    };

};














