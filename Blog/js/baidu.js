window.onload = function(){
    var oInp = document.querySelector('.tbox');
    var oBtn = document.querySelector('.btn');
    var oDown = document.getElementById('down_list');
    var oUl = oDown.children[0];
    oInp.onkeyup = function(){
        jsonP({
            "url":"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            data:{
                "wd":this.value
            },
            success:function(res){
                var arr = res.s;
                oUl.innerHTML = '';
                if(arr.length==0){
                    oDown.style.display = 'none';

                }else{
                    oDown.style.display = 'block';
                    for(var i=0;i<arr.length;i++){
                        var oLi = document.createElement('li');
                        oLi.innerHTML = arr[i];
                        oUl.appendChild(oLi);
                    }
                }
            },
            error:function(err){
                console.log('´íÎó'+err);
            }
        })
    };
    oUl.onclick = function(ev){
        var oEvent = ev||event;
        var oSrc = oEvent.srcElement||oEvent.target;
        if(oSrc.tagName!='LI')return;
        window.open('https://www.baidu.com/s?wd='+oSrc.innerHTML,'_self');
        oInp.value = '';
    };
    oBtn.onclick = function(){
        if(oInp.value=='')return;
        window.open('https://www.baidu.com/s?wd='+oInp.value,'_self')
    };
};