import data from "./data.json";
import css from './main.css';
Sentry.init({ dsn: 'https://4a92773d45204e28973fc9d4ff1967d8@sentry.io/1438809' });
const mapCount = 6;
let current = {
    mapElem: {},
    mapID: 0,
    mapRect: {},
    spawnPattern: 0,
    clickCount: 0,
    player: "hunter"
}
let elems = {
    mapElem: document.querySelector("#map"),
    sidenav: document.querySelector(".sidenav"),
    startBtn: document.querySelector("#js-start"),
    settingsBtn: document.querySelector("#js-settings"),
    playerSelect: document.querySelector("#js-player"),
    mapSelect: document.querySelector("#js-mapSelect"),
    countTimeSelect: document.querySelector("#js-time"),
    cameraOnCheckbox: document.querySelector("#js-camera-on"),
    othreSvShowOnCheckbox: document.querySelector("#js-other-sv-on"),
    progressBar: document.querySelector("#js-timer")
}
let counter = {
    time: 5,
    className: `time${elems.countTimeSelect.value}sec`,
    setTimer: {}
}

// マップ画像の縮小比率
let ratio = () => {
    var originImageWidth = data.maps[current.mapID].origin.x;
    var viewImageWidth = current.mapElem.querySelector("img").offsetWidth;
    return viewImageWidth/originImageWidth
}

// 画像上のスポーン座標
let spawn = (clickX, clickY) => {
    var rect = current.mapRect
    var positionX = rect.left + window.pageXOffset;
    var positionY = rect.top + window.pageYOffset;

    return {
        x: clickX - positionX,
        y: clickY - positionY
    }
}
// _h,_sの座標設定
let draw = (elem,x,y) => {
    elem.classList.add("answerd")
    elem.style.left = x - 10 + "px"
    elem.style.top = y - 10 + "px"
}

// クリックイベント
let mapClick = (e) => {
    // currentMapの座標
    current.mapRect = current.mapElem.getBoundingClientRect();
    // 座標とって返す
    let { x, y } = spawn(e.pageX, e.pageY)
    if (current.player === "hunter") {
        var count = current.clickCount
        draw(document.getElementById("map" + current.mapID + "_answer_s" + count), x, y)
        current.clickCount++;
        if (current.clickCount === 4) {
            end();
        }
    } else {
        draw(document.getElementById("map" + current.mapID + "_answer_h"), x, y)
        end();
    }
}

