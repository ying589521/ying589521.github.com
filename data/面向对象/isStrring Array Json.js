function isString(str){
    if(typeof str=='string'||str instanceof String){
        return true;
    }else{
        return false;
    }
}

function isArray(arr){
    if(arr instanceof Array){
        return true;
    }else{
        return false;
    }
}

function isJson(obj){
    if(obj.constructor==Object){
        return true;
    }else{
        return false;
    }
}
