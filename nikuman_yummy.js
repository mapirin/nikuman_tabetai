const CANVAS_SIZE_W=window.innerWidth
const CANVAS_SIZE_HW=window.innerHeight
const CANVAS_SIZE_H=window.innerWidth*(2/3)
const CANVAS_SIZE_HH=window.innerHeight*(2/3)
const CHARACTER_SIZE=50
const CHARACTER_HSIZE=25
let CHARACTER_POS_X=CANVAS_SIZE_HW-CHARACTER_HSIZE
let CHARACTER_POS_Y=CANVAS_SIZE_HH-CHARACTER_HSIZE

let dx=10
let dy=10

const canvas=document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let i=0;    

const img1 = new Image()
img1.src ="./resource/nikuman.png"
const img2 = new Image()
img2.src ="./resource/load.png"
const img3 = new Image()
img3.src ="./resource/yummy.png"
const img4 = new Image()
img4.src ="./resource/nikuman_tabetai.png"

let intervalId
let nikumanStart = false

img1.onload=()=>{
    if(!nikumanStart){
        ctx.drawImage(
            img4,
            70,
            70,
            300,
            300
        )
        img4.src="./resource/nikuman_tabetai.png"
        nikumanStart = true
    }else{
        execute(2000)
    }
}

//メイン処理リスナー
window.addEventListener('click', throttle(clickEvent, 10000))

//スロットリングからの呼び出し処理
function clickEvent(){
    clearInterval(intervalId)
    i++
    if(i%2 !== 0){
        CHARACTER_POS_X = CANVAS_SIZE_HW-CHARACTER_HSIZE
        CHARACTER_POS_Y = CANVAS_SIZE_HH-CHARACTER_HSIZE
        img1.src="./resource/nikuman.png"
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            img3,
            70,
            70,
            300,
            300
        )
        img3.src="./resource/yummy.png"
    }
}

//非同期処理_メイン実行メソッド
async function execute(ms){
    try{
        console.log("肉まん準備中…")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            img2,
            CHARACTER_POS_X,
            CHARACTER_POS_Y,
            CHARACTER_SIZE,
            CHARACTER_SIZE
        )
        await deray(ms)
        console.log("肉まん開始！")
        await deray(ms)
        console.log("肉まん動作中…")
        intervalId = setInterval(update, ms/10)
    }catch(error){
        console.log("肉まん終了")
    }
}

//非同期処理_プロミス生成メソッド
function deray(ms){
    return new Promise(function(resolve){
        setTimeout(resolve, ms)
    })
}

//連続描画処理
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
        img1,
        CHARACTER_POS_X,
        CHARACTER_POS_Y,
        CHARACTER_SIZE,
        CHARACTER_SIZE
    )
    CHARACTER_POS_X += dx
    CHARACTER_POS_Y += dy

    if(CHARACTER_POS_X + CHARACTER_SIZE > CANVAS_SIZE_W || CHARACTER_POS_X < 0){
        dx = -dx
    }
    if(CHARACTER_POS_Y + CHARACTER_SIZE > CANVAS_SIZE_H || CHARACTER_POS_Y < 0){
        dy = -dy
    }
}

//TODO
//実装：スロットリング実装して、クリックイベントのリスナー検知回数を制御する
//理由：実行回数を2000msの繰り返し処理中に1回のみにするため
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  

