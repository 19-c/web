$("#btn").click(function(){
    window.location = "js-2-ck.html";
});

JSON.parse(sessionStorage.getItem('out-of-order'));
console.log(JSON.parse(sessionStorage.getItem('out-of-order')))
var arr = JSON.parse(sessionStorage.getItem('out-of-order'));

var y = 0;

var para = "<div class=demo> <div class=demo2> </div>   <div class=demo3> </div>  </div>"
for(y = 0; y < arr.length; y++){
   //在相应位置添加div
    $('#wrap-p').append(para);  
}
//获取新增的div
var demo2 = document.getElementsByClassName('demo2')
var demo3 = document.getElementsByClassName('demo3')
for(y = 0; y < arr.length; y++){
   //给div写参数
    demo2[y].innerHTML = arr[y];
    demo3[y].innerHTML = y + 1 +"号";
}
var record = JSON.parse(sessionStorage.getItem('record'));
console.log(JSON.parse(sessionStorage.getItem('record')))

for(x = 0;x < record.length;x++)
if( record[x].lad == 'dead'){
    $('.demo').eq(x).css({'background':'#83b09a'});
}