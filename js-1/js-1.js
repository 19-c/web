var list = document.getElementsByClassName('div');
var run = document.getElementById('run');
var stop = document.getElementById('stop');
function begin() {
    var one = Math.floor(Math.random()*list.length);
    var two = Math.floor(Math.random()*list.length);
    var three = Math.floor(Math.random()*list.length);
    console.log('one='+one,'two='+two,'three='+three);
    if(one === two){
        one = Math.floor(Math.random()*list.length);
    }else if(two === three){
        two = Math.floor(Math.random()*list.length);
    }else if(three === one){
        three = Math.floor(Math.random()*list.length);
    }
    list[one].style.backgroundColor = 'rgb'+ colors();
    list[two].style.backgroundColor = 'rgb'+ colors();
    list[three].style.backgroundColor = 'rgb'+ colors();
}
function colors() {
    var rgb;
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    console.log('r='+r,'g='+g,'b='+b);
    rgb = '('+r+','+g+','+b+')';
    return rgb;
}
var time;
run.onclick = function(){
    clearInterval(time);
        document.getElementById("run").style.backgroundColor="#e99414";
        document.getElementById("run").style.color="#fff";
        document.getElementById("stop").style.backgroundColor="#fff";
        document.getElementById("stop").style.color="#e99414";
    time = setInterval(function(){
        for(var i = 0; i < list.length; i++){
           list[i].style.backgroundColor = '';
        }
        begin();
    },1000);
}
stop.onclick = function(){
        document.getElementById("run").style.backgroundColor="#fff";
        document.getElementById("run").style.color="#e99414";
        document.getElementById("stop").style.backgroundColor="#e99414";
        document.getElementById("stop").style.color="#fff";
    clearInterval(time);
        for(var i = 0; i < list.length; i++){
            list[i].style.backgroundColor = '';
        }
}

// function buttonClick(c){
//     if(c==1){
//         document.getElementById("run").style.backgroundColor="#e99414";
//         document.getElementById("run").style.color="#fff";
//         document.getElementById("stop").style.backgroundColor="#fff";
//         document.getElementById("stop").style.color="#e99414";
//     }
//     if(c==2){
//     document.getElementById("run").style.backgroundColor="#fff";
//     document.getElementById("run").style.color="#e99414";
//     document.getElementById("stop").style.backgroundColor="#e99414";
//     document.getElementById("stop").style.color="#fff";
//     }
// }

