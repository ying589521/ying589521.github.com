/**
 * Created by lenovo on 2016/10/16.
 */
//弧度转角度
function a2d(n){
    return n*180/Math.PI;
}
//hover的时候返回0,1,2,3,判断鼠标移入的方向
function hoverDir(ev,obj){
    var a = ev.clientX-obj.offsetLeft-obj.offsetWidth/2;
    var b = obj.offsetTop+obj.offsetHeight/2-ev.clientY;

    return Math.round((a2d(Math.atan2(b,a))+180)/90)%4;
}
//穿墙
function through(obj){
    var oS = obj.children[0];
    obj.onmouseenter = function(ev){
        var oEvent = ev||event;
        var dir = hoverDir(oEvent,obj);
        switch(dir){
            case 0:
                //左
                oS.style.left = '-185px';
                oS.style.top = 0;
                break;
            case 1:
                //下
                oS.style.left = 0;
                oS.style.top = '200px';
                break;
            case 2:
                //右
                oS.style.left = '185px';
                oS.style.top = 0;
                break;
            case 3:
                //上
                oS.style.left = 0;
                oS.style.top = '-200px';
                break;
        }
        move(oS,{left:0,top:0});
    };
    obj.onmouseleave = function(ev){
        var oEvent = ev||event;
        var dir = hoverDir(oEvent,obj);
        switch(dir){
            case 0:
                move(oS,{left:-185,top:0});
                break;
            case 1:
                move(oS,{left:0,top:200});
                break;
            case 2:
                move(oS,{left:185,top:0});
                break;
            case 3:
                move(oS,{left:0,top:-200});
                break;
        }
    };
}