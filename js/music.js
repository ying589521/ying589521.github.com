'use strict'
function getStyle(obj,name){
    return (obj.columnRuleStyle || getComputedStyle(obj,false))[name]
}
$(function(){
    ;(function(){
        var oA = document.querySelector('audio');
        var oPlay = document.querySelector('.apply');
        var oShow = document.querySelector('.show');
        var oBar = document.querySelector('#bar');
        //个人头像运
        function photo(){
            var oDiv = document.querySelector('.photo');
            var ow = document.documentElement.clientWidth;
            var l=0;
            var t=0;
            var send = 0;
            var oleft = oDiv.offsetLeft;
            var time = null;
            time = setInterval(function(){
                send -= (l-(ow/4))/20;
                send *=.8;
                l+=send;
                oDiv.style.left = l+'px';
                if(l==(ow/4)){
                    clearInterval(time);
                    fnAudio();
                }
            },1000/60)
        }
        photo();
        function fnAudio(){
            var apple = false;

            oA.style.transform='rotate(0deg)';
            setTimeout(function(){
                oShow.style.display='block';
                oPlay.style.transform='rotate(0deg)';
            },30);
            oA.play();
            oBar.className = 'yinyue';
            oPlay.onclick = function(){
                var rotate = getStyle(oBar,'transform');
                console.log(rotate);
                if(apple){
                    oA.play();
                    oBar.style.transform = rotate;
                    oBar.className = 'yinyue';
                    oPlay.style.transform='rotate(0deg)';
                    setTimeout(function(){
                        oShow.style.display='block';
                    },500);
                    apple = false;
                }else{
                    oA.pause();
                    oBar.className = '';
                    oShow.style.display='none';
                    oPlay.style.transform='rotate(-30deg)';
                    oBar.style.transform=rotate;
                    apple = true;
                };
            }
        }
    })();
})






























































