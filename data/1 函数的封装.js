//补零
    function toDou(num){
        return num<10?'0'+num:''+num;
    }

//随机整数
    function rnd(n,m){    //从n到n的随机整数
        return parseInt(Math.random()*(m-n))+n;
    }

//判断一个字符或数字是否在一个数组里面，在返回true，不在返回false
    function findInArr(str,arr){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==str){
                return true;
            }
        }
        return false;
    };

//获取非行间样式
    function getStyle(obj,name){     //obj为var oBox之类的东西    name为样式 宽高之类
        if(obj.currentStyle){    //低的
            return obj.currentStyle[name];
        }else{
            return getComputedStyle(obj,false)[name];   //高的
        }
    };

//获取非行间样式2
    function getStyle(obj, name){
        return (obj.currentStyle || getComputedStyle(obj, false))[name];
    }

//获取非行间样式3
    function getStyle(obj,sClass){
        return obj.currentStyle?obj.currentStyle[sClass]:getComputedStyle(obj,false)[sClass];
    }

//选项卡封装加封闭空间
    function setStyle(id,shijian){
        var oBox = document.getElementById(id);
        var aBtn = oBox.getElementsByTagName('input');
        var aDiv = oBox.getElementsByTagName('div');
        for(var i=0;i<aBtn.length;i++){
            (function(index){
                aBtn[i][shijian] = function(){
                    for(var i=0;i<aBtn.length;i++){
                        aBtn[i].className = '';
                        aDiv[i].style.display = 'none';
                    }
                    this.className = 'on';
                    aDiv[index].style.display = 'block';
                };
            })(i);
        }
    };

//获取绝对距离
    function getPos(obj){
        var l = 0;
        var t = 0;
        while(obj){
            l+=obj.offsetLeft;
            t+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return {left:l,top:t};
    }

//事件绑定
    function addEvent(obj,sEv,fn){
        if(obj.addEventListener){
            obj.addEventListener(sEv,fn,false);
        }else{
            obj.attachEvent('on'+sEv,fn);
        }
    }

//解除绑定
    function removeEvent(obj,sEv,fn){
        if(obj.removeEventListener){
            obj.removeEventListener(sEv,fn,false);
        }else{
            obj.detachEvent('on'+sEv,fn);
        }
    };

//碰撞检测封装
    function colltest(obj1,obj2){
        var l1=obj1.offsetLeft;
        var r1=obj1.offsetLeft+obj1.offsetWidth;
        var t1=obj1.offsetTop;
        var b1=obj1.offsetTop+obj1.offsetHeight;
        var l2=obj2.offsetLeft;
        var r2=obj2.offsetLeft+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=obj2.offsetTop+obj2.offsetHeight;
        if(l1<=r2 && l2<=r1 && b1>=t2&&t1<=b2){
            return true;
        }else{
            return false;
        }
    }


//滚轮事件的封装
    function addWheel(obj,fn){
        function wheel(ev){
            var oEvent = ev||event;
            var bDown = true;
            bDown = oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
            //处理事情
            fn&&fn(bDown);
            //return false 阻止浏览器的默认行为 碰见事件绑定就不好使了 需要加oEvent.preventDefault()
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        };

        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
            //如果是火狐浏览器的话 ，就用DOMMouseScroll（添加DOM事件必须用事件绑定:高版本）
            obj.addEventListener('DOMMouseScroll',wheel,false);
        }else{
            //obj.onmousewheel  除火狐之外的浏览器
            obj.onmousewheel = wheel;
        }
    };

//domready 函数的封装  DOM（HTML）加载完毕就执行
    function domReady(fn){
        if(document.addEventListener){  //低版本为undefined
            //DOMContentLoaded 高版本都支持  指的是dom（html）的内容都加载完毕
            document.addEventListener('DOMContentLoaded',function(){
                fn&&fn();   //处理事情
            },false)
        }else{
            //obj.onreadystatechange     监控资源的情况   低版本
            document.onreadystatechange = function(){
                //obj.readyState				此时加载的情况
                //obj.readyState=='complete'   加载完成
                if(document.readyState=='complete'){
                    fn&&fn();   //处理事情
                }
            };
        }
    }


//运动的函数
            //obj为oBox之类的  name为属性   ITarget为最终属性要变成的样子  durstion 总时间 complete执行完move要执行的函数
            //eg:  move(oBox,'width','300',800,function(){
            //  move(oBox,'height','300',800);
        // });
    function move(obj,name,iTarget,durstion,complete){
        clearInterval(obj.timer);
        //起始位置
        var start = parseFloat(getStyle(obj,name));
        //总距离  （终点位置 - 起点位置）
        var dis = iTarget-start;
        //总次数（总时间 / 每次运动的时间）
        var count = Math.floor(durstion/30);
        //每次走多少（总时间 / 总次数）
        var step = dis/count;
        //当前走了几次
        var n = 0;
        obj.timer = setInterval(function(){
            n++; //次数再不断的增加
            if(name=='opacity'){
                obj.style.opacity = start+n*step;
            }else{
                obj.style[name] = start+n*step+'px';
            }
            //当当前走的次数等于总次数的时候 关闭定时器
            if(n==count){
                //alert('走完了');
                clearInterval(obj.timer);
                complete && complete();
            }
        },30);
    }

//运动函数
    function getStyle(obj,name){
        return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
    }
// obj（oBox） json{name1：值1，name2，值2} duration（总时间）easing（运动方式） 后面要执行的函数
    function move(obj,json,duration,easing,complete){
        clearInterval(obj.timer);
        //{width:300,height:300}

        //{width:0,height:0}
        var start={};
        //dis {width:300,height:300 }
        var dis={};
        for(var name in json){
            start[name] = parseFloat(getStyle(obj,name));
            dis[name] = json[name]-start[name];
        }
        //总次数
        var count = Math.floor(duration/30);
        //当前走了几次
        var n =0;
        obj.timer=setInterval(function(){
            n++;
            for(var name in json){
                switch (easing){
                    case 'linear':
                        var a = n/count;
                        var cur = dis[name]*a;
                        break;
                    case 'ease-in':
                        var a = n/count;
                        var cur = dis[name]*a*a*a;
                        break;
                    case 'ease-out':
                        var a = 1-n/count;
                        var cur = dis[name]*(1-a*a*a);
                        break;
                }

                if(name=='opacity'){
                    obj.style.opacity=start[name]+cur;
                    obj.style.filter='alpha(opacity:'+(start[name]+cur)*100+')';
                }else{
                    obj.style[name]=start[name]+cur+'px';
                }
            }
            if(n==count){
    //                        alert('走完了');
                clearInterval(obj.timer);
                complete && complete();
            }
        },30);
    }