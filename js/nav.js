window.onload = function(){
    var aS = document.querySelectorAll('.span1');
    var x = -40;
    setInterval(function(){
        x+=10;
        for(var i=0;i<aS.length;i++){
            aS[i].style.backgroundPosition = x+'px 0';
        }
    },800)
};