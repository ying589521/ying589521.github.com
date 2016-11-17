$(function(){
    $('.zwjs span').toggle(function(){
        $('.zwjs ul').stop().animate({height:0,opacity:0})
    },function(){
        $('.zwjs ul').stop().animate({height:500,opacity:1})
    });

    var aLi = document.querySelectorAll('.main-right li');
    var aA = document.querySelectorAll('.main-right li a');
    for(var i=0;i<aA.length;i++){
        var str2 = '123456789';
        aA[i].style.backgroundImage = 'url(img/t'+str2.charAt(i)+'.png)';
    }
    for(var i=0;i<aLi.length;i++){
        through(aLi[i]);
        var str = '826753419';
        aLi[i].style.backgroundImage = 'url(img/tt'+str.charAt(i)+'.png)';
        aLi[i].style.WebkitAnimation = 'demo 1s linear infinite';
        $(aLi[i]).hover(function(){
            this.style.WebkitAnimation = 'demo 1s linear 1';
//                   this.style.WebkitTransition='none';
        },function(){
            this.style.WebkitAnimation = 'demo 1s linear infinite';
        });
    }


    $("#gotop6").click(function() {
        TweenMax.to(window, 1, {scrollTo:0});
    });


// 弹跳球式滚动底部 .box2是要滚动地方的id或者锚点
    $("#gotop5").click(function() {
        TweenMax.to(window, 2, {scrollTo:".box2", ease:Bounce.easeOut});
    });


// 返回顶部，绑定gotop1图标和gotop2文字事件
    $("#gotop1,#gotop2").click(function(e) {
        TweenMax.to(window, 1.5, {scrollTo:0, ease: Expo.easeInOut});
        var huojian = new TimelineLite();
        huojian.to("#gotop1", 1, {rotationY:720, scale:0.6, y:"+=40", ease:  Power4.easeOut})
            .to("#gotop1", 1, {y:-1000, opacity:0, ease:  Power4.easeOut}, 0.6)
            .to("#gotop1", 1, {y:0, rotationY:0, opacity:1, scale:1, ease: Expo.easeOut, clearProps: "all"}, "1.4");
    });


// 以1秒慢快慢的速度滚动顶部
    $("#gotop3").click(function() {
        TweenMax.to(window, 1, {scrollTo:0, ease:Expo.easeInOut});
    });

// 以1.5秒快慢快的速度滚动顶部
    $("#gotop4").click(function() {
        TweenMax.to(window, 1.5, {scrollTo:0, ease:SlowMo.ease.config(0.7, 0.7, false)});
    });


    ;(function(){
        var oBox=document.querySelector('#box .box');
        var bLeft=false;
        var bRight=false;
        var bUp=false;
        var bDown=false;

        var x=70;
        var y=-65;

        document.onkeydown=function(ev){
            switch (ev.keyCode)
            {
                case 37:
                    bLeft=true;
                    break;

                case 38:
                    bUp=true;
                    break;

                case 39:
                    bRight=true;
                    break;

                case 40:
                    bDown=true;
                    break;
            }
        };
        document.onkeyup=function(ev){
            switch (ev.keyCode)
            {
                case 37:
                    bLeft=false;
                    break;

                case 38:
                    bUp=false;
                    break;

                case 39:
                    bRight=false;
                    break;

                case 40:
                    bDown=false;
                    break;
            }
        };

        //连续不断的走
        setInterval(function(){
            if(bLeft)
            {
                y-=10;
            }
            if(bUp)
            {
                x+=10;
            }
            if(bRight)
            {
                y+=10;
            }
            if(bDown)
            {
                x-=10;
            }
            oBox.style.transform='perspective(800px) rotateX('+x+'deg)  rotateY('+y+'deg)';
        },30);
    })();

    (function() {
        var oZp = document.getElementById('zp');
        var oCon = oZp.children[0];
        var oUl = document.querySelector('.con ul');
        var aLi = oUl.getElementsByTagName('li');
        var aImg = oUl.getElementsByTagName('img');
        var divC = oCon.offsetWidth / 2;
        oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
        oUl.onmousedown = function(ev) {
            var oEvent = ev || event;
            var disX = oEvent.clientX - oUl.offsetLeft;
            document.onmousemove = function(ev) {
                var oEvent = ev || event;
                var l = oEvent.clientX - disX;
                if (l > divC - aLi[0].offsetLeft - aLi[0].offsetWidth * 0.5) l = divC - aLi[0].offsetLeft - aLi[0].offsetWidth * 0.5;
                if (l < divC - aLi[0].offsetWidth * (aLi.length - 1 + 0.5)) l = divC - aLi[0].offsetWidth * (aLi.length - 1 + 0.5);
                toBig();
                oUl.style.left = l + 'px';
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
        oUl.style.left = divC - aLi[0].offsetWidth * (3 + 0.5) + 'px';

        function toBig() {
            for (var i = 0; i < aLi.length; i++) {
                //求中心的距离
                var dis = Math.abs(divC - oUl.offsetLeft - aLi[i].offsetLeft - aLi[i].offsetWidth / 2);
                var scale = 1 - dis / 500;
                (scale < 0.5) && (scale = 0.5);
                aImg[i].style.width = 800 * scale + 'px';
                aImg[i].style.height = 400 * scale + 'px';
                aImg[i].style.marginLeft = -(aImg[i].offsetWidth - 400) / 2 + 'px';
                aImg[i].style.marginTop = -(aImg[i].offsetHeight - 200) / 2 + 'px';
                aLi[i].style.zIndex = scale * 100;
            };
        };
        toBig();
    })();

});