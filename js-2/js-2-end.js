$("#back").click(function(){
        window.location = "js-2-pb.html";
})
$(".again").click(function(){
    window.location = "js-2-fp.html";
})

// 接收判定对象
var record = JSON.parse(sessionStorage.getItem('record'));
console.log(JSON.parse(sessionStorage.getItem('record')))

// 显示杀手和平民剩余人数
var aliveNum = 0;
var aliveKill = 0;

for (a = 0; a < record.length; a++) {
    if (record[a].lad == 'alive') {
        aliveNum = aliveNum + 1        
        if(record[a].myId == '杀手'){
            aliveKill = aliveKill + 1
        }
    }
}

$('.show').eq(0).html('杀手'+ aliveKill +'人')
$('.show').eq(1).html('平民'+ (aliveNum - aliveKill) +'人')

// 动态生成天数
var day = '';

for(create = 0; create < record.length; create++){
    if(record[create].lad == 'alive'){
        day = record[create].day;
    }
} 

for(let m = 1;m <= day;m++){
    var writeHtml =
    `    
    <div class="day-wrap">
        <p class="day">${'第'+ m +'天'}</p>
        <p class="be-killed">黑夜：</p>
        <p class="vote-die">白天：</p>
    </div>  
    `;
    $('.showresult').append(writeHtml)  
}

//  显示死亡信息
var deadx = 0;
for(i = 0;i <record.length;i++){
    if(record[i].lad == 'dead'){
        deadx = deadx + 1
    } 
}

for(i = 0;i <record.length;i++){
    if(record[i].day<=Math.ceil(deadx/2)){
        // console.log(record[i])
        if(record[i].mySort=='kill'){
            $('.be-killed').eq(record[i].day-1).html('黑夜：' + (record[i].num + 1) + '号被杀死了,真实身份是平民')
        }else if(record[i].mySort=='vote'){
            $('.vote-die').eq(record[i].day-1).html('白天：' + (record[i].num + 1) + '号被投死了,真实身份是' + record[i].myId)
        }
    }  
}