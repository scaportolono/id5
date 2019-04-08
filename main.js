let current = {
    mapElem: {},
    mapID: 0,
    mapRect: {},
    clickCount: 0
}
// random

// timelimit 
let timelimit = (time) => {
}

// マップ画像の縮小比率
let ratio = () => {
// 比率
/* 
	画像オリジナルサイズを取得（json）
  表示サイズを取得
  比率を出す
*/
}

// 画像上のスポーン座標
let spawn = (clickX, clickY) => {
    rect = current.mapRect
    positionX = rect.left + window.pageXOffset;
    positionY = rect.top + window.pageYOffset;

    return {
        x: clickX - positionX,
        y: clickY - positionY
    }
}
// _h,_sの座標設定
let draw = (elem,x,y) => {
    elem.classList.add("answerd")
    elem.style.left = x - 5 + "px"
    elem.style.top = y - 5 + "px"
}
// クリックイベント
let mapClick = (e) => {
    // 座標とって返す
    let { x, y } = spawn(e.pageX, e.pageY)
    count = current.clickCount
    draw(document.getElementById("map" + current.mapID + "_answer_s" + count), x, y)
    current.clickCount++;
    if (current.clickCount === 4) {
        end();
    }
}

// map 表示
const mapSelect = document.querySelector("#mapSelect");
mapSelect.onchange = () => {
    // ランダム以外
    if (mapSelect.value<5){
       setMap(mapSelect.value);
    }
}
let setMap = (mapID) => {
    // すべてhidden&イベントの削除
    maps = document.querySelectorAll(".mapfield");
    for(i=0; i<maps.length; i++){
        maps[i].classList.add("hidden");
        maps[i].removeEventListener("click", mapClick);
    }
    // 指定IDをshow&currentの設定
    if (mapID<5){
        maps[mapID].classList.remove("hidden");
        current.mapElem = maps[mapID];
        current.mapID = mapID;
    } else {
        maps[0].classList.remove("hidden");
        current.mapElem = maps[0];
        current.mapID = 0;
    }
    // currentMapの座標
    current.mapRect = current.mapElem.getBoundingClientRect();
}

// start
let start = () => {
    console.log("start...");

    // startボタンのdisabled
    //
    // ランダムの場合Mapをsetし直す
    //
    // スポーンパターンのset 
        // expectedの描画（display;Noneのまま)
        // answer_hunter描画

    // カウントダウン開始
    // カウントダウンの値取得
    // CSSclassセット
    // settimeoutセット
    // カウントダウン後にアクション
    // 途中でカウントダウンを終了させる

    // 画像クリックでその位置に印をつける（4回まで)
    // -> answerの座標設定
    current.mapElem.addEventListener('click', mapClick)

    // カウントダウンが終わるか、クリック数が４回終わるかで終了
}

// end
let end = () => {
    // クリックイベントの廃棄
    current.mapElem.removeEventListener("click", mapClick);
    // クリックカウントのリセット
    current.clickCount = 0;
    // カウントダウンが途中なら破棄
    // expectedをdisplay:blockに
    console.log("end...");
}

// load(初期表示)
window.onload = () => {
    // 工場初期表示
    setMap(0);
    document.querySelector("#start").addEventListener("click", start);
}

console.info(data)
