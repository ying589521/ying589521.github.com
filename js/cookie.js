'use strict'
function setCookie(name,val,iDay){
    if(iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        oDate.setHours(0,0,0,0);
        document.cookie = name+'='+val+'; path=/; expires='+oDate;
    }else{
        document.cookie = name+'='+val+'; path=/;';
    }
}

function getCookie(name){
    //格式 'key=value'
    //多条'key=value; key1=value1'
    var arr = document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');
        if(name==arr2[0]){
            return arr2[1];
        }
    }
}

function removeCookie(name){
    //设置成之前的日子就相当于过期
    setCookie(name,'',-1);
}