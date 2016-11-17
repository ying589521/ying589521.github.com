'use strict'
function json2url(json){
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return arr.join('&')
};

function ajax(json){
	json = json||json;
	if(!json.url)return;
	json.type = json.type||'get';
	json.data = json.data||{};
	json.timeout = json.timeout||15000;
	json.data.t = Math.random();

	//创建一个ajax对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//判断类型 打开连接 并发送请求
	switch(json.type.toLocaleLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	json.loading&&json.loading();
	json.timer = setTimeout(function(){
		oAjax.onreadystatechange = null;
		json.error&&json.error('网络超时，呵呵哒');
	},json.timeout);

	//接收响应
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				json.success&&json.success(oAjax.responseText);
			}else{
				json.error&&json.error(oAjax.status);
			}
		}
	};
}














