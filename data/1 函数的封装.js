//����
    function toDou(num){
        return num<10?'0'+num:''+num;
    }

//�������
    function rnd(n,m){    //��n��n���������
        return parseInt(Math.random()*(m-n))+n;
    }

//�ж�һ���ַ��������Ƿ���һ���������棬�ڷ���true�����ڷ���false
    function findInArr(str,arr){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==str){
                return true;
            }
        }
        return false;
    };

//��ȡ���м���ʽ
    function getStyle(obj,name){     //objΪvar oBox֮��Ķ���    nameΪ��ʽ ���֮��
        if(obj.currentStyle){    //�͵�
            return obj.currentStyle[name];
        }else{
            return getComputedStyle(obj,false)[name];   //�ߵ�
        }
    };

//��ȡ���м���ʽ2
    function getStyle(obj, name){
        return (obj.currentStyle || getComputedStyle(obj, false))[name];
    }

//��ȡ���м���ʽ3
    function getStyle(obj,sClass){
        return obj.currentStyle?obj.currentStyle[sClass]:getComputedStyle(obj,false)[sClass];
    }

//ѡ���װ�ӷ�տռ�
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

//��ȡ���Ծ���
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

//�¼���
    function addEvent(obj,sEv,fn){
        if(obj.addEventListener){
            obj.addEventListener(sEv,fn,false);
        }else{
            obj.attachEvent('on'+sEv,fn);
        }
    }

//�����
    function removeEvent(obj,sEv,fn){
        if(obj.removeEventListener){
            obj.removeEventListener(sEv,fn,false);
        }else{
            obj.detachEvent('on'+sEv,fn);
        }
    };

//��ײ����װ
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


//�����¼��ķ�װ
    function addWheel(obj,fn){
        function wheel(ev){
            var oEvent = ev||event;
            var bDown = true;
            bDown = oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
            //��������
            fn&&fn(bDown);
            //return false ��ֹ�������Ĭ����Ϊ �����¼��󶨾Ͳ���ʹ�� ��Ҫ��oEvent.preventDefault()
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        };

        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
            //����ǻ��������Ļ� ������DOMMouseScroll�����DOM�¼��������¼���:�߰汾��
            obj.addEventListener('DOMMouseScroll',wheel,false);
        }else{
            //obj.onmousewheel  �����֮��������
            obj.onmousewheel = wheel;
        }
    };

//domready �����ķ�װ  DOM��HTML��������Ͼ�ִ��
    function domReady(fn){
        if(document.addEventListener){  //�Ͱ汾Ϊundefined
            //DOMContentLoaded �߰汾��֧��  ָ����dom��html�������ݶ��������
            document.addEventListener('DOMContentLoaded',function(){
                fn&&fn();   //��������
            },false)
        }else{
            //obj.onreadystatechange     �����Դ�����   �Ͱ汾
            document.onreadystatechange = function(){
                //obj.readyState				��ʱ���ص����
                //obj.readyState=='complete'   �������
                if(document.readyState=='complete'){
                    fn&&fn();   //��������
                }
            };
        }
    }


//�˶��ĺ���
            //objΪoBox֮���  nameΪ����   ITargetΪ��������Ҫ��ɵ�����  durstion ��ʱ�� completeִ����moveҪִ�еĺ���
            //eg:  move(oBox,'width','300',800,function(){
            //  move(oBox,'height','300',800);
        // });
    function move(obj,name,iTarget,durstion,complete){
        clearInterval(obj.timer);
        //��ʼλ��
        var start = parseFloat(getStyle(obj,name));
        //�ܾ���  ���յ�λ�� - ���λ�ã�
        var dis = iTarget-start;
        //�ܴ�������ʱ�� / ÿ���˶���ʱ�䣩
        var count = Math.floor(durstion/30);
        //ÿ���߶��٣���ʱ�� / �ܴ�����
        var step = dis/count;
        //��ǰ���˼���
        var n = 0;
        obj.timer = setInterval(function(){
            n++; //�����ٲ��ϵ�����
            if(name=='opacity'){
                obj.style.opacity = start+n*step;
            }else{
                obj.style[name] = start+n*step+'px';
            }
            //����ǰ�ߵĴ��������ܴ�����ʱ�� �رն�ʱ��
            if(n==count){
                //alert('������');
                clearInterval(obj.timer);
                complete && complete();
            }
        },30);
    }

//�˶�����
    function getStyle(obj,name){
        return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
    }
// obj��oBox�� json{name1��ֵ1��name2��ֵ2} duration����ʱ�䣩easing���˶���ʽ�� ����Ҫִ�еĺ���
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
        //�ܴ���
        var count = Math.floor(duration/30);
        //��ǰ���˼���
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
    //                        alert('������');
                clearInterval(obj.timer);
                complete && complete();
            }
        },30);
    }