// randomMap
let setRandomMap = () => {
    var randMapID = Math.floor(Math.random() * mapCount);
    setMap(randMapID);
}
// map設定
let setMap = (mapID) => {
    // reset expected
    resetExpected();
    resetAnswerd();
    // すべてhidden&イベントの削除
    var maps = document.querySelectorAll(".mapfield");
    for(var i=0; i<maps.length; i++){
        maps[i].classList.add("hidden");
        maps[i].removeEventListener("click", mapClick);
    }
    // 指定IDをshow&currentの設定
    if (mapID<mapCount){
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
    var mapID = current.mapID;
    // jsonからpattern数取得
    var patterns = data.maps[mapID].patterns
    // random
    var patternID = Math.floor(Math.random() * patterns.length);
    current.spawnPattern = patterns[patternID] 
}

// question
let questSet = () => {
    var player = current.player
    var ptn = current.spawnPattern
    var mapRatio = ratio();

    if (player === "hunter") {
        // answer_hの座標設定
        draw(document.getElementById(`map${current.mapID}_answer_h`), ptn.hunter.x * mapRatio, ptn.hunter.y * mapRatio);
        // cameraの座標設定
        if (elems.cameraOnCheckbox.checked) {
            draw(document.getElementById(`map${current.mapID}_answer_camera`), ptn.hunter.camera.x * mapRatio, ptn.hunter.camera.y * mapRatio);
        }

        // expected_sの座標設定
        for (var i=0; i<4; i++){
            draw(document.getElementById(`map${current.mapID}_expected_s${i}`), ptn.survivors[i].x * mapRatio, ptn.survivors[i].y * mapRatio)
        }
    } else {
        // 自身
        var selfID = Math.floor(Math.random() * 4);
        var showOther = elems.othreSvShowOnCheckbox.checked

        if (showOther) {
            // aesopClassをつける
            document.getElementById(`map${current.mapID}_answer`).classList.add("aesop")
        } else {
            document.getElementById(`map${current.mapID}_answer`).classList.remove("aesop")
        }

        // answer_sの座標設定
        var answer_s
        for (var i=0; i<4; i++){
            answer_s = document.getElementById(`map${current.mapID}_answer_s${i}`);
            if (i === selfID){
                answer_s.classList.add("self");
            } else {
                answer_s.classList.add("other");
            }
            draw(answer_s, ptn.survivors[i].x * mapRatio, ptn.survivors[i].y * mapRatio)
        }
        // expected_hの座標設定
        draw(document.getElementById(`map${current.mapID}_expected_h`), ptn.hunter.x * mapRatio, ptn.hunter.y * mapRatio);

    }
}

// expectedのReset
let resetExpected = () =>{
    var expectedElems = document.querySelectorAll(".expected");
    for (var i=0; i<expectedElems.length; i++) {
        expectedElems[i].classList.add("hidden");
    }
    var expSpawn = document.querySelectorAll(".expected_s");
    for (var i=0; i<expSpawn.length; i++) {
        expSpawn[i].classList.remove("answerd");
    }
    var expSpawnH = document.querySelectorAll(".expected_h");
    for (var i=0; i<expSpawnH.length; i++) {
        expSpawnH[i].classList.remove("answerd");
    }
}
// answerdのReset
let resetAnswerd = () => {
    var ansSpawn = document.querySelectorAll(".answer_s");
    for (var i=0; i<ansSpawn.length; i++) {
        ansSpawn[i].classList.remove("answerd");
        ansSpawn[i].classList.remove("self");
        ansSpawn[i].classList.remove("other");
    }
    var ansSpawnH = document.querySelectorAll(".answer_h");
    for (var i=0; i<ansSpawnH.length; i++) {
        ansSpawnH[i].classList.remove("answerd");
    }
    var ansSpawnCamera = document.querySelectorAll(".answer_camera");
    for (var i=0; i<ansSpawnCamera.length; i++) {
        ansSpawnCamera[i].classList.remove("answerd");
    }
}

// start
let start = () => {
    // startボタンのdisabled
    elems.startBtn.disabled = "disabled"
    elems.settingsBtn.disabled = "disabled"
    elems.mapSelect.disabled = "disabled"
    elems.countTimeSelect.disabled = "disabled"

    // expected, answerdのリセット
    resetExpected();
    resetAnswerd();
    
    // Mapをset
    if (elems.mapSelect.value==mapCount){
        setRandomMap();
    }

    // スポーンパターンSet
    setRandomPattern();

    // 出題と回答のSet
    questSet();

    // カウントダウン開始
    // settimeoutセット
    counter.setTimer = window.setTimeout(end, counter.time * 1000)
    // CSSclassセット
    elems.progressBar.classList.add(counter.className);

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
    window.clearTimeout(counter.setTimer);
    elems.progressBar.classList.remove(counter.className);

    // expectedをdisplay:blockに
    current.mapElem.querySelector(".expected").classList.remove("hidden");

    // aesop classをつける(あれば) 
    current.mapElem.querySelector(".answer"). classList.add("aesop");
    
    // startボタンのdisabled
    elems.startBtn.disabled = ""
    elems.settingsBtn.disabled = ""
    elems.mapSelect.disabled = ""
    elems.countTimeSelect.disabled = ""
}

// load(初期表示)
window.onload = () => {
    // 工場初期表示
    setMap(0);
    elems.startBtn.addEventListener("click", start);

    // sidenav
    var instances = M.Sidenav.init(elems.sidenav);
}

// select box event
// player
elems.playerSelect.onchange = ()=>{
    elems.cameraOnCheckbox.checked = false;
    elems.othreSvShowOnCheckbox.checked = false;
    resetExpected();
    resetAnswerd();
    switch (elems.playerSelect.value) {
        case "survivor" :
            elems.mapElem.classList.remove("hunter");
            elems.mapElem.classList.add("survivor");
            elems.cameraOnCheckbox.disabled = "disabled";
            elems.othreSvShowOnCheckbox.disabled = "";
            break;
        case "hunter":
        default:
            elems.mapElem.classList.remove("survivor");
            elems.mapElem.classList.add("hunter");
            elems.cameraOnCheckbox.disabled = "";
            elems.othreSvShowOnCheckbox.disabled = "disabled";
    }
    current.player =  elems.playerSelect.value;
};
// map
elems.mapSelect.onchange = () => {
    if (elems.mapSelect.value<mapCount){
        setMap(elems.mapSelect.value);
    } else {
        // ランダム表示
        setRandomMap();
    }
};
// timer 
elems.countTimeSelect.onchange = ()=> {
    counter.time = elems.countTimeSelect.value;
    counter.className = `time${counter.time}sec`
};
