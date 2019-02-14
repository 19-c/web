// 返回主菜单
$("#back").click(function(){
    if(confirm("结束本轮游戏吗？")){
        window.location = null;
        window.location = "js-2-pb.html";
        window.close();
    }
});
$(".gameover").click(function(){
    if(confirm("结束本轮游戏吗？")){
        window.location = null;
        window.location = "js-2-end.html";
        window.close();
    }
});
// 接收判定对象
var record = JSON.parse(sessionStorage.getItem('record'));
console.log(JSON.parse(sessionStorage.getItem('record')))

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
    <button class="day c-s show">第${m}天</button>
    <div class="day-content c-s">
        <div class="first-wrap">
            <div class="icon-wrap">
                <img class="img-style moon" src="../js-2/ck.img/moon.png" alt="">
            </div>
            <div class="button-wrap">
                <button class="blue-wrap murder" id="murder">杀手杀人</button>
                <p class="be-killed" id="be-killed"></p>
            </div>
        </div>
        <div class="first-wrap">
            <div class="icon-wrap">
                <img class="img-style sun" src="../js-2/ck.img/sun.png" alt="">
            </div>
            <div class="button-wrap">
                <button class="blue-wrap wrap-margin lastwords" id="lastwords">亡灵发表遗言</button>
                <button class="blue-wrap wrap-margin speak" id="speak">玩家依次发言</button>
                <button class="blue-wrap wrap-margin vote" id="vote">全民投票</button>
                <p class="vote-die"></p>
            </div>
        </div>
    </div>
    `;
    $('main').append(writeHtml)  
}

// 第一个框和最后框的点击
$('.day').eq(0).click(function(){
    $('.day-content').eq(0).slideToggle();
});
$('.day').eq(day).click(function(){
    $('.day-content').eq(day).slideToggle();
});


// 跳转法官日志
$(".log").click(function(){
    window.location = "js-2-fgrz.html";
});

//  显示死亡信息
var deadx = 0;
for(i = 0;i < record.length;i++){
    if(record[i].lad == 'dead'){
        deadx = deadx + 1
    } 
}

for(i = 0;i < record.length;i++){
    if(record[i].day <= Math.ceil(deadx/2)){
        // console.log(record[i])
        if(record[i].mySort == 'kill'){
            $('.be-killed').eq(record[i].day-1).html(record[i].num + 1 +'号被杀手杀死,真实身份是平民')
        }else if(record[i].mySort == 'vote'){
            $('.vote-die').eq(record[i].day-1).html(record[i].num + 1 +'号被投死,真实身份是' + record[i].myId)
        }
    }
}
// console.log(deadx)
// console.log(Math.ceil(deadx/2)-2)

// 状态机及置灰状态
for(let p = 1;p <= day;p++){  
    if(p < day){
        // 置灰
        $('.murder:lt('+(day-1)+')').addClass('gray-wrap');
        $('.be-killed:lt('+(day-1)+')').show();
        $('.lastwords:lt('+(day-1)+')').addClass('gray-wrap');
        $('.speak:lt('+(day-1)+')').addClass('gray-wrap');
        $('.vote:lt('+(day-1)+')').addClass('gray-wrap');
        $('.vote-die:lt('+(day-1)+')').show();
        // 中间天数点击及内容隐藏
        $('.day').eq(p).click(function(){
            $('.day-content').eq(p).slideToggle();
        });
        $('.day-content:lt('+(day-1)+')').hide();
        // 置灰状态不可点击
        $('.murder').eq(p-1).click(function(){
            alert('请进行下一天的游戏')
        })
        $('.lastwords').eq(p-1).click(function(){
            alert('请进行下一天的游戏')
        })
        $('.speak').eq(p-1).click(function(){
            alert('请进行下一天的游戏')
        })
        $('.vote').eq(p-1).click(function(){
            alert('请进行下一天的游戏')
        })
    } else {
        // 接收状态机初始状态
        var nothing = sessionStorage.getItem('no');
        console.log(nothing)

        // 状态机
        var murder = document.getElementsByClassName("murder"),
        lastwords = document.getElementsByClassName("lastwords"),
        speak = document.getElementsByClassName("speak"),
        vote = document.getElementsByClassName("vote");

        // { name: 'again',    from: 'vote',              to: 'nothing' },
        var fsm = new StateMachine({
            init: nothing,
            transitions: [
                { name: 'kill',     from: 'nothing',        to: 'murder' },
                { name: 'died',     from: 'murder',         to: 'lastwords' },
                { name: 'discuss',  from: 'lastwords',     to: 'speak' },
                { name: 'end',      from: 'speak',          to: 'nothing' },
                
            ],

            methods: {
                onEnterMurder: function() {
                    $('.murder').addClass('gray-wrap');
                    $('.be-killed').show();
                },
                onEnterLastwords: function() { 
                    $('.murder').addClass('gray-wrap');
                    $('.be-killed').show();
                    $('.lastwords').addClass('gray-wrap');
                },
                onEnterSpeak: function() {
                    $('.murder').addClass('gray-wrap');
                    $('.be-killed').show();
                    $('.lastwords').addClass('gray-wrap');
                    $('.speak').addClass('gray-wrap');
                }
            }
        })

        murder[day - 1].onclick = function() {
            switch(fsm.state) {
                case 'nothing':
                fsm.kill();
                console.log(fsm.state)
                sessionStorage.setItem('no','murder')
                window.location = "js-2-sry.html";
                break;
                default:
                alert("请按顺序进行游戏");  
            }
        }

        lastwords[day - 1].onclick = function() {
            switch(fsm.state) {
                case 'murder':
                fsm.died();
                console.log(fsm.state)
                sessionStorage.setItem('no','lastwords');
                alert("发表遗言");
                break;
                default:
                alert("请按顺序进行游戏");
            }
        }

        speak[day - 1].onclick = function() {
            switch(fsm.state) {
                case 'lastwords':
                fsm.discuss();
                console.log(fsm.state)
                sessionStorage.setItem('no','speak');
                alert("玩家依次发言");
                break;
                default:
                alert("请按顺序进行游戏");
            }
        }

        vote[day - 1].onclick = function() {
            switch(fsm.state) {
                case 'speak':
                fsm.end();
                console.log(fsm.state)
                window.location = "js-2-sry.html";
                sessionStorage.setItem('no','nothing');
                break;
                default:
                alert("请按顺序进行游戏");
            }
        }

        // 判定游戏是否结束
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

        if(aliveKill == 0 || (aliveNum - aliveKill) == 0){
            window.location = "js-2-end.html";
        }
        // console.log(aliveKill,(aliveNum-aliveKill))
    }
    
}