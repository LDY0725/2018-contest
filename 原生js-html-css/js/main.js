window.onload = function () {
    var mainData = {
        data: new Array(4),
        time: new Date(),
        current: 0,
        best: 0,
        bestScore: document.querySelector('#bestScore'),
        currentScore: document.querySelector('#currentScore'),
        addScore: document.querySelector('.addScore'),
        startX:0,
        startY:0,
        stop: false
    }

    if (localStorage.best) {
        mainData.best = localStorage.best
        mainData.bestScore.innerHTML = mainData.best
    }

    getData(mainData)
    document.addEventListener('keydown', function(event) {keyup(event, mainData)})
    document.querySelector('.contain').addEventListener("touchstart", function (event) {touchstart(event,mainData)});　
    document.querySelector('.contain').addEventListener("touchend",function (event) {touchend(event, mainData)});    
    document.querySelector('.reStart').addEventListener('click', function(event) {newGame(event, mainData)})
    document.querySelector('.tryAgain').addEventListener('click', function(event) {newGame(event, mainData)})
    document.querySelector('.continue').addEventListener('click', function(event) {continuePlay(event, mainData)})
    
    random(mainData)
    random(mainData)
}

/**
 * 初始化mainData，将一些经常用的DOM元素加入到js内存中
 * @method getData
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function getData(mainData) {
    for (let i = 0; i < 4; i++) {
        mainData.data[i] = [{}, {}, {}, {}]
    }

    var row = document.querySelectorAll('.contain .row')

    for (let i = 0; i < row.length; i++) {
        var blocks = row[i].querySelectorAll('.block')

        for (let j = 0; j < blocks.length; j++) {
            mainData.data[i][j].el = blocks[j]
            mainData.data[i][j].num = 0
            mainData.data[i][j].step = 0
            mainData.data[i][j].newNum = 0
            mainData.data[i][j].old = j
            mainData.data[i][j].big = false
        }
    }
}


/**
 * 在div中随机生成一个为2的方框
 * @method random
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function random(mainData) {
    var a = 0
    do {
        a = Math.floor(Math.random() * 16)
    } while (mainData.data[Math.floor(a / 4)][a % 4].num != 0);

    var el = mainData.data[Math.floor(a / 4)][a % 4].el
    
    if (Math.random()>0.2) {        
        addClass(el, 'div2')
        mainData.data[Math.floor(a / 4)][a % 4].num = 2    
        addClass(el, 'create animated')
        el.innerHTML = 2
    }else{
        mainData.data[Math.floor(a / 4)][a % 4].num = 4    
        addClass(el, 'div4')
        addClass(el, 'create animated')
        el.innerHTML = 4
    }
}


/**
 * 在div中随机生成一个为2的方框
 * @method random
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function newGame(event,mainData) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            changeClass(mainData.data[i][j].el, "")
            mainData.data[i][j].el.innerHTML = ""
            mainData.data[i][j].num = 0
            mainData.data[i][j].step = 0
            mainData.data[i][j].newNum = 0
            mainData.data[i][j].old = j
            mainData.data[i][j].big = false
        }        
    }
    mainData.current = 0;
    mainData.currentScore.innerHTML = "0"
    document.querySelector('.gameOver').style.display = 'none'
    document.querySelector('.contain').style.filter = 'blur(0px)'
    random(mainData)
    random(mainData)
}

/**
 * 更改分数
 * @method changScore
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function changScore (mainData,score) {    
    if (score == 0) return

    mainData.current += score
    console.log(score);
    
    mainData.addScore.innerHTML = '+' + score
    mainData.addScore.className = 'addScore animated scoreOut'
    mainData.currentScore.innerHTML = mainData.current
    if (mainData.current > mainData.best) {
        mainData.best = mainData.current
        mainData.bestScore.innerHTML = mainData.current
        localStorage.best= mainData.best;
    }

    setTimeout(function(){
        mainData.addScore.innerHTML = ''
        mainData.addScore.className = ''
    },300)
}

/**
 * 得到2048，显示成功界面
 * @method success
 * @param {无} 
 * @return {无} 
 */
function success (mainData) {
    mainData.stop = true
    document.querySelector('.success').style.display = 'block'
    document.querySelector('.contain').style.filter = 'blur(2px)'
}

/**
 * 更改分数
 * @method continuePlay
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function continuePlay (event,mainData) {
    mainData.stop = false
    document.querySelector('.success').style.display = 'none'
    document.querySelector('.contain').style.filter = 'blur(0px)'
}