var back = document.getElementById("back");
var num1 = document.getElementById("num-1");
var num2 = document.getElementById("num-2");
var btn = document.getElementById("btn");
var tu = document.getElementById("tu");
var wrap2 = document.getElementById("wrap-p");
var headword = document.getElementById("head-word");

// 接收储存平民杀手人数
var ss = sessionStorage.getItem('ssKey');
console.log(sessionStorage.getItem('ssKey'))
var pm = sessionStorage.getItem('pmKey');
console.log(sessionStorage.getItem('pmKey'))
var nop = sessionStorage.getItem('ssKey') - (-sessionStorage.getItem('pmKey'));
console.log(nop)

// 返回主页
back.onclick = function(){
    if(confirm("您确定要关闭本页吗？")){
        window.location = null;
        window.location = "js-2-pb.html";
        window.close();
    }
}

// 洗盘算法及数组  ss:杀手 pm:平民
var arr = shuffle(ss,pm);
function shuffle(ss,pm){
    var arr = [];
    for(var i = ss; i--;){
        arr.push("杀手");
    }
    for(var i = pm;i--;){
        arr.push("平民");
    } 
    for (var m = arr.length;m;) {
		var i = Math.floor(Math.random()*m--);
		var t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
    return arr;
}
console.log(arr);
// 储存洗盘后的数组
sessionStorage.setItem('out-of-order',JSON.stringify(arr))

// 点击事件及输出数组
var x = 0;
var y = 0;

btn.onclick = function(){
    var name = document.getElementById("name")

    x = x+1;
    if(x == 2*nop+1){
        window.location = "js-2-ck.html";
    }
    //最后点击
    else if(x == 2*nop){
        btn.innerHTML = "开始游戏";
        headword.innerHTML = "法官日志";
        wrap2.className = "wrap_3";
        document.getElementById("name").style.display="none";//隐藏
          
        //增加div
        var para = "<div class=demo> <div class=demo2> </div>   <div class=demo3> </div>  </div>"
        for(y = 0; y < arr.length; y++) {
           //在相应位置添加div
            $('#wrap-p').append(para);  
        }
        //获取新增的div
        var demo2 = document.getElementsByClassName('demo2')
        var demo3 = document.getElementsByClassName('demo3')
        for(y = 0; y < arr.length; y++) {
           //给div写参数
            demo2[y].innerHTML = arr[y];
            demo3[y].innerHTML = y + 1 +"号";
        }
    }else if(x == 2*nop-1){
        wrap2.className = "wrap-2";
        btn.innerHTML = "法官查看";
        name.innerHTML = arr[y];
        console.log(arr[y]);
        if(arr[y] == "杀手"){
            document.getElementById("tu").src = '../js-2/sf-img/cha.png';
        }else{
            document.getElementById("tu").src = '../js-2/sf-img/pingmin.png';
        }

    }else if(x%2 == 0){
        num1.innerHTML++;
        btn.innerHTML = "查看"+num1.innerHTML+"号身份";
        wrap2.className = "wrap";
        document.getElementById("tu").src = '../js-2/sf-img/huangshang.png';
    }else{
        // 图片邦定
        if(arr[y] == "杀手"){
            document.getElementById("tu").src = '../js-2/sf-img/cha.png';
        }else{
            document.getElementById("tu").src = '../js-2/sf-img/pingmin.png';
        }

        num2.innerHTML++;

        name.innerHTML = arr[y];
        console.log(arr[y]);
        y++;
        btn.innerHTML = "隐藏并传递给"+num2.innerHTML+"号";
        wrap2.className = "wrap-2";
    }
}

// 储存状态机初始值
sessionStorage.setItem('no','nothing');
console.log(sessionStorage.getItem('no'))

// 创建判定对象
var xxx = []
for(a = 0; a < arr.length; a++){
    var obj = {};
    obj.day = 1;
    obj.lad = 'alive';
    obj.num = a;
    obj.mySort = '';
    obj.myId = arr[a];
    xxx.push(obj);
}
console.log(xxx)
sessionStorage.setItem('record',JSON.stringify(xxx))