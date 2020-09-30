const btnStart = document.getElementById("btn-start");
const holes = document.querySelectorAll("#game td");
const textScore = document.getElementById("text-score");
const highPlayer = document.getElementById("high-player");
const highScore = document.getElementById("high-score");
// 第一種播放音效方法
// const good = document.getElementById("good");
// good.play()

// 第二種播放音效方法
const beat = new Audio();
beat.src = "./beat.mp3";

const win = new Audio();
win.src = "./laughing.mp3";

// 點擊滑鼠後換圖
const games = document.getElementById('games')
const mouseChange = document.getElementsByClassName("mouse-change");
// mousedown + mouseup = click
// 滑鼠點下時加入要換的圖片
games.onmousedown = () => {
    games.classList.add('mouse-change');
};
// 滑鼠放開時移除剛換的圖片
games.onmouseup = () => {
    games.classList.remove('mouse-change');
};


let score = 0; // 設定一個變數讓分數可以跑
let isInGame = false; // 一開始進入頁面的遊戲狀態
let timer = 0;


// 設定最高分玩家
let high = {
    name: "",
    score: 0,
};
const highStorage = JSON.parse(localStorage.getItem(high));
if (highStorage !== null) {
    high = highStorage;
    highPlayer.innerText = high.name;
    highScore.innerText = high.score;
}

// 點擊開始後跑時間 
const barbox = document.getElementById('barbox');
const bartime = document.getElementsByClassName("bartime");


btnStart.onclick = () => {
    // console.log("start"); // 測試有沒有設定到
    btnStart.disabled = true; // 點選遊戲開始後，停用開始按鈕

    barbox.classList.add('bartime'); // 點選遊戲開始後，開始跑倒數時間

    score = 0; // 每開始一次遊戲，重置分數
    textScore.innerText = score; // 顯示的分數也要重置，與變數(score)同步
    isInGame = true; // 遊戲狀態

    timer = setInterval(game, 1000); // 每秒換幾次
    setTimeout(end, 10000); //遊戲時間(幾秒結束)

    // setInterval 會讓遊戲一秒後才開始，所以要補一個在 onclick 迴圈內，點選後馬上開始
    game();
};

// function game() {}
const game = () => {
    for (const hole of holes) {
        // 每次出現新的紅色色塊前先移除畫面上本來有的紅色色塊
        hole.classList.remove("monster");
        // 移除該次點擊到藍色色塊，讓紅色色塊能繼續在九格內隨機出現
        hole.classList.remove("hit");
    }

    // 隨機抽取三個色塊填滿
    for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * 14);
        holes[random].classList.add("monster");
    }
};

// function end() {}
// 把所有物件重設
const end = () => {
    clearInterval(timer); // 把秒數停掉
    for (const hole of holes) {
        hole.classList.remove("monster"); // 把顏色重置
        hole.classList.remove("hit"); // 把顏色重置
    }
    btnStart.disabled = false;
    alert(`恭喜你抓到${score}隻小妖怪`);

    if (highStorage === null || high.score < score) {
        win.play();

        const name = prompt("*ଘ(੭*ˊᵕˋ)੭* ੈ✩‧₊˚ 好棒! 最高分! 請輸入名字");
        high.score = score;
        // if (name === null || name.length === 0) {
        //   high.name = "路人";
        // } else {
        //   high.name = name;
        // }
        high.name = name || "路人";

        localStorage.setItem("high", JSON.stringify(high));
        highPlayer.innerText = high.name;
        highScore.innerText = high.score;
    }

};

for (const hole of holes) {
    hole.onclick = () => {
        if (hole.classList.contains("monster")) {
            hole.classList.remove("monster");
            beat.play();
            hole.classList.add("hit");

            score++;
            textScore.innerText = score;
        }
    };
}
function newFunction() {
    return 'bartime';
}

