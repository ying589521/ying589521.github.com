'use strict'
define(function(require,exports,module){
    var move = require('move2.js').move;
    exports.tab = function(){
        window.onload = function(){
            var oPlay = document.getElementById('play');
            var oOl = document.getElementsByTagName('ol')[0];
            var aBtn = oOl.children;
            var oUl = document.getElementsByTagName('ul')[0];
            var aLi = oUl.children;
            for(var i=0;i<aBtn.length;i++){
                ;(function(index){
                    aBtn[i].onclick = function(){
                        for(var i=0;i<aBtn.length;i++){
                            aBtn[i].className = '';
                        }
                        this.className = 'active';
                        move(oUl,{top:-index*aLi[0].offsetHeight});
                    };
                })(i)
            }

        };
    };
});