// random

// timelimit 
let timelimit = (time) => {
}

// マップ画像の縮小比率
let ratio = () => {
}

// スポーン位置の描画
let spawn = () => {
    draw(0,0)
}

// クリックイベント
let mapClick = (e) => {
    // 座標とって返す
    return 0
}
// sample
elem = document.querySelector("#map0")
rect = elem.getBoundingClientRect();
var positionX = rect.left + window.pageXOffset;
var positionY = rect.top + window.pageYOffset;
spawn = document.getElementById("map0_answer_s0")

elem.addEventListener('click', (evt)=>{
spawn.classList.add("answerd")
spawn.style.left = evt.pageX -  positionX - 5 + "px"
spawn.style.top = evt.pageY -  positionY - 5 + "px"


console.log(evt.pageX -  positionX);
})

// _h,_sの座標設定
let draw = (x,y) => {
}

// map 表示
const mapSelect = document.querySelector("#mapSelect");
mapSelect.onchange = () => {
    // ランダム以外
    if (mapSelect.value<5){
        showMap(mapSelect.value);
    }
}
let showMap = (mapID) => {
    // すべてhidden
    maps = document.querySelectorAll(".mapfield");
    for(i=0; i<maps.length; i++){
        maps[i].classList.add("hidden");
    }
    // 指定IDをshow
    if (mapID<5){
        maps[mapID].classList.remove("hidden");
    } else {
        maps[0].classList.remove("hidden");
    }
}

// start
let start = () => {
    console.log("start...");
// start 
// startボタンのdisabled
//
// マップの選出（ランダムの場合)
// -> 選択以外はdisplay:none
//
// パターンの選出
// expectedの描画（display;Noneのまま)
// answer_hunter描画
//
// カウントダウン開始
// 画像クリックでその位置に印をつける（4回まで)
// -> answerの座標設定
// カウントダウンが終わるか、クリック数が４回終わるかで終了
//

}

// end
let end = () => {
// クリックイベントの廃棄
// クリックカウントのリセット
// カウントダウンが途中なら破棄
// expectedをdisplay:blockに
}

// 

// load(初期表示)
window.onload = () => {
    // 工場初期表示
    showMap(0);
}






// カウントダウンの値取得
// CSSclassセット
// settimeoutセット
// カウントダウン後にアクション
// 途中でカウントダウンを終了させる

// 比率
/* 
	画像オリジナルサイズを取得（json）
  表示サイズを取得
  比率を出す
*/

console.info(data)
