$(".back").click(function () {
    if (confirm("结束本轮游戏吗？")) {
        window.location = null;
        window.location = "js-2-pb.html";
        window.close();
    }
});

// 洗盘后的数组
var arr = JSON.parse(sessionStorage.getItem('out-of-order'));
console.log(JSON.parse(sessionStorage.getItem('out-of-order')))

// 添加身份盒子
var para = "<div class=player> <div class=menu>  <p class=status1></p> <p class=number></p> </div> </div>"
var icon = "<div class=box> <div class=choose> <div class=icon1></div> </div>"
for (y = 0; y < arr.length; y++) {
    //在相应位置添加div
    $('main').append(para);
}
$('.player').append(icon);
//获取新增的div
var status1 = document.getElementsByClassName('status1')
var number = document.getElementsByClassName('number')

for (y = 0; y < arr.length; y++) {
    //给div写参数
    status1[y].innerHTML = arr[y];
    number[y].innerHTML = y + 1 + "号";
}

// 接收状态机状态
var a = sessionStorage.getItem('no');
console.log(a)

// 接受对象
var record = JSON.parse(sessionStorage.getItem('record'));

// 死亡后颜色改变
for (x = 0; x < record.length; x++)
    if (record[x].lad == 'dead') {
        $('.status1').eq(x).css({'background': '#83b09a'});
    }


// 在杀人状态时
if (a == 'murder') {
    $('.status1').click(function () {
        var index = $('.status1').index(this)
        $('#btn').unbind('click');
        if (record[index].myId == '杀手') {
            alert('不能自杀,请选择其他职业')
        } else {
            $('#btn').click(function () {
                if (record[index].myId == '平民') {
                    record[index].lad = 'dead';
                    record[index].mySort = 'kill';
                    window.location = "js-2-ck.html";
                    
                    // for(k = 0;k < record.length;k++){
                    //     if(record[k].lad == 'alive'){
                    //         record[k].day = record[k].day + 1;
                    //     }
                    // }
                    sessionStorage.setItem('record', JSON.stringify(record))
                }
            })
        }
    })
}

// 声明活着的杀手人数和平民人数
var aliveNum = 0;
var aliveKill = 0;

for (b = 0; b < record.length; b++) {
    if (record[b].lad == 'alive') {
        aliveNum = aliveNum + 1        
        if(record[b].myId == '杀手'){
            aliveKill = aliveKill + 1
        }
    }
}

// 在投票状态时
if (a == 'nothing') {
    $('#words-1').html('投票');
    $('#words-2').html('发言讨论结束,大家请投票');
    $('#words-3').html('点击得票数最多的人的头像');
    $('.status1').click(function () {
        var index = $('.status1').index(this)
        $('#btn').unbind('click');
        if (record[index].lad == 'dead') {
            alert('玩家以死,选择其他玩家')
        } else {
            $('#btn').click(function () {
                record[index].lad = 'dead';
                if(record[index].mySort == 'kill'){
                    record[index].mySort = 'kill'
                } else {
                    record[index].mySort = 'vote';
                }
                for(k = 0;k < record.length;k++){
                    if(record[k].lad == 'alive'){
                        record[k].day = record[k].day + 1;
                    }
                }
                if(aliveKill != 0 || (aliveNum - aliveKill) != 0){
                    window.location = "js-2-ck.html";
                    // sessionStorage.setItem('no','nothing');
                }
                sessionStorage.setItem('record', JSON.stringify(record))
            })
        }
    })
}

// sessionStorage.setItem('record', JSON.stringify(record))