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

});