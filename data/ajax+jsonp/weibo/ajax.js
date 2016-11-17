function json2url(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return arr.join('&');
}
//url,data,type,success,error
function ajax(json){
	if(!json.url){return;}
	json = json||{};
	json.type = json.type||'GET';
	json.data = json.data||{};
	json.timeout = json.timeout||10000;
	//1.创建对象
	if(window.XMLHttpRequest){
		//chrome FF
		var oAjax = new XMLHttpRequest();
	}else{
		//IE低版本	
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	switch(json.type.toLowerCase()){
		case 'get':
		//2.建立连接  //是否异步
		oAjax.open('GET',json.url+'?'+json2url(json.data),true);
		//3.发送
		oAjax.send();
		break;
		case 'post': 
		oAjax.open('POST',json.url,true);
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		oAjax.send(json2url(json.data));
		break;
	}
	json.loading&&json.loading();
	//超过json.timeout 后认为失败 不在请求
	var timer = setTimeout(function(){
		json.error&&json.error();
		json.complete&&json.complete();
		oAjax.onreadystatechange = null;
	},json.timeout);
	
	//4.接收 
	//当网络状态改变的时候
	oAjax.onreadystatechange = function(){
		//网络状态
		if(oAjax.readyState == 4){
			//http状态
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				//服务器返回的数据
				clearTimeout(timer);
				json.success&&json.success(oAjax.responseText);	
				json.complete&&json.complete();
			}else{
				clearTimeout(timer);
				json.error&&json.error(oAjax.status);
				json.complete&&json.complete();
			}
		}
	}; 
}
