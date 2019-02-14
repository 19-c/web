var textNumber = document.getElementById("textNumber");
var rangeNumber = document.getElementById("rangeNumber");
var renshu1 = document.getElementById("renshu1");
var renshu2 = document.getElementById("renshu2");

// 进度条的初始值/文本框初始值/文本框最大长度
textNumber.value=4;
textNumber.maxLength=2;
rangeNumber.value=4;

//输入框与滚动条同步
textNumber.oninput = function getNumber(){
    rangeNumber.value=textNumber.value;
    var len = this.value;
    len = (len-4)/14*100;
    rangeNumber.setAttribute('style','background-size:'+len + '% 100%');
    var x = rangeNumber.value;
    if(textNumber.value < 4 || textNumber.value > 18){
        renshu1.innerHTML = 0;
        renshu2.innerHTML = 0;
    }else if(x == 15 || x == 18) {
        renshu1.innerHTML = Math.floor(x/3-1);
        renshu2.innerHTML = x-renshu1.innerHTML;
    }else if(x >= 4 || x <= 18){
        renshu1.innerHTML = Math.floor(x/3);
        renshu2.innerHTML = x-Math.floor(x/3);
    }
}

//滚动条改变玩家人数随着改变
rangeNumber.oninput = function change(){
    textNumber.value=rangeNumber.value;
    var len = this.value;
    len = (len-4)/14*100;
    rangeNumber.setAttribute('style','background-size:'+len + '% 100%');
    var x = rangeNumber.value;
    if(x == 15 || x == 18) {
        renshu1.innerHTML = Math.floor(x/3-1);
        renshu2.innerHTML = x-renshu1.innerHTML;
    }else if(x >= 4 || x <= 18){
        renshu1.innerHTML = Math.floor(x/3);
        renshu2.innerHTML = x-Math.floor(x/3);
    }
}

//减号按钮与滚动条同步
function btLeft(){
    rangeNumber.value--;
    if(textNumber.value<=4) {
        alert("人数不足，请凑好再来");
    }
    else{
        textNumber.value=rangeNumber.value;
    }
    var len = rangeNumber.value;
    len = (len-4)/14*100;
    rangeNumber.setAttribute('style','background-size:'+len + '% 100%');
    var x = rangeNumber.value;
    if(x == 15 || x == 18) {
        renshu1.innerHTML = Math.floor(x/3-1);
        renshu2.innerHTML = x-renshu1.innerHTML;
    }else if(x >= 4 || x <= 18){
        renshu1.innerHTML = Math.floor(x/3);
        renshu2.innerHTML = x-Math.floor(x/3);
    }
}

//加号按钮与滚动条同步
function btRight(){
    rangeNumber.value++;
    if(textNumber.value>=18) {
        alert("人数太多，请分开游戏");
    }else{
        textNumber.value=rangeNumber.value;
    }
    var len = rangeNumber.value;
    len = (len-4)/14*100;
    rangeNumber.setAttribute('style','background-size:'+len + '% 100%');
    var x = rangeNumber.value;
    if(x == 15 || x == 18) {
        renshu1.innerHTML = Math.floor(x/3-1);
        renshu2.innerHTML = x-renshu1.innerHTML;
    }else if(x >= 4 || x <= 18){
        renshu1.innerHTML = Math.floor(x/3);
        renshu2.innerHTML = x-Math.floor(x/3);
    }
}

// 玩家人数不对报错
function baocuo(){
    if(textNumber.value<4 || textNumber.value>18){
        alert("请输入正确玩家人数");
    }
    else{
        window.location="js-2-sf.html";
    }
    var ss = renshu1.innerHTML;
    sessionStorage.setItem('ssKey',ss);
    var pm = renshu2.innerHTML;
    sessionStorage.setItem('pmKey',pm);
}