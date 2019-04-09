const mapCount = 6;
let current = {
    mapElem: {},
    mapID: 0,
    mapRect: {},
    spawnPattern: 0,
    clickCount: 0
}
let startBtn = document.querySelector("#start");
let counter = document.querySelector("#timer");
let countTimeSet = document.querySelector("#time")
let countTime = document.querySelector("#time").value
let timer;

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
    if (mapSelect.value<mapCount){
        setMap(mapSelect.value);
    } else {
        setRandomMap();
    }
}
// randomMap
let setRandomMap = () => {
    randMapID = Math.floor(Math.random() * mapCount);
    console.log(randMapID)
    setMap(randMapID);
}
// map設定
let setMap = (mapID) => {
    // reset expected
    resetExpected();
    resetAnswerd();
    // すべてhidden&イベントの削除
    maps = document.querySelectorAll(".mapfield");
    for(i=0; i<maps.length; i++){
        maps[i].classList.add("hidden");
        maps[i].removeEventListener("click", mapClick);
    }
    // 指定IDをshow&currentの設定
    if (mapID<mapCount-1){
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
// スポーンパターンのけってい
let setRandomPattern = () => {
    // current取得
    mapID = current.mapID;
    // jsonからpattern数取得
    patterns = data.maps[mapID].patterns
    // random
    patternID = Math.floor(Math.random() * patterns.length);
    current.spawnPattern = patterns[patternID] 

    ptn = current.spawnPattern

    // answer_hの座標設定
    draw(document.getElementById("map" + current.mapID + "_answer_h"), ptn.hunter.x, ptn.hunter.y);

    // expected_sの座標設定
    for (i=0; i<4; i++){
        draw(document.getElementById("map" + current.mapID + "_expected_s" + i), ptn.survivors[i].x, ptn.survivors[i].y)
    }
}

// expectedのReset
let resetExpected = () =>{
    expectedElems = document.querySelectorAll(".expected");
    for (i=0; i<expectedElems.length-1; i++) {
        expectedElems[i].classList.add("hidden");
    }
    expSpawn = document.querySelectorAll(".expected_s");
    for (i=0; i<expSpawn.length-1; i++) {
        expSpawn[i].classList.remove("answerd");
    }
}
// answerdのReset
let resetAnswerd = () => {
    ansSpawn = document.querySelectorAll(".answer_s");
    for (i=0; i<ansSpawn.length-1; i++) {
        ansSpawn[i].classList.remove("answerd");
    }
}

// start
let start = () => {
    console.log("start...");

    // startボタンのdisabled
    startBtn.disabled = "disabled"
    mapSelect.disabled = "disabled"
    countTimeSet.disabled = "disabled"

    // expected, answerdのリセット
    resetExpected();
    resetAnswerd();
    
    // Mapをsetし直す
    if (mapSelect.value==mapCount){
        setRandomMap();
    }
    setRandomPattern();

    // カウントダウン開始
    // settimeoutセット
    timer = window.setTimeout(end, countTime * 1000)
    // CSSclassセット
    counter.classList.add("time" + countTime + "sec");

    // 画像クリックでその位置に印をつける（4回まで)
    current.mapElem.addEventListener('click', mapClick)
}

// end
let end = () => {
    // クリックイベントの廃棄
    current.mapElem.removeEventListener("click", mapClick);
    // クリックカウントのリセット
    current.clickCount = 0;
    // カウントダウンが途中なら破棄
    window.clearTimeout(timer);
    counter.classList.remove("time" + countTime + "sec");

    // expectedをdisplay:blockに
    current.mapElem.querySelector(".expected").classList.remove("hidden");
    
    // startボタンのdisabled
    startBtn.disabled = ""
    mapSelect.disabled = ""
    countTimeSet.disabled = ""

    console.log("end...");
}

// load(初期表示)
window.onload = () => {
    // 工場初期表示
    setMap(0);
    startBtn.addEventListener("click", start);
}
